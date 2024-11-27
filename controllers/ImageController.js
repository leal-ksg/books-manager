import Image from "../models/Image.js";

async function index(req, res) {
  const images = await Image.find({});
  return res.json(images);
}

async function store(req, res) {
  const image = await Image.create(req.body);
  return res.json(image);
}

async function remove(req, res) {
  await Image.findByIdAndDelete(req.params.id);
  return res.send({ msg: "Registro apagado com sucesso!" });
}

async function update(req, res) {
  const image = await Image.findByIdAndUpdate(req.params.id, req.body);
  return res.json(image);
}

export default { index, store, remove, update };
