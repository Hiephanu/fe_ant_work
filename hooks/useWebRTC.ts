import { useEffect, useRef, useState } from "react"

// WebRTC hook
const useWebRTC = (signalingServerUrl: string) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Kết nối với signaling server
    wsRef.current = new WebSocket(signalingServerUrl)

    // Lắng nghe các tin nhắn từ signaling server
    wsRef.current.onmessage = async (event) => {
      const message = JSON.parse(event.data)
      if (message.type === "offer") {
        await handleOffer(message.sdp)
      } else if (message.type === "answer") {
        await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(message.sdp))
      } else if (message.type === "ice-candidate") {
        await peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(message.candidate))
      }
    }

    return () => {
      // Đóng kết nối WebSocket khi component bị hủy
      wsRef.current?.close()
    }
  }, [signalingServerUrl])

  // Hàm để khởi tạo kết nối WebRTC
  const initWebRTC = async () => {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    })

    // Xử lý khi nhận được ICE candidate từ STUN/TURN server
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        wsRef.current?.send(
          JSON.stringify({ type: "ice-candidate", candidate: event.candidate })
        )
      }
    }

    // Xử lý khi remote stream được thêm vào
    peerConnectionRef.current.ontrack = (event) => {
      setRemoteStream(event.streams[0])
    }

    // Lấy local stream từ camera/microphone
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })

    setLocalStream(stream)

    // Thêm các track từ local stream vào peer connection
    stream.getTracks().forEach((track) => {
      peerConnectionRef.current?.addTrack(track, stream)
    })

    // Tạo SDP offer và gửi cho peer thông qua signaling server
    const offer = await peerConnectionRef.current.createOffer()
    await peerConnectionRef.current.setLocalDescription(offer)

    wsRef.current?.send(JSON.stringify({ type: "offer", sdp: offer }))
  }

  // Xử lý khi nhận được SDP offer
  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(offer))

    const answer = await peerConnectionRef.current?.createAnswer()
    await peerConnectionRef.current?.setLocalDescription(answer)

    wsRef.current?.send(JSON.stringify({ type: "answer", sdp: answer }))
  }

  // Hàm dừng WebRTC kết nối và stop camera
  const stopWebRTC = () => {
    localStream?.getTracks().forEach((track) => track.stop())
    peerConnectionRef.current?.close()
    setIsConnected(false)
  }

  return {
    localStream,
    remoteStream,
    isConnected,
    initWebRTC,
    stopWebRTC
  }
}

export default useWebRTC
