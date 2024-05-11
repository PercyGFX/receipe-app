"use client";
import Header from "./componants/Header";
import { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CategoryType } from "./Utils/types";
import Image from "next/image";
import { ReceipeType } from "./Utils/types";
import { SingleReceipeType } from "./Utils/types";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<String>("");
  const [recipes, setRecipes] = useState<ReceipeType[]>([]);
  const [singleReceipe, setSingleReceipe] = useState<SingleReceipeType>({
    strMeal: "",
    strInstructions: "",
    strYoutube: "",
    strMealThumb: "",
  });

  const [open, setOpen] = useState(false);

  // open single listing
  const handleOpen = (id: string) => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/get-single-recipes/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();

        setSingleReceipe(data.meals[0]); // Update recipes state with fetched recipes
      } catch (error: any) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchRecipes();

    setOpen(true);
  };

  // modal close
  const handleClose = () => {
    setOpen(false);
    setSingleReceipe({
      strMeal: "",
      strInstructions: "",
      strYoutube: "",
      strMealThumb: "",
    });
  };

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
  }, [selectedCategory]);

  // handle selected category
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };


  // add to favourites ///////
  const handleAddFavourite = async (id: string)=>{

 try {
   const userId = "663f3e124ab40631f55c6d58"; // Hardcoded for now

   const response = await fetch(
     `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/add-favourites`,
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ userId, receipeId:id }),
     }
   );

   if (!response.ok) {
     const errorData = await response.json();
     
     toast.error(errorData?.error);
   } else {

    toast.success("Added to favourites");
   }


   const data = await response.json();
   console.log(data.message); // Log success message
 } catch (error : any) {
   console.error("Error adding recipe to favourites:", error.message);
 }
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <main className="">
      <Header />
      <div className="flex justify-center">
        <Toaster />
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            {singleReceipe.strInstructions ? (
              <>
                {singleReceipe.strMealThumb && (
                  <Image
                    src={singleReceipe.strMealThumb}
                    alt={singleReceipe.strMeal}
                    width={100}
                    height={300}
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                )}
                {singleReceipe.strMeal && (
                  <p className="font-semibold my-1">{singleReceipe.strMeal}</p>
                )}
                <p>{singleReceipe.strInstructions}</p>
                {singleReceipe.strYoutube && (
                  <p className="text-sky-700">
                    <a
                      href={singleReceipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Youtube Tutorial
                    </a>
                  </p>
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Box>
        </Modal>
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
              {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                  <div key={index} className="">
                    <div className="rounded-3xl bg-slate-500 w-full">
                      <Image
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        width={400} // Set width and height according to your design
                        height={300}
                        objectFit="cover"
                        className="rounded-2xl hover:cursor-pointer"
                        onClick={() => handleOpen(recipe.idMeal)}
                      />
                    </div>
                    <div className="flex items-center gap-x-2 pt-2">
                      <span className="text-xs">{selectedCategory}</span>
                      <FavoriteBorderIcon
                        className="text-[#fe5c84] hover:cursor-pointer"
                        onClick={() => handleAddFavourite(recipe.idMeal)}
                      />
                    </div>
                    <p
                      className="font-semibold text-slate-700 hover:cursor-pointer"
                      onClick={() => handleOpen(recipe.idMeal)}
                    >
                      {recipe.strMeal}
                    </p>
                  </div>
                ))
              ) : (
                <div className="empty-message">No recipes available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
