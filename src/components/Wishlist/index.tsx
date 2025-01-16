"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import { useDispatch } from "react-redux";
import { removeAllItemsFromWishlist } from "@/redux/features/wishlist-slice";
import toast from 'react-hot-toast';

export const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  const handleClearWishlist = () => {
    if (wishlistItems.length === 0) {
      toast.error('Wishlist is already empty');
      return;
    }
    
    dispatch(removeAllItemsFromWishlist());
    toast.success('Wishlist cleared successfully');
  };

  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
            <button 
              onClick={handleClearWishlist}
              className="text-blue hover:text-red transition-colors duration-200"
            >
              Clear Wishlist
            </button>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {wishlistItems.length > 0 ? (
                  <>
                    {/* <!-- table header --> */}
                    <div className="flex items-center py-5.5 px-10">
                      <div className="min-w-[83px]"></div>
                      <div className="min-w-[387px]">
                        <p className="text-dark">Product</p>
                      </div>

                      <div className="min-w-[205px]">
                        <p className="text-dark">Unit Price</p>
                      </div>

                      <div className="min-w-[265px]">
                        <p className="text-dark">Stock Status</p>
                      </div>

                      <div className="min-w-[150px]">
                        <p className="text-dark text-right">Action</p>
                      </div>
                    </div>

                    {/* <!-- wish items --> */}
                    {wishlistItems.map((item, key) => (
                      <SingleItem item={item} key={key} />
                    ))}
                  </>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    Your wishlist is empty
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
