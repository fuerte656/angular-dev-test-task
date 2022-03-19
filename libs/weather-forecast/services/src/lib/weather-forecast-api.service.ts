import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {DAILY_FORECAST_URL, HOURLY_FORECAST_URL, LOCATIONS_URL} from "./url_constants";
import {
	DailySimpleWeatherForecast,
	DailyWeatherForecast,
	ForecastLocation,
	ForecastLocationImpl,
	HourlySimpleWeatherForecast,
	HourlyWeatherForecast
} from "@bp/weather-forecast/models";

@Injectable()
export class WeatherForecastApiService {

	private _apiKey = '9ec0793dc09f662e34af3e40a63e87b0';
	private _limit = 10;

	constructor(private httpClient: HttpClient) {
	}

	public getLocations(city: string): Observable<ForecastLocationImpl[]> {
		return this.httpClient.get<ForecastLocation[]>(LOCATIONS_URL(city, this._limit, this._apiKey)).pipe(
			map(list => list.map(item => new ForecastLocationImpl(item)))
		);
	}

	public getLocation(city: string): Observable<ForecastLocationImpl | null> {
		return this.httpClient.get<ForecastLocation[]>(LOCATIONS_URL(city, 1, this._apiKey)).pipe(
			map(list => list.length > 0 ? <ForecastLocationImpl>list.map(item => new ForecastLocationImpl(item)).pop() : null)
		);
	}

	public getHourlyForecast(location: ForecastLocationImpl): Observable<HourlySimpleWeatherForecast> {
		return this.httpClient.get<HourlyWeatherForecast>(HOURLY_FORECAST_URL(location, this._apiKey)).pipe(
			map(forecast => new HourlySimpleWeatherForecast(location, forecast))
		);
	}

	public getDailyForecast(location: ForecastLocationImpl): Observable<DailySimpleWeatherForecast> {
		return this.httpClient.get<DailyWeatherForecast>(DAILY_FORECAST_URL(location, this._apiKey)).pipe(
			map(forecast => new DailySimpleWeatherForecast(location, forecast))
		);
	}

}
