const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const bp = require("body-parser");
app.use(bp.json());

const Cat = require("./models/cat");

mongoose.connect(process.env.DATABASE_URL);

app.get("/", (request, response) => {
  response.json("You are on the root route of my cat app.");
});

app.get("/cats", async (request, response) => {
  const cats = await Cat.find(request.query);
  response.json(cats);
});

// post - CREATE
app.post("/cats", async (request, response) => {
  const newCat = await Cat.create(request.body);
  response.json(newCat);
});

// delete - DELETE
// localhost:8080/cats/12345
// request.params = { id: 12345 }
app.delete("/cats/:id", async (request, response) => {
  const deletedCat = await Cat.findByIdAndDelete(request.params.id);
  response.json(deletedCat);
});

// put - UPDATE
app.put("/cats/:id", async (request, response) => {
  // const options = { new: true };
  const updatedCat = await Cat.findByIdAndUpdate(request.params.id, request.body, options);
  response.json(updatedCat);
  });

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));