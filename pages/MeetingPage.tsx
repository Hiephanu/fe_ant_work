'use client'
import Button from '@/components/common/Button';
import useWebRTC from '@/hooks/useWebRTC';
import React, { useRef, useEffect, useState } from 'react';


const MeetingPage = () => {
    const { localStream,remoteStream, isConnected, initWebRTC, stopWebRTC } = useWebRTC('http://localhost:8080/ws');
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const [error, setError] = useState(null);

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);


    return (
        <div>
            <Button handleAction={initWebRTC} message='Connect webrtc'/>
            <Button handleAction={stopWebRTC} message='Disconnect webrtc' />
            <div>
                <p>Local Strream</p>
                <video ref={localVideoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '400px' }} />
                {error && <p>Error: {error}</p>}
            </div>
            <div>
                <p>Remote stream</p>
                <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '400px' }} />
                {error && <p>Error: {error}</p>}
            </div>
        </div>
    );
}

export default MeetingPage;
