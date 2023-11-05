import React from "react";
import Link from "next/link";
import { PieChart } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-white border h-full flex p-[20px] w-full">
      <nav className=" h-full w-full flex gap-5 flex-col">
        <div className="border border-blue-500 h-12 flex items-center p-2 rounded-2xl gap-2">
          <PieChart />
          <Link href="/home">Dashboard</Link>
        </div>
        <div className="border border-blue-500 h-12 flex items-center p-2 rounded-2xl">
          <Link href="/registration">Registration</Link>
        </div>
        <div className="border border-blue-500 h-12 flex items-center p-2 rounded-2xl">
          <Link href="/home">Payments</Link>
        </div>
        <div className="border border-blue-500 h-12 flex items-center p-2 rounded-2xl">
          <Link href="/home">Settings</Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
