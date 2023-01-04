import React, { useState } from 'react';
import Navbar from './Navbar';

import { supabase } from './auth/supabaseClient';

const Login = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Login Page</h1>
      {loading ? (
        'Sending magic link...'
      ) : (
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border rounded-md px-2 py-1"
          />

          <button
            className="bg-blue-500 rounded-md px-2 py-1 text-white"
            type="submit"
            onClick={handleLogin}
          >
            Submit
          </button>
        </form>
      )}
      <button
        className="w-48 px-2 py-1 rounded-md bg-gray-700 text-white"
        onClick={signInWithGithub}
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
