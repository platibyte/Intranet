
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

// Beispiel-Bilder (später mit eigenen Fotos ersetzen)
const samplePhotos = [
  {
    id: 1,
    title: "Wohnzimmer",
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop",
    description: "Unser gemütliches Wohnzimmer"
  },
  {
    id: 2,
    title: "Garten",
    src: "https://images.unsplash.com/photo-1558293842-c0fd3db86157?w=800&auto=format&fit=crop",
    description: "Der Garten im Frühling"
  },
  {
    id: 3,
    title: "Küche",
    src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop",
    description: "Unsere moderne Küche"
  },
  {
    id: 4,
    title: "Arbeitszimmer",
    src: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop",
    description: "Das Heimnetzwerk-Zentrum"
  },
  {
    id: 5,
    title: "Terrasse",
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop",
    description: "Unsere Terrasse im Sommer"
  },
  {
    id: 6,
    title: "Einfahrt",
    src: "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&auto=format&fit=crop",
    description: "Die Einfahrt im Winter"
  }
];

interface Photo {
  id: number;
  title: string;
  src: string;
  description: string;
}

interface PhotoGalleryProps {
  limit?: number;
  compact?: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ limit, compact = false }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  
  // Load photos (in a real app this would fetch from an API)
  useEffect(() => {
    const displayPhotos = limit ? samplePhotos.slice(0, limit) : samplePhotos;
    setPhotos(displayPhotos);
  }, [limit]);
  
  // Handle image load
  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => [...prev, id]);
  };

  // Open photo modal
  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  // Close photo modal
  const closePhotoModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="w-full">
      <div className={cn(
        "grid gap-4",
        compact 
          ? "grid-cols-2 md:grid-cols-3" 
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}>
        {photos.map((photo) => (
          <div 
            key={photo.id}
            className={cn(
              "glass-panel rounded-xl overflow-hidden hover-scale cursor-pointer",
              compact ? "aspect-square" : "aspect-[4/3]"
            )}
            onClick={() => openPhotoModal(photo)}
          >
            <div className="relative w-full h-full">
              <img
                src={photo.src}
                alt={photo.title}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500 img-loading",
                  loadedImages.includes(photo.id) && "img-loaded"
                )}
                onLoad={() => handleImageLoad(photo.id)}
              />
              {!compact && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-medium text-lg">{photo.title}</h3>
                  <p className="text-white/80 text-sm">{photo.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in" 
          onClick={closePhotoModal}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] animate-scale-in" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.title} 
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="glass-panel rounded-lg p-4 mt-2">
              <h3 className="text-xl font-medium">{selectedPhoto.title}</h3>
              <p className="text-muted-foreground">{selectedPhoto.description}</p>
            </div>
            <button 
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              onClick={closePhotoModal}
              aria-label="Schließen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
