const express = require("express");

const db = require("../db.js");

const router = express.Router();

// Returns an array of all the post objects contained in the database.

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

//Returns the post object with the specified id.
router.get("/:id", async (req, res) => {
  try {
    const hub = await db.findById(req.params.id);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The post information could not be retrieved."
    });
  }
});

// Creates a post using the information sent inside the request body.
router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  try {
    if (title || contents) {
      const newPost = await db.insert(req.body);
      res.status(201).json(newPost);
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post"
      });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "There was an error while saving the post to the database."
    });
  }
});

//Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been nuked" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The post could not be removed"
    });
  }
});

//Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  try {
    if (title && contents) {
      const updatedPost = await db.update(id, req.body);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    } else {
      // log error to database
      console.log(error);
      res.status(400).json({
        message: "Please provide title and contents for the post."
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified" });
  }
});

module.exports = router;
