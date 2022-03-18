import {ForecastLocationImpl} from "./forecast-location-impl";

export class SimpleWeatherForecast {

	public hash: string;
	public city: string;

	constructor(location: ForecastLocationImpl) {
		this.hash = location.hash;
		this.city = location.name;
	}


}
