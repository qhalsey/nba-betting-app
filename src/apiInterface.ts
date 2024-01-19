// apiInterface.ts

import axios from "axios";
import { APIResponse, PlayerStatisticsResponse } from "./types";
import logger from "./logger";

/**
 * Fetches games for a specified date from the NBA API.
 *
 * @param {string} date - The date for which to fetch games (format: 'YYYY-MM-DD').
 * @returns {Promise<APIResponse>} - A promise that resolves to the API response containing the games.
 */
export const fetchGamesForDate = async (date: string): Promise<APIResponse> => {
	// Define the API endpoint URL with the provided date
	const gamesApiUrl = `https://v2.nba.api-sports.io/games?date=${date}`;

	// Set up the request headers, including the API key
	const headers = {
		"x-rapidapi-key": process.env.NBA_API_KEY, // Your API key from the environment variable
		"x-rapidapi-host": "v2.nba.api-sports.io", // Host header required by the API
	};

	try {
		// Make the GET request to the API and capture the response
		const response = await axios.get<APIResponse>(gamesApiUrl, { headers });
		logger.info(
			`Fetched games for date ${date}: ${response.data.results} games found.`
		);

		// Return the response data
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			// Now 'error' is type 'Error', and you can access 'error.message'
			logger.error(`Error fetching games for date ${date}: ${error.message}`);
		} else {
			// For unexpected types, you might just log a generic message
			logger.error(
				`An unknown error occurred while fetching games for date ${date}`
			);
		}
		throw error; // Re-throw the error for further handling
	}
};

/**
 * Fetches player statistics for a specific game from the NBA API.
 *
 * @param {number} gameId - The ID of the game for which to fetch player statistics.
 * @param {string} [season='2023'] - The season of the game (default is '2023').
 * @returns {Promise<PlayerStatisticsResponse>} - A promise that resolves to the player statistics for the game.
 */
export const fetchPlayerStatisticsForGame = async (
	gameId: number,
	season: string = "2023"
): Promise<PlayerStatisticsResponse> => {
	// Define the API endpoint URL with the provided game ID and season
	const statsApiUrl = `https://v2.nba.api-sports.io/players/statistics?game=${gameId}&season=${season}`;

	// Set up the request headers, similar to the previous function
	const headers = {
		"x-rapidapi-key": process.env.NBA_API_KEY,
		"x-rapidapi-host": "v2.nba.api-sports.io",
	};

	try {
		// Make the GET request to the API and capture the response
		const response = await axios.get<PlayerStatisticsResponse>(statsApiUrl, {
			headers,
		});
		logger.info(
			`Fetched player statistics for game ${gameId} in season ${season}: ${response.data.results} players found.`
		);

		// Return the response data
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			logger.error(
				`Error fetching player statistics for game ${gameId} in season ${season}: ${error.message}`
			);
		} else {
			logger.error(
				`An unknown error occurred while fetching player statistics for game ${gameId} in season ${season}`
			);
		}
		throw error;
	}
};
