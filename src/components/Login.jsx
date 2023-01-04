import React from 'react';
import Navbar from './Navbar';

import { supabase } from './auth/supabaseClient';

const Login = ({ session }) => {
  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return (
    <div>
      <Navbar />
      <h1>Login Page</h1>
      <button
        className="px-2 py-1 rounded-md bg-gray-700 text-white"
        onClick={signInWithGithub}
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
