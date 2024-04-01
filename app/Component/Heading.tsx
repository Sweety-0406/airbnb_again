'use client';

interface HeadingProps{
    title:string
    subtitle:string
    center?:boolean
}
const Heading:React.FC<HeadingProps>=({
    title,
    subtitle,
    center
})=>{
    return(
        <div className="flex flex-col ">
            <div className={`
             text-2xl
             font-bold
              mb-2
              ${center ? 'text-center':'text-start'}
            `}>
                {title}</div>
            <div className={` 
                  text-md 
                text-gray-500
                ${center ? 'text-center':'text-start'}
                `}>
                {subtitle}
            </div>
        </div>
    )
}

export default Heading;