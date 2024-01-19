// app.ts

import dotenv from "dotenv";
import {
	fetchGamesForDate,
	fetchPlayerStatisticsForGame,
} from "./apiInterface";
import logger from "./logger";

dotenv.config();

const date = "2024-01-10"; // Example date
// Utility function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
	try {
		const gamesResponse = await fetchGamesForDate(date);

		if (gamesResponse.errors && gamesResponse.errors.length > 0) {
			console.error("Error fetching games:", gamesResponse.errors);
			return;
		}

		for (const game of gamesResponse.response) {
			const statsResponse = await fetchPlayerStatisticsForGame(game.id);

			if (statsResponse.errors && statsResponse.errors.length > 0) {
				console.error(
					`Error fetching player statistics for game ${game.id}:`,
					statsResponse.errors
				);
				continue;
			}

			console.log(`Statistics for game ${game.id}:`);
			// Process these statistics as needed

			//Log each statsResponse.response.player in the console
			for (const player of statsResponse.response) {
				logger.info(
					`Player: ${player.player.firstname} ${player.player.lastname}`
				);
			}

			// Wait for 5 seconds before the next iteration
			await delay(5000);
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

main();
