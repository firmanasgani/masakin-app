import React from 'react';
import SigninForm from '../../Components/Login/SigninForm';
import Header from '../../Components/Header';

const Signin = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 overflow-y-hidden no-scrollbar'>
    <div className="relative w-[375px] h-[700px] bg-white shadow-lg rounded-xl border flex flex-col ">
        <Header />
        <div className="flex-1 overflow-x-hidden">
            <SigninForm />
        </div>
      
    </div>
</div>
  );
};

export default Signin;
