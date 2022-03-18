import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WeatherForecastServicesModule} from "@bp/weather-forecast/services";
import {AppRoutingModule} from "./app-routing.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ControlsComponent} from './components/controls/controls.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTableModule} from "@angular/material/table";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {WeatherStoreModule} from "@bp/weather-forecast/store";
import {
	BaseWeatherComponent,
	DailyWeatherComponent,
	HourlyWeatherComponent,
	PeriodSelectorComponent,
	SearchFieldComponent
} from "./components";

@NgModule({
	declarations: [
		AppComponent,
		DailyWeatherComponent,
		ControlsComponent,
		SearchFieldComponent,
		PeriodSelectorComponent,
		HourlyWeatherComponent,
		BaseWeatherComponent
	],
	imports: [
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		BrowserModule,
		BrowserAnimationsModule,
		WeatherStoreModule,
		WeatherForecastServicesModule,
		AppRoutingModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonToggleModule,
		MatTableModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {

}
