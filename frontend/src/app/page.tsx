"use client";
import Header from "./componants/Header";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Home() {
  const [categories, setCategories] = useState([]);

 // -------- fetch categories --------------------- //
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/get-categories`
        );
       
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        console.log(data)
        setCategories(data.data);
      } catch (error: any) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  console.log(categories);

  
  return (
    <main className="">
      <Header />
      <div className="flex justify-center">
        <div className=" bg-[#fef8f9] w-10/12 h-lvh py-10 px-20">
          {/* categories */}

          <div className="flex gap-x-5">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.idCategory}>
                  <Button
                    className="px-10"
                    variant="outlined"
                    sx={{
                      padding: "12px 24px", 
                      borderColor: "#fe5c84", 
                      textTransform: "none",
                      color: "#fe5c84", 
                      fontWeight: "bold", 
                      borderRadius: "25px", 
                      "&:hover": {
                        backgroundColor: "#fe5c84", 
                        color: "#fff", 
                      },
                    }}
                  >
                    {category.strCategory}
                  </Button>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}

            {/* <Button
              className=" shadow-none px-10"
              variant="contained"
              sx={{
                padding: "12px 24px",
                borderColor: "#fe5c84",
                color: "white",
                fontWeight: "bold",
                borderRadius: "25px",
                textTransform: "none",
                backgroundColor: "#fe5c84",
                "&:hover": {
                  backgroundColor: "#fe5c84",
                  color: "#fff",
                },
              }}
            >
              Beef
            </Button> */}
          </div>

          {/* recipies */}
          <div className="mt-16">
            <div className="grid grid-cols-5 gap-x-28 gap-y-16">
              {/* recipe card */}
              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>
              {/* recipe card */}

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              <div className="">
                <div className="rounded-3xl bg-slate-500 py-20 w-full">
                  image
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <span className="text-xs">Soups</span>
                  <FavoriteBorderIcon className="text-[#fe5c84]" />
                </div>
                <p className="font-semibold text-slate-700">
                  Chicken Noodles Soup
                </p>
              </div>

              {/* Repeat the above div block for remaining cards */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
