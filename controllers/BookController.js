import Book from "../models/Book.js";

async function index(req, res) {
  try {
    const books = await Book.find({});
    return res.json(books);
  } catch (err) {
    console.log(err);
    res.send({ error: "An error occurred on fetching books" });
  }
}

async function store(req, res) {
  try {
    const book = await Book.create(req.body);
    return res.json(book);
  } catch (err) {
    console.log(err);
    res.send({ error: "An error occurred on creating a new book" });
  }
}

async function show(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    return res.json(book);
  } catch (err) {
    console.log(err);
    res.send({ error: "An error occurred on fetching an especific book" });
  }
}

async function update(req, res) {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(book);
  } catch (err) {
    console.log(err);
    res.send({ error: "An error occurred on updating a book" });
  }
}

async function remove(req, res) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    return res.send({ msg: "Book removed!" });
  } catch (err) {
    console.log(err);
    res.send({ error: "An error occurred on fetching books" });
  }
}

export default { index, store, show, update, remove };
