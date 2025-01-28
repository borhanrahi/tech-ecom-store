"use client";
import { useState, useEffect } from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/redux/store';
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
import { AuthWrapper } from "@/components/Auth/AuthWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ReduxProvider>
          <PersistGate loading={<PreLoader />} persistor={persistor}>
            <AuthWrapper>
              {!loading && (
                <>
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
                  <ScrollToTop />
                  <Footer />
                  <ToasterProvider />
                </>
              )}
              {loading && <PreLoader />}
            </AuthWrapper>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  );
}
