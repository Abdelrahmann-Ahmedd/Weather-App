import React, { useState, useMemo } from "react";
import { useStore } from "../../Store/useStore";
import { MemoHourly } from "../Ui/Hourly";

function HourlyList() {
    const { weather } = useStore();
    const hourly = weather?.hourly;

    const [selectedDay, setSelectedDay] = useState<number>(0);

    function getHour(dateStr: string) {
        return new Date(dateStr).getHours();
    }

    function getDayName(dateStr: string) {
        return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
    }

    const days = useMemo(() => {
        if (!hourly?.time) return [];
        const uniqueDays = Array.from(
        new Set(hourly.time.map((t) => getDayName(t)))
        );
        return uniqueDays;
    }, [hourly]);

    const filteredHours = useMemo(() => {
        if (!hourly?.time) return [];
        const selectedDayName = days[selectedDay];
        return hourly.time
        .map((t, i) => ({ time: t, temp: hourly.temperature_2m[i], code: hourly.weathercode[i] }))
        .filter((item) => getDayName(item.time) === selectedDayName);
    }, [hourly, days, selectedDay]);

    return (
        <div data-aos="fade-left" data-aos-delay= "500" className="hourly-list rounded-2 container p-3 pt-3 mt-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
                <h2 className="fs-5 fw-bold">Hourly Forecast</h2>

                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {days[selectedDay] || "Select Day"}
                    </button>
                    <ul className="dropdown-menu p-2">
                        {days.map((day, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedDay(index)}
                            className={index === selectedDay ? "checked" : ""}
                        >
                            <a className="dropdown-item rounded-2" href="#">
                            {day}
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div  className=" row gy-4 mt-3 overflow-y-scroll"style={{ maxHeight: "550px", overflowY: "auto" }} >
                {filteredHours.length ? (
                filteredHours.map((item, index) => (
                    <MemoHourly
                    key={index}
                    hour={`${getHour(item.time)} PM`}
                    temp={item.temp}
                    />
                ))
                ) : (
                <p>No Data Available</p>
                )}
            </div>
        </div>
    );
}

export const MemoHourlyList = React.memo(HourlyList);