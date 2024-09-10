'use client'
import { IoSettingsOutline } from "react-icons/io5";
import { TbNotification } from "react-icons/tb";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { formatTime } from "@/utils/date";
import { useEffect, useState } from "react";
export default function Header() {
    const [currentTime, setCurrentTime] = useState<Date>(new Date(Date.now()))
    console.log("rerender")
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
                    <img src="https://inkythuatso.com/uploads/thumbnails/800/2022/05/hinh-anh-meo-bua-buon-cuoi-nhat-12-09-57-09.jpg" alt="" className="h-8 w-8 rounded-full"/>
                </div>
            </div>
        </div>
    )
}