# Milk Management System (MERN)

## 1. Project Overview

This is a **Milk Management System** built using the MERN stack.

### Core Features Implemented

* Customer management (create, edit, soft delete, reactivate)
* Daily milk entry (morning / evening)
* Milk price management
* Monthly bill generation
* Partial payments with over‑payment prevention
* Customer‑wise ledger

  * Day‑wise milk ledger
  * Monthly billing summary
  * Payment history
* Admin dashboard

  * Today summary
  * Pending bills
  * Monthly collection

---

## 2. Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Frontend

* React (Vite)
* Axios
* React Router DOM

---

## 3. Folder Structure

### Backend (server)

```
backend/
│── controllers/
│   ├── admin.controller.js
│   ├── customer.controller.js
│   ├── milkEntry.controller.js
│   ├── milkPrice.controller.js
│   ├── monthlyBill.controller.js
│   ├── payment.controller.js
│
│── models/
│   ├── Customer.js
│   ├── MilkEntry.js
│   ├── MilkPrice.js
│   ├── MonthlyBill.js
│   ├── PaymentHistory.js
│
│── routes/
│   ├── admin.routes.js
│   ├── customer.routes.js
│   ├── milkEntry.routes.js
│   ├── milkPrice.routes.js
│   ├── monthlyBill.routes.js
│   ├── payment.routes.js
│
│── middleware/
│   └── auth.js
│
│── server.js
```

### Frontend

```
frontend/
│── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── admin.js
│   │   ├── customers.api.js
│   │   ├── milkEntry.api.js
│   │   ├── milkPrice.api.js
│   │   ├── monthlyBill.js
│   │   ├── payments.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Customers.jsx
│   │   ├── MonthlyBill.jsx
│   │   ├── CustomerLedger.jsx
│   │   ├── MilkEntry.jsx
│   │   ├── MilkPrice.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
```

---

## 4. Backend Setup Guide

### Prerequisites

Install the following **before running backend**:

* Node.js (LTS)
* MongoDB (local or Atlas)
* npm

### Backend Installation

```bash
cd backend
npm install
```

### Install dependencies
* npm install express mongoose dotenv cors

### Install dev dependency
* npm install nodemon
### Environment Variables

Create a `.env` file in `backend/`

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start Backend Server

```bash
npm start 
```
OR
```bash
npx nodemon server.js
```
Backend runs on:

```
http://localhost:3000
```

---

## 5. Backend API Endpoints

### Auth

```
POST /auth/login
POST /auth/register
```

---

### Customers

```
POST   /customers
GET    /customers                  // active customers
GET    /customers/inactive          // deactivated customers
PUT    /customers/:phone            // update customer
PUT    /customers/:phone/deactivate
PUT    /customers/:phone/reactivate
```

---

### Milk Entry

```
POST /milk-entry
GET  /milk-entry?date=YYYY-MM-DD
GET  /milk-entry/:customerPhone
```

---

### Milk Price

```
POST /milk_price
GET  /milk_price/current
GET  /milk_price/history
```

---

### Monthly Billing

```
POST /monthly-bill/generate
GET  /monthly-bill?month=YYYY-MM
PUT  /monthly-bill/status
```

---

### Payments

```
POST /payments
GET  /payments?customerPhone=PHONE&month=YYYY-MM
```

---

### Admin Dashboard

```
GET /admin/today-summary
GET /admin/pending-bills?month=YYYY-MM
GET /admin/monthly-collection?month=YYYY-MM
```

---

## 6. Frontend Setup Guide

### Prerequisites

Install before frontend:

* Node.js
* npm

### Frontend Installation

```bash
cd frontend
npm install
```
### Install dependencies
* npm install react-router-dom axios

### Axios Base URL

`src/api/axios.js`

```
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
```

### Start Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 7. Core Screens

### Admin Dashboard

* Today milk summary
* Pending bills
* Monthly billed / collected / pending

### Customers Page

* Add customer
* Edit customer
* Deactivate / Reactivate
* Ledger link

### Customer Ledger

Order of data:

1. Day‑wise milk ledger
2. Monthly billing summary
3. Payment history

### Monthly Billing Page

* Generate bills
* Partial payment
* Paid / unpaid tracking
* Over‑payment prevention

---

## 8. Payment Rules Implemented

* Payment **cannot exceed unpaid amount**
* Paid + unpaid always equals billed amount
* Bill auto‑marks paid when unpaid becomes zero
* All payments are recorded in PaymentHistory

---

## 9. Deployment Guide

### Backend Deployment

1. Set environment variables on server
2. Run `npm install`
3. Run `npm start`
4. Ensure MongoDB is accessible

### Frontend Deployment

1. Update Axios baseURL to backend URL
2. Run `npm run build`
3. Serve `dist/` folder using static hosting

---

## 10. Important Notes

* No customer is ever hard‑deleted
* Ledger remains intact even after deactivation
* All calculations are backend‑driven
* Frontend only reflects backend state

---


**End of README**
