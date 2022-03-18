import {DailyWeatherForecast} from "./daily-weather-forecast";
import {ForecastLocationImpl} from "./forecast-location-impl";
import {SimpleWeatherForecast} from "./simple-weather-forecast";

export class DailySimpleWeatherForecast extends SimpleWeatherForecast {

	public sunday: number;
	public monday: number;
	public tuesday: number;
	public wednesday: number;
	public thursday: number;
	public friday: number;
	public saturday: number;

	constructor(location: ForecastLocationImpl, forecast: DailyWeatherForecast) {
		super(location);

		const [sunday, monday, tuesday, wednesday, thursday, friday, saturday] = this.splitWeather(forecast);

		this.sunday = sunday;
		this.monday = monday;
		this.tuesday = tuesday;
		this.wednesday = wednesday;
		this.thursday = thursday;
		this.friday = friday;
		this.saturday = saturday;
	}

	private splitWeather(forecast: DailyWeatherForecast): number[] {
		return forecast.daily.map(item => Math.ceil(item.temp.day));
	}
}
