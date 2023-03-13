import React from "react";

const DonorCertificate = () => {
  return (
    <div className="bg-[#dadada] w-full min-h-screen">
      <div className="bgborder-white w-[50%] min-h-screen mx-auto py-10 flex items-center justify-center flex-col">
        <h1 className="text-center text-black font-bold text-2xl">
          Blood Bank
        </h1>
        <p className="mx-auto text-base text-black w-1/2 text-center mt-10">
          This is to certify that <b>Mr. Krishna</b> has donated blood on{" "}
          <b> 12 March 2023 </b> at a voluntary blood donation drive organized
          by <b> Blood Bank</b> in <b>Bhopal</b>.
        </p>
      </div>
    </div>
  );
};

export default DonorCertificate;
