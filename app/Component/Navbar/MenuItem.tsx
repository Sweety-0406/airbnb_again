'use client';

interface MenuItemProps{
    label:string
    onClick:()=>void
}
const MenuItem:React.FC<MenuItemProps>=({
    label,
    onClick
})=>{
    return(
        <div 
        onClick={onClick}
        className="
          text-sm
          font-semibold
          transition
          px-4
          py-3
          hover:bg-gray-100
          rounded-xl
          w-44
        ">
           {label}
        </div>
    )
}

export default MenuItem;