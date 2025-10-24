const express = require("express");
const axios = require("axios");
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

router.get("/trending", async (req, res) => {
  try {
    console.log("Fetching trending series");

    const response = await axios.get(`${TMDB_BASE_URL}/trending/tv/week`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    console.log(
      `Trending series fetched: ${response.data.results.length} results`
    );
    res.json({ results: response.data.results });
  } catch (error) {
    console.error("Trending series error:", error.message);
    res.status(500).json({
      message: "Error fetching trending series",
      error: error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    console.log(`Searching for: ${query}`);
    console.log(`TMDB API Key present: ${!!TMDB_API_KEY}`);

    const response = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        include_adult: false,
      },
    });

    console.log(`Search successful: ${response.data.results.length} results`);
    res.json({ results: response.data.results });
  } catch (error) {
    console.error("Search error:", error.message);
    console.error("Error code:", error.code);
    res.status(500).json({
      message: "Error searching for series",
      error: error.message,
      hint:
        error.code === "ENOTFOUND"
          ? "Cannot reach TMDB API. Check your internet connection or proxy settings."
          : undefined,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const seriesResponse = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    const seriesData = seriesResponse.data;
    const seasons = [];

    for (const season of seriesData.seasons) {
      if (season.season_number === 0) continue;

      try {
        const seasonResponse = await axios.get(
          `${TMDB_BASE_URL}/tv/${id}/season/${season.season_number}`,
          {
            params: {
              api_key: TMDB_API_KEY,
            },
          }
        );

        seasons.push({
          season_number: season.season_number,
          name: season.name,
          episode_count: season.episode_count,
          episodes: seasonResponse.data.episodes.map((ep) => ({
            episode_number: ep.episode_number,
            name: ep.name,
            overview: ep.overview,
            air_date: ep.air_date,
            vote_average: ep.vote_average,
            still_path: ep.still_path,
          })),
        });
      } catch (seasonError) {
        console.error(
          `Error fetching season ${season.season_number}:`,
          seasonError.message
        );
      }
    }

    res.json({
      id: seriesData.id,
      name: seriesData.name,
      overview: seriesData.overview,
      poster_path: seriesData.poster_path,
      backdrop_path: seriesData.backdrop_path,
      first_air_date: seriesData.first_air_date,
      last_air_date: seriesData.last_air_date,
      vote_average: seriesData.vote_average,
      vote_count: seriesData.vote_count,
      seasons: seasons,
    });
  } catch (error) {
    console.error("Series detail error:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching series details", error: error.message });
  }
});

router.get("/:id/recommendations", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${TMDB_BASE_URL}/tv/${id}/recommendations`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    res.json({ results: response.data.results });
  } catch (error) {
    console.error("Recommendations error:", error.message);
    res
      .status(500)
      .json({
        message: "Error fetching recommendations",
        error: error.message,
      });
  }
});

module.exports = router;