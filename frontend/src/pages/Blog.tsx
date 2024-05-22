import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { BlogSkeleton } from "../components/BlogSkeleton"
// import App from "../App"

export const Blog = () => {
    const [blogInfo, setBlogInfo] = useState({
        title: "",
        content: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async() => {
            const jwt = localStorage.getItem("token")
            if(jwt){
                const blogId = localStorage.getItem("blogId");
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                    headers:{
                        'Authorization': jwt
                    }
                });
                setBlogInfo(res.data.blog);
                console.log(res.data);
            }
            else{
                alert("Login first!");
                localStorage.clear();
                navigate('/signin')
            }
        }
        fetchBlog();
    }, [])

    if(blogInfo.content == ""){
        return(
            <>
            <Appbar/>
            <BlogSkeleton/>
            </>
        )
    }

    return(
        <div>
            <Appbar/>
            <div className="flex flex-col w-full">
                <div className="w-2/3 mx-auto mt-20 mb-20">
                    <div className="font-bold text-3xl mb-4">{blogInfo.title}</div>
                    <div className="font-mono text-lg">{blogInfo.content}</div>
                </div>
            </div>
        </div>
    )
}
