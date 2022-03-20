import {createAction, props} from '@ngrx/store';
import {
	PERIOD,
	ForecastLocationImpl,
	HourlySimpleWeatherForecast,
	DailySimpleWeatherForecast
} from "@bp/weather-forecast/models";

export const loadHourlyWeatherForLocation = createAction(
	'[weather] Load hourly weather for location',
	props<{ location: ForecastLocationImpl }>()
);
export const loadHourlyWeatherForLocationSuccess = createAction(
	'[weather] Load hourly weather for location success',
	props<{ forecast: HourlySimpleWeatherForecast }>()
);
export const loadHourlyWeatherForLocationFailed = createAction(
	'[weather] Load hourly weather for location failed',
	props<{ error: Error }>()
);


export const loadDailyWeatherForLocation = createAction(
	'[weather] Load daily weather for location',
	props<{ location: ForecastLocationImpl }>()
);
export const loadDailyWeatherForLocationSuccess = createAction(
	'[weather] Load daily weather for location success',
	props<{ forecast: DailySimpleWeatherForecast }>()
);
export const loadDailyWeatherForLocationFailed = createAction(
	'[weather] Load daily weather for location failed',
	props<{ error: Error }>()
);

export const setCurrentLocationByQuery = createAction(
	'[weather] Set current location by query',
	props<{ locationName: string }>()
);

export const setCurrentLocationByQuerySuccess = createAction(
	'[weather] Set current location by query success',
	props<{ location: ForecastLocationImpl }>()
);

export const setCurrentLocationByQueryFailed = createAction(
	'[weather] Set current location by query failed',
	props<{ error: Error }>()
);

export const setCurrentLocation = createAction(
	'[weather] Set current location',
	props<{ location: ForecastLocationImpl }>()
);

export const setCurrentPeriod = createAction(
	'[weather] Set current period',
	props<{ period: PERIOD }>()
);


export const refreshForecasts = createAction('[weather] Refresh forecasts');

