import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Prop Types
type LayoutProps = {
  children: React.ReactNode;
};
const AppLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export { AppLayout };
