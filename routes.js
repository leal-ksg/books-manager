import express from 'express';
import BookController from "./controllers/BookController.js"

const routes = express.Router();

routes.get("/books", BookController.index);
routes.get("/books/:id", BookController.show);
routes.post("/books", BookController.store)
routes.put("/books/:id", BookController.update)
routes.delete("/books/:id", BookController.remove)

export default routes;
