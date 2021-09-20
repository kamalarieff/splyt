import React from "react";

interface Props {
  children: React.ReactNode;
}

function Header({ children }: Props) {
  return (
    <header className="w-full bg-blue-300 h-16 flex justify-center items-center">
      {children}
    </header>
  );
}

export default Header;
