const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

/* Connection to database */
mongoose.connect("mongodb://localhost:27017/myBolg", { useNewUrlParser: true });

/* creating Schema for saving the Blog Posts */
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    min: [5, "Title Length too short"],
    required: true,
  },
  Content: {
    type: String,
    min: [15, "Content length too short"],
    required: true,
  },
});

const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum enim facilisis gravida neque convallis a cras. Scelerisque viverra mauris in aliquam. Molestie at elementum eu facilisis sed odio. Semper risus in hendrerit gravida rutrum quisque non. Nunc scelerisque viverra mauris in. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Suspendisse in est ante in nibh. Massa sed elementum tempus egestas sed. Morbi non arcu risus quis. Augue mauris augue neque gravida in. Aliquam ut porttitor leo a diam sollicitudin. Auctor augue mauris augue neque gravida. ";
const aboutContent =
  "Faucibus a pellentesque sit amet porttitor. Risus viverra adipiscing at in. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Dictum at tempor commodo ullamcorper a lacus vestibulum. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Quis commodo odio aenean sed adipiscing diam donec. Nibh tortor id aliquet lectus. Porttitor lacus luctus accumsan tortor posuere. Imperdiet dui accumsan sit amet nulla facilisi morbi. Scelerisque purus semper eget duis. Maecenas accumsan lacus vel facilisis. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique.";
const contactContent =
  "Fermentum et sollicitudin ac orci. Egestas integer eget aliquet nibh praesent tristique magna. Tristique senectus et netus et malesuada fames ac turpis egestas. Pretium nibh ipsum consequat nisl vel. Euismod in pellentesque massa placerat duis ultricies lacus. Pharetra et ultrices neque ornare aenean euismod elementum. In aliquam sem fringilla ut. Venenatis lectus magna fringilla urna. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Non arcu risus quis varius quam quisque id. Eleifend quam adipiscing vitae proin sagittis nisl. Ut aliquam purus sit amet luctus venenatis lectus magna. Ullamcorper velit sed ullamcorper morbi.";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const db = [];

//Home route
app.get("/", (req, res) => {
  res.render("home", {
    homecontent: homeStartingContent,
    posts: db,
  });
  console.log("Title" + req.body.postTitle);
  console.log("Content" + req.body.postContent);
});

app.get("/about", (req, res) => {
  res.render("about", { aboutcontent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactcontent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    text: req.body.postContent,
  };
  db.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  let reqTitle = req.params.postName;
  db.forEach(function (post) {
    let postTitle = _.lowerCase(post.title);

    if (postTitle === reqTitle) {
      res.render("post", {
        title: post.title,
        content: post.text,
      });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
