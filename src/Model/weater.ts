export interface WeatherResponse {
    latitude: number,
    longitude: number,
    timezone: string,
    current_weather?: {
        time: string,
        temperature: number,
        windspeed: number,
        weathercode: number
    },
    current_weather_units: { 
        interval: string,
        is_day: string,
        temperature: string,
        time: string,
        weathercode: string,
        winddirection: string,
        windspeed: string,
    },
    elevation: number,
    generationtime_ms: number;
    daily?: {
        time: string[],
        temperature_2m_max: number[],
        temperature_2m_min: number[],
        weathercode: number[],
        precipitation_sum: number[]
    },
    hourly?: {
        time: string[],
        temperature_2m: number[],
        apparent_temperature: number[],
        wind_speed_10m: number[],
        weathercode: number[],
        precipitation: number[],
        relative_humidity_2m: number[]
    },
    hourly_units?: {
        apparent_temperature: string,
        precipitation: string,
        relative_humidity_2m: string,
        temperature_2m: string,
        time: string,
        weathercode: string,
        wind_speed_10m: string,
    },
}


export interface GeograficCountry {
    name: string,
    latitude: number,
    longitude: number,
    country: string,
    timezone: string
} 

export interface GeografyResult {
    results : GeograficCountry[]
}
