import React, { useState, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/solid";

type CustomerInfoProps = {
  formik: any;
};

const CustomerInfo = ({ formik }: CustomerInfoProps) => {
  const [formattedPhone, setFormattedPhone] = useState("");

  useEffect(() => {
    if (formik.values.phone) {
      setFormattedPhone(formatPhoneNumber(formik.values.phone));
    }
  }, []);
  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    phone = phone.replace(/\D/g, "");

    if (phone.length === 10) {
      // Format as (XXX) XXX-XXXX for USA numbers
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    } else if (phone.length > 10) {
      // Format as +X (XXX) XXX-XXXX if the country code has 1 digit
      if (phone.length === 11) {
        return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(
          4,
          7
        )}-${phone.slice(7)}`;
      } else if (phone.length === 12) {
        // Format as +XX (XXX) XXX-XXXX if the country code has 2 digits
        return `+${phone.slice(0, 2)} (${phone.slice(2, 5)}) ${phone.slice(
          5,
          8
        )}-${phone.slice(8)}`;
      } else {
        // General formatting for longer international numbers
        return `+${phone.slice(0, phone.length - 10)} (${phone.slice(
          phone.length - 10,
          phone.length - 7
        )}) ${phone.slice(phone.length - 7, phone.length - 4)}-${phone.slice(
          phone.length - 4
        )}`;
      }
    }
    return phone;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const cleanedValue = value.replace(/\D/g, "");

    // Set a maximum number of digits to 15
    if (cleanedValue.length <= 15) {
      formik.handleChange(e);
      setFormattedPhone(formatPhoneNumber(value));
    }
  };

  return (
    <>
      <div className="flex w-full justify-start items-center pb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 mt-4">
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
        </svg>
        <div>
          <h3 className="font-bold text-[28px]">Customer Information</h3>
          <p className="text-[15px]">Order Confirmation Details Will Be Sent Here</p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex w-full space-x-4">
          <div className="flex w-1/2 flex-col items-start justify-start">
            <label className="font-bold text-[14px] pb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="w-full border-[1px] border-[#333]  px-4 py-2 text-[16px] rounded-md sm:text-[14px]"
              placeholder="First Name"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-xs">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>
          <div className="flex w-1/2 flex-col items-start justify-start">
            <label className="font-bold text-[14px] pb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="w-full border-[1px] border-[#333]  px-4 py-2 text-[16px] rounded-md sm:text-[14px]"
              placeholder="Last Name"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-xs">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex w-full space-x-4 mt-6">
          <div className="flex w-full flex-col items-start justify-start">
            <label className="font-bold text-[14px] pb-2">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border-[1px] border-[#333]  px-4 py-2 text-[16px] rounded-md sm:text-[14px]"
              placeholder="Email Address"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        <div className="flex w-full space-x-4 mt-6 mb-6">
          <div className="flex w-full flex-col items-start justify-start">
            <label className="font-bold text-[14px] pb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              onBlur={formik.handleBlur}
              value={formattedPhone}
              className="w-full border-[1px] border-[#333]  px-4 py-2 text-[16px] rounded-md sm:text-[14px]"
              placeholder="Phone"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-xs">{formik.errors.phone}</div>
            ) : null}
          </div>
        </div>
        <button type="submit" className="hidden"></button>
      </form>
    </>
  );
};

export default CustomerInfo;
