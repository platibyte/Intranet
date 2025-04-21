
import { PhotoItem, PhotoInfo } from "./PhotoItem";
import { PhotoLoading } from "./PhotoLoading";

interface RandomPhotoGridProps {
  photos: PhotoInfo[];
  loading: boolean;
  onOpen: (photo: PhotoInfo) => void;
  onHide: (photo: PhotoInfo, index: number) => void;
}

/**
 * Zeigt das Foto-Grid oder den Ladezustand an.
 */
export const RandomPhotoGrid = ({
  photos,
  loading,
  onOpen,
  onHide,
}: RandomPhotoGridProps) => {
  if (loading) {
    return <PhotoLoading />;
  }

  if (photos.length === 0) {
    return (
      <div className="aspect-video rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center text-muted-foreground">
        Konnte keine Fotos laden
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <PhotoItem
          key={index}
          photo={photo}
          index={index}
          onOpen={onOpen}
          onHide={onHide}
        />
      ))}
    </div>
  );
};
