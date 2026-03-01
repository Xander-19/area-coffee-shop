const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllImages = async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    res.json(images);
  } catch (err) {
    next(err);
  }
};

exports.getImageById = async (req, res, next) => {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!image) return res.status(404).json({ error: "Image not found" });
    res.json(image);
  } catch (err) {
    next(err);
  }
};
