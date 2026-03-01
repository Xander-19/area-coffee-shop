const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, search, available } = req.query;
    const where = {};

    if (category) where.categoryId = parseInt(category);
    if (available !== undefined) where.available = available === "true";
    if (search) where.name = { contains: search };

    const products = await prisma.product.findMany({
      where,
      include: { category: true, sizes: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { category: true, sizes: true },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};
