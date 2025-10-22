import React, { useMemo } from 'react';
import sunIcon from '../../assets/icon-sunny.webp';
import { useStore } from '../../Store/useStore';

function MainSection() {
  const { weather} = useStore();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const { locationName, formattedDate, temperatureText } = useMemo(() => {
    if (!weather) {
      return { locationName: "", formattedDate: "", temperatureText: "" };
    }

    const locationName = weather.timezone?.split("/").join(", ") ?? "";
    const formattedDate = formatDate(weather.current_weather?.time ?? "");
    const temperatureText = `${weather.current_weather?.temperature ?? ""}${
      weather.current_weather_units?.temperature ?? ""
    }`;

    return { locationName, formattedDate, temperatureText };
  }, [weather]);

  return (
    <section
      data-aos="fade-right"
      data-aos-delay="500"
      style={{ height: "225px" }}
      className="main-section z-0 mb-5 rounded-4 px-5 container mt-4 d-flex justify-content-between align-items-center"
    >
      <div className="w-75">
        <h3 className="fs-2 fw-bolder">{locationName}</h3>
        <h4 className="fs-6 fw-bold">{formattedDate}</h4>
      </div>
      <div className="deg d-flex align-items-center justify-content-between">
        <img className="w-25" src={sunIcon} alt="sun icon" />
        <h3 className="fw-bold">{temperatureText}</h3>
      </div>
    </section>
  );
}

export const MemoMainSection = React.memo(MainSection);
