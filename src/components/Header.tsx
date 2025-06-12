import Link from "next/link";
import React from "react";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          Habot Connect
        </Link>
      </div>
    </header>
  );
};
