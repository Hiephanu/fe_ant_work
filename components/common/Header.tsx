'use client'
import { IoSettingsOutline } from "react-icons/io5";
import { TbNotification } from "react-icons/tb";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { formatTime } from "@/utils/date";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
export default function Header() {
    const [currentTime, setCurrentTime] = useState<Date>(new Date(Date.now()))
    const [avatar, setAvatar] = useState<string | null>('')

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedAvatar = window.localStorage.getItem('avatar')
            setAvatar(storedAvatar)
            console.log('avatar', storedAvatar)
        }
    }, [])
    const router = useRouter()
    console.log('avatar', avatar);
    
    const navigateToLogin =()=> {
        router.push('/authen/login')
    }
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 60000);
    
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex justify-between mt-2 w-[95%] mx-auto">
            <div className="flex gap-4 items-center">
                <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png" alt="" className="h-10"/>
                <p className="text-lg">Meet</p>
            </div>
            <div className="flex gap-10 items-center">
                <div className="flex gap-4 text-lg">
                    <p>
                        {formatTime(currentTime)}
                    </p>
                    <IoSettingsOutline size={'25px'}/>
                    <TbNotification size={'25px'}/>
                    <IoMdHelpCircleOutline size={'25px'}/>
                </div>
                <div className="flex items-center gap-10">
                    <HiOutlineMenu size={'25px'}/>
                    {avatar ? 
                    <img src={avatar} alt='Avatar' className="w-4 h-4 rounded-full" />
                    :<Button message="Login" handleAction={navigateToLogin}/>
                    }
                    </div>
            </div>
        </div>
    )
}