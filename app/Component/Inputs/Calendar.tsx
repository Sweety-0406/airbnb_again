'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps{
    value:Range
    disabledDates?:Date[]
    onChange:(value:RangeKeyDict)=>void
}
const Calendar:React.FC<CalendarProps>=({
    value,
    disabledDates,
    onChange
})=>{
    return(
        <div>
            <DateRange className="w-full flex justify-center"
            rangeColors={["#262626"]}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
            />
        </div>
    )
}

export default Calendar;