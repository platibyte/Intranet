
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Photo {
  id: number;
  src: string;
  title: string;
  filename: string;
  description?: string;
}

interface PhotoGalleryProps {
  limit?: number;
  compact?: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  limit, 
  compact = false,
  currentPage = 1,
  onPageChange
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(currentPage);
  const photosPerPage = limit || 8;
  const { toast } = useToast();
  
  const fetchPhotos = async () => {
    setLoading(true);
    try {
      // If limit is set, use sample photos for compact display (like on homepage)
      if (limit && limit < 10) {
        const samplePhotos = [
          {
            id: 1,
            title: "Wohnzimmer",
            filename: "wohnzimmer.jpg",
            src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop",
            description: "Unser gemütliches Wohnzimmer"
          },
          {
            id: 2,
            title: "Garten",
            filename: "garten.jpg",
            src: "https://images.unsplash.com/photo-1558293842-c0fd3db86157?w=800&auto=format&fit=crop",
            description: "Der Garten im Frühling"
          },
          {
            id: 3,
            title: "Küche",
            filename: "kueche.jpg",
            src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop",
            description: "Unsere moderne Küche"
          },
          {
            id: 4,
            title: "Arbeitszimmer",
            filename: "arbeitszimmer.jpg",
            src: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop",
            description: "Das Heimnetzwerk-Zentrum"
          },
          {
            id: 5,
            title: "Terrasse",
            filename: "terrasse.jpg",
            src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop",
            description: "Unsere Terrasse im Sommer"
          },
          {
            id: 6,
            title: "Einfahrt",
            filename: "einfahrt.jpg",
            src: "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&auto=format&fit=crop",
            description: "Die Einfahrt im Winter"
          }
        ];
        setPhotos(samplePhotos.slice(0, limit));
        setTotalPages(1);
      } else {
        // Fetch real photos from backend with pagination
        const response = await fetch(`http://192.168.0.17:5000/api/photos?page=${page}&limit=${photosPerPage}`);
        
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Fotos');
        }
        
        const data = await response.json();
        
        // Transform the data to match our Photo interface
        const transformedPhotos: Photo[] = data.photos.map((photo: any, index: number) => ({
          id: index + 1 + (page - 1) * photosPerPage,
          src: `http://192.168.0.17:5000${photo.url}`,
          title: photo.title || photo.filename,
          filename: photo.filename,
          description: photo.description || ''
        }));
        
        setPhotos(transformedPhotos);
        setTotalPages(Math.ceil(data.total / photosPerPage));
      }
    } catch (error) {
      console.error('Fehler beim Laden der Fotos:', error);
      toast({
        title: "Fehler",
        description: "Die Fotos konnten nicht geladen werden.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPhotos();
  }, [page, limit]);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  
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

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5; // Maximum number of page numbers to show
    
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    // Show first page if not visible
    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    // Show page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={page === i} onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className={cn(
          "grid gap-4",
          compact ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        )}>
          {Array(limit || 30).fill(0).map((_, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-secondary/50 rounded-lg flex items-center justify-center",
                compact ? "aspect-square" : "aspect-[4/3]"
              )}
            >
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ))}
        </div>
      ) : photos.length > 0 ? (
        <>
          <div className={cn(
            "grid gap-4",
            compact 
              ? "grid-cols-2 md:grid-cols-3" 
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
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
                      {photo.description && (
                        <p className="text-white/80 text-sm">{photo.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {!compact && totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(page - 1)}
                    className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {renderPaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(page + 1)}
                    className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="p-8 text-center bg-secondary/30 rounded-xl">
          <h3 className="text-xl font-medium mb-2">Keine Fotos gefunden</h3>
          <p className="text-muted-foreground">
            Es wurden keine Fotos gefunden. Versuche es später erneut oder lade neue Fotos hoch.
          </p>
        </div>
      )}

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
              <h3 className="text-xl font-medium">{selectedPhoto.filename}</h3>
              {selectedPhoto.description && (
                <p className="text-muted-foreground">{selectedPhoto.description}</p>
              )}
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
