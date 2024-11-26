import { config } from "dotenv";
import express from "express";
import routes from "./routes.js";
import cors from "cors";

import mongoose from "mongoose";

config()

console.log(process.env.MONGO_CONNECTION_STRING,)
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { serverApi: { version: '1', strict: true, deprecationErrors: true } });

const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Error on Mongoose's default connection: ", err);
});

db.once("open", () => {
  console.log("Database online");
});

const server = express()
server.use(express.json());
server.use("/api", routes);
server.use(cors());

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at port ${process.env.SERVER_PORT}`);
});
