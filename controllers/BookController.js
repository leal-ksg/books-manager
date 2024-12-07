import Book from "../models/Book.js";

async function findyAll(req, res) {
  try {
    const books = await Book.find({});
    return res.json(books);
  } catch (err) {
    return res
      .status(500)
      .send({ error: `An error occurred on fetching books: ${err}` });
  }
}

async function create(req, res) {
  try {
    const book = await Book.create(req.body);
    return res.json(book);
  } catch (err) {
    return res
      .status(500)
      .send({ error: `An error occurred on creating a new book: ${err}` });
  }
}

async function findyOne(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    return res.json(book);
  } catch (err) {
    return res.status(500).send({
      error: `An error occurred on fetching an especific book: ${err}`,
    });
  }
}

async function update(req, res) {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(book);
  } catch (err) {
    return res
      .status(500)
      .send({ error: `An error occurred on updating a book: ${err}` });
  }
}

async function remove(req, res) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    return res.send({ msg: "Book removed!" });
  } catch (err) {
    return res
      .status(500)
      .send({ error: `An error occurred on fetching books: ${err}` });
  }
}

export default { findyAll, create, findyOne, update, remove };
