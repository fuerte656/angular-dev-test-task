import {WeatherForecast} from "./weather-forecast";
import {HourlyWeatherMetrics} from "./hourly-weather-metrics";

export interface HourlyWeatherForecast extends WeatherForecast {
	hourly: HourlyWeatherMetrics[];
}
