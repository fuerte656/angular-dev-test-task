import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {WeatherState} from "@bp/weather-forecast/store";
import {WeatherDataSource} from "./weather-data-source";
import {SimpleWeatherForecast} from "@bp/weather-forecast/models";
import {Observable} from "rxjs";

@Component({
	selector: 'bp-base-weather',
	template: '',
})
export class BaseWeatherComponent<T extends SimpleWeatherForecast> {
	public displayedColumns: string[] = this.getColumnNames();
	public dataSource: WeatherDataSource<T> = this.getDataSource()

	constructor(protected store: Store<WeatherState>) {
	}

	private getDataSource(): WeatherDataSource<T> {
		return new WeatherDataSource<T>(this.getStoreData());
	}

	protected getColumnNames(): string[] {
		throw new Error("Not implemented");
	}

	protected getStoreData(): Observable<T[]> {
		throw new Error("Not implemented");
	}

}
