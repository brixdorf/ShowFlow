# ShowFlow

A modern full-stack web application for visualizing TV series ratings by episode. Built with the MERN stack, ShowFlow helps you discover the best and worst episodes of your favorite shows through interactive rating grids.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)

## 🎯 Features

- **Episode Rating Visualization**: View comprehensive rating grids for any TV series with color-coded episode ratings
- **Series Search**: Real-time search powered by The Movie Database (TMDB) API
- **User Authentication**: Secure JWT-based authentication system with registration and login
- **Favorites System**: Save your favorite shows for quick access
- **Related Shows**: Discover similar series based on your selections
- **Trending Series**: Browse currently popular TV shows on the homepage
- **Responsive Design**: Fully responsive UI that works on all devices
- **Real-time Updates**: Dynamic favorites count that updates across the app instantly

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Next-generation frontend build tool
- **CSS3** - Custom styling with Inter font family

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### External APIs
- **TMDB API** - The Movie Database for TV series data and ratings

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account** (or local MongoDB)
- **TMDB API Key** (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ShowFlow.git
cd ShowFlow
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your `server/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
TMDB_API_KEY=your_tmdb_api_key
```

**Getting Your Credentials:**

- **MongoDB URI**: 
  1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a new cluster
  3. Add your IP address to the whitelist (or use `0.0.0.0/0` for development)
  4. Get your connection string

- **JWT Secret**: Generate a secure random string:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

- **TMDB API Key**: 
  1. Register at [TMDB](https://www.themoviedb.org/signup)
  2. Go to Settings → API → Create API Key
  3. Choose "Developer" option and fill in the details

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../client/frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your `client/frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client/frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client/frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
ShowFlow/
├── client/
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── components/     # Reusable React components
│       │   │   ├── Navbar.jsx
│       │   │   ├── SearchBar.jsx
│       │   │   └── RatingGrid.jsx
│       │   ├── context/        # React Context for state management
│       │   │   └── AuthContext.jsx
│       │   ├── pages/          # Page components
│       │   │   ├── Home.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   ├── SeriesDetail.jsx
│       │   │   └── Favorites.jsx
│       │   ├── utils/          # Utility functions
│       │   │   └── api.js
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── .env
│       ├── package.json
│       └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── series.js          # TMDB API proxy routes
│   │   └── favorites.js       # Favorites CRUD routes
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Series Routes
- `GET /api/series/trending` - Get trending TV series
- `GET /api/series/search?query={name}` - Search for TV series
- `GET /api/series/:id` - Get series details with all seasons/episodes
- `GET /api/series/:id/recommendations` - Get related shows

### Favorites Routes (Protected)
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites` - Add series to favorites
- `DELETE /api/favorites/:seriesId` - Remove from favorites
- `GET /api/favorites/check/:seriesId` - Check if series is favorited

## 🎨 Features in Detail

### Rating Visualization
- **Color-coded Episodes**: 7-tier color system from green (excellent) to red (poor)
- **Comprehensive Grid**: View all seasons and episodes at a glance
- **Rating Legend**: Clear visual indicators for rating ranges

### User System
- **Secure Authentication**: Passwords hashed with bcrypt
- **Persistent Sessions**: JWT tokens valid for 365 days
- **Protected Routes**: Favorites feature requires authentication

### Search & Discovery
- **Real-time Search**: Instant search results as you type
- **Trending Shows**: Homepage displays top 12 trending series
- **Related Shows**: Algorithm-based recommendations for each series

### Favorites Management
- **Quick Access**: Save your favorite shows for easy access
- **Real-time Counter**: Badge showing favorites count in navbar
- **One-click Toggle**: Add/remove favorites from series detail page

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with HttpOnly tokens
- **Protected API Routes**: Middleware-based route protection
- **Input Validation**: Server-side validation for all user inputs
- **CORS Configuration**: Controlled cross-origin requests

## 🌐 Environment Variables

### Server (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `TMDB_API_KEY` | The Movie Database API key | `your_tmdb_api_key` |

### Client (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "axios": "^1.7.9"
}
```

### Backend Dependencies
```json
{
  "express": "^4.21.2",
  "mongoose": "^8.9.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "axios": "^1.7.9"
}
```

## 🚧 Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend:**
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
```

## 🎯 Future Enhancements

- [ ] User profiles with viewing history
- [ ] Episode-level reviews and comments
- [ ] Share rating grids as images (re-implementation)
- [ ] Watch providers integration
- [ ] Custom lists and collections
- [ ] Email notifications for new episodes
- [ ] Dark mode toggle
- [ ] Advanced filtering and sorting options

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Vite](https://vitejs.dev/) for the amazing build tool
- [Inter Font](https://rsms.me/inter/) for the beautiful typography

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Built with ❤️ using the MERN Stack**
