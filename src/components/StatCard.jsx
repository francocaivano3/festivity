const StatCard = ({title, value, icon}) => {
    return (
        <div className="bg-white rounded-lg mt-6 p-6 border-2 hover:border-[#6366f1] transition-colors duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
                </div>
                <div className="text-[#6366f1]">{icon}</div>
            </div>
        </div>
    );
}

export default StatCard;
