import { useNavigate } from "react-router-dom"
import { UserAvatar } from "./UserAvatar";

export const Appbar = () => {
    const navigate = useNavigate();
    async function logout(){
        localStorage.clear();
        navigate('/signin');
    }
    return(
        <div className="border-b flex justify-between px-10 navbar h-14 items-center">
            <div className="navbar-left">
                {/* Medium */}
                <a href="/blogs">
                <img className="cursor-pointer" src="../../public/medium-2.svg" alt="" />
                </a>
            </div>
            <div className="navbar-right flex justify-between space-x-7 items-center">
                <div>
                <a onClick={logout}>Logout</a>
                </div>
                <div>
                    <UserAvatar/>
                </div>
            </div>
        </div>
    )
}