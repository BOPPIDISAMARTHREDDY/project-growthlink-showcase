
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MovieModal from "@/components/MovieModal";
import { Movie, searchMovies } from "@/services/tmdbApi";
import { Skeleton } from "@/components/ui/skeleton";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        try {
          const results = await searchMovies(query);
          setMovies(results);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [query]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar onSearch={handleSearch} />
      
      <div className="pt-24 px-4 md:px-8 pb-20">
        <h1 className="text-2xl md:text-3xl font-medium mb-6">
          Search Results for: <span className="font-bold">{query}</span>
        </h1>
        
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] w-full rounded-md" />
              ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={movie.title || movie.name || "Movie"}
                  className="w-full aspect-[2/3] object-cover rounded-md"
                  loading="lazy"
                />
                <div className="movie-card-overlay flex flex-col justify-end p-3">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {movie.title || movie.name || "Unknown Title"}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-xl font-medium mb-2">No results found</h2>
            <p className="text-netflix-gray mb-6 max-w-md">
              We couldn't find any movies or TV shows matching your search.
              Try different keywords or check for typos.
            </p>
          </div>
        )}
      </div>
      
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Search;
