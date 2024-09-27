'use client'
import { AiOutlineSound } from "react-icons/ai";
import OptionMeetingModel from "./OptionMeetingModel";
import { IoVideocamOutline } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";
import useCamera from "@/hooks/useCamera";
import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { Room } from "@/types/room";
import { useSocket } from "@/hooks/useSocket";

export default function SettingModel() {
    const {
        videoRef,
        isCameraInitialized,
        error,
        photo,
        initCamera,
        takePhoto,
        stopCamera
    } = useCamera();
    const {connectWebSocket,sendEvent, messages} = useSocket()
    const [room, setRoom] = useState<Room | null>(null)
    const createRoom = async ()=> {
        try {
            const response =  await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/rooms/create`,
                {
                    method: 'POST',
                    body: JSON.stringify({userId: '055af5d4-f83e-4802-8ebc-006ec5144bb4',password:'123456', name:'test'})
                }
            )
            const data =  await response.json()
            console.log(data.data);
            
            setRoom(data.data)
        } catch(err ){
            console.log(error);
        }
    }

    const joinRoom = async ()=> {
        try {
            const response =  await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/rooms/create`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        roomId : room?.roomId,
                        userId : window.localStorage.getItem('userId'),
                        password : '123456',
                        offer: {}
                    })
                }
            )
            
            const token = localStorage.getItem('token')
            console.log('room',room);
            
            connectWebSocket(`http://localhost:8080/ws?token=${token}&roomId=${room?.roomId}`)
            
        } catch (err) {
            console.log(err);
        }
    }
    const joinRoom1 = async ()=> {
        try {
            // const response =  await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/rooms/create`,
            //     {
            //         method: 'POST',
            //         body: JSON.stringify({
            //             roomId : '13351846-1546-411e-90f2-d1a7842f00cf',
            //             userId : '123456',
            //             password : '123456',
            //             offer: {}
            //         })
            //     }
            // )
            
            const token = localStorage.getItem('token')
            // console.log('room',room);
            
            connectWebSocket(`http://localhost:8080/ws?token=${token}&roomId=685ba126-04e5-4b57-8244-a3b87109740c`)
            
        } catch (err) {
            console.log(err);
        }
    }
    const leftRoom = async ()=> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/rooms/left`,{
                method: 'POST',
                body: JSON.stringify({
                    roomId : room?.roomId,
                    userId : window.localStorage.getItem('userId')
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
    const all= async ()=> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/all`)
            const data=  await response.json()
            console.log(data);
            
        } catch (err) {
            console.log(err)
        }
    }
    const handleCreateRoom =async () => {
        await createRoom()
        await joinRoom();
        
    }
    const handleSendEvent =()=> {
        sendEvent({
            Type:"TEST",
            Data:"Infor"
        })
    }
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = videoRef.current.srcObject;
        }
    }, [videoRef]);

    return (
        <div className="w-2/3">
            <p>Setting meet</p>
            <Button handleAction={initCamera} message='Connect webrtc' />
            <div>
                <div>
                    <div>
                        <p>Local Stream</p>
                        <video
                            ref={videoRef} // Gán videoRef vào ref của video
                            autoPlay
                            playsInline
                            style={{ width: '100%', maxWidth: '400px' }}
                        />
                        {error && <p>Error: {error}</p>}
                    </div>
                </div>
                <div>
                    <OptionMeetingModel props={{ icon: <AiOutlineSound />, title: 'Computer sound' }} />
                    <OptionMeetingModel props={{ icon: <IoVideocamOutline />, title: 'Computer camera' }} />
                    <OptionMeetingModel props={{ icon: <IoMicOutline />, title: 'Computer mic' }} />
                    <Button message="Create room" handleAction={handleCreateRoom}/>
                    <Button message="Join room" handleAction={joinRoom}/>
                    <Button message="Left roonm" handleAction={leftRoom}/>
                    <Button message="Join 1" handleAction={joinRoom1}/>
                    <Button message="All" handleAction={all} />
                    <Button message="Test send event" handleAction={handleSendEvent}/>
                </div>
            </div>
        </div>
    );
}
