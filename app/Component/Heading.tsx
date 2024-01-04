'use client';

interface HeadingProps{
    title:string
    subtitle:string
}
const Heading:React.FC<HeadingProps>=({
    title,
    subtitle
})=>{
    return(
        <div className="flex flex-col ">
            <div className="text-2xl font-bold mb-2">{title}</div>
            <div className="text-md text-gray-500">{subtitle}</div>
        </div>
    )
}

export default Heading;