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
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";
import FavoriteIcon from "@mui/icons-material/Favorite";


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
   const [refreshFavorites, setRefreshFavorites] = useState<boolean>(false);

  const [open, setOpen] = useState(false);

  // open single listing
  const handleOpen = (id: string) => {
    const fetchRecipes = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/get-single-recipes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
      const token = Cookies.get("token");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/get-categories`,
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
      const token = Cookies.get("token");
      const userId = localStorage.getItem("userId");
      const fetchRecipes = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/get-recipes/${selectedCategory}/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
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
  }, [selectedCategory, refreshFavorites]);

  // handle selected category
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  // add to favourites ///////
  const handleAddFavourite = async (
    id: string,
    thumbnail: string,
    title: string,
    category: string
  ) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/receipe/add-favourites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            receipeId: id,
            thumbnail,
            title,
            category,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        toast.error(errorData?.error);
      } else {
        setRefreshFavorites(!refreshFavorites);
        toast.success("Added to favourites");
      }

      const data = await response.json();
      console.log(data.message); // Log success message
    } catch (error: any) {
      console.error("Error adding recipe to favourites:", error.message);
    }
  };

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
              <BeatLoader
                color="#fe5c84"
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </Box>
        </Modal>
        <div className=" bg-[#fef8f9] w-10/12 h-full py-10 px-20">
          {/* categories */}

          <div className="flex lg:flex-row flex-wrap gap-x-5">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.idCategory}>
                  {selectedCategory == category.strCategory ? (
                    <>
                      <Button
                        className=" shadow-none px-10 mb-3 lg:mb:0"
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
              <div>
                <BeatLoader
                  color="#fe5c84"
                  loading={true}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </div>

          {/* recipies */}
          <div className="mt-16">
            <div className="grid lg:grid-cols-5 gap-x-28 gap-y-16">
              {/* recipe card */}
              {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                  <div key={index} className="">
                    <div className="rounded-3xl  w-full">
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
                      {recipe.isFavourite ? (
                        <>
                          <FavoriteIcon
                            className="text-[#fe5c84] hover:cursor-pointer"
                            onClick={() =>
                              handleAddFavourite(
                                recipe.idMeal,
                                recipe.strMealThumb,
                                recipe.strMeal,
                                selectedCategory as any
                              )
                            }
                          />
                        </>
                      ) : (
                        <>
                          <FavoriteBorderIcon
                            className="text-[#fe5c84] hover:cursor-pointer"
                            onClick={() =>
                              handleAddFavourite(
                                recipe.idMeal,
                                recipe.strMealThumb,
                                recipe.strMeal,
                                selectedCategory as any
                              )
                            }
                          />
                        </>
                      )}
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
                <div className="empty-message flex justify-center">
                  <BeatLoader
                    color="#fe5c84"
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
