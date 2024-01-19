// logger.ts

import winston from "winston";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
		// You can also add transports to log to files or other destinations
	],
});

export default logger;
