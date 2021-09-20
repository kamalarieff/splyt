import React from "react";

interface Props {
  children: React.ReactNode;
}

function Footer({ children }: Props) {
  return (
    <footer className="w-full bg-blue-300 h-16 flex justify-center items-center">
      {children}
    </footer>
  );
}

export default Footer;
