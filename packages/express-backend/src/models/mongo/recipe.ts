import { Schema, model } from "mongoose";
import { Recipe } from "../recipe";

const recipeSchema = new Schema<Recipe>(
  {
    name: { type: String, trim: true, required: true },
    ingredients: { type: [String], required: true },
    directions: { type: [String], required: true },
    tags: { type: [String], required: true },
    date: { type: Date, default: Date.now },
    picture: { data: Buffer, contentType: String},
    numLikes: { type: Number, default: 0 },
    numComments: { type: Number, default: 0 },
    userid: { type: String, required: true }
   
  },
  { collection: "recipes" }
);

const RecipeModel = model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;
