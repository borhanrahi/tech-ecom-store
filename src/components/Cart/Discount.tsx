import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyPromoCode, removePromoCode, selectAppliedPromo } from "@/redux/features/promo-slice";

const Discount = () => {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const appliedPromo = useSelector(selectAppliedPromo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    
    if (couponCode.trim()) {
      dispatch(applyPromoCode(couponCode.trim()));
      setCouponCode("");
    }
  };

  const handleRemovePromo = () => {
    dispatch(removePromoCode());
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px] p-5">
      <h3 className="font-medium text-dark text-lg mb-4">Have a coupon?</h3>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none focus:border-blue"
        />
        <button
          type="submit"
          className="inline-flex font-medium text-white bg-blue py-3 px-6 rounded-md hover:bg-blue-dark"
        >
          Apply
        </button>
      </form>

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
            onClick={handleRemovePromo}
            className="text-red-500 hover:text-red-700 text-sm"
            type="button"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Discount;
