import { Quote } from "../components/Quote"
import { LoginAuth } from "../components/LoginAuth"

export const Signin = () => {
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
            <LoginAuth/>
            </div>
            <div className="">
            <Quote/>
            </div>
        </div>
    )
}