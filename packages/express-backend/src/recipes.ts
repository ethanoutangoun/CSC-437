import { Recipe } from "./models/recipe";
import RecipeModel from "./models/mongo/recipe";

// Get recipes by likes, in batches of pageSize
function getTrending(pageNumber: number, pageSize: number): Promise<Recipe[]> {
  const skipCount = (pageNumber - 1) * pageSize;

  return RecipeModel.find()
    .sort({ numLikes: -1 })
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

function create(recipeData: Recipe): Promise<Recipe> {
  const newRecipe = new RecipeModel(recipeData);

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

function getRecipeById(id: string): Promise<Recipe | null> {
  return RecipeModel.findById(id)
    .exec()
    .then((recipe) => {
      return recipe;
    })
    .catch((error) => {
      console.error("Error fetching recipe by id:", error);
      throw error;
    });
}

async function getRecipesByTag(tag: string): Promise<Recipe[]> {
    try {
      // Find recipes that contain the provided tag in their 'tags' array
      const recipes = await RecipeModel.find({ tags: tag }).exec();
      return recipes;
    } catch (error) {
      console.error("Error fetching recipes by tag:", error);
      throw error;
    }
  }


  function getRecipesByUserId(userid: string): Promise<Recipe[]> {
    return RecipeModel.find({ userid })
      .exec()
      .then((recipes) => {
        return recipes;
      })
      .catch((error) => {
        console.error("Error fetching recipes by user id:", error);
        throw error;
      });
  }

  



export default { getTrending, create, getRecipeById, getRecipesByTag, getRecipesByUserId };
