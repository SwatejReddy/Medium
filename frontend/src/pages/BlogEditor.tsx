import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const WriteBlog = () => {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const navigate = useNavigate();

    async function handleBlogPost(){
        await axios.post(`${BACKEND_URL}/api/v1/blog/create`,
        {
            title: title,
            content: content
        },
        {
            headers:{
                'Authorization': localStorage.getItem("token")
            }
        })
        navigate('/blogs');
    }

    return(
    <>
    <div className="flex items-center w-full flex-col p-4">
        <div className="w-3/4 h-16 text-3xl font-bold mb-4">
            <input onChange={(e) => {setTitle(e.target.value)}}
            className="h-full w-full outline-none placeholder-gray-500"
            type="text"
            placeholder="Enter your title here"
            />
        </div>
        <div className="w-3/4">
            <textarea onChange={(e) => {setContent(e.target.value)}} className="w-full h-64 text-base leading-relaxed outline-none placeholder-gray-500" placeholder="Start writing your content here..."></textarea>
        </div>
        <div className="w-3/4">
            <button onClick={handleBlogPost} className="rounded-full w-28 h-10 bg-black text-white">Post</button>
        </div>
    </div>
    {/* <div className="flex w-full flex-col p-4">
        <button>Post</button>
    </div> */}
    </>
    )
}