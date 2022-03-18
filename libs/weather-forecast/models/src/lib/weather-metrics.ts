import {FeelsLikeDescription} from "./feels-like-description";
import {WeatherDescription} from "./weather-description";

export interface WeatherMetrics {
	clouds: number;
	dew_point: number;
	dt: number;
	feels_like: FeelsLikeDescription;
	humidity: number;
	pop: number;
	pressure: number;
	uvi: number;
	visibility: number;
	weather: WeatherDescription;
	wind_deg: number;
	wind_gust: number;
	wind_speed: number;
}
