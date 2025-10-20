Weather Forecast App 🌤️

A responsive weather application built with React that shows real-time weather data, hourly and daily forecasts, and supports multiple units. Users can search for any city, get suggestions while typing, and view weather details dynamically.

Features

    1- Detect user location on first load and show local weather.

    2- Search for cities with autocomplete suggestions.

    3- Click a suggestion or search button to fetch updated weather data.

    4- Display current weather, daily forecasts, and hourly forecasts.

    5- Switch between metric (Celsius, km/h, mm) and imperial (Fahrenheit, mph, in) units.

    6- Fully responsive design using Bootstrap.

    7- Loading spinner during API requests.

    8- Error handling for invalid cities or network errors.

Technologies Used

  React.js – Frontend library for building the user interface.

  TypeScript – Static typing for safer code.

  Bootstrap – Responsive UI and layout.

  Axios – API requests.

  Open-Meteo API – Free weather and geolocation API.

  React Context – Global state management for weather, city, and units.

  Custom hooks – useStore for context consumption.

Project Structure
          
      src/
        ├─ assets/             # Images and icons
        ├─ Components/
        │  ├─ Navbar.tsx       # Navigation and units selection
        │  ├─ Header.tsx       # Search input and suggestions
        │  ├─ MainSection.tsx  # Current weather display
        │  ├─ PropertyList.tsx # Weather properties (humidity, wind, etc.)
        │  ├─ DailyList.tsx    # Daily forecast
        │  ├─ HourlyList.tsx   # Hourly forecast
        │  └─ Spinner.tsx      # Loading indicator
        ├─ Store/
        │  ├─ useStore.ts      # Custom hook for WeatherContext
        │  └─ WeatherContext.tsx
        ├─ Service/
        │  └─ WeatherServices.ts # API calls
        ├─ Model/
        │  └─ weater.ts        # TypeScript interfaces for API responses
        └─ App.tsx / MyApp.tsx # Main app component
Usage

  1- On first load, the app tries to detect the user's location and fetch the weather.

  2- Type a city in the search input to get autocomplete suggestions.

  3- Click a suggestion or press the Search button to update weather data.

  4- Use the Units dropdown in the navbar to switch between metric and imperial units.

API Integration

  This app uses the Open-Meteo API:

    Geocoding API – Convert city names into latitude and longitude.

    Weather API – Fetch current weather, hourly, and daily forecasts.

  Axios handles API requests and errors are caught and displayed to the user.

State Management

  1- WeatherContext: Stores city, units, geography, weather, loading, and error states.

  2- useStore hook: Easy access to context data in components.

  3-Weather updates when city or units change.
