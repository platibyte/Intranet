
import { X } from 'lucide-react';

/**
 * Interface for photo information
 */
export interface PhotoInfo {
  url: string;
  filename: string;
}

interface PhotoItemProps {
  photo: PhotoInfo;
  index: number;
  onOpen: (photo: PhotoInfo) => void;
  onHide: (photo: PhotoInfo, index: number) => void;
}

/**
 * Component that displays a single photo item in the grid
 */
export const PhotoItem = ({ photo, index, onOpen, onHide }: PhotoItemProps) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/50 group">
      {/* Photo image - clickable to open the detail view */}
      <img 
        src={photo.url} 
        alt={`Zufälliges Foto ${index + 1}`} 
        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => onOpen(photo)}
      />
      {/* Photo information overlay - appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-medium text-sm">{photo.filename}</h3>
      </div>
      {/* Hide button - appears on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the photo click
          onHide(photo, index);
        }}
        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Nicht mehr anzeigen"
      >
        <X size={16} />
      </button>
    </div>
  );
};
