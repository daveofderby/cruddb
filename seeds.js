const mongoose = require("mongoose");

const Story = require("./models/story");

mongoose
  .connect("mongodb://127.0.0.1:27017/storyBook")
  .then(() => {
    console.log("Connection to database: Open");
  })
  .catch((err) => {
    console.log("Error:");
    console.log(err);
  });

Story.deleteMany({}).then((result) => {
  console.log(result);
});

const storyData = [
  {
    title: "The fox of Blagreaves Lane",
    lat: 1,
    long: 1,
    category: "child",
  },
  {
    title: "What goes on behind closed doors",
    lat: 2,
    long: 1,
    category: "adult",
  },
  {
    title: "Dragons are watching you",
    lat: 3,
    long: 1,
    category: "child",
  },
  {
    title: "Return of the Black Death",
    lat: 4,
    long: 1,
    category: "horror",
  },
  {
    title: "A guide to Derby",
    lat: 5,
    long: 1,
    category: "other",
  },
];

Story.insertMany(storyData)
  .then((story) => {
    console.log(story);
  })
  .catch((err) => {
    console.log("Error Saving:");
    console.log(err);
  });
