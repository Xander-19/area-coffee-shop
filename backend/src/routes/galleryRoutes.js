const express = require("express");
const router = express.Router();
const { getAllImages, getImageById } = require("../controllers/galleryController");

router.get("/", getAllImages);
router.get("/:id", getImageById);

module.exports = router;
