'use client';

interface ContainerProps{
    children :React.ReactNode;
    onClick?:()=>void
}
const Container:React.FC<ContainerProps>=({
    children,
    onClick
})=>{
    return(
        <div
         onClick={onClick}
         className="
        max-w-[2520px]
        mx-auto
        px-4
        md:px-10
        xl:px-20
        ">
            {children}
        </div>
    )
}

export default Container;