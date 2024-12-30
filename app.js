const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Story = require("./models/story");

const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

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
// app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/stories/new", (req, res) => {
  res.render("./stories/new");
});

app.post("/stories", async (req, res) => {
  console.log(req.body);
  const newStory = new Story(req.body);
  await newStory.save();
  console.log(newStory);

  // .insertOne({ title, category, long, lat })
  // .then((story) => {
  //   console.log(story);
  // })
  // .catch((err) => {
  //   console.log("Error Saving:");
  //   console.log(err);
  // });
  res.redirect("/stories");
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

// app.patch("/comments/:id", (req, res) => {
//   const { id } = req.params;
//   const newComment = req.body.comment;
//   const foundComment = data.find((comment) => {
//     if (comment.id === id) {
//       return comment;
//     }
//   });
//   foundComment.comment = newComment;
//   res.redirect(303, "/comments");
// });

// app.delete("/comments/:id", (req, res) => {
//   const { id } = req.params;
//   console.log("delete route");
//   data = data.filter((comment) => {
//     if (comment.id !== id) {
//       return comment;
//     }
//   });
//   res.redirect(303, "/comments");
// });

app.get("/stories/:id", async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id);
  res.render("./stories/show", { story, id });
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
