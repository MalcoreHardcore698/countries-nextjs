// vendors
import React from "react";

// styles
import "./styles.scss";

// types
interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return <main className="main-layout">{children}</main>;
}

export default MainLayout;
