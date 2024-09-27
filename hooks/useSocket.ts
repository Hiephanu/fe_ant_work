import { useRef, useState } from 'react';

export const useSocket = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = (url: string)=> {
        socketRef.current = new WebSocket(url);
    
        socketRef.current.onopen = () => {
          console.log('WebSocket connected');
        };
    
        socketRef.current.onmessage = (event) => {
          const newMessage = event.data;
          console.log(event);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        };
    
        socketRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
    
        socketRef.current.onclose = () => {
          console.log('WebSocket disconnected');
        };
    
        return () => {
          if (socketRef.current) {
            socketRef.current.close();
          }
        };
    }

  const sendEvent = (event: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(event));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  };

  return { connectWebSocket,messages, sendEvent };
};
