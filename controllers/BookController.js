import mongoose from "mongoose";
import Book from "../models/Book.js";

async function index(req, res) {

  const books = await Book.find({});
  return res.json(books);
}

async function store(req, res) {
  const book = await Book.create(req.body);
  return res.json(book);
}

async function show(req, res) {
  const book = await Book.findById(req.params.id);
  return res.json(book);
}

async function update(req, res) {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.json(book);
}

async function remove(req, res) {
  const book = await Book.findByIdAndDelete(req.params.id);

  return res.send({ msg: "Registro apagado com sucesso!" });
}

export default { index, store, show, update, remove };
