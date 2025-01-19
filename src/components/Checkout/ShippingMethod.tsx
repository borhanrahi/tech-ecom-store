import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Truck } from "lucide-react";
import { SHIPPING_METHODS } from "@/constants/shipping";
import { setShippingMethod } from "@/redux/features/checkout-slice";
import type { RootState } from "@/redux/store";

const ShippingMethod = () => {
  const dispatch = useDispatch();
  const selectedMethod = useSelector((state: RootState) => state.checkout.shippingMethod.id);

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Shipping Method</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-4">
          {/* Free Shipping */}
          <label className="flex items-center gap-3.5">
            <input
              type="radio"
              name="shipping"
              checked={selectedMethod === SHIPPING_METHODS.FREE.id}
              onChange={() => dispatch(setShippingMethod(SHIPPING_METHODS.FREE))}
              className="form-radio h-4 w-4 text-blue border-gray-4"
            />
            <div className="flex items-center justify-between w-full p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <div className="w-16 flex justify-center">
                  <Truck className="w-8 h-8 text-blue" />
                </div>
                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">$0.00</p>
                  <p className="text-sm text-gray-500">Free Shipping</p>
                </div>
              </div>
            </div>
          </label>

          {/* FedEx */}
          <label className="flex items-center gap-3.5">
            <input
              type="radio"
              name="shipping"
              checked={selectedMethod === SHIPPING_METHODS.FEDEX.id}
              onChange={() => dispatch(setShippingMethod(SHIPPING_METHODS.FEDEX))}
              className="form-radio h-4 w-4 text-blue border-gray-4"
            />
            <div className="flex items-center justify-between w-full p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/checkout/fedex.svg"
                  alt="FedEx"
                  width={64}
                  height={18}
                />
                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">${SHIPPING_METHODS.FEDEX.price}</p>
                  <p className="text-sm text-gray-500">{SHIPPING_METHODS.FEDEX.description}</p>
                </div>
              </div>
            </div>
          </label>

          {/* DHL */}
          <label className="flex items-center gap-3.5">
            <input
              type="radio"
              name="shipping"
              checked={selectedMethod === SHIPPING_METHODS.DHL.id}
              onChange={() => dispatch(setShippingMethod(SHIPPING_METHODS.DHL))}
              className="form-radio h-4 w-4 text-blue border-gray-4"
            />
            <div className="flex items-center justify-between w-full p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/checkout/dhl.svg"
                  alt="DHL"
                  width={64}
                  height={18}
                />
                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">${SHIPPING_METHODS.DHL.price}</p>
                  <p className="text-sm text-gray-500">{SHIPPING_METHODS.DHL.description}</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;
