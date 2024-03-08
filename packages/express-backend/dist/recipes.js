"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = __importDefault(require("./models/mongo/recipe"));
// Get recipes by likes, in batches of pageSize
function getTrending(pageNumber, pageSize) {
    const skipCount = (pageNumber - 1) * pageSize;
    return recipe_1.default.find()
        .sort({ numLikes: -1 })
        .skip(skipCount)
        .limit(pageSize)
        .exec()
        .then((recipes) => {
        return recipes;
    })
        .catch((error) => {
        console.error('Error fetching recipes by likes:', error);
        throw error;
    });
}
function create(recipeData) {
    const newRecipe = new recipe_1.default(recipeData);
    return newRecipe.save()
        .then((recipe) => {
        return recipe;
    })
        .catch((error) => {
        console.error('Error creating recipe:', error);
        throw error;
    });
}
exports.default = { getTrending, create };
