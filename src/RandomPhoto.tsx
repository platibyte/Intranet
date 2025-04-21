
// Refactored: Nutzt RandomPhotoGrid und RandomPhotoRefreshButton
import { useState } from 'react';
import { useRandomPhotos } from "@/hooks/use-random-photos";
import { PhotoInfo } from "@/components/photo/PhotoItem";
import { PhotoModal } from "@/components/photo/PhotoModal";
import { RandomPhotoGrid } from "@/components/photo/RandomPhotoGrid";
import { RandomPhotoRefreshButton } from "@/components/photo/RandomPhotoRefreshButton";

/**
 * Komponente zur Anzeige und Verwaltung zufälliger Fotos
 */
function RandomPhoto() {
  const { photos, loading, handleHidePhoto, fetchRandomPhotos } = useRandomPhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInfo | null>(null);

  const handleOpenPhoto = (photo: PhotoInfo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="space-y-4">
      <RandomPhotoGrid
        photos={photos}
        loading={loading}
        onOpen={handleOpenPhoto}
        onHide={handleHidePhoto}
      />

      <PhotoModal photo={selectedPhoto} onClose={closePhotoModal} />

      <RandomPhotoRefreshButton
        photos={photos}
        onRefresh={fetchRandomPhotos}
      />
    </div>
  );
}

export default RandomPhoto;
