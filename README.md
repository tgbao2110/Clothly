# Clothly

An end-to-end MERN-stack e-commerce site with role-based access (admin & customer), JWT auth, and optimized state management.
This project delivers a fully functional online clothing store.  
Users authenticate via JWT tokens stored in HTTP-only cookies (1-hour expiry).  
Admins manage products, banners, and orders.  
Customers browse, filter, add to cart, checkout, and manage their profile.

---

## Built-In Accounts

  # Admin
    Email: admin@gmail.com
    Password: 21102003

  # Customer
    Email: tranb6778@gmail.com
    Password: 21102003

---

## Tech Stack

| Layer            | Technology                                                      |
|------------------|-----------------------------------------------------------------|
| Backend          | Node.js, Express                                                |
| Auth             | JSON Web Tokens (JWT), Cookies, bcrypt.js                       |
| Database & Media | MongoDB Atlas, Cloudinary                                       |
| Frontend         | React, Vite, PostCSS + Tailwind                                 |
| UI & Icons       | shadcn/ui, lucide-react                                         |
| State Management | Redux Toolkit (store + asyncThunk), Axios                       |
| Notifications    | sonner                                                          |
| Patterns & Sync  | Config-driven UI, Optimistic UI (state first, API on submit)    |

---

## Tech Stack

## Features

| Section                  | Feature                     | Description                                                        |
|--------------------------|-----------------------------|--------------------------------------------------------------------|
| Authentication           | Register                    | Sign up with email & password; passwords hashed with bcrypt        |
|                          | Login                       | Sign in and receive JWT in an HTTP-only cookie                    |
| Admin – Products   | List Products               | Paginated product list with search                                 |
|                          | Create Product              | Add new products; upload images to Cloudinary                      |
|                          | Update Product              | Edit product details; manage image uploads/removals                |
|                          | Delete Product              | Remove products and their associated media                         |
|                          | Mark as Featured            | Toggle featured flag for homepage spotlight                        |
| Admin – Banners    | List Banners                | View all homepage banners                                          |
|                          | Create Banner               | Upload new banner images                                           |
|                          | Delete Banner               | Remove banners and clear media                                     |
| Admin – Orders     | List Orders                 | View all orders with detailed info                                 |
|                          | Update Order Status         | Change order status (pending → shipped → delivered)                |
| Customer – Home   | Hero Banners                | Auto-rotating homepage banners                                     |
|                          | Featured Products           | Display curated featured products                                  |
| Customer – Products | Browse Products           | View full product catalog                                          |
|                          | Filter Products             | Filter by category and brand                                       |
|                          | Sort Products               | Sort by name or price                                              |
| Customer – Product Detail | View Details       | View images, specs, and reviews                                    |
|                          | Add to Cart                 | Add items to shopping cart                                         |
|                          | Submit Review               | Post star rating and comment                                       |
| Customer – Cart   | View Cart                   | See current cart items                                             |
|                          | Update Quantity             | Adjust item quantities                                             |
|                          | Remove Item                 | Delete items from cart                                             |
|                          | Checkout (Placeholder)      | Placeholder for shipping & payment flow                            |
| Customer – Account| View Orders                 | Review past and current orders; cancel pending orders              |
|                          | Manage Addresses            | Create, update, or delete shipping addresses                       |
|                          | Update Profile              | Change username, email, or password                                |
| Customer – Checkout | Placeholder Flow          | Stub for future shipping and payment integration                   |


---

## Installation

1. Clone repository  
   ```bash
   git clone https://github.com/yourusername/ecommerce-clothing.git
   cd ecommerce-clothing

2. Create .env files in /server and /client
  # backend/.env
  SERVER_PORT=<port>
  MONGODB_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>
  CLOUDINARY_CLOUD_NAME=<name>
  CLOUDINARY_API_KEY=<key>
  CLOUDINARY_API_SECRET=<secret>

  # frontend/.env
  VITE_API_URL=http://localhost:<port>/api

3. Install dependencies and start servers:
  # In backend/
  npm install
  npm run dev

  # In frontend/
  npm install
  npm run dev

