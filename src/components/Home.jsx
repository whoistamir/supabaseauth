import React from 'react';
import Navbar from './Navbar';
import { supabase } from './auth/supabaseClient';

const Home = ({ session, setSession }) => {
  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (session) {
    return (
      <div>
        <Navbar />
        <h1>Hello {session.user.email}</h1>
        <button
          onClick={signOut}
          className={'bg-gray-200 text-gray-700 rounded-md px-2 py-1'}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
