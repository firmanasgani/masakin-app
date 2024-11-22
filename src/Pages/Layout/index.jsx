import React from 'react';
import Header from '../../Components/Header';
import BottomNavigation from '../../Components/BottomNav';

const Layout = ({ children }) => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 overflow-y-hidden no-scrollbar'>
            <div className="relative w-[560px] h-[800px] bg-white shadow-lg rounded-xl border flex flex-col ">
                <Header />
                <div className="flex-1 overflow-x-hidden">
                    {children}
                </div>
              
                <BottomNavigation />
            </div>
        </div>
    );
};

export default Layout;
