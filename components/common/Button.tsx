'use client'

interface ButtonProps {
    handleAction: () => void; // Định nghĩa prop là một hàm
    message : string
  }
  
export default function Button({ handleAction, message } : ButtonProps) {
  return (
    <div>
        <button onClick={handleAction} className="text-center">
            {message}
        </button>
    </div>
  );
}
