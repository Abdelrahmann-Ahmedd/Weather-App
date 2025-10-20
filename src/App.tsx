import { WeatherProvider} from "./Store/WeatherContext";
import './App.css'
import { AllApp } from './Components/Layout/MyApp';
export default function App() {




  return (
    <WeatherProvider>
      <section className=" container overflow-hidden">
        <AllApp />
      </section>
    </WeatherProvider>
  )
}
