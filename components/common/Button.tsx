'use client'

interface ButtonProps {
    handleAction: () => void; // Định nghĩa prop là một hàm
    message : string;
    icon?: any;
    bgColor?: string;
    color?: string;
    hover?: boolean
  }
  
export default function Button({ handleAction, message, icon, bgColor, color, hover } : ButtonProps) {
  return (
    <div className={`flex gap-2 bg-${bgColor}-500 text-${color} p-2 rounded-md items-center justify-center ${hover ? `hover:bg-${color}-100` : ''} `}>
        <div>
          {icon}
        </div>
        <button onClick={handleAction} className="text-center">
            {message}
        </button>
    </div>
  );
}
