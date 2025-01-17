import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { generateMetadata } from '@/utils/metadata'

export const metadata = generateMetadata({
  title: "Product Details",
  description: "Explore detailed specifications, features, and reviews of our premium tech products.",
  path: "/shop-details"
})

const ShopDetailsPage = () => {
  return (
    <main>
      <ShopDetails />
    </main>
  );
};

export default ShopDetailsPage;
