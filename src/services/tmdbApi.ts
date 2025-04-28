
import { toast } from "sonner";

// A temporary API key - in a real app, this would be stored in environment variables
const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type?: string;
  genre_ids: number[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const categories = {
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  actionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  tvPopular: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
};

export const fetchMovies = async (category: keyof typeof categories): Promise<Movie[]> => {
  try {
    const response = await fetch(categories[category]);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: MovieResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    toast.error(`Failed to load ${category}. Please try again.`);
    return [];
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&include_adult=false`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: MovieResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    toast.error("Search failed. Please try again.");
    return [];
  }
};

export const getMovieDetails = async (id: number, mediaType: string): Promise<Movie | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    toast.error("Failed to load movie details. Please try again.");
    return null;
  }
};

export default categories;
