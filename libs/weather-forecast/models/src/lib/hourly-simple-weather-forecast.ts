import {HourlyWeatherForecast} from "./hourly-weather-forecast";
import {SimpleWeatherForecast} from "./simple-weather-forecast";
import {ForecastLocationImpl} from "./forecast-location-impl";

export class HourlySimpleWeatherForecast extends SimpleWeatherForecast {

	public hour3: number;
	public hour6: number;
	public hour9: number;
	public hour12: number;
	public hour15: number;
	public hour18: number;
	public hour21: number;
	public hour24: number;

	constructor(location: ForecastLocationImpl, forecast: HourlyWeatherForecast) {
		super(location);

		const [hour3, hour6, hour9, hour12, hour15, hour18, hour21, hour24] = this.splitWeather(forecast);

		this.hour3 = hour3;
		this.hour6 = hour6;
		this.hour9 = hour9;
		this.hour12 = hour12;
		this.hour15 = hour15;
		this.hour18 = hour18;
		this.hour21 = hour21;
		this.hour24 = hour24;
	}

	private splitWeather(forecast: HourlyWeatherForecast): number[] {
		return forecast.hourly.filter((_, index) => (index + 1) % 3).map(item => Math.ceil(item.temp));
	}
}
