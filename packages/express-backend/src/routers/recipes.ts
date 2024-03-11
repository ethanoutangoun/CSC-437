import express, { Request, Response } from "express";
import { Recipe } from "../models/recipe";
import recipes from "../recipes";

const router = express.Router();

router.get("/trending", (req: Request, res: Response) => {
  const pageNumber = Number(req.query.page) || 1;
  const pageSize = Number(req.query.size) || 10;

  recipes
    .getTrending(pageNumber, pageSize)
    .then((recipes) => res.json(recipes))
    .catch((error) => res.status(500).send(error));
});

router.post("/", (req: Request, res: Response) => {
  const newRecipe = req.body;

  recipes
    .create(newRecipe)
    .then((recipe: Recipe) => {
      res.status(201).json(recipe); // Send the newly created recipe as JSON response
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  recipes
    .getRecipeById(id)
    .then((recipe) => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).send("Recipe not found");
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/tag/:tag", (req: Request, res: Response) => {
  let tag = req.params.tag;
  


  recipes
    .getRecipesByTag(tag)
    .then((recipes) => res.json(recipes))
    .catch((error) => res.status(500).send(error));


  });

router.get("/user/:userId", (req: Request, res: Response) => {
  let userId = req.params.userId;

  recipes
    .getRecipesByUserId(userId)
    .then((recipes) => res.json(recipes))
    .catch((error) => res.status(500).send(error
    ));
}
);


export default router;
