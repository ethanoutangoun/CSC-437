import express, { Request, Response } from "express";
import { Recipe } from "../models/recipe";
import recipes from "../recipes";

const router = express.Router();

router.get("/trending", (req: Request, res: Response) => {
    const pageNumber = Number(req.query.page) || 1;
    const pageSize = Number(req.query.size) || 10;
    
    recipes.getTrending(pageNumber, pageSize)
        .then((recipes) => res.json(recipes))
        .catch((error) => res.status(500).send(error));
    });


router.post("/", (req: Request, res: Response) => {
    const newRecipe = req.body;


    recipes.create(newRecipe)
        .then((recipe: Recipe) => res.status(201).send(recipe))
        .catch((err) => res.status(500).send(err));
}
);


export default router;