import Home from "@/components/Home";
import { generateMetadata } from '@/utils/metadata'

export const metadata = generateMetadata({
  title: "Premium Tech Gadgets & Electronics",
  description: "Shop the latest smartphones, laptops, accessories and tech gadgets. Free shipping on orders over $50.",
  path: "/"
})

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
