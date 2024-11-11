import React from 'react';
import BottomNav from '../../Components/bottomNav';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                {children}
            </main>
            <BottomNav />
        </div>
    );
};

export default Layout;
