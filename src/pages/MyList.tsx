
import React from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your list</h1>
        <p className="text-netflix-gray mb-6">
          You need to be signed in to access your personal watchlist.
        </p>
        <Button onClick={() => navigate("/login")} className="bg-netflix-red hover:bg-netflix-red/90">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-8 pb-20">
        <h1 className="text-3xl font-bold mb-6">My List</h1>
        
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-xl font-medium mb-2">Your list is empty</h2>
          <p className="text-netflix-gray mb-6 max-w-md">
            Movies and TV shows that you add to your list will appear here.
          </p>
          <Button onClick={() => navigate("/")} className="bg-white text-black hover:bg-white/90">
            Browse Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyList;
