import React from 'react'
import Link from 'next/link'
import ChatWidgett from '@/app/components/ChatWidgett'
import DashboardHero from '@/app/components/DashboardHero'
import Iconpack from '../components/Iconpack'


const page = async () => { 
  await new Promise((resolve) => setTimeout(resolve, 2000))


  return (
    <section className="flex bg-transparent w-screen h-screen">
        <div className=" flex flex-col p-9">
          <DashboardHero/>
          <ChatWidgett/>
          <Iconpack/>
        </div>


    </section>
  )
}

export default page
