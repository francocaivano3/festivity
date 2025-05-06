
const Skeleton = ({type}) => {
    switch(type) {
        case "tickets":
        return (
            <div className="bg-violet-600 p-4 rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-violet-400 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-violet-400 rounded w-1/2"></div>
                <div className="h-32 bg-violet-300 rounded mt-4"></div>
            </div>
        );

        case "events":
            return (
              <div className="bg-violet-400 p-4 rounded-lg shadow-md animate-pulse min-h-2/3 mt-8">
                <div className="h-40 bg-violet-200 rounded mt-4"></div>
                <div className="h-4 bg-violet-300 rounded w-3/4 mt-6"></div>
                <div className="h-4 bg-violet-300 rounded w-1/2 mt-6"></div>
                <div className="h-4 bg-violet-300 rounded w-3/4 mt-6"></div>
                <div className="h-4 bg-violet-300 rounded w-3/4 mt-6"></div>
                <div className="h-4 bg-violet-300 rounded w-3/4 mt-6"></div>
                <div className="flex justify-between mt-4">
                  <div className="h-6 bg-violet-300 rounded w-1/4 mt-4"></div>
                  <div className="h-6 bg-violet-300 rounded w-1/4 mt-4"></div>
                </div>
              </div>
            );
    } 


}

export default Skeleton;