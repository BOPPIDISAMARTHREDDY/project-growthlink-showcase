
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, ChevronDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header
      className={`fixed w-full z-50 flex items-center transition-all duration-500 px-4 sm:px-6 py-2 lg:px-8 ${
        isScrolled || searchActive
          ? "bg-netflix-black"
          : "bg-gradient-to-b from-netflix-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center flex-1">
        <Link to="/" className="mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 276.742"
            className="h-8 w-24"
          >
            <path
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 74.59 30.27-74.59h47.295z"
              fill="#e50914"
            />
          </svg>
        </Link>

        <nav className="hidden md:flex space-x-4 text-sm lg:text-base">
          <Link to="/" className="text-white hover:text-white/70">
            Home
          </Link>
          <Link to="/tv-shows" className="text-white/70 hover:text-white">
            TV Shows
          </Link>
          <Link to="/movies" className="text-white/70 hover:text-white">
            Movies
          </Link>
          <Link to="/new" className="text-white/70 hover:text-white">
            New & Popular
          </Link>
          <Link to="/my-list" className="text-white/70 hover:text-white">
            My List
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {!searchActive ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchActive(true)}
            className="text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
        ) : (
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="search"
              placeholder="Titles, people, genres"
              className="h-9 w-64 bg-netflix-black/90 border-white/30 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              onBlur={() => {
                if (!searchQuery) setSearchActive(false);
              }}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        )}

        <Button variant="ghost" size="icon" className="text-white hidden md:flex">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 h-8 w-8 rounded-sm">
              <Avatar className="h-8 w-8 rounded-sm">
                <AvatarFallback className="bg-netflix-red text-white rounded-sm">
                  {user ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-white/70 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-netflix-black/95 border-white/10 text-white">
            {user ? (
              <>
                <DropdownMenuItem className="hover:bg-white/10">
                  <span className="text-white/90">Profile: {user.name}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">
                  <span className="text-white/90">Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="hover:bg-white/10">
                  <span className="text-white/90">Sign Out</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>
                  <Link to="/login" className="w-full text-white/90">
                    Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/register" className="w-full text-white/90">
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
