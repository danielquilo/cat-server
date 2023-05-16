const mongoose = require("mongoose");
require ("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

const Cat = require("./models/cat");

async function seed() {
// create a few cats 
await Cat.create({ name: "Chrisp", colour: "green", hasClaws: false, location: "Liverpool"});
await Cat.create({ name: "Tim", colour: "green", hasClaws: true, location: "St Helen's"});

console.log("Create a couple o cool cats");
mongoose.disconnect();
}

seed();