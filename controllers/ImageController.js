import mongoose from "mongoose";
import Image from "../models/Image.js";

async function findyAll(req, res) {
  try {
    const images = await Image.find({});
    return res.status(200).json(images);
  } catch (error) {
    return res
      .status(500)
      .send({ error: `An error occurred on fetching images: ${err}` });
  }
}

async function findyByBookId(req, res) {
  const idBook = req.params.idBook;

  try {
    const images = await Image.find({ idBook });
    return res.status(200).json(images);
  } catch (error) {
    return res
      .status(500)
      .send({ error: `An error occurred on fetching images: ${err}` });
  }
}

async function create(req, res) {
  try {
    const image = await Image.create(req.body);
    return res.status(200).json(image);
  } catch (error) {
    return res
      .status(500)
      .send({ error: `An error occurred on creating a new image: ${err}` });
  }
}

async function remove(req, res) {
  try {
    await Image.findByIdAndDelete(req.params.id);
    return res.status(200).send({ msg: "Image deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: `An error occurred on removing image: ${err}` });
  }
}

async function update(req, res) {
  try {
    const image = await Image.findOneAndUpdate(
      { idBook: req.params.idBook },
      { $set: req.body }
    );

    return res.status(200).json(image);
  } catch (error) {
    return res
      .status(500)
      .send({ error: `An error occurred on updating image: ${error}` });
  }
}

export default { findyAll, findyByBookId, create, remove, update };
