import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {WeatherEffects, weatherFeature, weatherReducer} from "./state";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {WeatherRouteSerializer} from "./router-state/weather-route-serializer";
import {weatherRouterInitialState, weatherRouterKey} from "./router-state/weather-route.reducer";

@NgModule({
	imports: [
		StoreModule.forFeature(weatherFeature, weatherReducer),
		StoreModule.forFeature(weatherRouterKey, routerReducer, {initialState: weatherRouterInitialState}),
		EffectsModule.forFeature([WeatherEffects]),
		StoreRouterConnectingModule.forRoot({serializer: WeatherRouteSerializer, stateKey: weatherRouterKey})
	],
	providers: [WeatherEffects]
})
export class WeatherStoreModule {
}
