import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.scss";
import Navbar from "../components/design/Navbar/Navbar";
import Footer from "../components/design/Footer";
import "react-toastify/dist/ReactToastify.css";
import BottomNav from "../components/design/BottomNav/BottomNav";
import { ToastContainer } from "react-toastify";
import { Provider } from "jotai";
import Providers from "../components/Providers";
import NextTopLoader from "nextjs-toploader";
import ThemeRegistry from "./user/Theme";
import GoogleAnalytics from "./Google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "رایکا سیستم | خرید اقساطی لوازم الکترونیکی",
  description:
    "رایکا سیستم | خرید اقساطی و نقدی تمامی لوازم لوازم الکترونیکی با به صرفه ترین قیمت نسبت بازار لوازم الکترونیکی",
  alternates: {
    canonical: "https://jahizan.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fa-IR" dir="rtl">
      <head suppressHydrationWarning>
        <link
          suppressHydrationWarning
          rel="apple-touch-startup-image"
          href="/apple-launch-1125x2436.png"
        ></link>
        <GoogleAnalytics />
      </head>

      <body suppressHydrationWarning className="custom-scroll">
        <ThemeRegistry>
          <Providers>
            <Provider>
              <Navbar />
              <ToastContainer />
              <BottomNav />
              <NextTopLoader showSpinner={false} color="#20ac73" />
              {children}
              <Footer />
            </Provider>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
