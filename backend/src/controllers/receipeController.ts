import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

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


;