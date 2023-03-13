import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateBloodBankPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    place: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, name, username, place } = values;
    const { data } = await axios.post(
      "http://localhost:5000/api/admin/createBloodBank",
      {
        name,
        username,
        password,
        place,
      }
    );
    console.log(data);

    if (data.status === true) {
      navigate("/admin");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="w-full min-h-screen flex items-center justify-center bg-[#2c3e50]">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="w-1/4 flex items-center flex-col bg-[#00000079] gap-y-5 px-10  py-2 rounded-3xl">
          <h1 className="text-white text-center text-2xl mb-3 mt-5 font-bold">
            Create Blood Bank
          </h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => handleChange(e)}
            className="px-2 py-3 w-full  rounded-lg text-white bg-transparent border-[1px] border-white"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            className="px-2 py-3 w-full  rounded-lg text-white bg-transparent border-[1px] border-white"
          />
          <input
            type="text"
            name="place"
            placeholder="Place"
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
            className="w-full text-white cursor-pointer py-3 bg-[#4e0eff] rounded-xl mb-8">
            Create Blood Bank
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBloodBankPage;
