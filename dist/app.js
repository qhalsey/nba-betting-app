"use strict";
// app.ts
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
const dotenv_1 = __importDefault(require("dotenv"));
const apiInterface_1 = require("./apiInterface");
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config();
const date = "2024-01-10"; // Example date
// Utility function to create a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamesResponse = yield (0, apiInterface_1.fetchGamesForDate)(date);
        if (gamesResponse.errors && gamesResponse.errors.length > 0) {
            console.error("Error fetching games:", gamesResponse.errors);
            return;
        }
        for (const game of gamesResponse.response) {
            const statsResponse = yield (0, apiInterface_1.fetchPlayerStatisticsForGame)(game.id);
            if (statsResponse.errors && statsResponse.errors.length > 0) {
                console.error(`Error fetching player statistics for game ${game.id}:`, statsResponse.errors);
                continue;
            }
            console.log(`Statistics for game ${game.id}:`);
            // Process these statistics as needed
            //Log each statsResponse.response.player in the console
            for (const player of statsResponse.response) {
                logger_1.default.info(`Player: ${player.player.firstname} ${player.player.lastname}`);
            }
            // Wait for 5 seconds before the next iteration
            yield delay(5000);
        }
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
});
main();
