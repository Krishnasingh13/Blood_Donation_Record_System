import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-[#2c3e50] flex items-center justify-center flex-col">
      <h1 className="font-bold text-center mt-14 text-3xl text-white">
        Blood Donation Record System
      </h1>
      <div className="flex items-center justify-center gap-5 w-full h-screen">
        <Link to="/donor/signin">
          <div className="w-52 h-40 rounded-lg bg-[#00000079] flex items-center justify-center">
            <h1 className="text-xl font-bold text-white text-center">Sign In / Sign Up Donor</h1>
          </div>
        </Link>
        <Link to="/admin/signin">
          <div className="w-52 h-40 rounded-lg bg-[#00000079] flex items-center justify-center">
            <h1 className="text-xl font-bold text-white text-center">Sign In / Sign Up Admin</h1>
          </div>
        </Link>
        <Link to="/bloodBank/signin">
          <div className="w-52 h-40 rounded-lg bg-[#00000079] flex items-center justify-center">
            <h1 className="text-xl font-bold text-white text-center w-[60%]">Sign In Blood Bank</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
