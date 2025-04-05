
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 5000; // Anderer Port als Vite (5173)
const cors = require('cors');
app.use(cors());

// Pfad zur externen Festplatte (anpassen!)
const photoDir = '/home/pi/Pictures/Intranet'; // Beispielpfad, siehe unten

// API-Endpunkt für ein zufälliges Foto
app.get('/api/random-photo', async (req, res) => {
  try {
    // Lies alle Dateien im Verzeichnis
    const files = await fs.readdir(photoDir);
    // Filtere nur Bilddateien (z. B. .jpg, .png)
    const photos = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    if (photos.length === 0) {
      return res.status(404).send('Keine Fotos gefunden');
    }
    // Wähle ein zufälliges Foto
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    const photoPath = path.join(photoDir, randomPhoto);
    
    // Setze den Content-Disposition Header mit dem Dateinamen
    res.setHeader('Content-Disposition', `inline; filename="${randomPhoto}"`);
    
    // Sende das Bild als Datei
    res.sendFile(photoPath);
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
    
    // Lies alle Dateien im Verzeichnis
    const files = await fs.readdir(photoDir);
    // Filtere nur Bilddateien (z. B. .jpg, .png)
    const photoFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    if (photoFiles.length === 0) {
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

app.listen(port, () => {
  console.log(`Server läuft auf (localhost):${port}`);
});
