export const BlogSkeleton = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="w-2/3 mx-auto mt-20 mb-20">
                <div className="font-bold text-3xl mb-4 bg-gray-200 h-12 animate-pulse"></div>
                <div className="font-mono text-lg bg-gray-200 h-80 animate-pulse"></div>
            </div>
        </div>
    );
}