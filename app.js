const express = require("express");
require("express-async-errors");
const app = express();
require("dotenv").config();
const notFoundMiddelware = require("./middelware/not-found");
const errorHandlerMiddleware = require("./middelware/error-handler");
const connectDB = require("./db/connect");
const prodcutRouter = require("./routes/products");
//middelwares

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(
    '<h1>Store APi </h1> <a href="/api/v1/products" Products route</a> '
  );
});
app.use("/api/v1/products", prodcutRouter);

app.use(notFoundMiddelware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("server is listening " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
