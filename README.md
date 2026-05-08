# MiniPay - A Modern Payment Transfer Application

## 📝 Project Overview

**MiniPay** is a full-stack TypeScript payment transfer application built as a learning project to understand modern web development practices, database transactions, and secure authentication mechanisms. It allows users to create accounts, view their balance, and transfer money securely to other users.

This is **Version 1 (v1)** of the project, focusing on core functionality and foundational concepts.

---

## ✨ Features (v1)

### Authentication & User Management
- **User Signup**: Register new users with username, password, first name, and last name
- **User Login**: Secure authentication using JWT tokens and password hashing
- **Session Management**: JWT-based session tokens for maintaining authenticated state

### Core Features
- **Balance Display**: View current account balance on the dashboard
- **User Discovery**: Browse and see a list of other users in the system
- **Money Transfer**: Send money to other users with real-time balance updates
- **Validation**: Input validation using Zod for type-safe data handling

### Security Features
- **Password Hashing**: Secure password storage using bcrypt
- **JWT Authentication**: Token-based authentication for protected routes
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend-backend communication

---

## 🏗️ Project Architecture

### Tech Stack

#### Frontend (Client)
- **Framework**: React 19.x with TypeScript
- **Build Tool**: Vite (next-generation frontend build tool)
- **Styling**: Tailwind CSS 4.x for utility-first CSS
- **HTTP Client**: Axios for API requests
- **Routing**: React Router DOM v7.x for client-side navigation
- **Environment**: Node.js/npm-based build pipeline

**File Structure**:
```
client/
├── src/
│   ├── pages/           # Page components (Signup, Signin, Dashboard, SendMoney)
│   ├── components/      # Reusable UI components
│   │   ├── auth/       # Authentication-related components
│   │   └── dashboard/  # Dashboard-related components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions (axios config, etc.)
│   └── main.tsx        # React entry point
├── vite.config.ts      # Vite configuration
└── tailwind.config.*   # Tailwind CSS configuration
```

#### Backend (Server)
- **Framework**: Express.js 5.x with TypeScript
- **Runtime**: Bun (JavaScript runtime)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: jsonwebtoken (JWT) for token generation
- **Password Security**: bcrypt for password hashing
- **Data Validation**: Zod for schema validation
- **CORS**: Cross-origin resource sharing middleware
- **Environment**: .env configuration with dotenv

**File Structure**:
```
server/
├── src/
│   ├── index.ts              # Express app setup and server startup
│   ├── connect.ts            # MongoDB connection logic
│   ├── middleware.ts         # Auth middleware (JWT verification)
│   ├── types.ts              # Zod validation schemas
│   ├── config/
│   │   ├── jwt.ts           # JWT token signing/verification
│   │   └── password.ts      # Password hashing/comparison
│   ├── models/              # Mongoose schemas
│   │   ├── user.ts          # User schema (username, password, name)
│   │   └── account.ts       # Account schema (userId, balance)
│   └── routes/              # API endpoints
│       ├── user.ts          # /user routes (signup, signin, getUsers)
│       └── account.ts       # /account routes (balance, transfer)
└── tsconfig.json
```

### API Endpoints

#### User Routes (`/user`)
- `POST /user/signup` - Register a new user
- `POST /user/signin` - Login and get JWT token
- `GET /user/bulk` - Get list of all users (paginated)

#### Account Routes (`/account`)
- `GET /account/balance` - Get user's current balance (requires auth)
- `POST /account/transfer` - Transfer money to another user (requires auth)

### Database Schema

#### User Collection
```typescript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed),
  firstName: String (min 3 chars),
  lastName: String (min 3 chars),
  createdAt: Date
}
```

#### Account Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref to User, unique),
  balance: Number (default: 0)
}
```

---

## 🎓 Learning Outcomes - Key Concepts in This Project

### 1. **MongoDB Transactions & ACID Compliance**
The transfer feature demonstrates **database transactions** - a critical concept for maintaining data consistency during complex operations.

**Location**: `server/src/routes/account.ts` - `/account/transfer` endpoint

**How it works**:
```typescript
const session = await mongoose.startSession();
session.startTransaction();
try {
  // Query 1: Get sender's account
  const fromAccount = await AccountModel.findOne({...}).session(session);
  
  // Query 2: Get receiver's account
  const toAccount = await AccountModel.findOne({...}).session(session);
  
  // Update 1: Deduct from sender
  await AccountModel.updateOne({...}).session(session);
  
  // Update 2: Add to receiver
  await AccountModel.updateOne({...}).session(session);
  
  // Commit all changes atomically
  await session.commitTransaction();
} catch (err) {
  // Rollback all changes if any operation fails
  await session.abortTransaction();
} finally {
  await session.endSession();
}
```

**Why it matters**: Without transactions, a network failure between the deduct and add operations could lose money. Transactions ensure either all operations succeed or all fail together.

### 2. **JWT Authentication & Session Management**
Learn how to create secure user sessions without storing session data on the server.

**Location**: `server/src/config/jwt.ts` and `server/src/routes/user.ts` (signup/signin)

**How it works**:
- User signs up → Password is hashed with bcrypt
- User signs in → Password is verified against hash
- JWT token is generated containing userId
- Token is sent to client and stored (localStorage)
- On each request, token is verified by auth middleware

**Benefits**: Stateless authentication, scalable, works well with microservices

### 3. **Password Hashing with Bcrypt**
Understanding why plain-text passwords are dangerous and how bcrypt secures them.

**Location**: `server/src/config/password.ts`

**Concepts**:
- One-way hashing (can't be reversed)
- Salt rounds for additional security
- Comparison without revealing original password

### 4. **Data Validation & Type Safety**
Using Zod for runtime validation and TypeScript for compile-time type checking.

**Location**: `server/src/types.ts`

**Benefits**:
- Catch invalid data before database operations
- Type-safe throughout the stack
- Clear API contracts

### 5. **Frontend-Backend Communication**
- HTTP requests with Axios
- Token-based authentication headers
- Error handling and user feedback

### 6. **React Hooks & State Management**
- `useState` for component state
- `useEffect` for side effects (fetching data)
- `useNavigate` and `useSearchParams` for routing

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Bun (for server runtime) or Node.js with npm
- MongoDB (local or cloud instance)

### Installation

#### Setup Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/minipay
JWT_SECRET=your-secret-key-here
```

#### Install Dependencies
```bash
# Client
cd client
npm install

# Server
cd ../server
npm install  # or bun install
```

#### Run the Application
```bash
# Terminal 1: Start the server
cd server
npm run dev  # or bun --watch src/index.ts

# Terminal 2: Start the client
cd client
npm run dev
```

The application will be available at:
- **Client**: http://localhost:5173 (Vite default)
- **Server**: http://localhost:3000

---

## 📚 Project Workflow

1. **User Signs Up** → Server creates User + Account with random initial balance
2. **User Signs In** → Validates password, returns JWT token
3. **View Dashboard** → Fetches balance and list of users
4. **Send Money** → Initiates atomic transaction:
   - Locks both accounts
   - Deducts from sender
   - Adds to receiver
   - Commits or rolls back atomically

---

## 🔮 Future Enhancements (v2+)
- Transaction history and receipts
- Real-time notifications
- Rate limiting and fraud detection
- Mobile app
- Payment analytics and statistics
- 2FA authentication
- Database indexing optimization

---

## 📖 Learning Resources Referenced
- Mongoose Documentation (Schema, Models, Sessions)
- Express.js Best Practices (Middleware, Routes)
- JWT.io (Token-based authentication)
- Zod (Runtime type validation)
- React Documentation (Hooks, Router)

---

## 💡 Key Takeaways
This project demonstrates how to build a production-ready backend with proper transaction handling, authentication, and data validation. The focus on database transactions makes it an excellent learning project for understanding ACID compliance and why state management matters in financial applications.

---

**Version**: 1.0.0  
**Last Updated**: May 2026
