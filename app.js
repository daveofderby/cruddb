const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Story = require("./models/story");

const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

const categories = ["child", "adult", "adventure", "horror", "scifi", "other"];

// connect to the local mongo database
mongoose
  .connect("mongodb://127.0.0.1:27017/storyBook")
  .then(() => {
    console.log("Connection to database: Open");
  })
  .catch((err) => {
    console.log("Error:");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// These are the routes
app.get("/stories/new", (req, res) => {
  res.render("./stories/new", { categories });
});

app.post("/stories", async (req, res) => {
  const newStory = new Story(req.body);
  await newStory.save();
  res.redirect("/stories");
});

app.delete("/stories/:id", async (req, res) => {
  const { id } = req.params;
  console.log("delete route");
  await Story.findByIdAndDelete(id);
  res.redirect(303, "/stories");
});

// app.get("/comments/:id/edit", (req, res) => {
//   const { id } = req.params;
//   const comment = data.find((comment) => {
//     if (comment.id === id) {
//       return comment;
//     }
//   });
//   res.render("./comments/edit", { ...comment });
// });

app.patch("/stories/:id", async (req, res) => {
  const { id } = req.params;
  console.log("patch route");
  console.log(req.body);
  await Story.findByIdAndUpdate(id, req.body);
  res.redirect(303, "/stories");
});

app.get("/stories/:id", async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id);
  res.render("./stories/edit", { story, id, categories });
});

app.get("/stories", async (req, res) => {
  const storyData = await Story.find({});
  res.render("./stories/index", { storyData });
});

app.get("/", async (req, res) => {
  res.redirect("./stories");
});

app.use((req, res) => {
  res.send(`Invalid URL`);
});

console.log("listing on port 3000");
app.listen(3000);
