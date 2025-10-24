import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import RatingGrid from "../components/RatingGrid";
import "./SeriesDetail.css";

const SeriesDetail = () => {
  const { id } = useParams();
  const { user, updateFavoritesCount } = useContext(AuthContext);
  const [series, setSeries] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const fetchSeriesData = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/series/${id}`);
        setSeries(data);
        setSeasons(data.seasons || []);
      } catch (err) {
        setError("Failed to load series data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesData();
  }, [id]);

  useEffect(() => {
    const fetchRelatedShows = async () => {
      try {
        const { data } = await API.get(`/series/${id}/recommendations`);
        setRelatedShows(data.results.slice(0, 6)); // Show top 6
      } catch (err) {
        console.error("Error fetching related shows:", err);
      }
    };

    fetchRelatedShows();
  }, [id]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        try {
          const { data } = await API.get(`/favorites/check/${id}`);
          setIsFavorited(data.isFavorited);
        } catch (err) {
          console.error("Error checking favorite status:", err);
        }
      }
    };

    if (series) {
      checkFavoriteStatus();
    }
  }, [id, user, series]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      alert("Please login to add favorites");
      return;
    }

    setFavoriteLoading(true);
    try {
      if (isFavorited) {
        await API.delete(`/favorites/${id}`);
        setIsFavorited(false);
        updateFavoritesCount(-1);
      } else {
        await API.post("/favorites", {
          seriesId: parseInt(id),
          name: series.name,
          poster_path: series.poster_path,
        });
        setIsFavorited(true);
        updateFavoritesCount(1);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert("Failed to update favorites. Please try again.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="series-detail-page">
        <div className="loading-container">
          <div className="loader">🎬</div>
          <p>Loading series data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="series-detail-page">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!series) {
    return null;
  }

  return (
    <div className="series-detail-page">
      {/* Banner Image */}
      {series.backdrop_path && (
        <div
          className="series-banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
          }}
        >
          <div className="banner-overlay"></div>
        </div>
      )}

      <div className="series-detail-container">
        {user ? (
          <div className="action-buttons">
            <button
              onClick={handleFavoriteToggle}
              className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
              disabled={favoriteLoading}
            >
              {favoriteLoading
                ? "⏳ Loading..."
                : isFavorited
                ? "❤️ Remove from Favorites"
                : "🤍 Add to Favorites"}
            </button>
          </div>
        ) : (
          <div className="action-buttons">
            <div className="login-prompt">
              <Link to="/login" className="login-link">Login to add to favorites</Link>
            </div>
          </div>
        )}

        {seasons.length > 0 ? (
          <RatingGrid series={series} seasons={seasons} />
        ) : (
          <div className="no-data-message">
            <p>No episode data available for this series.</p>
          </div>
        )}

        {/* Series Description */}
        {series.overview && (
          <div className="series-description">
            <h2>Overview</h2>
            <p>{series.overview}</p>
          </div>
        )}

        {/* Related Shows */}
        {relatedShows.length > 0 && (
          <div className="related-shows">
            <h2>Related shows</h2>
            <div className="related-shows-grid">
              {relatedShows.map((show) => (
                <Link 
                  to={`/series/${show.id}`} 
                  key={show.id} 
                  className="related-show-card"
                >
                  {show.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.name}
                      className="related-show-poster"
                    />
                  ) : (
                    <div className="related-show-poster-placeholder">No Image</div>
                  )}
                  <h3>{show.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesDetail;