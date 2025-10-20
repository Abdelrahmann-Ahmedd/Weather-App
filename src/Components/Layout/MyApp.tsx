import Navbar from './Navbar';
import Header from './Header';
import MainSection from './MainSection';
import PropertyList from './PropertyList';
import DailyList from './DailyList';
import HourlyList from './HourlyList';
import { useStore } from '../../Store/useStore';
import Spinner from '../Ui/Spinner';
import 'aos/dist/aos.css';
import React from 'react';

function MyApp() {
    const { loading, error } = useStore();
    if (loading) return <Spinner/>;
    if (error) return <h1 className="text-center text-danger">{error}</h1>;

    return (
        <>
            <div className="row">
                <Navbar />
                <Header />
            </div>
            <div className="row justify-content-between">
                <div className="col-lg-8">
                    <MainSection />
                    <PropertyList />
                    <DailyList />
                </div>
                <div className="col-lg-4">
                    <HourlyList />
                </div>
            </div>
        </>
    );
}

export const AllApp = React.memo(MyApp);
