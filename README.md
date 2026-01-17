<img src="https://res.cloudinary.com/db0qkzn6a/image/upload/v1768657003/gitdocs/user_38MuOC7m60GfDZ9rIMvS1YG9V5Y/images/wyvuloiqspmqmq6cfwnz.png" alt="Food Delivery App hero image">

# Food Delivery App — Full Stack (Frontend, Admin, Backend)

A full‑stack food delivery application (React + Vite frontends, Node.js + Express backend, MongoDB) with JWT authentication, image upload support and Stripe Checkout for payments. The repository contains three separate apps:

- frontend — customer-facing React app
- admin — admin panel for managing menu and orders
- backend — API server, data models, auth, Stripe integration

Quick links (if deployed):
- Admin demo: https://food-dev-app-admin.onrender.com
- Frontend demo: https://food-dev-app.onrender.com

---

## Table of contents
- Quick start
- Architecture overview
- Environment variables
- Run locally (backend, frontend, admin)
- API reference (essential endpoints + examples)
- Stripe integration & flow
- Images / uploads
- Troubleshooting
- Contributing & License
- Contact

---

## Quick start

Clone repository and start each service separately.

```bash
git clone https://github.com/ansarirfan/food-dev-app.git
cd food-dev-app
```

Run backend:
```bash
cd backend
# install
npm install
# run (uses nodemon)
npm start
# default: http://localhost:4000
```

Run frontend (customer):
```bash
cd ../frontend
npm install
npm run dev
# Vite will report the dev URL, commonly http://localhost:5173
```

Run admin panel:
```bash
cd ../admin
npm install
npm run dev
# Vite will report the dev URL (check terminal)
```

---

## Architecture overview

- Backend (Node.js + Express)
  - Routes: /api/food, /api/user, /api/cart, /api/order
  - Controllers handle user auth (register/login), food CRUD (admin), cart operations, orders and Stripe checkout session creation
  - Images uploaded to backend/uploads are served statically at /images
- Frontend and Admin
  - Two separate React + Vite projects — run them simultaneously for full local testing
- Database: MongoDB (Mongoose models in backend/models)
- Authentication: JWT tokens returned on register/login. Protected routes expect token header `token: <JWT>`.

---

## Environment variables

Create a `.env` file in the backend folder (`/backend/.env`) with at least:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/food-dev
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx   # optional, if using webhook verification
PORT=4000                         # optional
```

Notes:
- The backend currently uses a hard-coded MongoDB connection string in `backend/config/db.js`; replace it to use MONGO_URI there or update the file to read process.env.MONGO_URI.
- The Stripe Checkout flow in `orderController.js` uses a hard-coded `frontend_url = "http://localhost:5174"`. Update this to an environment variable or to the actual frontend URL in production.

---

## Run details & helpful commands

- Backend start (nodemon): `npm start` from backend folder.
- Frontend dev: `npm run dev` from frontend folder.
- Admin dev: `npm run dev` from admin folder.
- Build (frontend/admin): `npm run build`.
- Linting available in frontend/admin via their package.json (see scripts).

Backend serves static images at:
- http://localhost:4000/images/<filename>

---

## API reference (essential)

All endpoints are relative to the backend base (e.g. http://localhost:4000).

Headers for protected routes:
- token: <JWT token returned from /api/user/login or /api/user/register>

1) User — register / login
- Register
  - POST /api/user/register
  - Body (JSON): { "name": "John", "email": "john@example.com", "password": "strongpassword" }
  - Response: { success: true, token: "<jwt>" }

- Login
  - POST /api/user/login
  - Body (JSON): { "email": "john@example.com", "password": "strongpassword" }
  - Response: { success: true, token: "<jwt>" }

Example curl:
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"password123"}'
```

2) Food (menu)
- List foods (public)
  - GET /api/food/list
  - Response: { success: true, data: [ ...food items... ] }

- Add food (admin)
  - POST /api/food/add
  - Content-Type: multipart/form-data
  - Fields:
    - name (string), description (string), price (number), category (string), image (file)
  - Example with curl:
```bash
curl -X POST http://localhost:4000/api/food/add \
  -F "name=Margherita" \
  -F "description=Classic cheesy pizza" \
  -F "price=399" \
  -F "category=Pizza" \
  -F "image=@/path/to/food_image.png"
```

- Remove food (admin)
  - POST /api/food/remove
  - Body (JSON): { "id": "<foodId>" }

3) Cart
- Add to cart (protected)
  - POST /api/cart/add
  - Body (JSON): { "userId": "<userId>", "itemId": "<foodId>" }
  - Header: token: <jwt>

- Get cart (protected)
  - POST /api/cart/get
  - Body (JSON): { "userId": "<userId>" }

- Remove from cart (protected)
  - POST /api/cart/remove
  - Body (JSON): { "userId": "<userId>", "itemId": "<foodId>" }

4) Orders
- Place order (protected) — triggers Stripe Checkout session
  - POST /api/order/place
  - Body (JSON): {
      "userId": "<userId>",
      "items": [{ "name":"Pizza", "price": 399, "quantity": 2, "itemId":"..." }, ...],
      "amount": 798,
      "address": "Delivery address"
    }
  - Response: { success: true, session_url: "<stripe_checkout_url>" }
  - After checkout, Stripe redirects to `frontend_url/verify?success=true&orderId=<id>` or cancel URL.

- Verify order (called by frontend after redirect)
  - POST /api/order/verify
  - Body (JSON): { "orderId":"<id>", "success":"true"|"false" }
  - Marks order.payment true if success, deletes order if not paid.

- User orders (protected)
  - POST /api/order/userOrder
  - Body (JSON): { "userId": "<userId>" }

- List all orders (admin)
  - GET /api/order/list

- Update order status (admin)
  - POST /api/order/status
  - Body (JSON): { "orderId": "<orderId>", "status": "<newStatus>" }

Authentication middleware (backend/middleware/auth.js):
- Expects header `token` containing the JWT.
- On success sets req.body.userId to the authenticated user id.

---

## Stripe integration & notes

- Backend sends a Stripe Checkout session using server-side secret key (STRIPE_SECRET_KEY).
- `orderController.placeOrder` creates line items from order items and adds a "Delivery Charge" item.
- The created session's success and cancel URLs are set using `frontend_url` (currently hard-coded to http://localhost:5174). Update it to your actual frontend URL or replace with an environment variable if deploying.
- After the customer completes checkout, the frontend should call `/api/order/verify` with orderId and success flag so the backend can mark payment status.

Security & webhooks:
- For robust production integration, verify Stripe webhooks (STRIPE_WEBHOOK_SECRET) and update order/payment status from webhook events rather than relying on the redirect flow alone.

---

## Images & uploads

- Uploaded images are saved to `backend/uploads` and served via the server static route:
  - URL: http://localhost:4000/images/<filename>
- In food items, the `image` field stores the filename. Compose the full image URL with the backend host as above.

---

## Troubleshooting & tips

- MongoDB connection:
  - If the app fails to connect, verify your MONGO_URI or update `backend/config/db.js` to use process.env.MONGO_URI.
- JWT token:
  - Protected routes require `token` header — ensure you include it exactly as `token: <your_jwt>`.
- CORS:
  - Backend enables CORS globally. If hosting frontend separately, adjust CORS policy as needed.
- Stripe Checkout:
  - For local testing, use Stripe test keys. Check that `STRIPE_SECRET_KEY` is set in `.env`.
  - The redirect URL for checkout is currently hard-coded — update it for production.
- File uploads:
  - When adding food via admin, ensure Content-Type is `multipart/form-data`.

---

## Contributing

Contributions are welcome. Suggested workflow:
- Fork the repository
- Create a feature branch (feature/your-change)
- Commit and open a PR with a clear description of changes
- If adding endpoints or changing env requirements, update this README

Please include tests where possible.

---

## License

No repository-wide LICENSE file is present. The backend package.json lists "ISC". If you plan to reuse or publish this project, add a LICENSE file (MIT, ISC, or other) to the repository.

---

## Contact

Repository: https://github.com/ansarirfan/food-dev-app

If you need help setting this up locally or want to contribute features (webhooks, CI, Docker), open an issue or pull request.

Enjoy building and customizing the Food Delivery App!
