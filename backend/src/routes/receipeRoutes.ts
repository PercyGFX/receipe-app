import express from "express";
const router = express.Router();

import {
  getCategories,
  getSingleReceipes,
  getReceipes,
} from "../controllers/receipeController.js";


// get categories
router.get("/get-categories", getCategories);

// get recipes by category

router.get("/get-recipes/:categoryName", getReceipes);

// get recipes by id

router.get("/get-single-recipes/:receipeId", getSingleReceipes);


export default router;
