import {ForecastLocation} from "./forecast-location";

export class ForecastLocationImpl {
	public country: string;
	public lat: number;
	public lon: number;
	public name: string;
	public state: string;

	constructor(location: ForecastLocation) {
		this.country = location.country;
		this.lat = location.lat;
		this.lon = location.lon;
		this.name = location.name;
		this.state = location.state;
	}

	public get hash(): string {
		return [this.name, this.state, this.country].join("-").replace(/\s+/ig,"-");
	}
}
