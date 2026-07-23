import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { MdAccountBalance } from "react-icons/md";
import { IoCardSharp } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { FaMoneyBills } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";



const DashboardHero = () => {
  const footerLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Security Audit", href: "#" },
    { label: "Legal", href: "#" },
  ];

  return (
    <div className='w-[17em] hidden h-auto p-4 sticky md:flex flex-col
     rounded-2xl bg-cyan-600/40 gap-[1.54em] shadow-xl'>
      <div className='hidden md:block w-auto h-auto p-[1.4em] rounded-2xl
        shadow-xl bg-transparent'>
        <div className="flex flex-wrap items-center gap-[1em] sm:gap-10">
          <Image
            src="/loadLogo_shield_smooth.png"
            alt="Shield logo"
            width={28}
            height={28}
            className="md:h-7 md:w-7 h-5 w-5"
          />
          <span className="font-bold m-auto p-auto text-[11.4px] md:text-lg">
            Ash Trust <span className="text-cyan-900">Bank</span>
          </span>
        </div>
      </div>

      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
       flex items-center justify-evenly rounded-2xl shadow-xl bg-cyan-600/40'>
        <LuLayoutDashboard className='font-bold text-[1.5em] text-cyan-900'/>Dashboard
      </div>

      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
       flex items-center justify-evenly rounded-2xl shadow-xl bg-cyan-600/40'>
        <IoReceiptOutline className='font-bold text-[1.5em] text-cyan-900'/> Transactions
      </div>
      
      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
       flex items-center justify-evenly rounded-2xl shadow-xl bg-cyan-600/40'>
        <MdAccountBalance className='font-bold text-[1.5em] text-cyan-900'/> Account
      </div>

      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
       flex items-center justify-evenly rounded-2xl shadow-xl bg-cyan-600/40'>
        <IoCardSharp className='font-bold text-[1.5em] text-cyan-900'/> Cards
      </div>
      
      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
       flex items-center justify-evenly rounded-2xl shadow-xl bg-cyan-600/40'>
        <BiTransfer className='font-bold text-[1.5em] text-cyan-900'/>Transfers
      </div>

      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
       flex items-center justify-evenly rounded-2xl shadow-xl bg-cyan-600/40'>
        <LuChartNoAxesCombined className='font-bold text-[1.5em] text-cyan-900'/>Investment
      </div>
      
      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
       flex items-center justify-evenly rounded-2xl shadow-xl bg-cyan-600/40'>
        <FaMoneyBills className='font-bold text-[1.5em] text-cyan-900'/>Bills
      </div>

      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
       flex items-center justify-evenly rounded-2xl shadow-xl bg-cyan-600/40'>
        <IoMdSettings className='font-bold text-[1.5em] text-cyan-900'/>Setttings
      </div>
      
      <div className='w-auto font-bold h-auto px-[2em] text-cyan-900 py-[1.4em]
        flex items-center justify-evenly bg-transparent'>
        <div className="mx-auto flex max-w-6xl flex-col items-center 
        justify-between gap-4 px-4 py-5 text-center text-[0.1em]
         text-cyan-900 sm:flex-row sm:px-6">
          <p>© 2024 Ash Trust Bank plc. All rights reserved. Member FDIC.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium uppercase cursor-progress tracking-wide text-cyan-600 hover:text-cyan-500"
              >
                {link.label}
              </Link>
              ))}
          </div>
      
        </div>
      </div>
    </div>

  )
}

export default DashboardHero
