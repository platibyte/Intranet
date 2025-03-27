
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

function RandomPhoto() {
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  // Funktion zum Abrufen eines zufälligen Fotos
  const fetchRandomPhoto = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Beim Laden ein Foto abrufen
  useEffect(() => {
    fetchRandomPhoto();
  }, []);

  return (
    <div className="space-y-4">
      <div className="aspect-video rounded-lg overflow-hidden bg-secondary/50 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : photoUrl ? (
          <img 
            src={photoUrl} 
            alt="Zufälliges Foto" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Konnte kein Foto laden
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button onClick={fetchRandomPhoto} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw size={14} />
          Neues Foto
        </Button>
      </div>
    </div>
  );
}

export default RandomPhoto;
