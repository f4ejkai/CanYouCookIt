import express from "express";
import fetch from "node-fetch";
import mongo from "../db/mongoDB.js";
//TODO remove import of dummy recipes
import dummy_recipes from "./dummy_recipes.js";
import dummy_detail from "./dummy_details.js";

const router = express.Router();
router.use(express.json());
const RECIPES_LIMIT = 5;

/* ------Katerina----- */
/* POST recipes by ingredients */
router.post("/api/recipes", async function (req, res) {
  //   console.log(req);
  //const ingredients = req.body.ingredients;
  const ingredients = ["apples", "flour", "sugar"];
  console.log(ingredients);

  if (ingredients) {
    const baseUrl = "https://api.spoonacular.com/recipes/findByIngredients";
    const ingredientsString = ingredients.join("%2C");

    const url = `${baseUrl}?apiKey=${process.env.API_KEY}&ingredients=${ingredientsString}&number=${RECIPES_LIMIT}&ignorePantry=true&ranking=1`;
    const options = { method: "GET" };

    try {
      // TODO: uncomment real request & remove dummy_recipes
      //   const recipiesResponse = await fetch(url, options);
      //   const recipes = await recipiesResponse.json();

      const recipes = dummy_recipes;

      if (recipes) {
        res.status(200).json(recipes);
      } else {
        res
          .status(404)
          .send({ err: "no matched results from Spoonacular API" });
      }
    } catch (e) {
      res.status(400).send({ err: e });
    }
  } else {
    res.status(404).send({ err: "No ingredients" });
  }
});

/* GET recipe by ID - either from external API (with write to Mongo) or from MongoDB */
router.get("/api/recipe/:id", async function (req, res) {
  const recipeId = Number(req.params.id);

  console.log("got recipeId", recipeId);

  if (recipeId) {
    let recipeDetail;
    recipeDetail = await mongo.getRecipe(recipeId);

    if (recipeDetail) {
      res.status(200).json(recipeDetail);
    } else {
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}`;
      const options = { method: "GET" };

      try {
        const detailResponse = await fetch(url, options);
        recipeDetail = await detailResponse.json();

        //TODO remove mock data
        // recipeDetail = dummy_detail;

        if (recipeDetail) {
          const detailResponse = await mongo.createRecipe(recipeDetail);
          if (detailResponse.acknowledged) {
            res.status(200).json(recipeDetail);
          } else {
            console.log("couldn't write recipe to MongoDB");
          }
        } else {
          res
            .status(404)
            .send({ err: "no matched results from Spoonacular API" });
        }
      } catch (e) {
        res.status(400).send({ err: e });
      }
    }
  } else {
    res.status(404).send({ err: "No recipe ID" });
  }
});
/* ------Katerina end----- */

//@Anshul - pass me ingredients like so:
// bodyToSend = {
//     "ingredients": ["apples", "flour", "sugar"]
// }

// await fetch(`/api/recipes`, {
//         method: "post",
//         body: bodyToSend,
//         headers: {
//             "Content-Type": "application/json",
//         },
router.get("/api/ingredients", async function (req, res) {
  const searchText = req.query.query;
  const retrievedIngredients = await mongo.getIngredients(searchText);
  let possibleIngredients = [];
  console.log(retrievedIngredients);
  retrievedIngredients.forEach((elt) => possibleIngredients.push(elt["name"]));
  // res.status(200).json({ possibleIngredients: possibleIngredients });
  res.status(200).json(retrievedIngredients);
});
// works
router.get("/api/myinventory/:id", async function (req, res) {
  const userId = req.params.id;
  const retrievedInventory = await mongo.getInventory(userId);
  res.status(200).json(retrievedInventory);
});
// works
router.post("/api/myinventory/:id", async (req, res) => {
  const userId = req.params.id;
  const itemId = req.body.id;
  // const itemName = req.body.name;
  const status = await mongo.addToInventory(userId, itemId);

  res.json({ requestBody: status });
});
// works
router.delete("/api/myinventory/:userId/:itemId", async (req, res) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;
  const status = await mongo.deleteItem(userId, itemId);
  res.status(200).json(status);
});
export default router;
