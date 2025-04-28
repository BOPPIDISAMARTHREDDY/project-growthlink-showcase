
import React from "react";
import { XIcon, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Movie } from "@/services/tmdbApi";
import { Badge } from "@/components/ui/badge";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  if (!movie) return null;

  const backdropPath = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg";

  const title = movie.title || movie.name || "Unknown";
  const releaseDate = movie.release_date || movie.first_air_date || "Unknown";
  const year = new Date(releaseDate).getFullYear();
  
  // Format the vote average to display as a percentage
  const rating = Math.round(movie.vote_average * 10);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-netflix-dark text-white border-netflix-gray/30">
        <div className="relative">
          {backdropPath ? (
            <div className="aspect-video w-full">
              <img
                src={backdropPath}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent"></div>
            </div>
          ) : (
            <div className="aspect-video bg-netflix-dark"></div>
          )}
          
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/60 text-white hover:bg-black/80"
              onClick={onClose}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{title}</h2>
            <div className="flex space-x-4 mb-4">
              <Button className="bg-white text-black hover:bg-white/90 gap-2">
                <PlayIcon className="h-4 w-4 fill-current" />
                Play
              </Button>
              <Button variant="outline" className="border-white/30 hover:bg-white/10">
                + My List
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="text-green-400 border-green-400/30">
              {rating}% Match
            </Badge>
            <span className="text-netflix-gray">{year}</span>
            <span className="border border-netflix-gray/30 px-2 text-xs">HD</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <DialogDescription className="text-white/80 mb-4">
                {movie.overview || "No overview available."}
              </DialogDescription>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-netflix-gray">Media Type: </span>
                <span>{movie.media_type || "Movie"}</span>
              </div>
              <div>
                <span className="text-netflix-gray">Release Date: </span>
                <span>{releaseDate}</span>
              </div>
              <div>
                <span className="text-netflix-gray">Rating: </span>
                <span>{movie.vote_average} / 10</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModal;
