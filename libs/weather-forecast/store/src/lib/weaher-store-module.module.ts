import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {WeatherEffects, weatherReducer, weatherFeature} from "./state";

@NgModule({
	imports: [
		StoreModule.forFeature(weatherFeature, weatherReducer),
		EffectsModule.forFeature([WeatherEffects])
	],
	providers: [WeatherEffects]
})
export class WeatherStoreModule {
}
