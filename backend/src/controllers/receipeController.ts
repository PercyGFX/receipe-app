import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import UserModel from "../models/UserModel.js";
import FavouriteModel from "../models/FavouriteModel.js";

//------------- get Categories -------------------------------//
export const getCategories = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    const categories = data.categories.slice(0, 5);

    res.status(200).json({ message: "Success", data: categories });
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//------------- get receipes -------------------------------//
export const getReceipes = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.params;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    if (!data.meals) {
      res.status(500).json({ error: "Category Not Found" });
      return
    }

    res.json(data);
  } catch (error: any) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//------------- get receipes by id -------------------------------//
export const getSingleReceipes = async (req: Request, res: Response) => {
  try {
    const { receipeId } = req.params;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receipeId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    if (!data.meals) {
      res.status(500).json({ error: "Receipe Not Found" });
      return;
    }

    res.json(data);
  } catch (error: any) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ---------------------------- add to favourites ------------------------- //

export const addToFavourites = async (req: Request, res: Response) => {
  try {
    const { userId, receipeId, thumbnail, title, category } = req.body;

    // validations
    if (!userId || !receipeId || !thumbnail || !title || !category) {
      return res
        .status(400)
        .json({ error: "userId, receipeId, thumbnail, title are required" });
    }

    // check if the user available
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // check if receipe already int he database
    const existingFavourite = await FavouriteModel.findOne({ receipeId });
    if (existingFavourite) {
      return res
        .status(400)
        .json({ error: "This recipe is already in favourites" });
    }

    // create new
    await FavouriteModel.create({
      receipeId,
      thumbnail,
      title,
      user: userId,
      category,
    });

    return res
      .status(201)
      .json({ message: "Recipe added to favourites successfully" });
  } catch (error: any) {
    console.error("Error adding to favourites:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// ---------------------------- getFavouritesbyUser ------------------------- //

export const getFavouritesbyUser = async (req: Request, res: Response) => {
   try {
    
     const { userId } = req.params;
     // Check if userId is provided
     if (!userId) {
       return res.status(400).json({ error: "userId parameter is required" });
     }

     // Find favorite records related to the user
     const favourites = await FavouriteModel.find({ user: userId });

     return res.status(200).json(favourites);
   } catch (error: any) {
     console.error("Error fetching recipes:", error.message);
     res.status(500).json({ error: "Internal Server Error" });
   }
};

// ---------------------------- remove favourite by id ------------------------- //

export const removeFavouritesbyId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // check id
      if (!id) {
        return res.status(400).json({ error: "id parameter is required" });
      }

      // remove
      const removedFavourite = await FavouriteModel.findByIdAndDelete(id);

      // no favourite found
      if (!removedFavourite) {
        return res.status(404).json({ error: "Favorite record not found" });
      }

      return res
        .status(200)
        .json({ message: "Favorite record removed successfully" });
    } catch (error: any) {
      console.error("Error removing favorite record:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};


