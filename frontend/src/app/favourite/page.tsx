"use client";
import Header from "../componants/Header";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { FavouriteType } from "../Utils/types";
import Image from "next/image";

export default function Home() {
  const [favourites, setFavourites] = useState<FavouriteType[]>([]);

  // -------- fetch favourites --------------------- //
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = "663f3e124ab40631f55c6d58";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/get-favourites/${userId}`
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
  }, []);

  return (
    <main className="">
      <Header />
      <div className="flex justify-center">
        <div className=" bg-[#fef8f9] w-10/12 h-lvh py-10 px-20">
          {/* recipies */}
          <div className="mt-16">
            <div className="grid grid-cols-5 gap-x-28 gap-y-16">
              {/* recipe card */}
              {favourites.length > 0 ? (
                favourites.map((favourite, index) => (
                  <div key={favourite._id} className="">
                    <div className="rounded-3xl bg-slate-500 w-full">
                      <Image
                        src={favourite.thumbnail}
                        alt={favourite.title}
                        width={400} // Set width and height according to your design
                        height={300}
                        objectFit="cover"
                        className="rounded-2xl hover:cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-x-2 pt-2">
                      <span className="text-xs">{favourite.category}</span>
                      <FavoriteIcon
                        className="text-[#fe5c84] hover:cursor-pointer"
                        // onClick={() =>
                        //   handleAddFavourite(
                        //     recipe.idMeal,
                        //     recipe.strMealThumb,
                        //     recipe.idMeal
                        //   )
                        // }
                      />
                    </div>
                    <p className="font-semibold text-slate-700 hover:cursor-pointer">
                      {favourite.title}
                    </p>
                  </div>
                ))
              ) : (
                <div className="empty-message">No recipes available</div>
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
