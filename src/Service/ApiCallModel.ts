    import axios, { AxiosError, type AxiosRequestConfig } from "axios";

    const WeatherAPI =axios.create({
        baseURL: "https://api.open-meteo.com/v1/forecast",
        timeout: 5000,
        headers: { "Content-Type": "application/json" },
    })

    const GeograficAPI =axios.create({
        baseURL: "https://geocoding-api.open-meteo.com/v1/search",
        timeout: 5000,
        headers: { "Content-Type": "application/json" },
    })


    export const ApiOption = {
        Weather: "weather",
        Geocoding: "geocoding",
    } as const;

    export type ApiOption = typeof ApiOption[keyof typeof ApiOption];

    export async function apiCall<T>(option: ApiOption , config: AxiosRequestConfig)
    {
        try {
            const api = option === ApiOption.Weather? WeatherAPI: GeograficAPI;  
            const response = await api.request<T>(config);
            return { data: response.data, error: null }; 
        } catch (error) { 
            const axiosError = error as AxiosError<{ message: string }>;
            console.error("API Error:", axiosError);
            return { data: null, error: axiosError.response?.data?.message || "Unexpected error", }; 
        } 
    }