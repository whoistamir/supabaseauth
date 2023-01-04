import { useState, useEffect } from 'react';
import { supabase } from './components/auth/supabaseClient';

import './App.css';
import './index.css';

export default function App() {
  const [user, setUser] = useState(false);

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user);

    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          setUser(session?.user);
          break;

        case 'SIGNED_OUT':
          setUser(null);
          break;

        default:
          break;
      }
    });
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (user) {
    return (
      <div>
        <h1>Hello {user.email}</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Sign in!</h1>
      <button onClick={signInWithGithub}>Log in with GitHub</button>
    </div>
  );
}
