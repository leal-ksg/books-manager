import { config } from "dotenv";
import express from "express";
import routes from "./routes.js";
import cors from "cors";

import mongoose from "mongoose";

config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Error on Mongoose's default connection: ", err);
});

db.once("open", () => {
  console.log("Database online");
});

const server = express();
server.use(express.json());
server.use(cors());
server.use("/api", routes);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at port ${process.env.SERVER_PORT}`);
});
