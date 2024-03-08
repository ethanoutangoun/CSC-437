"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, required: true },
    ingredients: { type: [String], required: true },
    directions: { type: [String], required: true },
    tags: { type: [String], required: true },
    date: { type: Date, default: Date.now },
    picture: { data: Buffer, contentType: String },
    numLikes: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    userid: { type: String, required: true }
}, { collection: "recipes" });
const RecipeModel = (0, mongoose_1.model)("Recipe", recipeSchema);
exports.default = RecipeModel;
