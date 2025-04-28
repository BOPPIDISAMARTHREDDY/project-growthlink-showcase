
import React from "react";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie } from "@/services/tmdbApi";
import { toast } from "sonner";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const imagePath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg";

  const title = movie.title || movie.name || "Unknown Title";

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`"${title}" added to My List`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Playing "${title}" trailer`);
  };

  return (
    <div
      className="movie-card w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 cursor-pointer snap-start"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] relative">
        <img
          src={imagePath}
          alt={title}
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
        <div className="movie-card-overlay flex flex-col justify-end p-3">
          <h3 className="text-sm font-medium line-clamp-1">{title}</h3>
          <div className="flex space-x-2 mt-2">
            <Button 
              size="icon"
              variant="secondary" 
              className="h-7 w-7 rounded-full bg-white text-black hover:bg-white/90"
              onClick={handlePlayClick}
            >
              <Play className="h-3 w-3 fill-current" />
            </Button>
            <Button 
              size="icon"
              variant="outline" 
              className="h-7 w-7 rounded-full border-white/40 text-white hover:bg-white/20"
              onClick={handleAddToList}
            >
              <span className="text-sm font-bold">+</span>
            </Button>
            <Button 
              size="icon"
              variant="outline" 
              className="h-7 w-7 rounded-full border-white/40 text-white hover:bg-white/20 ml-auto"
            >
              <Info className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
