import {RouterStateSerializer} from "@ngrx/router-store";
import {RouterStateSnapshot} from "@angular/router";
import {WeatherRouteState} from "./weather-route.reducer";


export class WeatherRouteSerializer implements RouterStateSerializer<WeatherRouteState> {
	serialize(routerState: RouterStateSnapshot): WeatherRouteState {
		let route = routerState.root;

		while (route.firstChild) {
			route = route.firstChild;
		}

		const {url, root: {queryParams}} = routerState;
		const {data} = route;

		return {url, queryParams, data};
	}
}
