import { useState, useEffect } from 'react';

function RandomPhoto() {
  const [photoUrl, setPhotoUrl] = useState('');

  // Funktion zum Abrufen eines zufälligen Fotos
  const fetchRandomPhoto = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/random-photo');
      if (response.ok) {
        // Erstelle eine URL aus der Antwort
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPhotoUrl(url);
      } else {
        console.error('Kein Foto gefunden');
      }
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  // Beim Laden ein Foto abrufen
  useEffect(() => {
    fetchRandomPhoto();
  }, []);

  return (
    <div>
      <h2>Zufälliges Foto</h2>
      {photoUrl ? (
        <img src={photoUrl} alt="Zufälliges Foto" style={{ maxWidth: '100%' }} />
      ) : (
        <p>Lade Foto...</p>
      )}
      <button onClick={fetchRandomPhoto}>Neues Foto</button>
    </div>
  );
}

export default RandomPhoto;