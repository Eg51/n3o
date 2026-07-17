import type { Metadata } from "next";
import { Poppins, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { init } from "next/dist/compiled/webpack/webpack";
import Image from 'next/image'


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
  description: "Improved Banking Experience",
  // preview image
  openGraph: {
    images: ["https://www.n330.netlify.app/2ogo.png"]
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased
      sm:h-full sm:antialiased
      md:h-full md:antialiased
      lg:h-full lg:antialiased`}
      >
        <body className="min-h-full flex flex-col
        sm:font-poppins sm:min-h-full sm:flex sm:flex-col
        md:font-poppins md:min-h-full md:flex md:flex-col
        lg:font-poppins lg:min-h-full lg:flex lg:flex-col">
          <header className="sm:flex
          md:flex
          lg:flex"></header>
          <div className='bg-[<value>]'>
            {children}
          </div>
          <footer className="sm:flex
          md:flex
          lg:flex"></footer>
      </body>
    </html>
  );
}


// export default function RootLayout({children,}: Readonly<{
// children: React.ReactNode;}>){return(<html lang="en" className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable}
// h-full antialiased`}><body className="min-h-full min-w-screen flex box-border flex-col font-poppins
// sm:min-h-full sm:flex sm:box-border sm:flex-col sm:min-w-screen sm:font-poppins
// md:min-h-full md:flex md:box-border md:flex-col md:min-w-screen md:font-poppins
// lg:min-h-full lg:flex lg:box-border lg:flex-col lg:min-w-screen lg:font-poppins">{children}</body></html>);}
