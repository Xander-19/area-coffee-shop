const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createOrder = async (req, res, next) => {
  try {
    const { customerName, customerPhone, pickupTime, notes, items } = req.body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { sizes: true },
      });
      if (!product) return res.status(400).json({ error: `Product ${item.productId} not found` });

      let itemPrice = product.price;
      if (item.sizeId) {
        const size = product.sizes.find((s) => s.id === item.sizeId);
        if (size) itemPrice += size.priceAdd;
      }

      totalPrice += itemPrice * item.quantity;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice,
        sugar: item.sugar || null,
        sizeId: item.sizeId || null,
      });
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        pickupTime: pickupTime || null,
        notes: notes || null,
        totalPrice,
        items: { create: orderItems },
      },
      include: { items: { include: { product: true, size: true } } },
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { items: { include: { product: true, size: true } } },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
};
