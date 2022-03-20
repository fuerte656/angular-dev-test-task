import {createFeatureSelector, createSelector} from '@ngrx/store';
import {weatherRouterKey, WeatherRouteState} from "./weather-route.reducer";
import {RouterReducerState} from "@ngrx/router-store/src/reducer";

export const getRouterState = createFeatureSelector<RouterReducerState<WeatherRouteState>>(weatherRouterKey);

export const getWeatherRouteState = createSelector(
	getRouterState,
	(state: RouterReducerState<WeatherRouteState>) => state.state
);

export const getWeatherRouterPeriod = createSelector(
	getWeatherRouteState,
	(state: WeatherRouteState) => state.data.period
);

export const getWeatherRouterLocation = createSelector(
	getWeatherRouteState,
	(state: WeatherRouteState) => state.queryParams.query
);
