import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import { singinInput } from "@swatejreddy/medium-common"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const LoginAuth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<singinInput>({
        username: "",
        password: ""
    })
    async function sendRequest(){
        console.log("inside fn")
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`,{
                username: postInputs.username,
                password: postInputs.password
            });
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            localStorage.setItem("username", postInputs.username);
            navigate('/blogs');
        }catch(e){
            console.log("Error sending credentials to the server!");
        }
    }
    return(
        <div className="h-screen flex justify-center flex-col items-center ">
            <div className="main w-2/4">
                <div className="main-top text-center">
                    <div className="font-bold text-3xl">
                        Create an account
                    </div>
                    <div className="text-gray-500 mt-2">
                        Don't have an account? <Link className="underline hover:cursor-pointer" to={"/signup"}>Sign Up</Link>
                    </div>
                </div>
                <div className="main-middle mt-6">
                    <LabelledInput label="Username" placeholder="Enter your username" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            username:e.target.value
                        }))
                    }}/>
                    <LabelledInput label="Password" type="password" placeholder="Enter your password" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password:e.target.value
                        }))
                    }}/>
                </div>
                <button onClick={sendRequest} className="w-full h-10 mt-2 bg-black text-white font-bold rounded-md">Login</button>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return(
        <div className="password mb-4">
            <p className="font-bold">{label}</p>
            <input onChange={onChange} type={type || "text"} className="border border-gray-300 rounded-md h-10 w-full p-4 mt-2" placeholder={placeholder}/>
        </div>
    )
}
