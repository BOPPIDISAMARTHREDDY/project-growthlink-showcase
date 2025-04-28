
import React from "react";
import { Play, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie } from "@/services/tmdbApi";

interface HeroSectionProps {
  movie: Movie;
  onInfoClick: (movie: Movie) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie, onInfoClick }) => {
  const backdropPath = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const title = movie.title || movie.name || "Unknown Title";

  return (
    <div className="relative aspect-[16/9] md:aspect-[2.2/1] w-full overflow-hidden">
      {backdropPath ? (
        <img
          src={backdropPath}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-netflix-dark"></div>
      )}
      
      <div className="hero-overlay"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 pb-24 md:w-1/2">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-base md:text-lg mb-6 line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex space-x-3">
          <Button className="bg-white text-black hover:bg-white/90 px-6 gap-2">
            <Play className="h-5 w-5 fill-current" />
            Play
          </Button>
          <Button 
            variant="secondary" 
            className="bg-white/30 hover:bg-white/20 text-white px-6 gap-2"
            onClick={() => onInfoClick(movie)}
          >
            <InfoIcon className="h-5 w-5" />
            More Info
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-netflix-black to-transparent"></div>
    </div>
  );
};

export default HeroSection;
