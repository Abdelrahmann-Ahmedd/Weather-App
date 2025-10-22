import { createContext, useState, type ReactNode, useEffect, useRef } from "react";
import { WeatherServices } from "../Service/WeatherServices";
import type { GeograficCountry, WeatherResponse } from "../Model/weater";
import type { AxiosError } from "axios";
import AOS from "aos";
import "../../node_modules/aos/dist/aos.css";

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
export const WeatherContext = createContext<WeatherContextProps | undefined>(
    undefined
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
    const [city, setCity] = useState<string>("");
    const [geo, setGeo] = useState<GeograficCountry | null>(null);
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [units, setUnits] = useState<"metric" | "imperial">("metric");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  // Cache refs
    const lastCityRef = useRef<string>("");
    const lastUnitsRef = useRef<"metric" | "imperial">("metric");
    const lastWeatherRef = useRef<string>("");

  // Fetch geo + weather
    const getWeather = async (cityName?: string) => {
        const targetCity = cityName ?? city;
        if (!targetCity) return;

        AOS.refresh();
        setLoading(true);
        setError(null);

        try {
        // Get geo coordinates
            const geoData = await WeatherServices.getCoordinates(targetCity);
            const location = geoData.data?.results?.[0] ?? null;
            if (!location) throw new Error("City not found");

        // Skip if same city & same units (no need to refetch)
        if (
            location.name === lastCityRef.current &&
            units === lastUnitsRef.current
        ) {
            setLoading(false);
            return;
        }

        setGeo(location);
        setCity(location.name);

        // Get weather data
        const weatherData = await WeatherServices.getWeather(
            location.latitude,
            location.longitude,
            units
        );

        if (!weatherData.data)
            throw new Error(weatherData.error || "Failed to fetch weather");

        const newWeatherString = JSON.stringify(weatherData.data);

        // Only update state if weather changed
        if (newWeatherString !== lastWeatherRef.current) {
            setWeather(weatherData.data);
            lastWeatherRef.current = newWeatherString;
        }

        // Update cache refs
        lastCityRef.current = location.name;
        lastUnitsRef.current = units;
        } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(axiosError?.message || "Failed to fetch weather");
        setWeather(null);
        } finally {
        setLoading(false);
        }
    };

    useEffect(()=>{
        getWeather(city);
    },[units])

  // On first load: use current location
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
                    if (!weatherData.data)
                    throw new Error(weatherData.error || "Failed to fetch weather");
                    setWeather(weatherData.data);

                    const geoData = await WeatherServices.getCoordinates(`${lat},${lon}`);
                    const location = geoData.data?.results?.[0] ?? null;
                    if (location) {
                    setCity(location.name);
                    setGeo(location);
                    lastCityRef.current = location.name;
                    lastUnitsRef.current = units;
                    lastWeatherRef.current = JSON.stringify(weatherData.data);
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
                },
                () => {
                getWeather("Cairo").finally(() => setLoading(false));
                }
            );
        } else {
            getWeather("Cairo");
        }

        AOS.init();
    }, [units]);

    return (
        <WeatherContext.Provider
            value={{
                city,
                setCity,
                geo,
                weather,
                units,
                setUnits,
                getWeather,
                loading,
                error,
            }}
            >
            {children}
        </WeatherContext.Provider>
    );
};
