
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function RandomPhoto() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Funktion zum Abrufen von 6 zufälligen Fotos
  const fetchRandomPhotos = async () => {
    setLoading(true);
    try {
      const fetchPromises = Array(6).fill(0).map(async () => {
        const response = await fetch('http://localhost:5000/api/random-photo');
        if (response.ok) {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }
        return null;
      });

      const results = await Promise.all(fetchPromises);
      setPhotos(results.filter(url => url !== null) as string[]);
    } catch (error) {
      console.error('Fehler:', error);
    } finally {
      setLoading(false);
    }
  };

  // Beim Laden Fotos abrufen
  useEffect(() => {
    fetchRandomPhotos();
    
    // Bereinigung der Objekt-URLs beim Entladen der Komponente
    return () => {
      photos.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const handleOpenPhoto = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 aspect-video">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-secondary/50 rounded-lg flex items-center justify-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ))}
        </div>
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photoUrl, index) => (
            <div 
              key={index} 
              className="relative aspect-video rounded-lg overflow-hidden bg-secondary/50 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleOpenPhoto(photoUrl)}
            >
              <img 
                src={photoUrl} 
                alt={`Zufälliges Foto ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="aspect-video rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center text-muted-foreground">
          Konnte keine Fotos laden
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={() => {
            photos.forEach(url => URL.revokeObjectURL(url));
            fetchRandomPhotos();
          }} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
        >
          <RefreshCw size={14} />
          Neue Fotos
        </Button>
      </div>

      {/* Dialog für die vergrößerte Ansicht */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Foto-Ansicht</DialogTitle>
              <DialogDescription>
                Vergrößerte Darstellung des ausgewählten Fotos
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-2">
              <img 
                src={selectedPhoto} 
                alt="Vergrößertes Foto" 
                className="max-h-[70vh] object-contain rounded-md"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default RandomPhoto;
