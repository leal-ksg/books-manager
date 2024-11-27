import express from "express";
import BookController from "./controllers/BookController.js";
import ImageController from "./controllers/ImageController.js";

const routes = express.Router();

routes.get("/books", BookController.index);
routes.get("/books/:id", BookController.show);
routes.post("/books", BookController.store);
routes.put("/books/:id", BookController.update);
routes.delete("/books/:id", BookController.remove);

routes.get("/images", ImageController.index);
routes.post("/images", ImageController.store);
routes.delete("/images/:id", ImageController.remove);
routes.put("/images/:id", ImageController.update);

export default routes;
