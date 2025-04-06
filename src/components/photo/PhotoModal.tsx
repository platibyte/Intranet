
import { X } from 'lucide-react';
import { PhotoInfo } from './PhotoItem';

interface PhotoModalProps {
  photo: PhotoInfo | null;
  onClose: () => void;
}

/**
 * Component for displaying a photo in a modal/lightbox view
 */
export const PhotoModal = ({ photo, onClose }: PhotoModalProps) => {
  if (!photo) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] animate-scale-in" onClick={e => e.stopPropagation()}>
        <img 
          src={photo.url} 
          alt={photo.filename} 
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
        <div className="glass-panel rounded-lg p-4 mt-2">
          <h3 className="text-xl font-medium">{photo.filename}</h3>
        </div>
        <button 
          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          onClick={onClose}
          aria-label="Schließen"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
