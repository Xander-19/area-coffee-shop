const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");

// Dashboard
router.get("/dashboard", admin.getDashboard);

// Orders
router.get("/orders", admin.getAllOrders);
router.patch("/orders/:id", admin.updateOrderStatus);

// Products
router.post("/menu", admin.createProduct);
router.put("/menu/:id", admin.updateProduct);
router.delete("/menu/:id", admin.deleteProduct);

// Categories
router.post("/categories", admin.createCategory);
router.put("/categories/:id", admin.updateCategory);
router.delete("/categories/:id", admin.deleteCategory);

// Gallery
router.post("/gallery", admin.createGalleryImage);
router.put("/gallery/:id", admin.updateGalleryImage);
router.delete("/gallery/:id", admin.deleteGalleryImage);

module.exports = router;
