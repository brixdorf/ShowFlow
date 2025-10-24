# 🎬 ShowFlow

ShowFlow is a web application for visualizing TV series ratings by episode. It helps you discover the best and worst episodes of your favorite shows through interactive rating grids.

🔗 **Live Demo:** [https://show-flow.vercel.app](https://show-flow.vercel.app)

## ✨ Features

- **📊 Episode Rating Visualization** - View comprehensive rating grids for any TV series with color-coded episode ratings
- **🔍 Real-time Series Search** - Instant search powered by The Movie Database (TMDB) API
- **🔐 User Authentication** - Secure JWT-based authentication system
- **❤️ Favorites System** - Save your favorite shows for quick access
- **🎬 Related Shows** - Discover similar series based on your selections
- **🔥 Trending Series** - Browse currently popular TV shows

## 🛠️ Tech Stack

### Frontend

- React with Vite
- React Router
- Axios for API requests
- Custom CSS with Inter font

### Backend

- Node.js & Express.js
- MongoDB Atlas with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### External APIs

- The Movie Database (TMDB) API

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB (Atlas account or local instance)
- TMDB API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/brixdorf/ShowFlow.git
   cd ShowFlow
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   ```

   Create `.env` file in `server/` directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   TMDB_API_KEY=your_tmdb_api_key
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend Setup**

   ```bash
   cd ../client/frontend
   npm install
   ```

   Create `.env` file in `client/frontend/` directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run the Application**

   Start backend (from `server/` directory):

   ```bash
   npm run dev
   ```

   Start frontend (from `client/frontend/` directory):

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

## 📁 Project Structure

```
ShowFlow/
├── client/
│   └── frontend/          # React frontend
│       ├── src/
│       │   ├── components/   # Reusable components
│       │   ├── pages/        # Page components
│       │   ├── context/      # React Context
│       │   └── utils/        # Utility functions
│       └── package.json
│
├── server/                # Express backend
│   ├── config/           # Database configuration
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── server.js
│
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Series

- `GET /api/series/trending` - Get trending TV series
- `GET /api/series/search?query={name}` - Search for TV series
- `GET /api/series/:id` - Get series details with episodes
- `GET /api/series/:id/recommendations` - Get related shows

### Favorites (Protected)

- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:seriesId` - Remove from favorites
- `GET /api/favorites/check/:seriesId` - Check if favorited

## 🎨 Features in Detail

### Rating Visualization

- 7-tier color system (green to red) for episode ratings
- Comprehensive grid showing all seasons and episodes
- Visual rating legend for easy interpretation

### User System

- Secure password hashing with bcrypt
- JWT tokens are used
- Protected routes for favorites functionality

### Search & Discovery

- Real-time search with instant results
- Trending shows on homepage
- Algorithm-based recommendations

## 🔒 Security

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- CORS configuration
- Environment variable management

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the comprehensive API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Vercel](https://vercel.com/) for frontend hosting
- [Render](https://render.com/) for backend hosting