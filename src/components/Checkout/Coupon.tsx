"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyPromoCode, removePromoCode, selectAppliedPromo } from "@/redux/features/promo-slice";

const Coupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const appliedPromo = useSelector(selectAppliedPromo);

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (couponCode.trim()) {
      dispatch(applyPromoCode(couponCode.trim()));
      setCouponCode("");
    }
  };

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removePromoCode());
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Have any Coupon Code?</h3>
      </div>

      <div className="py-8 px-4 sm:px-8.5">
        <div className="flex gap-4">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
          <button
            onClick={handleApplyClick}
            type="button"
            className="inline-flex font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
          >
            Apply
          </button>
          
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-4">
            Use code: <span className="font-bold text-blue">SAVE20</span> for 20% off or{" "}
            <span className="font-bold text-blue">FLAT50</span> for $50 off
          </p>
        </div>
        {appliedPromo && (
          <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div>
              <span className="text-sm text-gray-600">Applied code: </span>
              <span className="font-medium text-blue">{appliedPromo.code}</span>
              <span className="ml-2 text-sm text-gray-600">
                ({appliedPromo.type === 'percentage' ? `${appliedPromo.value}%` : `$${appliedPromo.value}`} off)
              </span>
            </div>
            <button
              onClick={handleRemoveClick}
              type="button"
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupon;
