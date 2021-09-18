import React from "react";

interface Props {
  children: React.ReactNode;
}

function Header({ children }: Props) {
  return (
    <div className="max-w-full bg-blue-300 h-16 flex justify-center items-center">
      <div className="max-w-3xl m-auto">{children}</div>
    </div>
  );
}

export default Header;
