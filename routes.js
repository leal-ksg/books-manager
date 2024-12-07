import express from "express";
import BookController from "./controllers/BookController.js";
import ImageController from "./controllers/ImageController.js";

const routes = express.Router();

routes.get("/books", BookController.findyAll);
routes.get("/books/:id", BookController.findyOne);
routes.post("/books", BookController.create);
routes.put("/books/:id", BookController.update);
routes.delete("/books/:id", BookController.remove);

routes.get("/images", ImageController.findyAll);
routes.get("/images/:idBook", ImageController.findyByBookId);
routes.post("/images", ImageController.create);
routes.delete("/images/:id", ImageController.remove);
routes.put("/images/:idBook", ImageController.update);

export default routes;
