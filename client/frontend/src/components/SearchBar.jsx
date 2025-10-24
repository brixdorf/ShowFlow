import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { data } = await API.get(
        `/series/search?query=${searchQuery}`
      );
      setResults(data.results.slice(0, 8)); // Show top 8 results
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleSelectSeries = (id) => {
    setQuery("");
    setResults([]);
    navigate(`/series/${id}`);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a show..."
          value={query}
          onChange={handleInputChange}
        />
        {loading && <div className="search-loader">⏳</div>}
      </div>

      {results.length > 0 && (
        <div className="search-results">
          {results.map((series) => (
            <div
              key={series.id}
              className="search-result-item"
              onClick={() => handleSelectSeries(series.id)}
            >
              <img
                src={
                  series.poster_path
                    ? `https://image.tmdb.org/t/p/w92${series.poster_path}`
                    : "https://via.placeholder.com/92x138?text=No+Image"
                }
                alt={series.name}
                className="search-result-poster"
              />
              <div className="search-result-info">
                <h4>{series.name}</h4>
                <p>{series.first_air_date?.substring(0, 4) || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;