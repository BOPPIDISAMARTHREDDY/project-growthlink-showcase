
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";
import { Movie, fetchMovies } from "@/services/tmdbApi";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieRowProps {
  title: string;
  category: string;
  onMovieClick: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, category, onMovieClick }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        // Make the string key type-safe by casting it
        const data = await fetchMovies(category as any);
        setMovies(data);
      } catch (error) {
        console.error(`Error loading ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [category]);

  const scroll = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = direction === "left" 
      ? -slider.clientWidth * 0.75 
      : slider.clientWidth * 0.75;
    
    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full bg-black/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>

        <div className="movie-slider px-4" ref={sliderRef}>
          {loading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={`skeleton-${i}`} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 px-2">
                    <Skeleton className="aspect-[2/3] w-full" />
                  </div>
                ))
            : movies.map((movie) => (
                <div key={movie.id} className="px-2">
                  <MovieCard movie={movie} onClick={onMovieClick} />
                </div>
              ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full bg-black/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default MovieRow;
