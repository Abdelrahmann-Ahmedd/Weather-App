import { useStore } from "../../Store/useStore";
import Property from "../Ui/Property";

export default function PropertyList() {

    const {weather} = useStore();

    return (
        <div className="container property-list mb-4">
            <div className="row">
                <div className="col-lg-3 col-6">
                    <Property head="Feels Like" number = {weather?.elevation??0} unit={weather?.current_weather_units.temperature??""} />
                </div>
                <div className="col-lg-3 col-6">
                    <Property head="Humidity" number={(weather?.hourly?.relative_humidity_2m[0]??0)} unit= {"%"} />
                </div>
                <div className="col-lg-3 col-6">
                    <Property head="Wind" number={weather?.current_weather?.windspeed??0} unit= {weather?.current_weather_units.windspeed??""} />
                </div>
                <div className="col-lg-3 col-6">
                    <Property head="Precipitation" number={weather?.hourly?.precipitation?.[0] ?? 0} unit= {weather?.hourly_units?.precipitation??""} />
                </div>
            </div>
        </div>
    )
}
