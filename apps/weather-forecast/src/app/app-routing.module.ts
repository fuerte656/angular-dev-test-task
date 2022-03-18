import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DailyWeatherComponent, HourlyWeatherComponent} from "./components";
import {PERIOD} from "@bp/weather-forecast/models";

const routes: Routes = [
	{path: '', redirectTo: '/daily', pathMatch: 'full'},
	{path: 'daily', component: DailyWeatherComponent, data: {period: PERIOD.DAILY}, },
	{path: 'hourly', component: HourlyWeatherComponent, data: {period: PERIOD.HOURLY}},
];

// configures NgModule imports and exports
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
