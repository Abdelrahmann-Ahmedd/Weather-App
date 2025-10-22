import imgSrc00 from "../../assets/icon-sunny.webp";
import imgSrc01 from "../../assets/icon-partly-cloudy.webp";
import imgSrc02 from "../../assets/icon-storm.webp";
import imgSrc03 from "../../assets/icon-snow.webp";
import imgSrc04 from "../../assets/icon-fog.webp";
import imgSrc05 from "../../assets/icon-rain.webp";
import imgSrc06 from "../../assets/icon-overcast.webp";
import imgSrc07 from "../../assets/icon-drizzle.webp";
import React from "react";

function Hourly({
  hour,
  temp,
}: {
  hour: string;
  temp: number;
}) {
  const SrcImages = [
    imgSrc00,
    imgSrc01,
    imgSrc02,
    imgSrc03,
    imgSrc04,
    imgSrc05,
    imgSrc06,
    imgSrc07,
  ];


  const iconIndex = Math.min(Math.floor(Math.random() * SrcImages.length), 7);

  return (
    <div className="hourly p-3 rounded-2 container d-flex justify-content-between align-items-center">
      <figure className="w-50 d-flex align-items-center">
        <img
          className="w-25"
          src={SrcImages[iconIndex]}
          alt="weather icon"
        />
        <figcaption className="ms-2">{hour==="0 PM"?"12 PM":hour}</figcaption>
      </figure>
      <h5 className="me-2">{temp.toFixed(1)}°</h5>
    </div>
  );
}

export const MemoHourly = React.memo(Hourly);