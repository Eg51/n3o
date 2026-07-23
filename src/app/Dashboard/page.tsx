import React from 'react'
import Link from 'next/link'
import ChatWidgett from '@/app/components/ChatWidgett'
import DashboardHero from '@/app/components/DashboardHero'
import Iconpack from '../components/Iconpack'


const page = async () => { 
  await new Promise((resolve) => setTimeout(resolve, 2000))


  return (
    <section className="flex pt-9 sm:bg-cyan-400/40 w-screen sm:h-cover">
        <div className=" flex flex-col">
          <DashboardHero/>
          <ChatWidgett/>
          
        </div>

      <Iconpack/>
    </section>
  )
}

export default page
