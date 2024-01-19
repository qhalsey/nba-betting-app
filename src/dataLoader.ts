// dataLoader.ts

import fs from "fs/promises";
import path from "path";

// Define TypeScript types for the data structure
type BookData = {
	bookmakerName: string;
	overOdds: number;
	underOdds: number;
	total: number;
};

type AveragesByTotal = {
	[key: string]: {
		averageOverOdds: number;
		averageUnderOdds: number;
		bookCount: number;
	};
};

type BettingData = {
	type: string;
	betId: string;
	adjustedOdds: number | null;
	description: string;
	flashSaleLineScore: null | number; // replace 'any' with a more specific type if possible
	isPromo: boolean;
	total: number;
	statType: string;
	marketName: string;
	updatedAt: string;
	playerId: string;
	combo: boolean;
	displayName: string;
	league: string;
	leagueId: number;
	market: string;
	name: string;
	position: string;
	team: string;
	teamName: string;
	internalPlayerId: string;
	books: BookData[];
	averagesByTotal: AveragesByTotal;
	exactMatch: boolean;
	needsHalfPoint: boolean;
	mostCommonTotal: string;
	closestTotal: string;
	sideToTarget: string;
	higherAdjacentTotal: string | null;
	lowerAdjacentTotal: string;
	strength: string;
};

// Function to load and parse betting data from a JSON file
export const loadBettingData = async (date: string): Promise<BettingData[]> => {
	const filePath = path.join(__dirname, "../historical-data", `${date}.json`);
	try {
		const fileContents = await fs.readFile(filePath, "utf-8");
		const data: BettingData[] = JSON.parse(fileContents);
		return data;
	} catch (error) {
		console.error(`Error loading betting data for date ${date}:`, error);
		throw error;
	}
};
