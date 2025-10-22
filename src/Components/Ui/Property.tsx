import React from "react"

function Property({head, number , unit}:{head:string,number:number,unit:string}) {
  return (
    <div data-aos="flip-down" className="property rounded-4 text-center py-4 mt-3">
        <h4 className="fs-5 mb-4">{head}</h4>
        <h5 className="fs-4">{number}{unit}</h5>
    </div>
  )
}
export const MemoProperty = React.memo(Property);