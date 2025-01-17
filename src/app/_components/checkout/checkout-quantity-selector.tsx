import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "@/app/_context/SessionContext";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import { ProductInfoType } from "@/interfaces/productInfo";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { delay } from "@/app/_utils/delay";
import { PriceDisplaySimple } from "./checkout-price-display";
import DiscountSeal from "./discount-seal";
import HighDemand from "./checkout-high-demand";
import OldValue from "./checkout-old-value";

type QuantityProps = {
  product: ProductInfoType;
  info: CheckoutPageType;
  setProduct: (product: ProductInfoType) => void;
  couponActive: boolean;
  country: string;
};

// Select the number of products to purchase
const QuantitySelector = ({
  product,
  info,
  setProduct,
  couponActive,
  country,
}: QuantityProps) => {
  const handleProductClick = (
    productNum: number,
    productPrice: number,
    productShipping: number,
    productShippingId: number,
    productOfferId: number,
    productStickyId: number
  ) => {
    setProduct({
      product: productNum,
      productName: `${productNum + 1}x ${info.product.name}`,
      productPrice: productPrice.toString(),
      productShipping: productShipping.toString(),
      productShippingId: productShippingId.toString(),
      productOfferId: productOfferId.toString(),
      productStickyId: productStickyId.toString(),
    });
  };

  const [price1, setPrice1] = useState(Number(info.product.price1));
  const [price2, setPrice2] = useState(Number(info.product.price2));
  const [price3, setPrice3] = useState(Number(info.product.price3));
  const [price4, setPrice4] = useState(Number(info.product.price4));

  const [showCouponFlag, setShowCouponFlag] = useState(false);

  useEffect(() => {
    function scrollIfNotVisible(elementId: string) {
      const element = document.getElementById(elementId);

      if (!element) return; // Exit if the element is not found

      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the element is completely within the viewport
      const isCompletelyVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= viewportHeight &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      // If not fully visible, scroll into view
      if (!isCompletelyVisible) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center", // Adjust this if you want it to align differently
        });
      }
    }

    const changePriceDrama = async () => {
      scrollIfNotVisible("quantity-selector");
      document.getElementById("price1")!.style.background = "#5acd65";
      await delay(200);
      setPrice1(price1 - parseFloat(info.product.couponValue));
      document.getElementById("price1")!.style.background = "none";
      document.getElementById("price2")!.style.background = "#5acd65";
      await delay(200);
      setPrice2(price2 - parseFloat(info.product.couponValue));
      document.getElementById("price2")!.style.background = "none";
      document.getElementById("price3")!.style.background = "#5acd65";
      await delay(200);
      setPrice3(price3 - parseFloat(info.product.couponValue));
      document.getElementById("price3")!.style.background = "none";
      document.getElementById("price4")!.style.background = "#5acd65";
      await delay(200);
      setPrice4(price4 - parseFloat(info.product.couponValue));
      document.getElementById("price4")!.style.background = "none";
      setShowCouponFlag(true);
    };
    if (couponActive) {
      changePriceDrama();
    }
  }, [couponActive]);

  return (
    <>
      <div
        className="flex w-full justify-between items-center pb-6"
        id="quantity-selector"
      >
        <div className="flex w-full gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mt-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          <div>
            <h3 className="font-bold text-[23px] md:text-[28px]">Select Quantity</h3>
            <p className="text-[12px] md:text-[15px]">How many hearing aids do you want?</p>
          </div>
        </div>
      </div>
      <HighDemand />
      <div className="flex w-full flex-col sm:space-y-10">
        <div
          className={`flex w-full border-[2px] border-[#ddd] px-2 md:px-4 py-6 rounded-md cursor-pointer mb-10 md:mb-0 transition-all ${
            product.product === 0 && "border-blue-500 border-[3px] bg-[#ffffcb]"
          }`}
          onClick={() => {
            handleProductClick(
              0,
              Number(info.product.price1),
              Number(info.product.ship1),
              Number(info.product.shippingId1),
              Number(info.product.offerId1),
              Number(info.product.stickyId1)
            );
          }}
        >
          <div className="flex flex-col w-1/3 sm:w-1/2 justify-center items-start ml-5">
            <p className="text-[14px] md:text-[20px] font-bold ">
              <input
                type="checkbox" 
                value={0}
                name="time" 
                id={'checkbox-0'}
                checked={product.product === 0}
                className="mr-2"
              />
              Buy 1 Pair
            </p>
            <div className="flex relative">
              <Image
                src={info.product.image1}
                width={120}
                height={120}
                alt="Quantity 1"
              />
              <DiscountSeal isAbsolute={true} percent={'50%'} />
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-center text-[#282828] text-center">
            <div className="flex flex-col justify-center items-end w-full space-x-2 sm:space-x-0 mr-5">
              <p className="text-[17px] text-[#000000] relative">
                {/* {info.product.ogPrice1} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice1)}
                  countryCode={country}
                  digits={0}
                />
                <OldValue />
              </p>

              <p className="text-[30px] text-[#000000]  font-bold" id="price1">
                <PriceDisplaySimple
                  priceUSD={price1}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[19px] text-[#5acd65]  font-bold" id="price2">
                You Save {' '}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice1) - price1}
                  countryCode={country}
                  digits={2}
                />
              </p>
            </div>
          </div>
        </div>
        <div
          className={`flex w-full border-[2px] border-[#ddd] px-2 md:px-4 py-6 rounded-md cursor-pointer mb-10 transition-all relative ${
            product.product === 1 && "bg-[#ffffcb] border-blue-500 border-[3px] "
          }`}
          onClick={() => {
            handleProductClick(
              1,
              Number(info.product.price2),
              Number(info.product.ship2),
              Number(info.product.shippingId2),
              Number(info.product.offerId2),
              Number(info.product.stickyId2)
            );
          }}
        >
          <div className="bg-[#257BCA] h-[30px] absolute text-white flex justify-center rounded-md px-4 left-[20px] top-[-30px] text-[12px] font-bold w-[180px] items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-[#FF9900]">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>{' '}
            BESTSELLER
          </div>
          <div className="flex flex-col w-1/3 sm:w-1/2 justify-center items-start ml-5">
            <p className="text-[14px] md:text-[20px] font-bold ">
              <input
                type="checkbox" 
                value={1}
                name="time" 
                id={'checkbox-1'}
                checked={product.product === 1}
                className="mr-2"
              />
              Buy 2 Pair
            </p>
            <div className="flex relative">
              <Image
                src={info.product.image2}
                width={120}
                height={120}
                alt="Quantity 2"
              />
              <DiscountSeal isAbsolute={true} percent={'56%'} />
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-center text-[#282828] text-center">
            <div className="flex flex-col justify-center items-end w-full space-x-2 sm:space-x-0 mr-5">
              <p className="text-[17px] text-[#000000] relative">
                {/* {info.product.ogPrice1} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice2)}
                  countryCode={country}
                  digits={0}
                />
                <OldValue />
              </p>

              <p className="text-[30px] text-[#000000]  font-bold" id="price1">
                <PriceDisplaySimple
                  priceUSD={price2}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[19px] text-[#5acd65]  font-bold" id="price2">
                You Save {' '}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice2) - price2}
                  countryCode={country}
                  digits={2}
                />
              </p>
            </div>
          </div>
        </div>
       
        <div
          className={`flex w-full border-[2px] border-[#ddd] px-2 md:px-4 py-6 rounded-md cursor-pointer mb-10 transition-all relative overflow-hidden ${
            product.product === 2 && "border-blue-500 border-[3px] bg-[#ffffcb]"
          }`}
          onClick={() => {
            handleProductClick(
              2,
              Number(info.product.price3),
              Number(info.product.ship3),
              Number(info.product.shippingId3),
              Number(info.product.offerId3),
              Number(info.product.stickyId3)
            );
          }}
        >
          <div className="flex flex-col w-1/3 sm:w-1/2 justify-center items-start ml-5">
            <p className="text-[14px] md:text-[20px] font-bold ">
              <input
                type="checkbox" 
                value={2}
                name="time" 
                id={'checkbox-2'}
                checked={product.product === 2}
                className="mr-2"
              />
              Buy 3 Pair
            </p>
            <div className="flex relative">
              <Image
                src={info.product.image3}
                width={120}
                height={120}
                alt="Quantity 3"
              />
              <DiscountSeal isAbsolute={true} percent={'58%'} />
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-center text-[#282828] text-center">
            <div className="flex flex-col justify-center items-end w-full space-x-2 sm:space-x-0 mr-5">
              <p className="text-[17px] text-[#000000] relative">
                {/* {info.product.ogPrice1} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice3)}
                  countryCode={country}
                  digits={0}
                />
                <OldValue />
              </p>

              <p className="text-[30px] text-[#000000]  font-bold" id="price1">
                <PriceDisplaySimple
                  priceUSD={price3}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[19px] text-[#5acd65]  font-bold" id="price2">
                You Save {' '}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice3) - price3}
                  countryCode={country}
                  digits={2}
                />
              </p>
            </div>
          </div>
        </div>
        <div
          className={`flex w-full border-[2px] border-[#ddd] px-2 md:px-4 py-6 rounded-md cursor-pointer mb-10 transition-all relative overflow-hidden ${
            product.product === 3 && "border-blue-500 border-[3px] bg-[#ffffcb]"
          }`}
          onClick={() => {
            handleProductClick(
              3,
              Number(info.product.price4),
              Number(info.product.ship4),
              Number(info.product.shippingId4),
              Number(info.product.offerId4),
              Number(info.product.stickyId4)
            );
          }}
        >
          <div className="flex flex-col w-1/3 sm:w-1/2 justify-center items-start ml-5">
            <p className="text-[14px] md:text-[20px] font-bold ">
              <input
                type="checkbox" 
                value={3}
                name="time" 
                id={'checkbox-3'}
                checked={product.product === 3}
                className="mr-2"
              />
              Buy 4 Pair
            </p>
            <div className="flex relative">
              <Image
                src={info.product.image4}
                width={120}
                height={120}
                alt="Quantity 4"
              />
              <DiscountSeal isAbsolute={true} percent={'60%'} />
            </div>
          </div>
          <div className="flex w-2/3 sm:w-1/2 flex-col justify-start items-center text-[#282828] text-center">
            <div className="flex flex-col justify-center items-end w-full space-x-2 sm:space-x-0 mr-5">
              <p className="text-[17px] text-[#000000] relative">
                {/* {info.product.ogPrice1} */}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice4)}
                  countryCode={country}
                  digits={0}
                />
                <OldValue />
              </p>

              <p className="text-[30px] text-[#000000]  font-bold" id="price1">
                <PriceDisplaySimple
                  priceUSD={price4}
                  countryCode={country}
                  digits={2}
                />
              </p>
              <p className="text-[19px] text-[#5acd65]  font-bold" id="price2">
                You Save {' '}
                <PriceDisplaySimple
                  priceUSD={parseFloat(info.product.ogPrice4) - price4}
                  countryCode={country}
                  digits={2}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuantitySelector;
