import express from "express";
import { authenticateUser } from "../auth";
import profileRouter from "./profiles"; 
import recipeRouter from "./recipes";

const router = express.Router();


router.use(authenticateUser);
router.use("/profiles", profileRouter);
router.use("/recipes", recipeRouter);



export default router;
