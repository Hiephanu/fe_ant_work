'use client'
import { AiOutlineSound } from "react-icons/ai";
import OptionMeetingModel from "./OptionMeetingModel";
import { IoVideocamOutline } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";
import useCamera from "@/hooks/useCamera";
import { useEffect, useRef } from "react";
import Button from "../common/Button";

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

    // Thiết lập videoRef trong useEffect để cập nhật video stream
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
                </div>
            </div>
        </div>
    );
}
