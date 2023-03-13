import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BloodBankHomePage = () => {
  const [fileName, setFileName] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const fetchBloodBank = async () => {
    const user = await JSON.parse(localStorage.getItem("current-bloodBank"));
    const data = await axios.get(
      `http://localhost:5000/api/bloodBank/getMeBloodBank/${user?._id}`
    );
    console.log("data", data.data);
    setCurrentUser(data.data.bloodBank);
  };

  const generateCertificate = async (donationId) => {
    const data = await axios.get(
      `http://localhost:5000/api/bloodBank/generateCertificate/${donationId}`
    );

    fetchBloodBank();
  };

  useEffect(() => {
    fetchBloodBank();
  }, []);

  console.log(currentUser);
  console.log(fileName);

  return (
    <div>
      <div className="w-full min-h-screen bg-[#2c3e50] px-14 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            Hii {currentUser?.name}
          </h1>
          <Link
            to="/"
            className="text-white cursor-pointer py-1 px-4  bg-[#4e0eff] rounded">
            Log Out
          </Link>
        </div>

        {currentUser?.donation.length ? (
          <table className="table-auto w-full mt-10">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-2">Sr.no</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Aadhaar Number</th>
                <th className="px-4 py-2">Contact Number</th>
                <th className="px-4 py-2">Generate Certificate</th>
              </tr>
            </thead>
            <tbody>
              {currentUser?.donation?.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-300"}>
                  <td className=" text-center px-4 py-5">{index + 1}</td>
                  <td className=" text-center px-4 py-5">{row?.donor?.name}</td>
                  <td className=" text-center px-4 py-5">
                    {row?.donor?.aadhaarNumber}
                  </td>
                  <td className=" text-center px-4 py-5">
                    {row?.donor?.phone}
                  </td>
                  <td className=" text-center px-4 py-5">
                    {row?.certificateGenerated == true ? (
                      <h1>Generated</h1>
                    ) : (
                      <button
                        onClick={() => generateCertificate(row._id)}
                        className="text-white cursor-pointer py-2.5 px-3 bg-[#4e0eff] rounded-lg">
                        Generate certificate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-10">
            <h1 className="text-white font-semibold">
              No Donors
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodBankHomePage;
