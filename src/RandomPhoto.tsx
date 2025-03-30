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

interface PhotoInfo {
  url: string;
  filename: string;
}

function RandomPhoto() {
  const [photos, setPhotos] = useState<PhotoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInfo | null>(null);
  const [blacklist, setBlacklist] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const fetchRandomPhotos = async () => {
    setLoading(true);
    try {
      const fetchPromises = Array(10).fill(0).map(async () => {
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`http://192.168.0.17:5000/api/random-photo${cacheBuster}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          
          // Get filename from headers or generate one if not available
          const contentDisposition = response.headers.get('content-disposition');
          let filename = '';
          
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1];
            }
          }
          
          // If no filename found, extract it from the URL or use a default
          if (!filename) {
            // Try to get filename from the URL path
            const urlPath = new URL(response.url).pathname;
            const urlFilename = urlPath.split('/').pop();
            
            if (urlFilename) {
              filename = urlFilename.split('?')[0]; // Remove query parameters
            } else {
              filename = `photo-${Date.now()}.jpg`;
            }
          }
          
          return { url, filename };
        }
        return null;
      });

      const allResults = await Promise.all(fetchPromises);
      const validResults = allResults.filter(item => item !== null) as PhotoInfo[];
      
      const filteredResults = validResults.filter(item => {
        const blacklistValue = blacklist[item.url] || 0;
        const randomValue = Math.random();
        return randomValue >= blacklistValue;
      });
      
      setPhotos(filteredResults.slice(0, 8));
    } catch (error) {
      console.error('Fehler:', error);
    } finally {
      setLoading(false);
    }
  };

  const replaceSinglePhoto = async (indexToReplace: number) => {
    try {
      let newPhotoInfo = null;
      let attempts = 0;
      
      while (!newPhotoInfo && attempts < 5) {
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`http://192.168.0.17:5000/api/random-photo${cacheBuster}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          
          // Get filename from headers or generate one if not available
          const contentDisposition = response.headers.get('content-disposition');
          let filename = '';
          
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1];
            }
          }
          
          // If no filename found, extract it from the URL or use a default
          if (!filename) {
            // Try to get filename from the URL path
            const urlPath = new URL(response.url).pathname;
            const urlFilename = urlPath.split('/').pop();
            
            if (urlFilename) {
              filename = urlFilename.split('?')[0]; // Remove query parameters
            } else {
              filename = `photo-${Date.now()}.jpg`;
            }
          }
          
          if (!photos.some(photo => photo.url === url)) {
            newPhotoInfo = { url, filename };
          } else {
            URL.revokeObjectURL(url);
          }
        }
        attempts++;
      }
      
      if (newPhotoInfo) {
        const oldUrl = photos[indexToReplace]?.url;
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        
        const newPhotos = [...photos];
        newPhotos[indexToReplace] = newPhotoInfo;
        setPhotos(newPhotos);
      }
    } catch (error) {
      console.error('Fehler beim Ersetzen des Fotos:', error);
    }
  };

  useEffect(() => {
    fetchRandomPhotos();
    
    return () => {
      photos.forEach(photo => URL.revokeObjectURL(photo.url));
    };
  }, []);

  const handleOpenPhoto = (photo: PhotoInfo) => {
    setSelectedPhoto(photo);
  };

  const handleHidePhoto = (photo: PhotoInfo, index: number) => {
    setBlacklist(prev => ({
      ...prev,
      [photo.url]: 0.75
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-video">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-secondary/50 rounded-lg flex items-center justify-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ))}
        </div>
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="relative aspect-video rounded-lg overflow-hidden bg-secondary/50 group"
            >
              <img 
                src={photo.url} 
                alt={`Zufälliges Foto ${index + 1}`} 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleOpenPhoto(photo)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-medium text-sm">{photo.filename}</h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleHidePhoto(photo, index);
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
            photos.forEach(photo => URL.revokeObjectURL(photo.url));
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
              <DialogTitle>{selectedPhoto.filename}</DialogTitle>
              <DialogDescription>
                Vergrößerte Darstellung des Fotos
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-2">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.filename} 
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
