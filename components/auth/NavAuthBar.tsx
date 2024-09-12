'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NavAuthBar() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('login');

    const handleNavigation = (path:string, tab:string) => {
        setActiveTab(tab);
        router.push(path);
    };

    return (
        <div className="flex mt-8 w-full item-center bg-blue-400 p-3 relative text-white rounded-md">
            <div 
                className={`absolute bottom-0 h-1 bg-blue-600 transition-all duration-300 ease-in-out`} 
                style={{
                    width: '50%', 
                    left: activeTab === 'login' ? '0%' : '50%'
                }}
            />
            <p
                className={`w-1/2 text-center cursor-pointer ${activeTab === 'login' ? 'font-bold' : ''}`} 
                onClick={() => handleNavigation('/authen/login', 'login')}
            >
                Login
            </p>
            <p
                className={`w-1/2 text-center cursor-pointer ${activeTab === 'register' ? 'font-bold' : ''}`} 
                onClick={() => handleNavigation('/authen/register', 'register')}
            >
                Register
            </p>
        </div>
    );
}
