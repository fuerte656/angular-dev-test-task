import {Component, OnDestroy} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, noop, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";
import {WeatherForecastApiService} from "@bp/weather-forecast/services";
import {select, Store} from "@ngrx/store";
import {refreshForecasts, selectCurrentLocation, setCurrentLocation, WeatherState} from "@bp/weather-forecast/store";
import {ForecastLocationImpl} from "@bp/weather-forecast/models";

const MIN_SEARCH_CHARACTER_COUNT = 2;

@Component({
	selector: 'bp-search-field',
	templateUrl: './search-field.component.html',
	styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnDestroy {
	public searchFieldControl = new FormControl();
	public locations$: Observable<ForecastLocationImpl[]> = this.initAutocompleteControl();
	public destroyed$: Subject<void> = new Subject<void>();

	constructor(
		private apiService: WeatherForecastApiService,
		private store: Store<WeatherState>,
	) {
		this.initFromStore();
	}

	private initFromStore(): void {
		this.store.pipe(
			select(selectCurrentLocation),
			filter(location => !!location),
			filter(period => period !== this.searchFieldControl.value),
			tap(location => this.searchFieldControl.setValue(location, {emitEvent: false})),
			tap((location: any) => this.onSelect(location)),
			takeUntil(this.destroyed$)
		).subscribe(noop);
	}


	private initAutocompleteControl(): Observable<ForecastLocationImpl[]> {
		return this.searchFieldControl.valueChanges
			.pipe(
				filter(value => value && value.length > MIN_SEARCH_CHARACTER_COUNT),
				distinctUntilChanged(),
				debounceTime(500),
				switchMap(value => this.apiService.getLocations(value))
			)
	}


	public onSelect(selectedLocation: ForecastLocationImpl): void {
		this.store.dispatch(setCurrentLocation({location: selectedLocation}));
		this.store.dispatch(refreshForecasts());
	}


	public displayLocationWith(value: ForecastLocationImpl): string {
		return value?.name;
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

}
