import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

function RandomPhoto() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [blacklist, setBlacklist] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const fetchRandomPhotos = async () => {
    setLoading(true);
    try {
      const fetchPromises = Array(10).fill(0).map(async () => {
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`http://localhost:5000/api/random-photo${cacheBuster}`);
        if (response.ok) {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }
        return null;
      });

      const allResults = await Promise.all(fetchPromises);
      const validResults = allResults.filter(url => url !== null) as string[];
      
      const filteredResults = validResults.filter(url => {
        const blacklistValue = blacklist[url] || 0;
        const randomValue = Math.random();
        return randomValue >= blacklistValue;
      });
      
      setPhotos(filteredResults.slice(0, 6));
    } catch (error) {
      console.error('Fehler:', error);
    } finally {
      setLoading(false);
    }
  };

  const replaceSinglePhoto = async (indexToReplace: number) => {
    try {
      let newPhotoUrl = null;
      let attempts = 0;
      
      while (!newPhotoUrl && attempts < 5) {
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`http://localhost:5000/api/random-photo${cacheBuster}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          
          if (!photos.includes(url)) {
            newPhotoUrl = url;
          } else {
            URL.revokeObjectURL(url);
          }
        }
        attempts++;
      }
      
      if (newPhotoUrl) {
        const oldUrl = photos[indexToReplace];
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        
        const newPhotos = [...photos];
        newPhotos[indexToReplace] = newPhotoUrl;
        setPhotos(newPhotos);
      }
    } catch (error) {
      console.error('Fehler beim Ersetzen des Fotos:', error);
    }
  };

  useEffect(() => {
    fetchRandomPhotos();
    
    return () => {
      photos.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const handleOpenPhoto = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
  };

  const handleHidePhoto = (photoUrl: string, index: number) => {
    setBlacklist(prev => ({
      ...prev,
      [photoUrl]: 0.75
    }));
    
    replaceSinglePhoto(index);
    
    toast({
      title: "Foto ausgeblendet",
      description: "Dieses Foto wird seltener angezeigt.",
      duration: 3000,
    });
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
              className="relative aspect-video rounded-lg overflow-hidden bg-secondary/50 group"
            >
              <img 
                src={photoUrl} 
                alt={`Zufälliges Foto ${index + 1}`} 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleOpenPhoto(photoUrl)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleHidePhoto(photoUrl, index);
                }}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Nicht mehr anzeigen"
              >
                <X size={16} />
              </button>
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
