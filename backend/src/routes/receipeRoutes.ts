import express from "express";
const router = express.Router();

import {
  getCategories,
  getSingleReceipes,
  getReceipes,
  addToFavourites,
  getFavouritesbyUser
} from "../controllers/receipeController.js";

// get categories
router.get("/get-categories", getCategories);

// get recipes by category

router.get("/get-recipes/:categoryName", getReceipes);

// get recipes by id

router.get("/get-single-recipes/:receipeId", getSingleReceipes);

// add to faviurites
router.post("/add-favourites", addToFavourites);

// get all favourites by userid
router.get("/get-favourites/:userId", getFavouritesbyUser);

// remove favourite
router.get("/remove-favourite/:id", getFavouritesbyUser);

export default router;
