
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { PhotoInfo } from "./PhotoItem";

interface RandomPhotoRefreshButtonProps {
  photos: PhotoInfo[];
  onRefresh: () => void;
}

/**
 * Button zum Neuladen der Bilder
 */
export const RandomPhotoRefreshButton = ({
  photos,
  onRefresh,
}: RandomPhotoRefreshButtonProps) => (
  <div className="flex justify-end">
    <Button
      onClick={() => {
        photos.forEach(photo => URL.revokeObjectURL(photo.url));
        onRefresh();
      }}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <RefreshCw size={14} />
      Neue Fotos
    </Button>
  </div>
);
