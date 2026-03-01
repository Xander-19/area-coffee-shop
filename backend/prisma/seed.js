const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.size.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.galleryImage.deleteMany();

  // Categories
  const coffee = await prisma.category.create({ data: { name: "Coffee", image: "/images/categories/coffee.jpg" } });
  const tea = await prisma.category.create({ data: { name: "Tea", image: "/images/categories/tea.jpg" } });
  const frappe = await prisma.category.create({ data: { name: "Frappe", image: "/images/categories/frappe.jpg" } });
  const pastries = await prisma.category.create({ data: { name: "Pastries", image: "/images/categories/pastries.jpg" } });
  const food = await prisma.category.create({ data: { name: "Food", image: "/images/categories/food.jpg" } });

  // Coffee Products
  const espresso = await prisma.product.create({
    data: {
      name: "Espresso",
      description: "Rich and bold single shot of pure coffee essence",
      price: 90,
      image: "/images/products/espresso.jpg",
      categoryId: coffee.id,
      sizes: { create: [
        { label: "Single", priceAdd: 0 },
        { label: "Double", priceAdd: 30 },
      ]},
    },
  });

  await prisma.product.create({
    data: {
      name: "Cappuccino",
      description: "Creamy espresso with steamed milk and velvety foam",
      price: 130,
      image: "/images/products/cappuccino.jpg",
      categoryId: coffee.id,
      sizes: { create: [
        { label: "Small", priceAdd: 0 },
        { label: "Medium", priceAdd: 20 },
        { label: "Large", priceAdd: 40 },
      ]},
    },
  });

  await prisma.product.create({
    data: {
      name: "Cafe Latte",
      description: "Smooth espresso blended with steamed milk",
      price: 140,
      image: "/images/products/latte.jpg",
      categoryId: coffee.id,
      sizes: { create: [
        { label: "Small", priceAdd: 0 },
        { label: "Medium", priceAdd: 20 },
        { label: "Large", priceAdd: 40 },
      ]},
    },
  });

  await prisma.product.create({
    data: {
      name: "Americano",
      description: "Bold espresso with hot water for a clean, rich taste",
      price: 110,
      image: "/images/products/americano.jpg",
      categoryId: coffee.id,
      sizes: { create: [
        { label: "Small", priceAdd: 0 },
        { label: "Medium", priceAdd: 20 },
        { label: "Large", priceAdd: 40 },
      ]},
    },
  });

  await prisma.product.create({
    data: {
      name: "Mocha",
      description: "Espresso meets chocolate and steamed milk — a sweet indulgence",
      price: 150,
      image: "/images/products/mocha.jpg",
      categoryId: coffee.id,
      sizes: { create: [
        { label: "Small", priceAdd: 0 },
        { label: "Medium", priceAdd: 20 },
        { label: "Large", priceAdd: 40 },
      ]},
    },
  });

  // Tea Products
  await prisma.product.create({
    data: {
      name: "Matcha Latte",
      description: "Premium Japanese matcha with creamy steamed milk",
      price: 150,
      image: "/images/products/matcha.jpg",
      categoryId: tea.id,
      sizes: { create: [
        { label: "Small", priceAdd: 0 },
        { label: "Medium", priceAdd: 20 },
        { label: "Large", priceAdd: 40 },
      ]},
    },
  });

  await prisma.product.create({
    data: {
      name: "Chai Tea Latte",
      description: "Spiced chai brewed with warm milk and a hint of sweetness",
      price: 140,
      image: "/images/products/chai.jpg",
      categoryId: tea.id,
      sizes: { create: [
        { label: "Small", priceAdd: 0 },
        { label: "Medium", priceAdd: 20 },
        { label: "Large", priceAdd: 40 },
      ]},
    },
  });

  await prisma.product.create({
    data: {
      name: "Earl Grey",
      description: "Classic bergamot-infused black tea, served hot or iced",
      price: 100,
      image: "/images/products/earlgrey.jpg",
      categoryId: tea.id,
      sizes: { create: [
        { label: "Regular", priceAdd: 0 },
        { label: "Large", priceAdd: 20 },
      ]},
    },
  });

  // Frappe Products
  await prisma.product.create({
    data: {
      name: "Caramel Frappe",
      description: "Blended iced coffee with caramel syrup and whipped cream",
      price: 170,
      image: "/images/products/caramel-frappe.jpg",
      categoryId: frappe.id,
      sizes: { create: [
        { label: "Medium", priceAdd: 0 },
        { label: "Large", priceAdd: 30 },
      ]},
    },
  });

  await prisma.product.create({
    data: {
      name: "Java Chip Frappe",
      description: "Mocha blended with chocolate chips and topped with cream",
      price: 180,
      image: "/images/products/javachip.jpg",
      categoryId: frappe.id,
      sizes: { create: [
        { label: "Medium", priceAdd: 0 },
        { label: "Large", priceAdd: 30 },
      ]},
    },
  });

  await prisma.product.create({
    data: {
      name: "Vanilla Frappe",
      description: "Creamy vanilla bean blended with ice and espresso",
      price: 165,
      image: "/images/products/vanilla-frappe.jpg",
      categoryId: frappe.id,
      sizes: { create: [
        { label: "Medium", priceAdd: 0 },
        { label: "Large", priceAdd: 30 },
      ]},
    },
  });

  // Pastries
  await prisma.product.create({
    data: {
      name: "Butter Croissant",
      description: "Flaky, golden-baked French croissant with pure butter",
      price: 85,
      image: "/images/products/croissant.jpg",
      categoryId: pastries.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Blueberry Muffin",
      description: "Soft muffin bursting with fresh blueberries",
      price: 95,
      image: "/images/products/muffin.jpg",
      categoryId: pastries.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Chocolate Cake Slice",
      description: "Rich, moist chocolate cake with ganache frosting",
      price: 130,
      image: "/images/products/choco-cake.jpg",
      categoryId: pastries.id,
    },
  });

  // Food
  await prisma.product.create({
    data: {
      name: "Club Sandwich",
      description: "Triple-decker with chicken, bacon, lettuce, and tomato",
      price: 180,
      image: "/images/products/club-sandwich.jpg",
      categoryId: food.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Chicken Panini",
      description: "Grilled panini with chicken, pesto, and mozzarella",
      price: 195,
      image: "/images/products/panini.jpg",
      categoryId: food.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Caesar Salad",
      description: "Crisp romaine, parmesan, croutons, and creamy Caesar dressing",
      price: 160,
      image: "/images/products/caesar-salad.jpg",
      categoryId: food.id,
    },
  });

  // Sample Orders
  const products = await prisma.product.findMany({ include: { sizes: true } });
  const cappuccino = products.find(p => p.name === "Cappuccino");
  const croissant = products.find(p => p.name === "Butter Croissant");
  const matcha = products.find(p => p.name === "Matcha Latte");

  await prisma.order.create({
    data: {
      customerName: "Juan Dela Cruz",
      customerPhone: "09171234567",
      pickupTime: "10:30 AM",
      status: "completed",
      totalPrice: 345,
      items: { create: [
        { quantity: 2, price: 130, sugar: "normal", productId: cappuccino.id, sizeId: cappuccino.sizes[0].id },
        { quantity: 1, price: 85, productId: croissant.id },
      ]},
    },
  });

  await prisma.order.create({
    data: {
      customerName: "Maria Santos",
      customerPhone: "09189876543",
      pickupTime: "11:00 AM",
      notes: "Less ice please",
      status: "preparing",
      totalPrice: 300,
      items: { create: [
        { quantity: 2, price: 150, sugar: "less", productId: matcha.id, sizeId: matcha.sizes[1].id },
      ]},
    },
  });

  await prisma.order.create({
    data: {
      customerName: "Pedro Reyes",
      customerPhone: "09201112233",
      pickupTime: "11:30 AM",
      status: "pending",
      totalPrice: 460,
      items: { create: [
        { quantity: 1, price: 150, sugar: "normal", productId: cappuccino.id, sizeId: cappuccino.sizes[2].id },
        { quantity: 1, price: 180, productId: products.find(p => p.name === "Club Sandwich").id },
        { quantity: 1, price: 130, productId: products.find(p => p.name === "Chocolate Cake Slice").id },
      ]},
    },
  });

  // Gallery Images
  const galleryImages = [
    { title: "Morning Brew", imageUrl: "/images/gallery/morning-brew.jpg", category: "drinks", description: "Starting the day right with a perfect pour" },
    { title: "Latte Art", imageUrl: "/images/gallery/latte-art.jpg", category: "drinks", description: "Our baristas' beautiful latte art creations" },
    { title: "Cozy Corner", imageUrl: "/images/gallery/cozy-corner.jpg", category: "shop", description: "The perfect spot to relax and enjoy your coffee" },
    { title: "Our Coffee Bar", imageUrl: "/images/gallery/coffee-bar.jpg", category: "shop", description: "Where the magic happens" },
    { title: "Community Night", imageUrl: "/images/gallery/community-night.jpg", category: "events", description: "Monthly open mic nights at Area Coffee" },
    { title: "Fresh Pastries", imageUrl: "/images/gallery/fresh-pastries.jpg", category: "food", description: "Baked fresh every morning" },
    { title: "Coffee Tasting", imageUrl: "/images/gallery/coffee-tasting.jpg", category: "events", description: "Exploring single-origin flavors together" },
    { title: "Our Team", imageUrl: "/images/gallery/our-team.jpg", category: "community", description: "The passionate people behind every cup" },
  ];

  for (const img of galleryImages) {
    await prisma.galleryImage.create({ data: img });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
