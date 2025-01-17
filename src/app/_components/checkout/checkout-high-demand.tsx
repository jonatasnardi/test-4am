import { logoPaypal, logoPaypalAlt } from "@/lib/site-info";
import Image from "next/image";
import React from "react";

const HighDemand = () => {

  return (
    <>
      <div className="flex flex-col rounded-lg border-[1px] items-center mb-4">
        <div className="bg-[#ffe7e7] rounded-lg w-full p-2 flex justify-center">
          <p className="text-[11px] md:text-[17px] text-[#000000] font-[500] flex flex-row gap-1">
            <span className="text-[#e32d2d] font-bold flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 md:size-6">
                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
              </svg>
              High Demand:
            </span><span>5 people are looking this offer!</span></p>
        </div>
      </div>
    </>
  );
};

export default HighDemand;
