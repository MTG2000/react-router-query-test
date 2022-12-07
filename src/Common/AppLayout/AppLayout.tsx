import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import GlobalLoader from "../GlobalLoader/GlobalLoader";
import Navbar from "../Navbar/Navbar";

export default function AppLayout() {
  return (
    <>
      <GlobalLoader />
      <Navbar />
      <div id="page-container">
        <React.Suspense fallback={<h2>Loading Page</h2>}>
          <Outlet />
        </React.Suspense>
      </div>
    </>
  );
}
