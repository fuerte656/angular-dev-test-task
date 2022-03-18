import {createFeatureSelector, createSelector} from '@ngrx/store';
import {weatherFeature, WeatherState} from "./weather.reducer";

export const selectWeather = createFeatureSelector<WeatherState>(weatherFeature);

export const selectHourlyWeatherHashTable = createSelector(
	selectWeather,
	(state: WeatherState) => {
		return state.hourlyForecasts
	}
);

export const selectDailyWeatherHashTable = createSelector(
	selectWeather,
	(state: WeatherState) => {
		return state.dailyForecasts
	}
);

export const selectHourlyWeatherList = createSelector(
	selectWeather,
	(state: WeatherState) => {
		return Object.values(state.hourlyForecasts)
	}
);

export const selectDailyWeatherList = createSelector(
	selectWeather,
	(state: WeatherState) => {
		return Object.values(state.dailyForecasts)
	}
);

export const selectCurrentLocation = createSelector(
	selectWeather,
	(state: WeatherState) => {
		return state.currentLocation;
	}
);

export const selectCurrentPeriod = createSelector(
	selectWeather,
	(state: WeatherState) => {
		return state.currentPeriod;
	}
);
