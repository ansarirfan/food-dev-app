# Food Delivery App 🍔🍕🥡

![License](https://img.shields.io/github/license/username/food-delivery-app)
![Issues](https://img.shields.io/github/issues/username/food-delivery-app)
![Forks](https://img.shields.io/github/forks/username/food-delivery-app)
![Stars](https://img.shields.io/github/stars/username/food-delivery-app)

A full-stack food delivery application built using the MERN stack with React + Vite on the frontend. This app allows users to browse restaurants, order food, and securely make payments via Stripe.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Payment Integration (Stripe)](#payment-integration-stripe)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- 🛒 Browse restaurants and menus
- 📦 Place orders and track deliveries
- 💳 Secure payment integration with Stripe
- 🔍 Filter by cuisine, price, and delivery time
- 🧾 Order history and invoice generation

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Payment Integration**: Stripe
- **Authentication**: JWT (JSON Web Tokens)

## Demo

You can check out the live demo here:  [https://food-dev-app-admin.onrender.com)](https://food-dev-app-admin.onrender.com)
<br />
You can check out the live demo here:  [https://food-dev-app.onrender.com](https://food-dev-app.onrender.com/)
<hr />

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version >= 14.x)
- [MongoDB](https://www.mongodb.com/) (Local or cloud-based like MongoDB Atlas)
- [Stripe Account](https://stripe.com/) (for payment processing)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/username/food-delivery-app.git
    ```

2. Navigate to the `backend` directory:
    ```bash
    cd food-delivery-app/backend
    ```

3. Install the backend dependencies:
    ```bash
    npm install
    ```

4. Set up your MongoDB and Stripe API credentials (see [Environment Variables](#environment-variables)).

5. Start the backend server:
    ```bash
    npm run dev
    ```

By default, the backend will run on [http://localhost:5000](http://localhost:5000).

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install the frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

The frontend will run on [http://localhost:5273](http://localhost:5274).

## Environment Variables

To run this project, you need to set up the following environment variables:

### Backend (`/backend/.env`)

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/food-delivery-app
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
