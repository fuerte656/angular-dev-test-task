import {Component} from '@angular/core';
import {select} from "@ngrx/store";
import {selectDailyWeatherList} from "@bp/weather-forecast/store";
import {BaseWeatherComponent} from "../index";
import {DailySimpleWeatherForecast} from "@bp/weather-forecast/models";
import {Observable} from "rxjs";

@Component({
	selector: 'bp-daily-weather',
	templateUrl: './daily-weather.component.html',
	styleUrls: ['./daily-weather.component.scss']
})
export class DailyWeatherComponent extends BaseWeatherComponent<DailySimpleWeatherForecast> {

	protected getColumnNames(): string[] {
		return ['city', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	}

	protected getStoreData(): Observable<DailySimpleWeatherForecast[]> {
		return this.store.pipe(select(selectDailyWeatherList));
	}

}
