import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, Subject, takeUntil} from "rxjs";
import {SimpleWeatherForecast} from "@bp/weather-forecast/models";

export class WeatherDataSource<T extends SimpleWeatherForecast> implements DataSource<T> {

	private disconnected$ = new Subject<void>();

	constructor(private dataSource$: Observable<T[]>) {
	}

	connect(collectionViewer: CollectionViewer): Observable<T[]> {
		return this.dataSource$.pipe(takeUntil(this.disconnected$));
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.disconnected$.next();
		this.disconnected$.complete();
	}
}
