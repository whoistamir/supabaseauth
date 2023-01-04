import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full flex justify-end">
      <ul className="flex justify-center items-center gap-4">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/login'}>Log in</Link>
        </li>
        <li>
          <Link to={'/signup'}>Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
