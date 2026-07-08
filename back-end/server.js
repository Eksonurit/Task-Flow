import express from "express";

const app = express();

app.use("/", async (req, res, next) => {
  res.write("<h1>Hello Express</h1>");
  next();
});

app.get("/123", async (req, res) => {
  res.end("<h2>123</h2>");
});

app.listen(3005);
