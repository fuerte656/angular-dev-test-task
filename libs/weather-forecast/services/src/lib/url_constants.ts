import {ForecastLocation} from "../../../models/src/lib/forecast-location";
import {PERIOD} from "../../../models/src/lib/period";

const FORECAST_BASE_URL = "http://api.openweathermap.org";
const FORECAST_URL = (location: ForecastLocation, apiKey: string, excludePeriod: PERIOD) =>
	`${FORECAST_BASE_URL}/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,${excludePeriod},alerts&units=metric&appid=${apiKey}`;


export const LOCATIONS_URL = (city: string, limit: number, apiKey: string) =>
	`${FORECAST_BASE_URL}/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;

export const HOURLY_FORECAST_URL = (location: ForecastLocation, apiKey: string) =>
	FORECAST_URL(location, apiKey, PERIOD.DAILY);

export const DAILY_FORECAST_URL = (location: ForecastLocation, apiKey: string) =>
	FORECAST_URL(location, apiKey, PERIOD.HOURLY);
