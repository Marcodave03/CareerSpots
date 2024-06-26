import React, { ReactNode } from "react";

import Navbar from "../components/navbar";
type LayoutProps = { children?: ReactNode };
const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
