import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminHomePage = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [stats, setStats] = useState();

  const fetchBloodBank = async () => {
    const data = await axios.get(
      "http://localhost:5000/api/admin/getAllBloodBank"
    );
    console.log("data", data.data);
    setBloodBanks(data.data.bloodBanks);
    setStats(data.data.stats);
  };

  const fetchStat = async (bloodBankId)=>{
    const data2 = await axios.get(`http://localhost:5000/api/admin/getStats/${bloodBankId}`);
    console.log(data2);
  }
  
  bloodBanks.map((e)=>{
    fetchStat(e._id)
  })

  console.log(stats);

  useEffect(() => {
    fetchBloodBank();
  }, []);

  return (
    <div>
      <div className="w-full min-h-screen bg-[#2c3e50] px-14 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Hii Admin</h1>
          <Link
            to="/"
            className="text-white cursor-pointer py-1 px-4  bg-[#4e0eff] rounded">
            Log Out
          </Link>
        </div>
        <div className="mt-5 mb-7 flex justify-end">
          <Link
            to="/admin/createBloodBank"
            className="text-white cursor-pointer py-3 px-6 bg-[#4e0eff] rounded">
            Create Blood Bank
          </Link>
        </div>
        {bloodBanks.length ? (
          <table className="table-auto w-full mt-5">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-2">Sr.No</th>
                <th className="px-4 py-2">Blood Bank Name</th>
                <th className="px-4 py-2">Place</th>
                <th className="px-4 py-2">Today's</th>
                <th className="px-4 py-2">Week</th>
                <th className="px-4 py-2">Month</th>
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
                  <td className="text-center px-4 py-5">{e?.donation.length}</td>
                  <td className="text-center px-4 py-5">{e?.donation.length}</td>
                  <td className="text-center px-4 py-5">{e?.donation.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <h1 className="text-white font-semibold">
              No Blood Bank, Create Blood Bank
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
