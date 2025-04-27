
import { useState, useEffect } from 'react';
import { PhotoInfo } from '@/components/photo/PhotoItem';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = 'http://192.168.0.17:5000';

export function useRandomPhotos() {
  const [photos, setPhotos] = useState<PhotoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [blacklist, setBlacklist] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const fetchRandomPhotos = async () => {
    setLoading(true);
    try {
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
