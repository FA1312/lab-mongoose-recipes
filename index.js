const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Pa amb tomaquet",
      level: "Easy Peasy",
      ingredients: [
        "1 slice of cottage bread",
        "1 tomato",
        "2 tablespoon of AOVE",
        "1 clove of garlic",
      ],
      cuisine: "Catalan",
      dishType: "other",
      image:
        "https://www.peretarres.org/media/4177/como-hacer-pa-amb-tomaquet-perfecto.jpg?anchor=center&mode=crop&width=730&height=450&rnd=131940206210000000",
      duration: 10,
      creator: "Pompeu Fabra",
    });
  })
  .then((newRecipe) => {
    console.log(newRecipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((allRecipies) => {
    allRecipies.forEach((recipe) => {
      console.log(recipe.title);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true, useFindAndModify: false } // Esto es chino
    );
  })
  .then(() => {
    console.log("Rigatoni take way less now");
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Carrot Cake doesn't deserve to stay here");
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
