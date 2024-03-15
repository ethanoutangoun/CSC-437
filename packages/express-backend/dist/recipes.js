"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = __importDefault(require("./models/mongo/recipe"));
// Get recipes by likes, in batches of pageSize
function getTrending(pageNumber, pageSize) {
    const skipCount = (pageNumber - 1) * pageSize;
    return recipe_1.default.find()
        .sort({ date: -1, likes: -1 })
        .skip(skipCount)
        .limit(pageSize)
        .exec()
        .then((recipes) => {
        return recipes;
    })
        .catch((error) => {
        console.error("Error fetching recipes by likes:", error);
        throw error;
    });
}
function create(recipeData) {
    const newRecipe = new recipe_1.default(recipeData);
    return newRecipe
        .save()
        .then((recipe) => {
        return recipe;
    })
        .catch((error) => {
        console.error("Error creating recipe:", error);
        throw error;
    });
}
function getRecipeById(id) {
    return recipe_1.default.findById(id)
        .exec()
        .then((recipe) => {
        return recipe;
    })
        .catch((error) => {
        console.error("Error fetching recipe by id:", error);
        throw error;
    });
}
function getRecipesByTag(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find recipes that contain the provided tag in their 'tags' array
            const recipes = yield recipe_1.default.find({ tags: tag }).exec();
            return recipes;
        }
        catch (error) {
            console.error("Error fetching recipes by tag:", error);
            throw error;
        }
    });
}
function getRecipesByUserId(userid) {
    return recipe_1.default.find({ userid })
        .exec()
        .then((recipes) => {
        return recipes;
    })
        .catch((error) => {
        console.error("Error fetching recipes by user id:", error);
        throw error;
    });
}
function getRecipesFromSearch(input) {
    return recipe_1.default.find({
        $or: [
            { name: { $regex: input, $options: 'i' } }, // Case-insensitive search for name (title) containing input
            { tags: { $regex: input, $options: 'i' } }, // Case-insensitive search for tags containing input
            { userid: { $regex: input, $options: 'i' } }, // Case-insensitive search for userid containing input
        ],
    })
        .exec()
        .then((recipes) => {
        return recipes;
    })
        .catch((error) => {
        console.error("Error fetching recipes by search:", error);
        throw error;
    });
}
exports.default = {
    getTrending,
    create,
    getRecipeById,
    getRecipesByTag,
    getRecipesByUserId,
    getRecipesFromSearch
};
