import React from "react";

interface Props {
  children: React.ReactNode;
}

function Footer({ children }: Props) {
  return (
    <div className="w-full bg-blue-300 h-16 flex justify-center items-center">
      {children}
    </div>
  );
}

export default Footer;
