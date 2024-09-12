'use client'
import Button from "@/components/common/Button";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import homeData from '@/data/home.json'
import CardIntro from "@/components/home/CardIntro";
import SliderCard from "@/components/common/SliderCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter()
    const [ableJoin, setAbleJoin] = useState<boolean>(false)
    const [urlMeet, setUrlMeet] = useState<string>('')
    const handleChangeUrlMeet =(url:string)=> {
        if (url.length != 0) {
            setAbleJoin(true)
        } else {
            setAbleJoin(false)
        }
        setUrlMeet(url)
    }
    const createNewMeet = () => {
        router.push("/meet")
    }
    const joinMeet = () => {
        console.log(urlMeet);
        
    }

    return (
        <div className="flex items-center mt-36">
            <div className="w-1/2 text-center">
                <p className="font-bold text-[30px]">{homeData.title}</p>
                <p className="font-semibod text-lg mt-6">{homeData.subTitle}</p>
                <div className="w-1/2 mx-auto mt-6 cursor-pointer">
                    <Button 
                        handleAction={createNewMeet} 
                        message="New meeting" 
                        icon={<AiOutlineVideoCameraAdd /> } 
                        bgColor="blue" 
                        color="white" 
                        hover={true}
                    />
                </div>
                <div className="w-1/2 mx-auto mt-6 cursor-pointer mt-8 flex gap-2 items-center">
                    <input 
                        type="text" 
                        placeholder="Enter code or meet url" 
                        className="py-[7px] px-2 border-2 border-black-400 rounded-lg outline-none focus:border-blue-500" 
                        onChange={(e)=> handleChangeUrlMeet(e.target.value)}/>
                    <button 
                        className={`${ableJoin ? 'text-blue-500' : 'text-gray-400'}`}
                        disabled={!ableJoin}
                        onClick={() => joinMeet()}
                    >Join now!
                    </button>
                </div>
            </div>
            <div className="w-1/2 flex justify-center">
                <SliderCard components={
                    homeData.introduction.map((card, index)=>(
                        <CardIntro key={index} {...card}/>
                 ))
                } totalSlide={homeData.introduction.length}/>
              
            </div>
        </div>
    )
}