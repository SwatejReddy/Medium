export const BlogCardSkeleton = () => {
    return (
        <>
            <div className="mt-8 mb-8 ml-20 w-2/3 grid grid-cols-[4fr_1fr] min-h-40 max-h-50">
                <div className="w-full details-col">
                    <div className="mb-1 bg-gray-200 h-4 w-1/4 animate-pulse"></div>
                    <div className="font-bold text-xl mb-1 bg-gray-200 h-6 w-3/4 animate-pulse"></div>
                    <div className="font-mono bg-gray-200 h-12 w-full animate-pulse"></div>
                    <div className="text-sm mt-6 text-slate-800 bg-gray-200 h-4 w-1/4 animate-pulse"></div>
                </div>
                <div className="w-full thumbnail-col justify-center items-center hidden md:flex">
                    <div className="h-3/4 w-3/4 bg-gray-200 animate-pulse"></div>
                </div>
            </div>
            <hr className="mb ml-20 w-2/3 h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </>
    );
};
