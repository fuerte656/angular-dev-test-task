import {createReducer, on} from '@ngrx/store';
import * as weatherActions from './weather.actions';
import {
	PERIOD,
	ForecastLocationImpl,
	HourlySimpleWeatherForecast,
	DailySimpleWeatherForecast
} from "@bp/weather-forecast/models";

export const weatherFeature = "weather";

export interface WeatherState {
	currentLocation: ForecastLocationImpl | null;
	currentPeriod: PERIOD | null;
	hourlyForecasts: Record<string, HourlySimpleWeatherForecast>;
	dailyForecasts: Record<string, DailySimpleWeatherForecast>;
}

export const weatherInitialState: WeatherState = {
	currentLocation: null,
	currentPeriod: null,
	hourlyForecasts: {},
	dailyForecasts: {}
};

export const weatherReducer = createReducer(
	weatherInitialState,
	on(weatherActions.setCurrentLocation, (state, {location}) => ({...state, currentLocation: location})),
	on(weatherActions.setCurrentPeriod, (state, {period}) => ({...state, currentPeriod: period})),
	on(weatherActions.loadHourlyWeatherForLocationSuccess, (state, {forecast}) => ({
		...state,
		hourlyForecasts: {...state.hourlyForecasts, [forecast.hash]: forecast}
	})),
	on(weatherActions.loadDailyWeatherForLocationSuccess, (state, {forecast}) => ({
		...state,
		dailyForecasts: {...state.dailyForecasts, [forecast.hash]: forecast}
	})),
);


