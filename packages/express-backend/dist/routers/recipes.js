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
    recipes_1.default.getTrending(pageNumber, pageSize)
        .then((recipes) => res.json(recipes))
        .catch((error) => res.status(500).send(error));
});
router.post("/", (req, res) => {
    const newRecipe = req.body;
    recipes_1.default.create(newRecipe)
        .then((recipe) => res.status(201).send(recipe))
        .catch((err) => res.status(500).send(err));
});
exports.default = router;
