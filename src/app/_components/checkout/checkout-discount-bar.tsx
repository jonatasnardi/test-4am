import React from "react";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import DiscountSeal from "./discount-seal";


type DiscountProps = {
  product: number;
  info: CheckoutPageType;
  couponActive: boolean;
  country: string;
};

//shows the current discount off of full pricer
const DiscountBar = ({
  product,
  info,
  couponActive,
  country,
}: DiscountProps) => {
  const discountDetails = [
    {
      src: "https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/3fea0d9a-2395-48e0-bd69-6a3ed0e4a100/public",
      alt: "50% Discount Badge",
      text: "Your 50% Discount Has Been Applied",
      percent: "50%",
      oldPrice: info.product.ogPrice1,
      newPrice: info.product.price1,
    },
    {
      src: "https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/f3b86681-3446-4bd8-db4a-1e99050a5300/public",
      alt: "56% Discount Badge",
      text: "Your 56% Discount Has Been Applied",
      percent: "56%",
      oldPrice: info.product.ogPrice2,
      newPrice: info.product.price2,
    },
    {
      src: "https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/9d753d3d-eb6d-439c-4168-fc13fb261600/public",
      alt: "58% Discount Badge",
      text: "Your 58% Discount Has Been Applied",
      percent: "58%",
      oldPrice: info.product.ogPrice3,
      newPrice: info.product.price3,
    },
    {
      src: "https://imagedelivery.net/3TTaU3w9z1kOYYtN3czCnw/54294b32-6664-4698-9756-5b0091956c00/public",
      alt: "60% Discount Badge",
      text: "Your 60% Discount Has Been Applied",
      percent: "60%",
      oldPrice: info.product.ogPrice4,
      newPrice: info.product.price4,
    },
  ];

  const currentDiscount = discountDetails[product];
  const currentPrice =
    Number(currentDiscount.newPrice) - (couponActive ? 5 : 0);

  return (
    <div className="flex w-full items-center">
      <DiscountSeal percent={currentDiscount.percent} />
     
      <div className="flex flex-col flex1 pl-4">
        <p className="text-[#000000] text-[19px] sm:text-[16px] font-bold uppercase">
          <span className="text-[#d91616]">Hurry!</span> Limited To 100 Spots Only!
        </p>
        <p className="text-[19px]">
          Your spot is reserved for <svg xmlns="http://www.w3.org/2000/svg" inline-block fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg> 09:00
        </p>
      </div>
    </div>
  );
};

export default DiscountBar;
