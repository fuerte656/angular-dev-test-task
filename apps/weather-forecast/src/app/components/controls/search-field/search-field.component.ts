import {Component, OnDestroy} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, map, noop, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";
import {WeatherForecastApiService} from "@bp/weather-forecast/services";
import {Store} from "@ngrx/store";
import {WeatherState} from "@bp/weather-forecast/store";
import {setCurrentLocation} from "@bp/weather-forecast/store";
import {ForecastLocationImpl} from "@bp/weather-forecast/models";
import {ActivatedRoute, Router} from "@angular/router";

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
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private store: Store<WeatherState>,
	) {
		this.initFromRoute();
	}

	private initFromRoute(): void {
		this.activatedRoute.queryParams.pipe(
			filter(params => !!params.query && params.query.length > MIN_SEARCH_CHARACTER_COUNT),
			distinctUntilChanged(),
			map(params => params.query),
			switchMap(query => this.apiService.getLocation(query)),
			filter(location => !!location),
			tap(location => this.searchFieldControl.setValue(location, {emitEvent: false})),
			tap((location: any) => this.onSelect(location)),
			takeUntil(this.destroyed$)).subscribe(noop);
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
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParamsHandling: "merge",
			queryParams: {query: selectedLocation.name}
		}).then(() => {
			this.store.dispatch(setCurrentLocation({location: selectedLocation}));
		});
	}


	public displayLocationWith(value: ForecastLocationImpl): string {
		return value?.name;
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

}
