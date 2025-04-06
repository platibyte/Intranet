
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Component that displays a skeleton loading state for photos
 */
export const PhotoLoading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-video">
      {Array(4).fill(0).map((_, index) => (
        <Skeleton 
          key={index} 
          className="aspect-video w-full h-full flex items-center justify-center"
        >
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
        </Skeleton>
      ))}
    </div>
  );
};
