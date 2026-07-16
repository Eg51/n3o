import type { Metadata } from "next";
import { Poppins, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { init } from "next/dist/compiled/webpack/webpack";


//imported fonts always display after the first load time
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});
      
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Improved banking experience",
  description: "Improved banking experience",
  icons: {
    icon: "/1ogo.png",
  },
  // preview image
  openGraph: {
    images: ["https://www.n330.netlify.app/2ogo.png"]
  }
};

export default function RootLayout({children,}: Readonly<{
children: React.ReactNode;}>){return(<html lang="en" className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable}
h-full antialiased`}><body className="min-h-full flex m-0 box-border flex-col font-poppins">{children}</body></html>);}
