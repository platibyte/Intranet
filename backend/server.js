
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = process.env.PORT || 5000; // Use environment PORT if available
const cors = require('cors');

// Enable CORS for all origins with more options
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 1 day
}));

// Add a simple health check endpoint
app.get('/', (req, res) => {
  res.send('Photo server is running!');
});

// Pfad zur externen Festplatte (anpassen!)
const photoDir = process.env.PHOTO_DIR || '/home/tobias/test-photos'; // Use env variable if available

// Log server start with environment info
console.log(`Server starting with photoDir: ${photoDir}`);

// API-Endpunkt für ein zufälliges Foto
app.get('/api/random-photo', async (req, res) => {
  try {
    console.log('Random photo request received');
    // Lies alle Dateien im Verzeichnis
    const files = await fs.readdir(photoDir);
    // Filtere nur Bilddateien (z. B. .jpg, .png)
    const photos = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    if (photos.length === 0) {
      console.log('No photos found in directory');
      return res.status(404).send('Keine Fotos gefunden');
    }
    // Wähle ein zufälliges Foto
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    const photoPath = path.join(photoDir, randomPhoto);
    
    console.log(`Serving random photo: ${randomPhoto}`);
    
    // Enable CORS for this response specifically
    res.header('Access-Control-Allow-Origin', '*');
    
    // Setze den Content-Disposition Header mit dem Dateinamen
    res.setHeader('Content-Disposition', `inline; filename="${randomPhoto}"`);
    
    // Sende das Bild als Datei
    res.sendFile(photoPath);
  } catch (error) {
    console.error('Error in random-photo endpoint:', error);
    res.status(500).send('Fehler beim Laden des Fotos');
  }
});

// API-Endpunkt für paginierte Fotos
app.get('/api/photos', async (req, res) => {
  try {
    console.log('Photos list request received');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;
    
    // Lies alle Dateien im Verzeichnis
    const files = await fs.readdir(photoDir);
    // Filtere nur Bilddateien (z. B. .jpg, .png)
    const photoFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    if (photoFiles.length === 0) {
      console.log('No photos found in directory');
      return res.json({ photos: [], total: 0 });
    }
    
    // Sortiere Dateien nach Änderungsdatum (neueste zuerst)
    const photoStats = await Promise.all(
      photoFiles.map(async (file) => {
        const filePath = path.join(photoDir, file);
        const stats = await fs.stat(filePath);
        return {
          filename: file,
          path: filePath,
          mtime: stats.mtime,
        };
      })
    );
    
    photoStats.sort((a, b) => b.mtime - a.mtime);
    
    // Paginiere die Ergebnisse
    const paginatedPhotos = photoStats.slice(skip, skip + limit);
    
    // Erstelle Objekte mit URL und Metadaten
    const photos = paginatedPhotos.map((photo) => {
      const filename = photo.filename;
      // Generiere einen URL für das Foto
      const url = `/photos/${encodeURIComponent(filename)}`;
      return {
        filename,
        url,
        title: path.parse(filename).name.replace(/[-_]/g, ' '),
        description: '',
        date: photo.mtime
      };
    });
    
    console.log(`Sending ${photos.length} photos (page ${page}/${Math.ceil(photoFiles.length / limit)})`);
    
    res.json({
      photos,
      total: photoFiles.length,
      page,
      limit,
      totalPages: Math.ceil(photoFiles.length / limit)
    });
  } catch (error) {
    console.error('Error in photos endpoint:', error);
    res.status(500).json({ error: 'Fehler beim Laden der Fotos' });
  }
});

// Statische Dateien bereitstellen
app.use('/photos', express.static(photoDir));

// Handle 404 errors
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.originalUrl}`);
  res.status(404).send('404 - Nicht gefunden');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

// Add proper shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
