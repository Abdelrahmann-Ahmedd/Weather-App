import { useState } from "react";
import { useStore } from "../../Store/useStore";
import { WeatherServices } from "../../Service/WeatherServices";

export default function Header() {
    const { getWeather } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!value) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const geoData = await WeatherServices.getCoordinates(value);
            const cityNames = geoData.data?.results?.map(c => c.name) ?? [];
            setSuggestions(cityNames);
        } catch {
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCity = (cityName: string) => {
        setSearchTerm(cityName);
        setSuggestions([]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm) {
            setSuggestions([]);
            await getWeather(searchTerm);
        }
    };

    return (
        <header data-aos="fade-down" className="z-3 header-section w-100 m-auto text-center mt-4">
            <h1 className="fs-1 fw-bold">How's the sky looking today?</h1>

            <form
                className="d-flex mt-5 w-50 m-auto position-relative"
                onSubmit={handleSubmit}
            >
                <input
                    className="rounded-4 me-2 py-2 p-3 w-100"
                    type="search"
                    placeholder="Search for place..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                <button className="px-4 py-2 rounded-4" type="submit">Search</button>

                {suggestions.length > 0 && (
                    <ul
                        className="suggest position-absolute  cursor-pointer top-100 rounded-3 shadow w-100 mt-1 p-2"
                        style={{ zIndex: 1000 }}
                    >
                        {suggestions.map((s, i) => (
                            <li
                                key={i}
                                className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer"
                                onClick={() => handleSelectCity(s)}
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                )}

                {loading && <div className="position-absolute mt-2 text-muted">Loading...</div>}
            </form>
        </header>
    );
}
