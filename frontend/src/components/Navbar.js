import React from "react";
import Image from "next/image";
import logo_large from "../../assets/logo_large.png";
import profilePicture from "../../assets/profilePicture.jpeg";

export default function Navbar() {
  return (
    <nav
      style={{background: '#0E0E23', padding: '0 20px 0 20px'}}
      className="flex justify-between items-center h-16 text-white relative shadow-sm font-mono"
      role="navigation"
    >
      <Image
        src={logo_large}
        alt="Logo"
        width={300}
        height={300}
      />
      <Image
        className="rounded-full"
        src={profilePicture}
        alt="Profile"
        width={40}
        height={40}
      />
    </nav>
  );
}
