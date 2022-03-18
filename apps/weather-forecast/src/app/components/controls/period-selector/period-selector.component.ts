import {Component, OnDestroy} from '@angular/core';
import {ActivationEnd, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {setCurrentPeriod, WeatherState} from "@bp/weather-forecast/store";
import {PERIOD} from "@bp/weather-forecast/models";
import {filter, map, noop, Subject, takeUntil, tap} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'bp-period-selector',
	templateUrl: './period-selector.component.html',
	styleUrls: ['./period-selector.component.scss']
})
export class PeriodSelectorComponent implements OnDestroy {
	public periodControl = new FormControl();
	public model = PERIOD;
	public destroyed$: Subject<void> = new Subject<void>();

	constructor(
		private router: Router,
		private store: Store<WeatherState>
	) {
		this.initFromRoute();
		this.handleSelection();
	}

	private initFromRoute(): void {
		this.router.events.pipe(
			filter(event => event instanceof ActivationEnd),
			filter((event: any) => event.snapshot.data && event.snapshot.data.period),
			map((event: any) => event.snapshot.data.period),
			filter(period => {
				return period !== this.periodControl.value;
			}),
			tap(period => {
				this.periodControl.setValue(period);
			}),
			takeUntil(this.destroyed$)
		).subscribe(noop);
	}

	private handleSelection(): void {
		this.periodControl.valueChanges.pipe(
			tap(period => this.onSelect(period)),
			takeUntil(this.destroyed$)
		).subscribe(noop);
	}

	private onSelect(period: PERIOD): void {
		this.router.navigate(["/" + period], {queryParamsHandling: "merge"}).then(() => {
			this.store.dispatch(setCurrentPeriod({period}));
		});
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
