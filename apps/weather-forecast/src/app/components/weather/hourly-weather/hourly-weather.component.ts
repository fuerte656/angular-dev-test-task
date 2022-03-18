import {Component} from '@angular/core';
import {select} from "@ngrx/store";
import {selectHourlyWeatherList} from "@bp/weather-forecast/store";
import {Observable} from "rxjs";
import {BaseWeatherComponent} from "../index";
import {HourlySimpleWeatherForecast} from "@bp/weather-forecast/models";

@Component({
	selector: 'bp-hourly-weather',
	templateUrl: './hourly-weather.component.html',
	styleUrls: ['./hourly-weather.component.scss']
})
export class HourlyWeatherComponent extends BaseWeatherComponent<HourlySimpleWeatherForecast> {

	protected getColumnNames(): string[] {
		return ['city', 'hour3', 'hour6', 'hour9', 'hour12', 'hour15', 'hour18', 'hour21', 'hour24'];
	}

	protected getStoreData(): Observable<HourlySimpleWeatherForecast[]> {
		return this.store.pipe(select(selectHourlyWeatherList));
	}

}
