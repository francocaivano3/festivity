const StatCard = ({title, value, icon}) => {
    return (
      <div className="bg-white flex flex-1 justify-between items-center rounded-lg mt-6 p-6 border-2 hover:border-[#6366f1] transition-colors duration-300 dark:bg-neutral-900 dark:hover:border-violet-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm dark:text-white">{title}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1 dark:text-violet-700">
              {value}
            </p>
          </div>
        </div>
          <div className="text-[#6366f1] dark:text-violet-700">{icon}</div>
      </div>
    );
}

export default StatCard;
