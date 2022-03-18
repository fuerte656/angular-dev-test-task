import {WeatherForecast} from "./weather-forecast";
import {DailyWeatherMetrics} from "./daily-weather-metrics";

export interface DailyWeatherForecast extends WeatherForecast {
	daily: DailyWeatherMetrics[];
}
