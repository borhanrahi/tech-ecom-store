"use client";
import React, { useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { clearRecentlyViewed, setRecentlyViewed } from "@/redux/features/recentlyViewed-slice";
import ProductItem from "../Common/ProductItem";
import toast from 'react-hot-toast';

export const RecentlyViewed = () => {
  const dispatch = useDispatch();
  const recentItems = useAppSelector((state) => state.recentlyViewedReducer.items);

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('recentlyViewedItems');
    if (savedItems && JSON.parse(savedItems).length > 0) {
      // You'll need to create a new action to set the items
      dispatch(setRecentlyViewed(JSON.parse(savedItems)));
    }
  }, [dispatch]);

  const handleClearRecentlyViewed = () => {
    if (recentItems.length === 0) {
      toast.error('No items to clear');
      return;
    }
    dispatch(clearRecentlyViewed());
    localStorage.removeItem('recentlyViewedItems'); // Clear localStorage as well
  };

  return (
    <>
      <Breadcrumb title="Recently Viewed" pages={["Recently Viewed"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Recently Viewed Items</h2>
            <button 
              onClick={handleClearRecentlyViewed}
              className="text-blue hover:text-red transition-colors duration-200"
            >
              Clear All Items
            </button>
          </div>

          {recentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7.5">
              {recentItems.map((item, key) => (
                <ProductItem key={key} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[10px] shadow-1 p-8 text-center">
              <p className="text-gray-500">No recently viewed items</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RecentlyViewed; 