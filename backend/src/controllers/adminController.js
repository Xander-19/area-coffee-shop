const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Dashboard stats
exports.getDashboard = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalProducts, totalOrders, pendingOrders, todayOrders] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.order.findMany({ where: { createdAt: { gte: today } } }),
    ]);

    const todayRevenue = todayOrders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.totalPrice, 0);

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      completedToday: todayOrders.filter((o) => o.status === "completed").length,
      todayRevenue,
    });
  } catch (err) {
    next(err);
  }
};

// Orders management
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const where = {};
    if (status && status !== "all") where.status = status;
    if (search) where.customerName = { contains: search };

    const orders = await prisma.order.findMany({
      where,
      include: { items: { include: { product: true, size: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "preparing", "ready", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
      include: { items: { include: { product: true, size: true } } },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// Product management
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, categoryId, available, sizes } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image: image || null,
        categoryId: parseInt(categoryId),
        available: available !== false,
        sizes: sizes ? { create: sizes.map((s) => ({ label: s.label, priceAdd: parseFloat(s.priceAdd || 0) })) } : undefined,
      },
      include: { category: true, sizes: true },
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, categoryId, available, sizes } = req.body;
    const id = parseInt(req.params.id);

    if (sizes) {
      await prisma.size.deleteMany({ where: { productId: id } });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price !== undefined ? parseFloat(price) : undefined,
        image,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        available,
        sizes: sizes ? { create: sizes.map((s) => ({ label: s.label, priceAdd: parseFloat(s.priceAdd || 0) })) } : undefined,
      },
      include: { category: true, sizes: true },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.size.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

// Category management
exports.createCategory = async (req, res, next) => {
  try {
    const { name, image } = req.body;
    const category = await prisma.category.create({ data: { name, image } });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { name, image } = req.body;
    const category = await prisma.category.update({
      where: { id: parseInt(req.params.id) },
      data: { name, image },
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await prisma.category.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Category deleted" });
  } catch (err) {
    next(err);
  }
};

// Gallery management
exports.createGalleryImage = async (req, res, next) => {
  try {
    const { title, imageUrl, category, description } = req.body;
    const image = await prisma.galleryImage.create({
      data: { title, imageUrl, category, description },
    });
    res.status(201).json(image);
  } catch (err) {
    next(err);
  }
};

exports.updateGalleryImage = async (req, res, next) => {
  try {
    const { title, imageUrl, category, description } = req.body;
    const image = await prisma.galleryImage.update({
      where: { id: parseInt(req.params.id) },
      data: { title, imageUrl, category, description },
    });
    res.json(image);
  } catch (err) {
    next(err);
  }
};

exports.deleteGalleryImage = async (req, res, next) => {
  try {
    await prisma.galleryImage.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Gallery image deleted" });
  } catch (err) {
    next(err);
  }
};
