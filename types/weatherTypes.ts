export interface ICity {
	name: string;
	latitude: string;
	longitude: string;
}

export interface IWeatherData {
	city: string;
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	daily_units: DailyUnits;
	daily: Daily;
}

export interface DailyUnits {
	time: string;
	rain_sum: string;
}

export interface Daily {
	time: string[];
	rain_sum: number[];
}
