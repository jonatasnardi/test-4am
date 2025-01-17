import { logoPaypal, logoPaypalAlt } from "@/lib/site-info";
import Image from "next/image";
import React from "react";

const ExpressCheckout = () => {

  return (
    <>
      <div className="flex p-4 flex-col rounded-lg border-[1px] items-center border-[#ddd]">
        <p className="relative top-[-30px] bg-[#ffffff] w-[200px] text-center inline-block mb-[-15px]">Express Checkout</p>
        <button className="bg-[#ffc439] rounded-lg w-full p-5 flex justify-center">
          <Image
            src={logoPaypal}
            alt={logoPaypalAlt}
            width={150}
            height={150}
            priority
          />
        </button>
      </div>
    </>
  );
};

export default ExpressCheckout;
