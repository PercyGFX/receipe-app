"use client";
import Header from "../componants/Header";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { FavouriteType } from "../Utils/types";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function Home() {
  const [favourites, setFavourites] = useState<FavouriteType[]>([]);
  const [refreshFavorites, setRefreshFavorites] = useState<boolean>(false);

  // -------- fetch favourites --------------------- //
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = Cookies.get("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/get-favourites/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setFavourites(data);
      } catch (error: any) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, [refreshFavorites]);

  // ------------- remove favourites ------------------------//

  const handleRemoveFavourites = async (_id: string) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/remove-favourite/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Failed to remove");
      } else {
        setRefreshFavorites(!refreshFavorites);
        toast.success("Removed from favourites ");
      }

      const data = await response.json();
      console.log(data.message); // Log success message
    } catch (error: any) {
      console.error("Error adding recipe to favourites:", error.message);
    }
  };

  return (
    <main className="">
      <Header />
      <Toaster />
      <div className="flex justify-center">
        <div className=" bg-[#fef8f9] w-10/12 h-lvh py-10 px-20">
          {/* recipies */}
          <div className="mt-16">
            <div className="grid lg:grid-cols-5 gap-x-28 gap-y-16">
              {/* recipe card */}
              {favourites.length > 0 ? (
                favourites.map((favourite, index) => (
                  <div key={favourite._id} className="">
                    <div className="rounded-3xl  w-full">
                      <Image
                        src={favourite.thumbnail}
                        alt={favourite.title}
                        width={400} // Set width and height according to your design
                        height={300}
                        objectFit="cover"
                        className="rounded-2xl "
                      />
                    </div>
                    <div className="flex items-center gap-x-2 pt-2">
                      <span className="text-xs">{favourite.category}</span>
                      <FavoriteIcon
                        className="text-[#fe5c84] hover:cursor-pointer"
                        onClick={() => handleRemoveFavourites(favourite._id)}
                      />
                    </div>
                    <p className="font-semibold text-slate-700 ">
                      {favourite.title}
                    </p>
                  </div>
                ))
              ) : (
                <div className="empty-message"></div>
              )}
              {/* recipe card */}

              {/* Repeat the above div block for remaining cards */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
