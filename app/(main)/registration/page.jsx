import React from "react";
import DataTable from "@/components/(main)/home/DataTable";

const page = () => {
  return (
    <div className="p-[20px] flex flex-col gap-4">
      <h1 className="text-[25px] font-semibold">Registrations</h1>
      <div className="">
        <DataTable />
      </div>
    </div>
  );
};

export default page;
