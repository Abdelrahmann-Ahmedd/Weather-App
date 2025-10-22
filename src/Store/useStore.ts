import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

export function useStore() {
    const context = useContext(WeatherContext);
    if (!context) throw new Error("useStore must be used within a WeatherProvider");
    return context;
}
