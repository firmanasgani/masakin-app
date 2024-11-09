import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/home');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Create an account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already a member? <a href="/signin" className="text-red-500">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
