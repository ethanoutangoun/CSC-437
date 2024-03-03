import express from "express";
import { authenticateUser } from "../auth";
import profileRouter from "./profiles"; 

const router = express.Router();

router.use(authenticateUser);
router.use("/profiles", profileRouter);

export default router;
