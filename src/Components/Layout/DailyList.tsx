import { useStore } from '../../Store/useStore';
import Daily from '../Ui/Daily'
export default function DailyList() {

    const { weather } = useStore();
    const daily = weather?.daily;
    return (
        <div className="container daily-list">
            <h2 className='fs-5 fw-bold mt-2'>Daliy forecast</h2>
            <div className="row gx-2 mt-2 gy-2">
                {daily?.time.length?(daily.time.map((day,ind)=> <div className='lis' >
                    <Daily key={ind} ind= {ind} data={day}/>
                </div>)):(<p>No Data Available</p>)}
            </div>
        </div>
    )
}
