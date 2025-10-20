import logoSrc from '../../assets/logo.svg';
import unitSrc from '../../assets/icon-units.svg';
import checkImg from '../../assets/icon-checkmark.svg';
import { useStore } from '../../Store/useStore';

export default function Navbar() {
    const { units, setUnits } = useStore();


    const isChecked = (value: "metric" | "imperial") => units === value;

    return (
        <nav className="d-flex justify-content-between align-items-center px-2 py-4">
            <div className='nav-img'>
                <img src={logoSrc} alt="logo" />
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className='me-2 mb-1' src={unitSrc} alt="unit icon" />
                Units
                </button>

                <ul className="dropdown-menu rounded-3 pe-3 p-3">
                <li><h2 className="text-white ps-3 py-1 fs-6">Switch Units</h2></li>
                <hr />

                <li><h3 className="px-3 py-1 fs-6">Temperature</h3></li>
                <li className="d-flex list-grp rounded-2 pe-3" onClick={() => setUnits("metric")}>
                    <a className="dropdown-item rounded-2">Celsius (°C)</a>
                    {isChecked("metric") && <img src={checkImg} alt="checked" />}
                </li>
                <li className="d-flex list-grp rounded-2 pe-3" onClick={() => setUnits("imperial")}>
                    <a className="dropdown-item rounded-2">Fahrenheit (°F)</a>
                    {isChecked("imperial") && <img src={checkImg} alt="checked" />}
                </li>

                <hr />

                <li><h3 className="px-3 py-1 fs-6">Wind Speed</h3></li>
                <li className="d-flex list-grp rounded-2 pe-3" onClick={() => setUnits("metric")}>
                    <a className="dropdown-item rounded-2">Km/h</a>
                    {isChecked("metric") && <img src={checkImg} alt="checked" />}
                </li>
                <li className="d-flex list-grp rounded-2 pe-3" onClick={() => setUnits("imperial")}>
                    <a className="dropdown-item rounded-2">mph</a>
                    {isChecked("imperial") && <img src={checkImg} alt="checked" />}
                </li>

                <hr />

                <li><h3 className="px-3 py-1 fs-6">Precipitation</h3></li>
                <li className="d-flex list-grp rounded-2 pe-3" onClick={() => setUnits("metric")}>
                    <a className="dropdown-item rounded-2">Millimeters (mm)</a>
                    {isChecked("metric") && <img src={checkImg} alt="checked" />}
                </li>
                <li className="d-flex list-grp rounded-2 pe-3" onClick={() => setUnits("imperial")}>
                    <a className="dropdown-item rounded-2">Inches (in)</a>
                    {isChecked("imperial") && <img src={checkImg} alt="checked" />}
                </li>
                </ul>
            </div>
        </nav>
    );
}
