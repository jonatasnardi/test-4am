import React from "react";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import Image from "next/image";
import './checkout-header.css';
import { logoOricle, logoOricleAlt, logoSafeGuaranteed } from "@/lib/site-info";

type Props = {
  info: CheckoutPageType;
};
const CheckoutHeader = ({ info }: Props) => {
  return (
    <div className="flex w-full relative flex-col items-center box-container">
      <div className="flex w-full max-w-[1170px] box-header justify-center md:justify-between">
        <Image
          src={logoOricle}
          width={140}
          height={160}
          alt={logoOricleAlt}
        />
        <Image
          src={logoSafeGuaranteed}
          width={169}
          height={160}
          alt={logoOricleAlt}
          className="hidden md:block"
        />
      </div>
    </div>
  );
};

export default CheckoutHeader;
