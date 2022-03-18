import {WeatherMetrics} from "./weather-metrics";

export interface HourlyWeatherMetrics extends WeatherMetrics {
	moon_phase: number;
	moonrise: number;
	moonset: number;
	rain: number;
	sunrise: number;
	sunset: number;
	temp: number;
}
