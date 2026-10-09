# AlgoMorph Backend API

Express.js + MongoDB backend for AlgoMorph DSA learning platform.

## Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Copy `.env.example` to `.env`
3. Update `.env` with your MongoDB URI and JWT secret
4. `npm install`
5. `npm run dev`

Server runs on http://localhost:5000

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/dashboard` - Get dashboard stats
- `GET /api/users/leaderboard` - Get top users

### Algorithms
- `GET /api/algorithms` - Get all algorithms
- `GET /api/algorithms/:id` - Get specific algorithm
- `GET /api/algorithms/category/:category` - Get algorithms by category

### Progress
- `GET /api/progress/user` - Get user progress
- `GET /api/progress/algorithm/:algorithmId` - Get progress for algorithm
- `POST /api/progress/update` - Update progress
- `POST /api/progress/quiz/submit` - Submit quiz answers

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId` - Get user details with progress
- `GET /api/admin/summary` - Get dashboard summary
- `PUT /api/admin/users/:userId/role` - Update user role
- `PUT /api/admin/users/:userId/deactivate` - Deactivate user
- `GET /api/admin/activities/logs` - Get activity logs
