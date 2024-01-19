"use strict";
// apiInterface.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlayerStatisticsForGame = exports.fetchGamesForDate = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("./logger"));
/**
 * Fetches games for a specified date from the NBA API.
 *
 * @param {string} date - The date for which to fetch games (format: 'YYYY-MM-DD').
 * @returns {Promise<APIResponse>} - A promise that resolves to the API response containing the games.
 */
const fetchGamesForDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    // Define the API endpoint URL with the provided date
    const gamesApiUrl = `https://v2.nba.api-sports.io/games?date=${date}`;
    // Set up the request headers, including the API key
    const headers = {
        "x-rapidapi-key": process.env.NBA_API_KEY, // Your API key from the environment variable
        "x-rapidapi-host": "v2.nba.api-sports.io", // Host header required by the API
    };
    try {
        // Make the GET request to the API and capture the response
        const response = yield axios_1.default.get(gamesApiUrl, { headers });
        logger_1.default.info(`Fetched games for date ${date}: ${response.data.results} games found.`);
        // Return the response data
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            // Now 'error' is type 'Error', and you can access 'error.message'
            logger_1.default.error(`Error fetching games for date ${date}: ${error.message}`);
        }
        else {
            // For unexpected types, you might just log a generic message
            logger_1.default.error(`An unknown error occurred while fetching games for date ${date}`);
        }
        throw error; // Re-throw the error for further handling
    }
});
exports.fetchGamesForDate = fetchGamesForDate;
/**
 * Fetches player statistics for a specific game from the NBA API.
 *
 * @param {number} gameId - The ID of the game for which to fetch player statistics.
 * @param {string} [season='2023'] - The season of the game (default is '2023').
 * @returns {Promise<PlayerStatisticsResponse>} - A promise that resolves to the player statistics for the game.
 */
const fetchPlayerStatisticsForGame = (gameId, season = "2023") => __awaiter(void 0, void 0, void 0, function* () {
    // Define the API endpoint URL with the provided game ID and season
    const statsApiUrl = `https://v2.nba.api-sports.io/players/statistics?game=${gameId}&season=${season}`;
    // Set up the request headers, similar to the previous function
    const headers = {
        "x-rapidapi-key": process.env.NBA_API_KEY,
        "x-rapidapi-host": "v2.nba.api-sports.io",
    };
    try {
        // Make the GET request to the API and capture the response
        const response = yield axios_1.default.get(statsApiUrl, {
            headers,
        });
        logger_1.default.info(`Fetched player statistics for game ${gameId} in season ${season}: ${response.data.results} players found.`);
        // Return the response data
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error(`Error fetching player statistics for game ${gameId} in season ${season}: ${error.message}`);
        }
        else {
            logger_1.default.error(`An unknown error occurred while fetching player statistics for game ${gameId} in season ${season}`);
        }
        throw error;
    }
});
exports.fetchPlayerStatisticsForGame = fetchPlayerStatisticsForGame;
