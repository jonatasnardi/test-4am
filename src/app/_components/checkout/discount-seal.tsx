import React from "react";
import './discount-seal.css';

type DiscountProps = {
  percent: string;
  isAbsolute?: boolean;
};

const DiscountSeal = ({
  percent,
  isAbsolute,
}: DiscountProps) => {
  return (
    <span className={`discount-seal ${isAbsolute && "absolute"}`}>
      {percent}<br />OFF
    </span>
  );
};

export default DiscountSeal;
