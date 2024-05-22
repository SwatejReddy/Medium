import { BlogCard } from "../components/BlogCard"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { NewPostButton } from "../components/NewPostButton";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";

interface blogCardProps{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}


export const Blogs = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState<blogCardProps>({
        authorName: "",
        title: "",
        content: "",
        publishedDate: ""
});

    useEffect(() => {
        const fetchBlogs = async() => {
            const jwt = localStorage.getItem("token")
            if(jwt){
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers:{
                        'Authorization': jwt
                    }
                })
                setResponse(res.data.blogs);
                console.log(res.data.blogs);
            }
            else{
                localStorage.clear();
                alert("Login first!");
                navigate('/signin');
            }        
        }
        fetchBlogs();
    }, [])

    if(response.authorName === ""){
        return(
            <div>
            <Appbar/>
            <NewPostButton/>
            <BlogCardSkeleton/>
            <BlogCardSkeleton/>
            <BlogCardSkeleton/>
            </div>
            )
    }

    return(
        <div>
            <Appbar/>
            <NewPostButton/>
            <div className="flex flex-col w-full">
                {Array.isArray(response) && response.map((blog) => (
                <BlogCard
                key={blog.id}
                blogId={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content.substring(0, 100) + "..."}
                publishedDate={blog.publishedDate}
                readingTime={Math.ceil(blog.content.split(" ").length/200) + " min read"}
                />
            ))}
            </div>
        </div>
    )
}