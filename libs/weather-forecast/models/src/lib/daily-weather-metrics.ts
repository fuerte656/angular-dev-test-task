import {WeatherMetrics} from "./weather-metrics";
import {TemperatureDescription} from "./temperature-description";

export interface DailyWeatherMetrics extends WeatherMetrics {
	temp: TemperatureDescription;
}
