"use client";
import Header from "./componants/Header";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CategoryType } from "./Utils/types";
import Image from "next/image";
import { ReceipeType } from "./Utils/types";

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<String>("");
  const [recipes, setRecipes] = useState<ReceipeType[]>([]);

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

        if (data.data) {
          setSelectedCategory(data.data[0].strCategory);
        }

       
        setCategories(data.data);
      } catch (error: any) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  // -------------------- fetch receipes ---------------------------//

  useEffect(() => {
    if (selectedCategory) {
      const fetchRecipes = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/get-recipes/${selectedCategory}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch recipes");
          }
          const data = await response.json();
           
          setRecipes(data.meals); // Update recipes state with fetched recipes
        } catch (error: any) {
          console.error("Error fetching recipes:", error.message);
        }
      };

      fetchRecipes();
    }
  }, [ selectedCategory]);

console.log(recipes)


// handle selected category
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };


  return (
    <main className="">
      <Header />
      <div className="flex justify-center">
        <div className=" bg-[#fef8f9] w-10/12 h-full py-10 px-20">
          {/* categories */}

          <div className="flex gap-x-5">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.idCategory}>
                  {selectedCategory == category.strCategory ? (
                    <>
                      <Button
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
                        {category.strCategory}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() =>
                          handleSelectCategory(category.strCategory)
                        }
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
                    </>
                  )}
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>

          {/* recipies */}
          <div className="mt-16">
            <div className="grid grid-cols-5 gap-x-28 gap-y-16">
              {/* recipe card */}
              {recipes && recipes.map((receipe)=>{

                return (
                  <>
                    <div className="">
                      <div className="rounded-3xl bg-slate-500 w-full">
                        <Image
                          src={receipe.strMealThumb}
                          alt={receipe.strMeal}
                          width={400} // Set width and height according to your design
                          height={300}
                          objectFit="cover"
                          className=" rounded-2xl"
                        />
                      </div>
                      <div className="flex items-center gap-x-2 pt-2">
                        <span className="text-xs">{selectedCategory}</span>
                        <FavoriteBorderIcon className="text-[#fe5c84]" />
                      </div>
                      <p className="font-semibold text-slate-700">
                        {receipe.strMeal}
                      </p>
                    </div>
                    {/* recipe card */}
                  </>
                );
              })}
              

            
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
