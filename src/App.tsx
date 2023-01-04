import { useState, useEffect } from 'react';
import { supabase } from './components/auth/supabaseClient';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import './index.css';

import { Route, Routes } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);

    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          setSession(session);
          break;

        case 'SIGNED_OUT':
          setSession(null);
          break;

        default:
          break;
      }
    });
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home session={session} setSession={setSession} />}
        />
        <Route path="/login" element={<Login session={session} />} />
        <Route path="/signup" element={<Signup session={session} />} />
      </Routes>
    </div>
  );
}
