import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, filter, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {
	loadDailyWeatherForLocation,
	loadDailyWeatherForLocationFailed,
	loadDailyWeatherForLocationSuccess,
	loadHourlyWeatherForLocation,
	loadHourlyWeatherForLocationFailed,
	loadHourlyWeatherForLocationSuccess,
	refreshForecasts,
	setCurrentLocation,
	setCurrentLocationByQuery,
	setCurrentLocationByQueryFailed,
	setCurrentLocationByQuerySuccess,
	setCurrentPeriod
} from "./weather.actions";
import {WeatherForecastApiService} from "@bp/weather-forecast/services";
import {select, Store} from "@ngrx/store";
import {selectCurrentLocation, selectCurrentPeriod, selectDailyWeatherHashTable, selectHourlyWeatherHashTable} from "./weather.selectors";
import {WeatherState} from "./weather.reducer";
import {ForecastLocationImpl, PERIOD} from "@bp/weather-forecast/models";
import {ROUTER_NAVIGATED, RouterAction} from "@ngrx/router-store";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {getWeatherRouterLocation, getWeatherRouterPeriod} from "../router-state/weather-route.selector";
import {WeatherRouteState} from "../router-state/weather-route.reducer";

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
			withLatestFrom(this.store.pipe(select(selectDailyWeatherHashTable))),
			filter(([{location}, hashTable]) => !hashTable[location.hash]),
			switchMap(([{location}]) =>
				this.weatherForecastApiService.getDailyForecast(location).pipe(
					map(forecast => loadDailyWeatherForLocationSuccess({forecast})),
					catchError(error => of(loadDailyWeatherForLocationFailed({error})))
				)
			)
		)
	);

	setCurrentLocation$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof setCurrentLocation>>(setCurrentLocation),
			withLatestFrom(this.store.pipe(select(getWeatherRouterLocation))),
			tap(([{location}, locationQuery]) => {
				if (location.name !== locationQuery) {
					this.router.navigate([], {
						relativeTo: this.activatedRoute,
						queryParamsHandling: "merge",
						queryParams: {query: location.name}
					});
				}
			})
		),
																																				{
																																					dispatch: false,
																																				}
	);

	setCurrentPeriod$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof setCurrentPeriod>>(setCurrentPeriod),
			withLatestFrom(this.store.pipe(select(getWeatherRouterPeriod))),
			tap(([{period}, periodQuery]) => {
				if (period !== periodQuery) this.router.navigate(["/" + period], {queryParamsHandling: "merge"});
			})
		),
																																		{
																																			dispatch: false,
																																		}
	);


	refreshForecasts$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof refreshForecasts>>(refreshForecasts),
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
		), {
		dispatch: false
	}
	);

	setCurrentLocationByQuery$ = createEffect(() =>
		this.actions$.pipe(
			ofType<ReturnType<typeof setCurrentLocationByQuery>>(setCurrentLocationByQuery),
			withLatestFrom(this.store.pipe(select(selectCurrentLocation))),
			filter(([{locationName}, locationFromStore]) => !locationFromStore || locationFromStore.name !== locationName),
			switchMap(([{locationName}]) =>
				this.weatherForecastApiService.getLocation(locationName).pipe(
					filter(location => !!location),
					map((location: any) => setCurrentLocationByQuerySuccess({location})),
					catchError(error => of(setCurrentLocationByQueryFailed({error})))
				)
			)
		)
	);

	setCurrentLocationByQuerySuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setCurrentLocationByQuerySuccess),
			map(({location}) => setCurrentLocation({location}))
		)
	);

	routeChanged$ = createEffect(() => this.actions$.pipe(
		ofType(ROUTER_NAVIGATED),
		map((action: RouterAction<RouterStateSnapshot>) => <any>action.payload.routerState),
		tap((state: WeatherRouteState) => {
			if (state.queryParams.query) {
				this.store.dispatch(setCurrentLocationByQuery({locationName: state.queryParams.query}));
			}

			if (state.data.period) {
				this.store.dispatch(setCurrentPeriod({period: state.data.period}));
			}
		})
	),
																														{dispatch: false}
	);

	errorHandler$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				loadHourlyWeatherForLocationFailed,
				loadDailyWeatherForLocationFailed,
				setCurrentLocationByQueryFailed
			),
			tap(({error}) => alert(error))
		)
	);


	constructor(
		private actions$: Actions,
		private store: Store<WeatherState>,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private weatherForecastApiService: WeatherForecastApiService
	) {
	}
}
