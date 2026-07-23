# 🏨 Booking API

Backend API for hotel booking system.

REST API приложение для управления отелями, комнатами и бронированиями.

Проект построен с использованием Node.js, Express и PostgreSQL.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation
- Swagger Documentation
- bcrypt
- Git

---

## 📌 Features

### Authentication
- User registration
- User login
- JWT access token
- Protected routes
- Logout
- Refresh token

### Hotels
- Create hotel
- Get all hotels
- Get hotel by ID
- Update hotel
- Delete hotel
- Owner authorization

### Rooms
- Create room
- Get all rooms
- Get room by ID
- Update room
- Delete room
- Hotel relation

### Bookings
- Create booking
- Get user bookings
- Get booking by ID
- Update booking
- Delete booking
- Booking ownership validation

---

## 🔐 Authorization

The project uses JWT authentication.

Protected routes require:

```
Authorization: Bearer <token>
```

---

## 📂 Project Structure

```
Booking_API
│
├── modules
│   ├── auth
│   ├── hotel
│   ├── room
│   └── booking
│
├── middleware
│   ├── auth.middleware.ts
│   └── validation.middleware.ts
│
├── prisma
│   └── schema.prisma
│
├── config
│
├── utils
│
├── app.ts
├── server.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄 Database Models

Main Prisma models:

```
User
 |
 └── Hotel
        |
        └── Room
              |
              └── Booking
```

Relations:

- User can create multiple hotels
- Hotel has multiple rooms
- User can create multiple bookings
- Room can have multiple bookings

---

## ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/username/booking-api.git
```

Install dependencies:

```bash
npm install
```

---



## 🛠 Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

## ▶️ Run Project

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

---

## 📖 API Documentation

Swagger documentation available:

```
http://localhost:3000/api-docs
```

API includes documentation for:

- Auth endpoints
- Hotel endpoints
- Room endpoints
- Booking endpoints

---

## 📌 API Endpoints

### Auth

```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
```

### Hotels

```
GET    /hotels
GET    /hotels/:id
POST   /hotels
PUT    /hotels/:id
DELETE /hotels/:id
```

### Rooms

```
GET    /rooms
GET    /rooms/:id
POST   /rooms
PUT    /rooms/:id
DELETE /rooms/:id
```

### Bookings

```
GET    /bookings
GET    /bookings/:id
POST   /bookings
PUT    /bookings/:id
DELETE /bookings/:id
```

---

## 🧪 Validation

Request validation is implemented using Zod schemas.

Examples:

- Register validation
- Login validation
- Hotel validation
- Room validation
- Booking validation

---

## 🔒 Security

Implemented:

- JWT authentication
- Password hashing with bcrypt
- Protected routes
- Authorization checks
- Input validation

---

## 👨‍💻 Author

**Artur Arzumanyan**

Backend Developer

GitHub:
github.com/arturarzumanyan300-afk
