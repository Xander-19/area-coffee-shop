# Area Coffee Shop - Web Application

A modern web application for Area Coffee Shop featuring an information website and ordering system.

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS v4
- **Backend:** Node.js + Express
- **Database:** SQLite (via Prisma ORM)
- **Styling:** Tailwind CSS with dark/light mode

## Project Structure

```
area-coffee-shop/
├── frontend/
│   ├── customer/    # Customer-facing app (port 5173)
│   └── admin/       # Admin dashboard app (port 5174)
├── backend/         # API server (port 3000)
└── README.md
```

## Getting Started

### 1. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

The API server runs at `http://localhost:3000`.

### 2. Customer App

```bash
cd frontend/customer
npm install
npm run dev
```

Opens at `http://localhost:5173`.

### 3. Admin App

```bash
cd frontend/admin
npm install
npm run dev
```

Opens at `http://localhost:5174`.

## Features

### Customer App
- Home page with hero, featured drinks, and shop info
- Full menu with category filters, search, and ordering
- Shopping cart with size/sugar customization
- Checkout with order placement
- Order status tracking with live updates
- Photo gallery with lightbox viewer
- About and Contact pages
- Dark/Light mode toggle

### Admin Dashboard
- Dashboard with stats (orders, revenue, products)
- Order management with status updates
- Menu management (CRUD for products and sizes)
- Category management
- Gallery management
- Dark/Light mode toggle

## Database

View the database using Prisma Studio:

```bash
cd backend
npx prisma studio
```

Opens at `http://localhost:5555`.
