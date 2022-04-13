const Loading = ({adminPage}) => {
    return (

        <div className="flex justify-center items-center mb-10 loading-data">
            <div className={`animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-r-4
             ${adminPage==true ? "border-indigo-700" : "border-amber-700" }`}
            ></div>
        </div>


    )
}
export default Loading;