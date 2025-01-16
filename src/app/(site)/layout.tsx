"use client";
import { useState, useEffect } from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/redux/store';
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Toaster } from 'react-hot-toast';

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import ToasterProvider from '@/components/Common/ToasterProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <PersistGate loading={null} persistor={persistor}>
                <CartModalProvider>
                  <ModalProvider>
                    <PreviewSliderProvider>
                      <Header />
                      {children}
                      <QuickViewModal />
                      <CartSidebarModal />
                      <PreviewSliderModal />
                    </PreviewSliderProvider>
                  </ModalProvider>
                </CartModalProvider>
              </PersistGate>
            </ReduxProvider>
            <ScrollToTop />
            <Footer />
            <ToasterProvider />
          </>
        )}
      </body>
    </html>
  );
}
