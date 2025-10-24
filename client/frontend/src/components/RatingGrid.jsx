import React from "react";
import "./RatingGrid.css";

const RatingGrid = ({ series, seasons }) => {
  const [posterError, setPosterError] = React.useState(false);

  const getRatingColor = (rating) => {
    if (rating >= 9) return "#10b981"; // Green
    if (rating >= 8) return "#22c55e"; // Light green
    if (rating >= 7) return "#84cc16"; // Yellow-green
    if (rating >= 6) return "#eab308"; // Yellow
    if (rating >= 5) return "#f59e0b"; // Orange
    if (rating >= 4) return "#f97316"; // Dark orange
    return "#ef4444"; // Red
  };

  const getRatingLabel = (rating) => {
    if (rating >= 9) return "Excellent";
    if (rating >= 8) return "Great";
    if (rating >= 7) return "Good";
    if (rating >= 6) return "Average";
    if (rating >= 5) return "Below Average";
    if (rating >= 4) return "Poor";
    return "Bad";
  };

  // Find max episodes across all seasons
  const maxEpisodes = Math.max(...seasons.map((s) => s.episodes?.length || 0));

  return (
    <div className="rating-grid-wrapper" id="rating-grid-capture">
      <div className="rating-grid-header">
        {!posterError && series.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${series.poster_path}`}
            alt={series.name}
            className="series-poster"
            onError={() => setPosterError(true)}
          />
        ) : (
          <div className="series-poster series-poster-placeholder">
            <span>📺</span>
          </div>
        )}
        <div className="series-info">
          <h1>{series.name}</h1>
          <p className="series-year">
            {series.first_air_date?.substring(0, 4)} -{" "}
            {series.last_air_date?.substring(0, 4) || "Present"}
          </p>
          <div className="series-rating">
            ⭐ {series.vote_average?.toFixed(1)} (
            {series.vote_count?.toLocaleString()} votes)
          </div>
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#10b981" }}
          ></div>
          <span>Excellent (9.0+)</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#22c55e" }}
          ></div>
          <span>Great (8.0-8.9)</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#84cc16" }}
          ></div>
          <span>Good (7.0-7.9)</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#eab308" }}
          ></div>
          <span>Average (6.0-6.9)</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#f59e0b" }}
          ></div>
          <span>Below Average (5.0-5.9)</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#f97316" }}
          ></div>
          <span>Poor (4.0-4.9)</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#ef4444" }}
          ></div>
          <span>Bad (&lt;4.0)</span>
        </div>
      </div>

      <div className="rating-grid">
        <div className="grid-header">
          <div className="grid-cell header-cell"></div>
          {seasons.map((season) => (
            <div
              key={season.season_number}
              className="grid-cell header-cell season-header"
            >
              S{season.season_number}
            </div>
          ))}
        </div>

        {Array.from({ length: maxEpisodes }).map((_, episodeIdx) => (
          <div key={episodeIdx} className="grid-row">
            <div className="grid-cell episode-label">E{episodeIdx + 1}</div>
            {seasons.map((season) => {
              const episode = season.episodes?.[episodeIdx];
              return (
                <div
                  key={`${season.season_number}-${episodeIdx}`}
                  className="grid-cell rating-cell"
                  style={{
                    backgroundColor: episode?.vote_average
                      ? getRatingColor(episode.vote_average)
                      : "transparent",
                    color: episode?.vote_average ? "white" : "#ccc",
                  }}
                  title={
                    episode
                      ? `${episode.name} - ${episode.vote_average?.toFixed(
                          1
                        )} (${getRatingLabel(episode.vote_average)})`
                      : "No episode"
                  }
                >
                  {episode?.vote_average ? episode.vote_average.toFixed(1) : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingGrid;