import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from "../../assets/logo1.png";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    
    // For demo purposes, navigate back to login
    if (email) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <img
            src={logo}
            alt="UMI Logo"
            className="mx-auto h-32"
          />
        </div>

        {/* Reset Password Form */}
        <div className="bg-white py-8 px-10 shadow rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
          <p className="text-sm text-gray-600 text-center mb-8">
            We'll send you a link to your email if you're registered in the system.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  School Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="your.email@umi.ac.ug"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#23388F] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
