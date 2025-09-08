Here’s your README.md content properly formatted and cleaned up, ready to upload to GitHub:

````markdown
# RDR Store

RDR Store is a full-stack e-commerce web application built with **React**, **React-Bootstrap**, **Node.js**, **Express**, and **MongoDB Atlas**. It allows users to browse products, add them to a cart, and checkout. Users can also create, edit, and delete their own products. This project was developed as part of an internship selection process assignment.

---

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Constraints / Limitations](#constraints--limitations)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)

- [License](#license)

---

## Demo
> Add your deployed app link here or include screenshots below.

---

## Features

### 1. User Authentication
- Signup/Login with email and password.
- Protected routes: Only logged-in users can access product creation, cart, and checkout pages.
- Users can only edit or delete products they created.

### 2. Product Management
- CRUD operations (Create, Read, Update, Delete) for products.
- Product fields: title, description, price, category, and image link.
- Filter products by **category** and **price range**.
- Responsive product cards for mobile and desktop.

### 3. Shopping Cart
- Add products to cart.
- Update quantity or remove products from cart.
- Dynamic subtotal per product and total for all products.
- Clear entire cart with one click.

### 4. Checkout
- Simulated payment and total calculation.
- Cart is cleared after checkout.
- Prevent checkout if cart is empty.

### 5. UI & Animations
- Responsive design using **React-Bootstrap**.
- Animations using **Framer Motion** for page transitions and buttons.
- Notifications using **React Hot Toast** for success and error messages.

---

## Constraints / Limitations
- Only image **URLs** are supported; file uploads to server are not implemented.
- Checkout is simulated; no real payment gateway integration.
- Single MongoDB Atlas database; no multi-environment support.
- No admin roles; all users can only modify their own products.
- Basic JWT-based authentication; advanced security features like email verification are not implemented.
- Designed for small-scale usage; not optimized for large-scale products or high concurrency.

---

## Installation

### Step 1: Clone the repository
```bash
git clone git@github.com:divyTechS/RDR-Store.git
cd RDR-Store
````

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder with the following content:

```
PORT=5000
MONGO_URI=<Your MongoDB Atlas Connection String>
JWT_SECRET=<Your JWT Secret>
```

Start the backend server:

```bash
npm run dev
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Step 4: Access the Application

Open your browser and go to: `http://localhost:5173`
Signup or login to start using the app.

---

## Usage

* Signup or login to access protected pages.
* Browse products on the home page.
* Add products to your cart.
* Checkout to simulate payment.
* Create, edit, or delete products if you are the creator.

---

## Folder Structure

```
RDR-Store/
├─ backend/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ config/
│  └─ server.js
├─ frontend/
│  ├─ src/
│  ├─ public/
│  └─ package.json
├─ .env
└─ README.md
```

---

## Technologies Used

* **Frontend:** React, React-Bootstrap, React-Router, Framer Motion, React Hot Toast
* **Backend:** Node.js, Express, MongoDB, Mongoose
* **Authentication:** JWT
* **Others:** Axios, dotenv, cors, cookie-parser



## License

This project is for educational purposes and internship assignment only.

