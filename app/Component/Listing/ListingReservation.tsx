'use client';

import {  Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../Inputs/Calendar";

interface ListingReservationProps{
    totalPrice:number,
    price:number,
    onSubmit:()=>void,
    dateRange:Range
    disabled:boolean,
    disabledDates: Date[]
    onChangeDate: (value:Range)=>void
}
const ListingResservation:React.FC<ListingReservationProps>=({
    totalPrice,
    price,
    onChangeDate,
    onSubmit,
    dateRange,
    disabled,
    disabledDates
})=>{
    return (
        <div className="
         bg-white
          flex
          flex-col
          gap-4
          border-[1px]
          hover:shadow-md
          border-gray-300
          rounded-lg
          overflow-hidden
          p-5
          w-full
        ">
            <div className="font-semibold flex flex-row">
                <div className="text-lg">
                ${price}
                </div>
                <div className="text-gray-600 text-sm pl-3 font-normal pt-1">
                    night
                </div>
            </div>
            <hr />
            <div className="w-full">
            <Calendar 
              value={dateRange}
              disabledDates={disabledDates}
              onChange={(value)=>onChangeDate(value.selection)}
            />
            </div>
            <hr />
            <div>
                <div className="flex ">
                <Button 
                disabled={disabled}
                 label="Reserve"
                 onClick={onSubmit}
                />
                </div>
                <div className="text-black text-lg font-semibold flex flex-row justify-between">
                    <div>
                        Total
                    </div>
                    <div>
                        ${totalPrice}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingResservation;