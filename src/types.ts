export type Arena = {
	name: string;
	city: string;
	state: string;
	country: string | null;
};

export type TeamInfo = {
	id: number;
	name: string;
	nickname: string;
	code: string;
	logo: string;
};

export type TeamScores = {
	win: number;
	loss: number;
	series: {
		win: number;
		loss: number;
	};
	linescore: string[]; // Assuming linescore is an array of strings, modify if it's different
	points: number;
};

export type GameStatus = {
	clock: string | null;
	halftime: boolean;
	short: number;
	long: string;
};

export type GamePeriods = {
	current: number;
	total: number;
	endOfPeriod: boolean;
};

export type Game = {
	id: number;
	league: string;
	season: number;
	date: {
		start: string;
		end: string | null;
		duration: string | null;
	};
	stage: number;
	status: GameStatus;
	periods: GamePeriods;
	arena: Arena;
	teams: {
		visitors: TeamInfo;
		home: TeamInfo;
	};
	scores: {
		visitors: TeamScores;
		home: TeamScores;
	};
	officials: string[]; // Assuming an array of strings, modify if it's different
	timesTied: string | null;
	leadChanges: string | null;
	nugget: string | null;
};

export type APIError = {
	[key: string]: string;
};

export type APIResponse = {
	get: string;
	parameters: { date: string };
	errors?: APIError[];
	results: number;
	response: Game[];
};

// players/statistics endpoint

export type Player = {
	id: number;
	firstname: string;
	lastname: string;
};

export type Team = {
	id: number;
	name: string;
	nickname: string;
	code: string;
	logo: string;
};

export type GameInfo = {
	id: number;
};

export type PlayerStatistic = {
	player: Player;
	team: Team;
	game: GameInfo;
	points: number;
	pos: string; // Position
	min: string; // Minutes played
	fgm: number; // Field Goals Made
	fga: number; // Field Goals Attempted
	fgp: string; // Field Goal Percentage
	ftm: number; // Free Throws Made
	fta: number; // Free Throws Attempted
	ftp: string; // Free Throw Percentage
	tpm: number; // Three-Point Field Goals Made
	tpa: number; // Three-Point Field Goals Attempted
	tpp: string; // Three-Point Field Goal Percentage
	offReb: number;
	defReb: number;
	totReb: number;
	assists: number;
	pFouls: number; // Personal Fouls
	steals: number;
	turnovers: number;
	blocks: number;
	plusMinus: string;
	comment: string | null;
};

export type PlayerStatisticsResponse = {
	get: string;
	parameters: {
		game: string;
		season: string;
	};
	errors?: APIError[];
	results: number;
	response: PlayerStatistic[];
};
