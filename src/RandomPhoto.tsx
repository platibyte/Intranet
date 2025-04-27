
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { useRandomPhotos } from "@/hooks/use-random-photos";
import { PhotoItem, PhotoInfo } from "@/components/photo/PhotoItem";
import { PhotoModal } from "@/components/photo/PhotoModal";
import { PhotoLoading } from "@/components/photo/PhotoLoading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * Component that displays a grid of randomly fetched photos
 * Allows users to view, refresh and hide specific photos
 */
function RandomPhoto() {
  const { photos, loading, handleHidePhoto, fetchRandomPhotos, serverAvailable } = useRandomPhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInfo | null>(null);

  /**
   * Sets the selected photo when a user clicks on it
   * @param photo The photo object that was clicked
   */
  const handleOpenPhoto = (photo: PhotoInfo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  /**
   * Closes the photo modal
   */
  const closePhotoModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <div className="space-y-4">
      {serverAvailable === false && (
        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertTitle>Server nicht erreichbar</AlertTitle>
          <AlertDescription>
            Der Foto-Server ist nicht erreichbar. Es werden Platzhalterbilder angezeigt.
          </AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <PhotoLoading />
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <PhotoItem 
              key={`${photo.url}-${index}`}
              photo={photo}
              index={index}
              onOpen={handleOpenPhoto}
              onHide={handleHidePhoto}
            />
          ))}
        </div>
      ) : (
        <div className="aspect-video rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center text-muted-foreground">
          Konnte keine Fotos laden
        </div>
      )}
      
      <PhotoModal photo={selectedPhoto} onClose={closePhotoModal} />
      
      <div className="flex justify-end">
        <Button 
          onClick={() => {
            photos.forEach(photo => {
              if (photo.url.startsWith('blob:')) {
                URL.revokeObjectURL(photo.url);
              }
            });
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
    </div>
  );
}

export default RandomPhoto;
