import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, filter, map, mapTo, of, switchMap, tap, withLatestFrom} from "rxjs";
import {
	getLocationsForCity,
	getLocationsForCityFailed,
	getLocationsForCitySuccess,
	loadDailyWeatherForLocation,
	loadDailyWeatherForLocationFailed,
	loadDailyWeatherForLocationSuccess,
	loadHourlyWeatherForLocation,
	loadHourlyWeatherForLocationFailed,
	loadHourlyWeatherForLocationSuccess,
	refreshForecasts,
	setCurrentLocation,
	setCurrentPeriod
} from "./weather.actions";
import {WeatherForecastApiService} from "@bp/weather-forecast/services";
import {select, Store} from "@ngrx/store";
import {selectCurrentLocation, selectCurrentPeriod, selectHourlyWeatherHashTable} from "./weather.selectors";
import {WeatherState} from "./weather.reducer";
import {ForecastLocationImpl, PERIOD} from "@bp/weather-forecast/models";

@Injectable()
export class WeatherEffects {

	loadHourlyWeatherForLocation$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof loadHourlyWeatherForLocation>>(loadHourlyWeatherForLocation),
			withLatestFrom(this.store.pipe(select(selectHourlyWeatherHashTable))),
			filter(([{location}, hashTable]) => !hashTable[location.hash]),
			switchMap(([{location}]) =>
				this.weatherForecastApiService.getHourlyForecast(location).pipe(
					map(forecast => loadHourlyWeatherForLocationSuccess({forecast})),
					catchError(error => of(loadHourlyWeatherForLocationFailed({error})))
				)
			)
		)
	);

	loadDailyWeatherForLocation$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof loadDailyWeatherForLocation>>(loadDailyWeatherForLocation),
			withLatestFrom(this.store.pipe(select(selectHourlyWeatherHashTable))),
			filter(([{location}, hashTable]) => !hashTable[location.hash]),
			switchMap(([{location}]) =>
				this.weatherForecastApiService.getDailyForecast(location).pipe(
					map(forecast => loadDailyWeatherForLocationSuccess({forecast})),
					catchError(error => of(loadDailyWeatherForLocationFailed({error})))
				)
			)
		)
	);

	getLocationsForCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof getLocationsForCity>>(getLocationsForCity),
			switchMap(({city}) =>
				this.weatherForecastApiService.getLocations(city).pipe(
					map(locations => getLocationsForCitySuccess({locations})),
					catchError(error => of(getLocationsForCityFailed({error})))
				)
			)
		)
	);

	setCurrentLocation$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof setCurrentLocation>>(setCurrentLocation),
			mapTo(refreshForecasts())
		)
	);

	setCurrentPeriod$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof setCurrentPeriod>>(setCurrentPeriod),
			mapTo(refreshForecasts())
		)
	);

	errorHandler$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				loadHourlyWeatherForLocationFailed,
				loadDailyWeatherForLocationFailed,
				getLocationsForCityFailed
			),
			tap(({error}) => alert(error))
		)
	);

	refreshForecasts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(refreshForecasts),
			withLatestFrom(this.store.pipe(select(selectCurrentLocation)), this.store.pipe(select(selectCurrentPeriod))),
			filter(([_, location, period]) => !!location && !!period),
			tap(([_, location, period]) => {
				switch (period) {
					case PERIOD.DAILY:
						this.store.dispatch(loadDailyWeatherForLocation({location: <ForecastLocationImpl>location}));
						break;
					case PERIOD.HOURLY:
						this.store.dispatch(loadHourlyWeatherForLocation({location: <ForecastLocationImpl>location}));
						break;
				}
			})
		),
																																		{
																																			dispatch: false,
																																		}
	);


	constructor(
		private actions$: Actions,
		private store: Store<WeatherState>,
		private weatherForecastApiService: WeatherForecastApiService
	) {
	}
}
