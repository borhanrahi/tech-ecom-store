import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { generateMetadata } from '@/utils/metadata'

export const metadata = generateMetadata({
  title: "Shop Tech Products",
  description: "Browse our complete collection of premium tech products, gadgets, and accessories. Find the latest smartphones, laptops, and electronics.",
  path: "/shop"
})

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;
