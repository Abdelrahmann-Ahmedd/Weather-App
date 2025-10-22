import React from 'react';
import { useStore } from '../../Store/useStore';
import {MemoDaily} from '../Ui/Daily'

function DailyList() {

    const { weather } = useStore();
    const daily = weather?.daily;
    return (
        <div className="container daily-list">
            <h2 className='fs-5 fw-bold mt-2'>Daliy forecast</h2>
            <div className="row gx-2 mt-2 gy-2">
                {daily?.time.length?(daily.time.map((day,ind)=> <div className='lis' >
                    <MemoDaily key={ind} ind={ind} data={day}/>
                </div>)):(<p>No Data Available</p>)}
            </div>
        </div>
    )
}

export const MemoDailyList = React.memo(DailyList);