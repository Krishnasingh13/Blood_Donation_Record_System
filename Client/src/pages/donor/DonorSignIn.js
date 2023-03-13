import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const DonorSignIn = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    phone: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, phone } = values;
    const { data } = await axios.post("http://localhost:5000/api/donor/login", {
      phone,
      password,
    });
    console.log("data", data.status);

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }

    if (data.status === true) {
      toast.success("Login Successfully");
      localStorage.setItem("current-user", JSON.stringify(data.user));
      navigate("/donor");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-[#2c3e50]">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="w-1/4 flex items-center flex-col bg-[#00000079] gap-y-5 px-10  py-2 rounded-3xl">
          <h1 className="text-white text-center text-2xl mb-3 mt-5 font-bold">
            Sign In
          </h1>
          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            onChange={(e) => handleChange(e)}
            className="px-2 py-3 w-full  rounded-lg text-white bg-transparent border-[1px] border-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            className="px-2 py-3 w-full  rounded-lg text-white bg-transparent border-[1px] border-white"
          />
          <button
            type="submit"
            className="w-full text-white cursor-pointer py-3 bg-[#4e0eff] rounded-xl">
            Sign In
          </button>

          <span className="text-white mb-4">
            Don't have a account ?{" "}
            <Link to="/donor/signup" className="text-[#4e0eff]">
              Register
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default DonorSignIn;
