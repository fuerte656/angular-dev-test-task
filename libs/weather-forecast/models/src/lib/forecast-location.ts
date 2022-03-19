import {Coordinates} from "./coordinates";

export interface ForecastLocation extends Coordinates {
	country: string;
	name: string;
	state: string;
}
