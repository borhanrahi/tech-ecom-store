import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyPromoCode, selectAppliedPromo } from "@/redux/features/promo-slice";
import toast from 'react-hot-toast';

const Discount = () => {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const appliedPromo = useSelector(selectAppliedPromo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (couponCode.trim()) {
      dispatch(applyPromoCode(couponCode));
      setCouponCode("");
    }
  };

  return (
    <div className="lg:max-w-[670px] w-full">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-1 rounded-[10px]">
          <div className="border-b border-gray-3 py-5 px-4 sm:px-5.5">
            <h3 className="">Have any discount code?</h3>
            {appliedPromo && (
              <p className="text-green-600 text-sm mt-1">
                Applied: {appliedPromo.code} ({appliedPromo.type === 'percentage' ? `${appliedPromo.value}%` : `$${appliedPromo.value}`} off)
              </p>
            )}
          </div>

          <div className="py-8 px-4 sm:px-8.5">
            <div className="flex flex-wrap gap-4 xl:gap-5.5">
              <div className="max-w-[426px] w-full">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code (try SAVE20)"
                  className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex font-medium text-white bg-blue py-3 px-8 rounded-md ease-out duration-200 hover:bg-blue-dark"
              >
                Apply Code
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Discount;
