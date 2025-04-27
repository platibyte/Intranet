
import { useState, useEffect } from 'react';
import { PhotoInfo } from '@/components/photo/PhotoItem';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = 'http://192.168.0.17:5000';
// Placeholder images to use when the server is not available
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558293842-c0fd3db86157?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&auto=format&fit=crop',
];

export function useRandomPhotos() {
  const [photos, setPhotos] = useState<PhotoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [blacklist, setBlacklist] = useState<Record<string, number>>({});
  const [serverAvailable, setServerAvailable] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Check if server is available
  const checkServerAvailability = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      setServerAvailable(response.ok);
      return response.ok;
    } catch (error) {
      console.log("Server nicht erreichbar:", error);
      setServerAvailable(false);
      return false;
    }
  };
  
  // Use placeholder images when server is not available
  const useRandomPlaceholderPhotos = () => {
    // Select 4 random placeholder images
    const shuffled = [...PLACEHOLDER_IMAGES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4).map((url, index) => ({
      url,
      filename: `Platzhalter ${index + 1}`
    }));
    setPhotos(selected);
    setLoading(false);
  };

  const fetchRandomPhotos = async () => {
    setLoading(true);
    try {
      // Check server availability first
      const isServerAvailable = await checkServerAvailability();
      
      if (!isServerAvailable) {
        useRandomPlaceholderPhotos();
        return;
      }
      
      const fetchPromises = Array(4).fill(0).map(async () => {
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`${API_BASE_URL}/api/random-photo${cacheBuster}`);
        
        if (response.ok) {
          const data = await response.json();
          return { 
            url: `${API_BASE_URL}/photos/${encodeURIComponent(data.filename)}`,
            filename: data.filename
          };
        }
        return null;
      });

      const allResults = await Promise.all(fetchPromises);
      const validResults = allResults.filter(item => item !== null) as PhotoInfo[];
      
      if (validResults.length === 0) {
        // If we couldn't get any photos from the server, use placeholders
        useRandomPlaceholderPhotos();
        return;
      }
      
      const filteredResults = validResults.filter(item => {
        const blacklistValue = blacklist[item.url] || 0;
        const randomValue = Math.random();
        return randomValue >= blacklistValue;
      });
      
      setPhotos(filteredResults.slice(0, 8));
    } catch (error) {
      console.error('Fehler:', error);
      // On error, use placeholder images
      useRandomPlaceholderPhotos();
    } finally {
      setLoading(false);
    }
  };

  const replaceSinglePhoto = async (indexToReplace: number) => {
    try {
      // If server is not available, replace with a random placeholder
      if (serverAvailable === false) {
        const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
        const newPhotos = [...photos];
        newPhotos[indexToReplace] = {
          url: PLACEHOLDER_IMAGES[randomIndex],
          filename: `Platzhalter ${randomIndex + 1}`
        };
        setPhotos(newPhotos);
        return;
      }
      
      let newPhotoInfo = null;
      let attempts = 0;
      
      while (!newPhotoInfo && attempts < 5) {
        const cacheBuster = `?nocache=${Date.now()}-${Math.random()}`;
        const response = await fetch(`${API_BASE_URL}/api/random-photo${cacheBuster}`);
        
        if (response.ok) {
          const data = await response.json();
          const url = `${API_BASE_URL}/photos/${encodeURIComponent(data.filename)}`;
          
          if (!photos.some(photo => photo.url === url)) {
            newPhotoInfo = { url, filename: data.filename };
          }
        }
        attempts++;
      }
      
      if (newPhotoInfo) {
        const oldUrl = photos[indexToReplace]?.url;
        if (oldUrl && oldUrl.startsWith('blob:')) {
          URL.revokeObjectURL(oldUrl);
        }
        
        const newPhotos = [...photos];
        newPhotos[indexToReplace] = newPhotoInfo;
        setPhotos(newPhotos);
      } else {
        // If couldn't get a new photo, use a placeholder
        const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
        const newPhotos = [...photos];
        newPhotos[indexToReplace] = {
          url: PLACEHOLDER_IMAGES[randomIndex],
          filename: `Platzhalter ${randomIndex + 1}`
        };
        setPhotos(newPhotos);
      }
    } catch (error) {
      console.error('Fehler beim Ersetzen des Fotos:', error);
      // On error, replace with a placeholder
      const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
      const newPhotos = [...photos];
      newPhotos[indexToReplace] = {
        url: PLACEHOLDER_IMAGES[randomIndex],
        filename: `Platzhalter ${randomIndex + 1}`
      };
      setPhotos(newPhotos);
    }
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

  useEffect(() => {
    fetchRandomPhotos();
    
    return () => {
      photos.forEach(photo => {
        if (photo.url.startsWith('blob:')) {
          URL.revokeObjectURL(photo.url);
        }
      });
    };
  }, []);

  return {
    photos,
    loading,
    handleHidePhoto,
    fetchRandomPhotos,
    serverAvailable
  };
}
