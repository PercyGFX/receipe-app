import express from "express";
const router = express.Router();
import { jwtauthenticateToken } from "../middlewares/jwtcheck.js";

import {
  getCategories,
  getSingleReceipes,
  getReceipes,
  addToFavourites,
  getFavouritesbyUser,
  removeFavouritesbyId
} from "../controllers/receipeController.js";

// get categories
router.get("/get-categories",jwtauthenticateToken, getCategories);

// get recipes by category

router.get("/get-recipes/:categoryName", jwtauthenticateToken, getReceipes);

// get recipes by id

router.get("/get-single-recipes/:receipeId",jwtauthenticateToken, getSingleReceipes);

// add to faviurites
router.post("/add-favourites",jwtauthenticateToken, addToFavourites);

// get all favourites by userid
router.get("/get-favourites/:userId",jwtauthenticateToken, getFavouritesbyUser);

// remove favourite
router.get("/remove-favourite/:id",jwtauthenticateToken, removeFavouritesbyId);

export default router;
