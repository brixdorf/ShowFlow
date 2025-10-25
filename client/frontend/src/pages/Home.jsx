import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import SearchBar from "../components/SearchBar";
import "./Home.css";

const Home = () => {
  const [topSeries, setTopSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSeries = async () => {
      try {
        const { data } = await API.get("/series/trending");
        setTopSeries(data.results.slice(0, 12));
      } catch (error) {
        console.error("Error fetching top series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSeries();
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">
          Visualize Web and TV Series Ratings by Episode
        </h1>
        <p className="home-subtitle">
          Discover the best and worst episodes of your favorite shows through
          interactive rating visualizations. Find hidden gems and avoid the
          duds!
        </p>

        <div className="search-container">
          <SearchBar />
        </div>

        <div className="top-series-section">
          <h2>Top Streaming TV Series</h2>
          {loading ? (
            <p>Loading... If this takes a little time, please wait — Render puts the backend to sleep when it's inactive.</p>
          ) : (
            <div className="series-grid">
              {topSeries.map((series, index) => (
                <Link
                  to={`/series/${series.id}`}
                  key={series.id}
                  className="series-card"
                >
                  <div className="series-rank">{index + 1}</div>
                  {series.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                      alt={series.name}
                      className="series-poster"
                    />
                  ) : (
                    <div className="series-poster-placeholder">No Image</div>
                  )}
                  <div className="series-info">
                    <h3>{series.name}</h3>
                    <p>{series.first_air_date?.split("-")[0]} - now</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;