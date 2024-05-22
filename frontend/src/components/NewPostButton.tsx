import { UserAvatar } from "./UserAvatar"

export const NewPostButton = () => {
    return(
        <div className="flex items-center mt-10 px-3 min-h-20 max-h-50 ml-20 w-2/3 border">
            <div className="pr-10">
                <UserAvatar/>
            </div>
            <a href="/write-blog" className="text-3xl font-bold ">Write</a>
            <div className="pl-4 pt-1.5">
                <img className="object-cover min-h-10" src="../../public/write.png" alt="" />
            </div>
        </div>
    )
}