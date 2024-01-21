import Confirmation from "@/components/Confirmation";
import React from "react";
import { MdCheckCircle } from "react-icons/md";

const page = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl text-success font-bold flex items-center gap-3">
        {" "}
        <MdCheckCircle size={30} /> Order Confirmed !
      </h1>
      <Confirmation />
      <p>We will contact you for confirmation.</p>
    </div>
  );
};

export default page;
