import express from "express";
const router = express.Router();

import { getCategories } from "../controllers/receipeController.js";
import { getReceipes } from "../controllers/receipeController.js";

// get categories
router.get("/get-categories", getCategories);

// get recipes by category

router.get("/get-recipes/:categoryName", getReceipes);


export default router;
