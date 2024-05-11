import express from "express";
const router = express.Router();
import { login, register, jwtcheck } from "../controllers/userController.js";

// jwtcheck endpoint
router.get("/jwtcheck/:jwttoken", jwtcheck);

// login endpoint
router.post("/login", login);

// register endpoint

router.post("/register", register);


export default router;
