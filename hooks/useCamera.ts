import { RefObject, useRef, useState } from "react";

interface UseCameraReturn {
  videoRef: RefObject<HTMLVideoElement>;
  isCameraInitialized: boolean;
  error: string | null;
  photo: string | null;
  initCamera: () => Promise<void>;
  takePhoto: () => void;
  stopCamera: () => void;
}

const useCamera = (): UseCameraReturn => {
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef: RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null); 
  const [photo, setPhoto] = useState<string | null>(null);

  // Hàm khởi tạo camera
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Gán luồng video vào phần tử video
        setIsCameraInitialized(true);
      }
    } catch (err) {
      setError("Failed to initialize camera");
      console.error("Error initializing camera:", err);
    }
  };

  // Hàm chụp ảnh
  const takePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    // Thiết lập kích thước canvas dựa trên video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setPhoto(imageData);
    }
  };

  // Hàm dừng camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraInitialized(false);
    }
  };

  return {
    videoRef,
    isCameraInitialized,
    error,
    photo,
    initCamera,
    takePhoto,
    stopCamera,
  };
};

export default useCamera;
