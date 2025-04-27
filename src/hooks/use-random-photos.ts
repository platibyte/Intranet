import { useState, useEffect } from 'react';
import { PhotoInfo } from '@/components/photo/PhotoItem';
import { useToast } from '@/hooks/use-toast';

/**
 * Custom hook to fetch and manage random photos
 */
export function useRandomPhotos() {
  // State for storing the array of photos
  const [photos, setPhotos] = useState<PhotoInfo[]>([]);
  // State for tracking loading status
  const [loading, setLoading] = useState(true);
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
      // Create 4 parallel fetch promises
      const fetchPromises = Array(4).fill(0).map(async () => {
        // Add cache buster to prevent browser caching
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`http://192.168.0.17:5000/api/random-photo${cacheBuster}`);
        
        if (response.ok) {
          const data = await response.json();
          const filename = data.filename;
          const url = `http://192.168.0.17:5000/photos/${encodeURIComponent(filename)}`;
          
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
          const data = await response.json();
          const filename = data.filename;
          const url = `http://192.168.0.17:5000/photos/${encodeURIComponent(filename)}`;
          
          // Check if the new photo is unique (not already in the list)
          if (!photos.some(photo => photo.url === url)) {
            newPhotoInfo = { url, filename };
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

  // Fetch photos when component mounts
  useEffect(() => {
    fetchRandomPhotos();
    
    // Cleanup function to release object URLs when component unmounts
    return () => {
      photos.forEach(photo => URL.revokeObjectURL(photo.url));
    };
  }, []);

  return {
    photos,
    loading,
    handleHidePhoto,
    fetchRandomPhotos,
  };
}
