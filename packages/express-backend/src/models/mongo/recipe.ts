import { Schema, model } from "mongoose";
import { Recipe } from "../recipe";

const recipeSchema = new Schema<Recipe>(
  {
    name: { type: String, trim: true, required: true },
    ingredients: { type: [String], required: true },
    directions: { type: [String], required: true },
    tools: { type: [String] },
    tags: { type: [String] },
    date: { type: Date, default: Date.now },
    picture: { type: String, required: true},
    likes: { type: Number, default: 0 },
    userid: { type: String, required: true },
    cost: { type: Number },
    time: { type: Number }
   
  },
  { collection: "recipes" }
);

const RecipeModel = model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;
