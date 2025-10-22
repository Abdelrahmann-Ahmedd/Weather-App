import Navbar from './Navbar';
import { MemoHeader } from './Header';
import { MemoMainSection } from './MainSection';
import { MemoPropertyList } from './PropertyList';
import { MemoDailyList } from './DailyList';
import { MemoHourlyList } from './HourlyList';
import { useStore } from '../../Store/useStore';
import Spinner from '../Ui/Spinner';
import 'aos/dist/aos.css';

export default function MyApp() {
    const { loading, error } = useStore();
    if (loading) return <Spinner/>;
    if (error) return <h1 className="text-center text-danger">{error}</h1>;

    return (
        <>
            <div className="row">
                <Navbar />
                <MemoHeader />
            </div>
            <div className="row justify-content-between">
                <div className="col-lg-8">
                    <MemoMainSection />
                    <MemoPropertyList />
                    <MemoDailyList />
                </div>
                <div className="col-lg-4">
                    <MemoHourlyList />
                </div>
            </div>
        </>
    );
}


