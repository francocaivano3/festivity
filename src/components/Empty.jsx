
const Empty = ({image, message, className=""}) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center p-6 w-full h-[60vh] ${className}`}>
            <img src={image} alt="Empty state" className="w-96 h-auto mb-6"/>
            <h2 className="text-xl font-semibold text-[#6366f1] underline">{message}</h2>
        </div>
    )
}

export default Empty;