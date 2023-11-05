import Header from "@/components/(main)/Header";
import Sidebar from "@/components/(main)/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className=" w-full h-screen bg-[#FAFBFC]">
      <div className=" w-full h-[10%] bg-white">
        <Header />
      </div>
      <div className=" w-full h-[90%] flex">
        <div className=" w-[18%] h-full">
          <Sidebar />
        </div>
        <div className=" w-[82%] h-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
