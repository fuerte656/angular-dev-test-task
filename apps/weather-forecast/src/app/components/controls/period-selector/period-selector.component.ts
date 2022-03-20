import {Component, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {refreshForecasts, selectCurrentPeriod, setCurrentPeriod, WeatherState} from "@bp/weather-forecast/store";
import {PERIOD} from "@bp/weather-forecast/models";
import {filter, noop, Subject, takeUntil, tap} from "rxjs";
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
		private store: Store<WeatherState>
	) {
		this.initFromStore();
		this.handleSelection();
	}

	private initFromStore(): void {
		this.store.pipe(
			select(selectCurrentPeriod),
			filter(period => !!period),
			filter(period => period !== this.periodControl.value),
			tap(period => this.periodControl.setValue(period)),
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
		this.store.dispatch(setCurrentPeriod({period}));
		this.store.dispatch(refreshForecasts());
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
