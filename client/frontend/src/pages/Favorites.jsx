import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import "./Favorites.css";

const Favorites = () => {
  const { user, updateFavoritesCount } = useContext(AuthContext);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const { data } = await API.get("/favorites");
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, navigate]);

  const handleRemoveFavorite = async (seriesId) => {
    try {
      await API.delete(`/favorites/${seriesId}`);
      setFavorites(favorites.filter((fav) => fav.seriesId !== seriesId));
      updateFavoritesCount(-1);
    } catch (err) {
      console.error("Error removing favorite:", err);
      alert("Failed to remove favorite. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="favorites-container">
          <div className="loading">Loading favorites...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <h1>Favorites</h1>
          <span className="favorites-count">{favorites.length}</span>
        </div>
        {favorites.length === 0 ? (
          <div className="no-favorites">
            <p>You haven't added any favorites yet.</p>
            <p>Search for a series and add it to your favorites!</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <div key={favorite.seriesId} className="favorite-card">
                <img
                  src={
                    favorite.poster_path
                      ? `https://image.tmdb.org/t/p/w300${favorite.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Poster"
                  }
                  alt={favorite.name}
                  className="favorite-poster"
                  onClick={() => navigate(`/series/${favorite.seriesId}`)}
                />
                <div className="favorite-info">
                  <h3 onClick={() => navigate(`/series/${favorite.seriesId}`)}>
                    {favorite.name}
                  </h3>
                  <button
                    onClick={() => handleRemoveFavorite(favorite.seriesId)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;