const express = require("express");

const server = express();

// const PostRouter = require("/hubs/posts-router.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Welcome to the Web API II Challenge Project!</h2>`);
});

module.exports = server;
