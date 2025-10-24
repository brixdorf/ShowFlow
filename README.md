# ShowFlow

A modern full-stack web application for visualizing TV series ratings by episode. Built with the MERN stack, ShowFlow helps you discover the best and worst episodes of your favorite shows through interactive rating grids.

🔗 **Live Demo:** [https://show-flow.vercel.app](https://show-flow.vercel.app)

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)

## ✨ Features

- **📊 Episode Rating Visualization** - View comprehensive rating grids for any TV series with color-coded episode ratings
- **🔍 Real-time Series Search** - Instant search powered by The Movie Database (TMDB) API
- **🔐 User Authentication** - Secure JWT-based authentication system
- **❤️ Favorites System** - Save your favorite shows for quick access with real-time counter updates
- **🎬 Related Shows** - Discover similar series based on your selections
- **🔥 Trending Series** - Browse currently popular TV shows
- **📱 Responsive Design** - Fully responsive UI that works on all devices

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- React Router v7
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
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (Atlas account or local instance)
- TMDB API Key ([Get it here](https://www.themoviedb.org/settings/api))

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
   PORT=5000
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
- JWT tokens with 365-day validity
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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Romit Raj**
- GitHub: [@brixdorf](https://github.com/brixdorf)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the comprehensive API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Vercel](https://vercel.com/) for frontend hosting
- [Render](https://render.com/) for backend hosting

---

**Built with ❤️ using the MERN Stack**
