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
{/* <IoReceiptOutline />
  <MdAccountBalance />
  <IoCardSharp /> */}
  {/* <LuChartNoAxesCombined />
    <FaMoneyBills />

    <LuLayoutDashboard />
    <IoCardSharp />
    <BiTransfer />
     */}





const Iconpack = () => {
  return (
    <div className='ml-9  md:hidden flex items-center justify-items-end-safe
     w-auto h-auto'>

      <div className='flex w-auto flex-row items-center justify-center'>
        {/* <IoIosNotifications className='font-bold text-[1.43em] text-cyan-900'/> */}
        {/* <IoMdSettings className='font-bold text-[1.43em] text-cyan-900'/> */}
      </div>

      <div className='flex justify-center rounded-sm w-auto h-auto p-0.5 shadow-xl
       bg-cyan-600/40 items-center '>
        <LuLayoutDashboard className='font-bold rounded-sm text-[1.43em] text-cyan-400'/>
      </div>

      <div className='flex justify-center rounded-sm w-auto h-auto p-0.5 shadow-xl
       bg-cyan-600/40 items-center '>
        <FaChartLine className='font-bold rounded-sm  text-[1.43em] text-cyan-400'/>
      </div>

      <div className='flex justify-center w-auto rounded-sm h-auto p-0.5 shadow-xl
       bg-cyan-600/40 items-center '>
        <HiPlus className='font-bold text-[1.43em] rounded-sm text-cyan-400'/>
      </div>

      <div className='flex justify-center w-auto h-auto rounded-sm p-0.5 shadow-xl
       bg-cyan-600/40 items-center '>
        <BiTransfer className='font-bold text-[1.43em] rounded-sm text-cyan-400'/>
      </div>

      <div className='flex justify-center w-auto h-auto rounded-sm p-0.5 shadow-xl
       bg-cyan-600/40 items-center '>
        <IoIosContact className='font-bold text-[1.43em] rounded-sm text-cyan-400'/>
      </div>

    </div>
  )
}

export default Iconpack