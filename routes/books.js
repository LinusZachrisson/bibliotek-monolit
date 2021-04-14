const books = require("../books");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let template = "";
  for (let i = 0; i < books.length; i++) {
    template += `<h2><a href="books/${books[i].id}">${books[i].title}</a></h2> <p>Borrowed: ${books[i].borrowed}</p>`;
  }
  template += `<a href="books/addbook">Click here to add a new book to the library!</a>`;
  res.send(template);
});

router.get("/addbook", function (req, res) {
  let template = `<form action="/books/new" method="post">
    <label for="title">Book title:</label>
    <input type="text" id="title" name="title"><br><br>
    <label for="Author">Book author:</label>
    <input type="text" id="author" name="author"><br><br>
    <label for="pages">Number of pages:</label>
    <input type="text" id="pages" name="pages"><br><br>
    <input type="submit" value="Submit">
  </form>`;
  res.send(template);
});

router.post("/new", function (req, res) {
  console.log(req.body);
  let newBook = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    borrowed: false,
    id: Date.now(),
  };
  books.push(newBook);
  console.log("allbooks", books);
  res.redirect("/books");
});

router.get("/:id", function (req, res) {
  let book = books.find((x) => x.id == req.params.id);
  let template = `<h1>Book info</h1> <p> Title:${book.title}</p> <p> Author:${
    book.author
  }</p> <p> Number of pages:${book.pages}</p> <p> Borrowed:${
    book.borrowed
  }</p> ${
    book.borrowed
      ? ""
      : `<a href='borrowbook/${book.id}'>Click here to borrow book</a>`
  } `;
  res.send(template);
});

router.get("/borrowbook/:id", function (req, res) {
  let bookBorrowed = books.find((x) => x.id == req.params.id);
  bookBorrowed.borrowed = true;
  console.log(bookBorrowed);
  res.send("<h1>book is now borrowed</h1>");
});

module.exports = router;
