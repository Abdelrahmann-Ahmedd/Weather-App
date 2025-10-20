import { useStore } from "../../Store/useStore";
import imgSrc00 from '../../assets/icon-sunny.webp'
import imgSrc01 from '../../assets/icon-partly-cloudy.webp'
import imgSrc02 from '../../assets/icon-storm.webp'
import imgSrc03 from '../../assets/icon-snow.webp'
import imgSrc04 from '../../assets/icon-fog.webp'
import imgSrc05 from '../../assets/icon-rain.webp'
import imgSrc06 from '../../assets/icon-overcast.webp'
import imgSrc07 from '../../assets/icon-drizzle.webp'

export default function Daily({data ,ind}:{data:string,ind:number}) {
    
    const {weather} = useStore();
    
    const SrcImages = [ 
        imgSrc00,
        imgSrc01,
        imgSrc02,
        imgSrc03,
        imgSrc04,
        imgSrc05,
        imgSrc06,
        imgSrc07
    ];

    function convertDate(day:string){
        const date = new Date(day);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    }

    return (
        <div data-aos="zoom-in" data-aos-delay= "2000" data-aos-duration="500" className="container daily rounded-2 p-2">
            <h5 className='text-center fs-6'>{convertDate(data)}</h5>
            <figure className='w-75 m-auto'>
                <img className='w-100' src={SrcImages[ind]} alt="status" />
            </figure>
            <div className='d-flex justify-content-between'>
                <h6 className="fs-6">{weather?.daily?.temperature_2m_max[ind]}{weather?.current_weather_units.temperature[0]}</h6>
                <h6 className="fs-6">{weather?.daily?.temperature_2m_min[ind]}{weather?.current_weather_units.temperature[0]}</h6>
            </div>    
        </div>
    )
}
