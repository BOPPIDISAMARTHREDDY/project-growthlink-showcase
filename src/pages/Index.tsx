
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import MovieModal from "@/components/MovieModal";
import { Movie, fetchMovies } from "@/services/tmdbApi";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovies("trending");
        setTrendingMovies(movies);
        
        // Set a random trending movie as the featured one
        if (movies.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, movies.length));
          setFeaturedMovie(movies[randomIndex]);
        }
      } catch (error) {
        console.error("Error loading trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar onSearch={handleSearch} />
      
      {loading ? (
        <div className="pt-16">
          <Skeleton className="w-full aspect-[16/9] md:aspect-[2.2/1]" />
        </div>
      ) : featuredMovie ? (
        <HeroSection movie={featuredMovie} onInfoClick={handleMovieClick} />
      ) : null}
      
      <div className="pb-20 -mt-6 relative z-10">
        <MovieRow title="Trending Now" category="trending" onMovieClick={handleMovieClick} />
        <MovieRow title="Top Rated" category="topRated" onMovieClick={handleMovieClick} />
        <MovieRow title="Action Movies" category="actionMovies" onMovieClick={handleMovieClick} />
        <MovieRow title="Comedy Movies" category="comedyMovies" onMovieClick={handleMovieClick} />
        <MovieRow title="Horror Movies" category="horrorMovies" onMovieClick={handleMovieClick} />
        <MovieRow title="Romance Movies" category="romanceMovies" onMovieClick={handleMovieClick} />
        <MovieRow title="Documentaries" category="documentaries" onMovieClick={handleMovieClick} />
      </div>
      
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
