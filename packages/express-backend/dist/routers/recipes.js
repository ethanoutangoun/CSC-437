"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipes_1 = __importDefault(require("../recipes"));
const router = express_1.default.Router();
router.get("/trending", (req, res) => {
    const pageNumber = Number(req.query.page) || 1;
    const pageSize = Number(req.query.size) || 10;
    recipes_1.default
        .getTrending(pageNumber, pageSize)
        .then((recipes) => res.json(recipes))
        .catch((error) => res.status(500).send(error));
});
router.post("/", (req, res) => {
    const newRecipe = req.body;
    recipes_1.default
        .create(newRecipe)
        .then((recipe) => {
        res.status(201).json(recipe); // Send the newly created recipe as JSON response
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    recipes_1.default
        .getRecipeById(id)
        .then((recipe) => {
        if (recipe) {
            res.json(recipe);
        }
        else {
            res.status(404).send("Recipe not found");
        }
    })
        .catch((error) => {
        res.status(500).send(error);
    });
});
router.get("/tag/:tag", (req, res) => {
    let tag = req.params.tag;
    recipes_1.default
        .getRecipesByTag(tag)
        .then((recipes) => res.json(recipes))
        .catch((error) => res.status(500).send(error));
});
router.get("/user/:userId", (req, res) => {
    let userId = req.params.userId;
    recipes_1.default
        .getRecipesByUserId(userId)
        .then((recipes) => res.json(recipes))
        .catch((error) => res.status(500).send(error));
});
exports.default = router;
