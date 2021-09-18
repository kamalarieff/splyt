import React from "react";

interface Props {
  children: React.ReactElement;
}

function Layout({ children }: Props) {
  return <div className="max-w-3xl m-auto">{children}</div>;
}

export default Layout;
