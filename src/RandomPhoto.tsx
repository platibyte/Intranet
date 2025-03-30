
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

/**
 * Interface defining the structure of photo information objects
 */
interface PhotoInfo {
  url: string;
  filename: string;
}

/**
 * Component that displays a grid of randomly fetched photos
 * Allows users to view, refresh and hide specific photos
 */
function RandomPhoto() {
  // State for storing the array of photos
  const [photos, setPhotos] = useState<PhotoInfo[]>([]);
  // State for tracking loading status
  const [loading, setLoading] = useState(true);
  // State for the currently selected photo (for detailed view)
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInfo | null>(null);
  // State for tracking photos that user wants to see less frequently
  const [blacklist, setBlacklist] = useState<Record<string, number>>({});
  // Toast notification hook
  const { toast } = useToast();

  /**
   * Fetches random photos from the API
   * Creates an array of promises to fetch multiple photos in parallel
   */
  const fetchRandomPhotos = async () => {
    setLoading(true);
    try {
      // Create 8 parallel fetch promises
      const fetchPromises = Array(8).fill(0).map(async () => {
        // Add cache buster to prevent browser caching
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`http://192.168.0.17:5000/api/random-photo${cacheBuster}`);
        
        if (response.ok) {
          // Convert response to blob and create object URL
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          
          // Extract filename from content-disposition header if available
          const contentDisposition = response.headers.get('content-disposition');
          let filename = '';
          
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1];
            }
          }
          
          // If no filename found in header, try to extract from URL or generate a default one
          if (!filename) {
            // Try to get filename from the URL path
            const urlPath = new URL(response.url).pathname;
            const urlFilename = urlPath.split('/').pop();
            
            if (urlFilename) {
              filename = urlFilename.split('?')[0]; // Remove query parameters
            } else {
              filename = `photo-${Date.now()}.jpg`; // Generate default filename
            }
          }
          
          return { url, filename };
        }
        return null; // Return null for failed requests
      });

      // Wait for all fetch operations to complete
      const allResults = await Promise.all(fetchPromises);
      // Filter out null results (failed fetches)
      const validResults = allResults.filter(item => item !== null) as PhotoInfo[];
      
      // Apply blacklist filter - reduce probability of showing blacklisted photos
      const filteredResults = validResults.filter(item => {
        const blacklistValue = blacklist[item.url] || 0;
        const randomValue = Math.random();
        return randomValue >= blacklistValue; // Only keep photos that pass the random threshold
      });
      
      // Set maximum 8 photos to display
      setPhotos(filteredResults.slice(0, 8));
    } catch (error) {
      console.error('Fehler:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Replaces a single photo at the specified index
   * Used when a user chooses to hide a specific photo
   * @param indexToReplace Index of the photo to replace
   */
  const replaceSinglePhoto = async (indexToReplace: number) => {
    try {
      let newPhotoInfo = null;
      let attempts = 0;
      
      // Try up to 5 times to get a new unique photo
      while (!newPhotoInfo && attempts < 5) {
        // Add cache buster to prevent browser caching
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`http://192.168.0.17:5000/api/random-photo${cacheBuster}`);
        
        if (response.ok) {
          // Convert response to blob and create object URL
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          
          // Extract filename from content-disposition header if available
          const contentDisposition = response.headers.get('content-disposition');
          let filename = '';
          
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1];
            }
          }
          
          // If no filename found in header, try to extract from URL or generate a default one
          if (!filename) {
            // Try to get filename from the URL path
            const urlPath = new URL(response.url).pathname;
            const urlFilename = urlPath.split('/').pop();
            
            if (urlFilename) {
              filename = urlFilename.split('?')[0]; // Remove query parameters
            } else {
              filename = `photo-${Date.now()}.jpg`; // Generate default filename
            }
          }
          
          // Check if the new photo is unique (not already in the list)
          if (!photos.some(photo => photo.url === url)) {
            newPhotoInfo = { url, filename };
          } else {
            // Release object URL if photo is a duplicate
            URL.revokeObjectURL(url);
          }
        }
        attempts++;
      }
      
      // If a new unique photo was found, update the photos array
      if (newPhotoInfo) {
        // Release the object URL of the photo being replaced
        const oldUrl = photos[indexToReplace]?.url;
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        
        // Create a new array with the replaced photo
        const newPhotos = [...photos];
        newPhotos[indexToReplace] = newPhotoInfo;
        setPhotos(newPhotos);
      }
    } catch (error) {
      console.error('Fehler beim Ersetzen des Fotos:', error);
    }
  };

  // Fetch photos when component mounts
  useEffect(() => {
    fetchRandomPhotos();
    
    // Cleanup function to release object URLs when component unmounts
    return () => {
      photos.forEach(photo => URL.revokeObjectURL(photo.url));
    };
  }, []);

  /**
   * Sets the selected photo when a user clicks on it
   * @param photo The photo object that was clicked
   */
  const handleOpenPhoto = (photo: PhotoInfo) => {
    setSelectedPhoto(photo);
  };

  /**
   * Handles hiding a photo
   * Adds it to the blacklist and replaces it with a new one
   * @param photo The photo to hide
   * @param index The index of the photo in the array
   */
  const handleHidePhoto = (photo: PhotoInfo, index: number) => {
    // Add to blacklist with 75% chance of being filtered out
    setBlacklist(prev => ({
      ...prev,
      [photo.url]: 0.75
    }));
    
    // Replace the hidden photo with a new one
    replaceSinglePhoto(index);
    
    // Show a toast notification
    toast({
      title: "Foto ausgeblendet",
      description: "Dieses Foto wird seltener angezeigt.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      {loading ? (
        // Loading state - shows skeleton placeholders
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-video">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-secondary/50 rounded-lg flex items-center justify-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ))}
        </div>
      ) : photos.length > 0 ? (
        // Photos loaded - display the grid
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="relative aspect-video rounded-lg overflow-hidden bg-secondary/50 group"
            >
              {/* Photo image - clickable to open the detail view */}
              <img 
                src={photo.url} 
                alt={`Zufälliges Foto ${index + 1}`} 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleOpenPhoto(photo)}
              />
              {/* Photo information overlay - appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-medium text-sm">{photo.filename}</h3>
              </div>
              {/* Hide button - appears on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the photo click
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
        // No photos - display error message
        <div className="aspect-video rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center text-muted-foreground">
          Konnte keine Fotos laden
        </div>
      )}
      
      {/* Refresh button */}
      <div className="flex justify-end">
        <Button 
          onClick={() => {
            // Clean up old object URLs before fetching new photos
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
    </div>
  );
}

export default RandomPhoto;
