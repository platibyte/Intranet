const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 5000; // Anderer Port als Vite (5173)
const cors = require('cors');
app.use(cors());

// Pfad zur externen Festplatte (anpassen!)
const photoDir = '/home/tobias/test-photos'; // Beispielpfad, siehe unten

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
    // Sende das Bild als Datei
    res.sendFile(photoPath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Fehler beim Laden des Fotos');
  }
});

// Statische Dateien bereitstellen (optional, falls nötig)
app.use('/photos', express.static(photoDir));

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});