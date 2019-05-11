const express = require("express");

const server = express();

const PostRouter = require("./data/hubs/posts-router.js");

server.use(express.json());
server.use("/api/posts", PostRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Welcome to the Web API II Challenge Project!</h2>`);
});

module.exports = server;
