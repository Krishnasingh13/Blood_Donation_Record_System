import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { saveAs } from "file-saver";

const DonorHomePage = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [active, setActive] = useState("bloodBank");

  const toastOptions = {
    position: "top-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchDonor = async () => {
    const user = await JSON.parse(localStorage.getItem("current-user"));
    const data = await axios.get(
      `http://localhost:5000/api/donor/getMeDonor/${user?._id}`
    );
    setCurrentUser(data.data.donor);
  };

  const fetchBloodBank = async () => {
    const data = await axios.get(
      "http://localhost:5000/api/admin/getAllBloodBank"
    );
    setBloodBanks(data.data.bloodBanks);
  };

  const donateBloodHandler = async (userId, bloodBankId) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/donor/donate/${userId}/${bloodBankId}`
    );
    console.log(data);
    if (data.status === true) {
      toast.success("Blood Donated Successfully");
    }

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
  };

  const downloadCertificate = async (certificateId) => {
    fetch(`http://localhost:5000/api/bloodBank/downloadCertificate/${certificateId}`)
      .then((resp) => resp.arrayBuffer())
      .then((res) => {
        const pdfBlob = new Blob([res], { type: "application/pdf" });
        saveAs(pdfBlob, "Certificate.pdf");
      });
  };

 

  useEffect(() => {
    fetchDonor();
    fetchBloodBank();
  }, [active]);

  return (
    <>
      <div className="w-full min-h-screen flex-1 grow-1 bg-[#2c3e50] px-14 py-16">
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

        <div className="flex gap-5 mt-10">
          <button
            onClick={() => setActive("bloodBank")}
            className={`cursor-pointer text-white py-3 px-6 ${
              active == "bloodBank"
                ? "bg-[#4e0eff]"
                : " border-[2px] borderborder-white"
            }  rounded-md`}>
            Opening Blood Bank
          </button>
          <button
            onClick={() => setActive("donated")}
            className={`cursor-pointer text-white py-3 px-6 ${
              active == "donated"
                ? "bg-[#4e0eff]"
                : " border-[2px] borderborder-white"
            }  rounded-md`}>
            Donated Blood
          </button>
        </div>

        {active == "bloodBank" ? (
          <table className="table-auto w-full mt-5">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-2">Sr.No</th>
                <th className="px-4 py-2">Blood Bank Name</th>
                <th className="px-4 py-2">Place</th>
                <th className="px-4 py-2">Donate Blood</th>
              </tr>
            </thead>
            <tbody>
              {bloodBanks?.map((e, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-300"}>
                  <td className="text-center px-4 py-5">{index + 1}</td>
                  <td className="text-center px-4 py-5">{e?.name}</td>
                  <td className="text-center px-4 py-5">{e?.place}</td>

                  <td className="text-center px-4 py-5">
                    {e?.certificateGenerated == true ? (
                      <h1>Generated</h1>
                    ) : (
                      <button
                        onClick={() =>
                          donateBloodHandler(currentUser._id, e._id)
                        }
                        className="text-white cursor-pointer py-2.5 px-3 bg-[#4e0eff] rounded-lg">
                        Donate Blood
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table-auto w-full mt-5">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-2">Sr.No</th>
                <th className="px-4 py-2">Blood Bank Name</th>
                <th className="px-4 py-2">Place</th>
                <th className="px-4 py-2">Donate Blood</th>
              </tr>
            </thead>
            <tbody>
              {currentUser?.donation?.map((e, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-300"}>
                  <td className="text-center px-4 py-5">{index + 1}</td>
                  <td className="text-center px-4 py-5">{e.bloodBank?.name}</td>
                  <td className="text-center px-4 py-5">
                    {e.bloodBank?.place}
                  </td>

                  <td className="text-center px-4 py-5">
                    {e?.certificateGenerated == true ? (
                      <button
                        onClick={() => downloadCertificate(e?.certificate?._id)}
                        className="text-white cursor-pointer py-2.5 px-3 bg-[#4e0eff] rounded-lg">
                        Download Certificate
                      </button>
                    ) : (
                      <h1>Cetificate Not Generated</h1>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default DonorHomePage;
