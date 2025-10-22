import { WeatherProvider} from "./Store/WeatherContext";
import './App.css'
import MyApp  from './Components/Layout/MyApp';
export default function App() {




  return (
    <WeatherProvider>
      <section className=" container overflow-hidden">
        <MyApp />
      </section>
    </WeatherProvider>
  )
}
