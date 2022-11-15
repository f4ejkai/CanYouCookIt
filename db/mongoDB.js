import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

function MongoModule() {
  const db = {};
  const url = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/";
  const DB_NAME = "CanYouCookIt";
  const COLLECTION_RECIPES = "recipes";
  const USER_INVENTORY = "Inventory";
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
  async function getInventory(userId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const inventoryCollection = mongo.collection(USER_INVENTORY);

      const query = { id: userId };
      const inventory = await inventoryCollection.findOne(query);
      return inventory;
    } finally {
      await client.close();
    }
  }
  async function addToInventory(userId, newItem) {
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

      const result = await inventoryCollection.insertOne(query, append);

      console.log(result);

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

      // DO THE DELETE USING WHERE CLUASE
      const resultItem = await inventoryCollection.deleteOne({
        _id: ObjectId(userId),
      });

      if (resultItem.deletedCount === 1) {
        console.log(
          "Successfully deleted one document in Inventory Collection."
        );
      } else {
        console.log(
          "No documents matched the query in Inventory Collection. \
                Deleted 0 documents."
        );
      }

      return resultItem;
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
        .project({ name: 1, _id: 0 })
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
