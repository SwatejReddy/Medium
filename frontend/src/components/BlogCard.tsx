import { useNavigate } from "react-router-dom";

interface blogCardProps{
    blogId: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    readingTime: string
}

export const BlogCard = ({
    blogId,
    authorName,
    title,
    content,
    publishedDate,
    readingTime
}: blogCardProps) => {
    const navigate = useNavigate();

    //upon clicking the blog, the blogId is stored in the local storage and the user is navigated to the blog page
    function openBlog(){
        localStorage.setItem('blogId', blogId);
        navigate(`/blog/${blogId}`);
        // console.log(blogId);
    }

    return(
        <>
        <div className="cursor-pointer mt-8 mb-8 ml-20 w-2/3 grid grid-cols-[4fr_1fr] min-h-40 max-h-50">
            <div onClick={openBlog} className="w-full details-col">
                <div className="mb-1">{authorName}.{publishedDate}</div>
                <div className="font-bold text-xl mb-1">{title}</div>
                <div className="font-mono">{content}</div>
                <div className="text-sm mt-6 text-slate-800">{readingTime}</div>
            </div>
            <div className="w-full thumbnail-col justify-center items-center hidden md:flex">
                <div className="h-3/4 w-3/4">
                <img className="object-cover w-full h-full" src="../../public/thumbnail.jpeg" alt="Picture" />
                </div>
            </div>
        </div>
        <hr className="mb ml-20 w-2/3 h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </>

    )
}