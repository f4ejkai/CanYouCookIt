import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

function MongoModule() {
  const db = {};
  const url = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/";
  const DB_NAME = "CanYouCookIt";
  const COLLECTION_RECIPES = "recipes";
  const USER_INVENTORY = "InventoryCollection";
  const INGREDIENTS_COLLECTION = "IngredientsCollection";
  const MONGO_DEFAULTS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  };

  /* ------Katerina----- */
  async function getRecipe(id) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const recipesCollection = mongo.collection(COLLECTION_RECIPES);

      const query = { id: id };
      const detail = await recipesCollection.findOne(query);
      return detail;
    } finally {
      await client.close();
    }
  }

  async function createRecipe(recipe) {
    console.log("got recipe", recipe);
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

  db.getRecipe = getRecipe;
  db.createRecipe = createRecipe;
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
  // works
  async function addToInventory(userId, itemId) {
    console.log("INSIDE updateInventory");
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

      console.log(result);

      return result;
    } finally {
      await client.close();
    }
  }
  // works
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
      // DO THE DELETE USING WHERE CLUASE
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

  db.getInventory = getInventory;
  db.addToInventory = addToInventory;
  db.updateInventory = updateInventory;
  db.deleteItem = deleteItem;

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
  return db;
}

export default MongoModule();
