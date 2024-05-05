import Loader from "../Component/Loader";


const LoadingPage = () => {
    return (
        <div className=" 
            mt-48
            flex 
            justify-center 
            text-center 
            items-center 
            mx-auto
        "> 
            <Loader />
        </div>
    )
}

export default LoadingPage;