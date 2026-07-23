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
import { IoMdSettings, IoIosContact } from "react-icons/io";
import { FaChartLine } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";









const Iconpack = () => {
  return (
    <div className='md:hidden flex bg-600/40'>
      <IoIosNotifications />
      <div className='flex flex-col gap-[4em] items-end justify-end'>
        <LuLayoutDashboard />
        <IoReceiptOutline />
        {/* <MdAccountBalance /> */}
        <IoCardSharp />
        <BiTransfer />
        <HiPlus />
        <FaChartLine />
        <IoIosContact />
        {/* <LuChartNoAxesCombined />
        <FaMoneyBills /> */}

        {/* <LuLayoutDashboard />
        <IoCardSharp />
        <BiTransfer />
        <IoMdSettings/> */}
      </div>
    </div>
  )
}

export default Iconpack