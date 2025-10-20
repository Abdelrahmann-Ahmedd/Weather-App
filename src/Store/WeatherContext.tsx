import { createContext, useState, type ReactNode, useEffect } from "react";
import { WeatherServices } from "../Service/WeatherServices";
import type { GeograficCountry, WeatherResponse } from "../Model/weater";
import type { AxiosError } from "axios";
import AOS from 'aos';
import '../../node_modules/aos/dist/aos.css'

export interface WeatherContextProps {
    city: string;
    setCity: (city: string) => void;
    geo: GeograficCountry | null;
    weather: WeatherResponse | null;
    units: "metric" | "imperial";
    setUnits: (unit: "metric" | "imperial") => void;
    getWeather: (cityName?: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
    const [city, setCity] = useState<string>("");
    const [geo, setGeo] = useState<GeograficCountry | null>(null);
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [units, setUnits] = useState<"metric" | "imperial">("metric");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // fetch geo and weather for a city
    const getWeather = async (cityName?: string) => {
        const targetCity = cityName ?? city;
        if (!targetCity) return;
        AOS.refresh();
        setLoading(true);
        setError(null);
        try {
            // get geo coordinates
            const geoData = await WeatherServices.getCoordinates(targetCity);
            const location = geoData.data?.results?.[0] ?? null;
            if (!location) throw new Error("City not found");
            setGeo(location);
            setCity(location.name);

            // get weather
            const weatherData = await WeatherServices.getWeather(
                location.latitude,
                location.longitude,
                units
            );
            if (!weatherData.data) throw new Error(weatherData.error || "Failed to fetch weather");
            setWeather(weatherData.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError?.message || "Failed to fetch weather");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    // get weather when units change
    useEffect(() => {
        if (geo) getWeather();
    }, [units]);

    // on first load, get user location
    useEffect(() => {
        if (city) return;
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        const weatherData = await WeatherServices.getWeather(lat, lon, units);
                        if (!weatherData.data) throw new Error(weatherData.error || "Failed to fetch weather");
                        setWeather(weatherData.data);

                        const geoData = await WeatherServices.getCoordinates(`${lat},${lon}`);
                        const location = geoData.data?.results?.[0] ?? null;
                        if (location) {
                            setCity(location.name);
                            setGeo(location);
                        }
                    } catch (err) {
                        console.error(err);
                    }finally{
                        setLoading(false)
                    }
                },
                () => {
                    getWeather("Cairo").finally(()=>{setLoading(false)});
                }
            );
        } else {
            getWeather("Cairo");
        }
        AOS.init();
    }, []);

    return (
        <WeatherContext.Provider
            value={{ city, setCity, geo, weather, units, setUnits, getWeather, loading, error }}
        >
            {children}
        </WeatherContext.Provider>
    );
};
