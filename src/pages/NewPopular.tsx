
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MovieRow from "@/components/MovieRow";
import MovieModal from "@/components/MovieModal";
import { Movie } from "@/services/tmdbApi";

const NewPopular = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white pb-20">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-6">New & Popular</h1>
        
        <MovieRow
          title="Trending This Week"
          category="trending"
          onMovieClick={handleMovieClick}
        />
        
        <MovieRow
          title="Top Rated"
          category="topRated"
          onMovieClick={handleMovieClick}
        />
        
        <MovieRow
          title="Popular TV Shows"
          category="tvPopular"
          onMovieClick={handleMovieClick}
        />
      </div>
      
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default NewPopular;
