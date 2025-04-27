
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());

// Pfad zur externen Festplatte (anpassen!)
const photoDir = path.join(process.env.HOME, 'Pictures/Intranet');

// Heartbeat Server
app.get('/', (req, res) => {
  res.send('Server läuft!');
});

// API-Endpunkt für ein zufälliges Foto
app.get('/api/random-photo', async (req, res) => {
  try {
    const files = await fs.readdir(photoDir);
    const photos = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    if (photos.length === 0) {
      return res.status(404).send('Keine Fotos gefunden');
    }
    
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    res.json({ filename: randomPhoto });
  } catch (error) {
    console.error(error);
    res.status(500).send('Fehler beim Laden des Fotos');
  }
});

// API-Endpunkt für paginierte Fotos
app.get('/api/photos', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;
    
    const files = await fs.readdir(photoDir);
    const photoFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    if (photoFiles.length === 0) {
      return res.json({ photos: [], total: 0 });
    }
    
    const photoStats = await Promise.all(
      photoFiles.map(async (file) => {
        const filePath = path.join(photoDir, file);
        const stats = await fs.stat(filePath);
        return {
          filename: file,
          mtime: stats.mtime,
        };
      })
    );
    
    photoStats.sort((a, b) => b.mtime - a.mtime);
    const paginatedPhotos = photoStats.slice(skip, skip + limit);
    
    const photos = paginatedPhotos.map((photo) => ({
      filename: photo.filename,
      title: path.parse(photo.filename).name.replace(/[-_]/g, ' '),
      description: '',
      date: photo.mtime
    }));
    
    res.json({
      photos,
      total: photoFiles.length,
      page,
      limit,
      totalPages: Math.ceil(photoFiles.length / limit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Laden der Fotos' });
  }
});

// Statische Dateien bereitstellen
app.use('/photos', express.static(photoDir));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server läuft auf (localhost):${port}`);
});
