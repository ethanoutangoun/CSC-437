"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, required: true },
    ingredients: { type: [String], required: true },
    directions: { type: [String], required: true },
    tools: { type: [String] },
    tags: { type: [String] },
    cuisine: { type: String, required: true },
    date: { type: Date, default: Date.now },
    picture: { type: String, required: true },
    likes: { type: Number, default: 0 },
    userid: { type: String, required: true },
    cost: { type: Number },
    time: { type: Number }
}, { collection: "recipes" });
const RecipeModel = (0, mongoose_1.model)("Recipe", recipeSchema);
exports.default = RecipeModel;
