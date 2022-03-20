import {PERIOD} from "@bp/weather-forecast/models";
import {RouterReducerState} from "@ngrx/router-store/src/reducer";

export const weatherRouterKey = "weatherRouterStore"

export interface WeatherRouteState {
	url: string;
	queryParams: { query?: string };
	data: { period?: PERIOD }
}

export const weatherRouterInitialState: RouterReducerState<WeatherRouteState> = {
	state: { url: '/', queryParams: {}, data: {} },
	navigationId: -1,
};
