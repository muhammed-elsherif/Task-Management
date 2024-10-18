import React from 'react';
import Link from 'next/link';
import '../../styles/navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link href="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link href="/tasks" className="nav-link">Tasks</Link>
        </li>
        <li className="nav-item">
          <Link href="/profile" className="nav-link">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
