import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import GlobalLoader from "../GlobalLoader/GlobalLoader";
import Navbar from "../Navbar/Navbar";
import HashLoader from "react-spinners/HashLoader";

export default function AppLayout() {
  return (
    <>
      <GlobalLoader />
      <Navbar />
      <div id="page-container">
        <React.Suspense
          fallback={
            <div className="py-80 flex flex-col text-white justify-center items-center">
              <HashLoader color="#efefef" />{" "}
              <p className="text-body1 text-white">Loading page...</p>
            </div>
          }
        >
          <Outlet />
        </React.Suspense>
      </div>
    </>
  );
}
