import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

function MongoModule() {
  const db = {};
  const url = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/";
  const DB_NAME = "CanYouCookIt";
  const COLLECTION_RECIPES = "recipes";
  const COLLECTION_MYRECIPES = "myrecipes";
  const USER_INVENTORY = "inventory";
  const INGREDIENTS_COLLECTION = "ingredients";

  const MONGO_DEFAULTS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  };

  /* ------Katerina----- */
  async function getRecipe(recipeId, userId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = { id: recipeId, userId: userId };
      const recipe = await myRecipesCollection.findOne(query);
      return recipe;
    } finally {
      await client.close();
    }
  }

  async function checkRecipe(id) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const recipesCollection = mongo.collection(COLLECTION_RECIPES);

      const query = { id: id };
      const recipe = await recipesCollection.findOne(query);
      return recipe;
    } finally {
      await client.close();
    }
  }

  async function createRecipe(recipe) {
    recipe.id = String(recipe.id);
    recipe.timestamp = Date.now();

    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const result = await myRecipesCollection.insertOne(recipe);
      return result;
    } finally {
      await client.close();
    }
  }

  async function saveRecipe(recipe) {
    recipe.id = String(recipe.id);

    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const recipesCollection = mongo.collection(COLLECTION_RECIPES);

      const result = await recipesCollection.insertOne(recipe);
      return result;
    } finally {
      await client.close();
    }
  }

  async function addRecipe(recipe) {
    delete recipe._id;

    recipe._id = ObjectId();
    recipe.timestamp = Date.now();
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const result = await myRecipesCollection.insertOne(recipe);
      return result;
    } finally {
      await client.close();
    }
  }

  async function getRecipes(userId) {
    // console.log("got userId", userId);
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = { userId: userId };
      const recipes = await myRecipesCollection.find(query).toArray();

      return recipes;
    } finally {
      await client.close();
    }
  }

  async function deleteRecipe(recipeId, userId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = {
        id: recipeId,
        userId: userId,
      };

      const result = await myRecipesCollection.deleteOne(query);
      return result;
    } finally {
      await client.close();
    }
  }

  async function updateRecipe(updatedRecipe, userId) {

    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const filter = { _id: ObjectId(updatedRecipe._id), userId: userId };
      delete updatedRecipe._id;
      const update = { $set: { ...updatedRecipe } };

      const result = await myRecipesCollection.updateOne(filter, update);
      return result;
    } finally {
      await client.close();
    }
  }

  async function checkUserImage(recipeId, image, userId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = { id: recipeId, userId: userId, image: image };
      const recipe = await myRecipesCollection.findOne(query);

      return recipe;
    } finally {
      await client.close();
    }
  }


  db.getRecipe = getRecipe;
  db.checkRecipe = checkRecipe;
  db.createRecipe = createRecipe;
  db.addRecipe = addRecipe;
  db.saveRecipe = saveRecipe;
  db.getRecipes = getRecipes;
  db.deleteRecipe = deleteRecipe;
  db.updateRecipe = updateRecipe;
  db.checkUserImage = checkUserImage;
  /* ------Katerina end----- */

  /* ------Anshul start----- */
  //  works
  async function getInventory(userId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const inventoryCollection = mongo.collection(USER_INVENTORY);
      const ingredientsCollection = mongo.collection(INGREDIENTS_COLLECTION);
      let query = { userId: userId };
      const inventory = await inventoryCollection
        .find(query)
        .project({ ingredients: 1, _id: 0 })
        .toArray();
      // findOne has been marked for deprecation with issues
      // console.log(inventory);
      let myinventory = inventory[0].ingredients;
      let ingredientsId = [];
      myinventory.forEach((element) => {
        // console.log(element.itemId);
        ingredientsId.push(element.id);
      });
      // console.log(ingredientsId);
      query = { id: { $in: ingredientsId } };
      let myIngredientsInfo = await ingredientsCollection
        .find(query)
        .project({ _id: 0 })
        .toArray();
      console.log(myinventory);
      console.log(myIngredientsInfo);

      myIngredientsInfo = myinventory.map((myinventoryItem) => {
        const matched = myIngredientsInfo.find(
          (myIngredientInfo) => myIngredientInfo.id === myinventoryItem.id
        );
        if (matched) {
          // delete myinventoryItem.id;
          // delete matched.id;
          return { ...myinventoryItem, ...matched };
        }
      });
      console.log(myIngredientsInfo);
      return myIngredientsInfo;
    } finally {
      await client.close();
    }
  }

  async function addToInventory(userId, itemId) {
    console.log("INSIDE addToInventory");
    let client;

    try {
      client = new MongoClient(url);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const inventoryCollection = mongo.collection(USER_INVENTORY);

      const query = {
        userId: userId,
      };
      // add the new item here
      const append = {
        $push: {
          ingredients: { id: itemId, quantity: 10, unit: "slice" },
        },
      };

      const result = await inventoryCollection.updateOne(query, append);

      // console.log(result);

      return result;
    } finally {
      await client.close();
    }
  }

  async function deleteItem(userId, itemId) {
    let client;

    try {
      client = new MongoClient(url);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const inventoryCollection = mongo.collection(USER_INVENTORY);
      const filter = {
        userId: userId,
      };
      // DO THE DELETE USING WHERE CLAUSE
      const update = {
        $pull: { ingredients: { id: itemId } },
      };

      const result = await inventoryCollection.updateOne(filter, update);
      if (result.matchedCount === 1) {
        console.log(
          "Successfully deleted one Ingredient from the ingredients array"
        );
      } else {
        console.log(
          "No documents matched the query in Inventory Collection. \
                Deleted 0 ingredients from the ingredients array"
        );
      }

      return result;
    } finally {
      await client.close();
    }
  }

  async function updateInventory(userId, updatedItem) {
    console.log("INSIDE updateInventory");
    let client;

    try {
      client = new MongoClient(url);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const inventoryCollection = mongo.collection(USER_INVENTORY);

      const query = {
        _id: ObjectId(userId),
      };
      // add the new item here
      const append = {
        $set: {
          isCompleted: true,
        },
      };

      const result = await inventoryCollection.updateOne(query, append);

      console.log(result);

      return result;
    } finally {
      await client.close();
    }
  }

  async function getIngredients(searchText) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const ingredientsCollection = mongo.collection(INGREDIENTS_COLLECTION);
      const query = { name: { $regex: "^" + searchText } };
      const possibleIngredients = await ingredientsCollection
        .find(query)
        .project({ name: 1, _id: 0, id: 1 })
        .toArray();
      // console.log(possibleIngredients);

      return possibleIngredients;
    } finally {
      await client.close();
    }
  }

  db.getIngredients = getIngredients;
  db.getInventory = getInventory;
  db.addToInventory = addToInventory;
  db.updateInventory = updateInventory;
  db.deleteItem = deleteItem;
/* ------Anshul end----- */

  return db;
}

export default MongoModule();
