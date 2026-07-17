import React from 'react'
import Link from 'next/link'
import Loading from './components/Loading'

const page = async () => { 
  await new Promise((resolve) => setTimeout(resolve, 2000))


  return (
    <div className="flex 
     sm:flex 
     md:flex
     lg:flex 
     ">
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-radial  from-blue-200 to-cyan-200 to-gray-300
        sm:w-screen sm:h-screen sm:flex sm:flex-col sm:items-center sm:justify-center
        md:w-screen md:h-screen md:flex md:flex-col md:items-center md:justify-center
       ">
          <Loading />     
          <Link href={"/Dashboard"} className="font-poppins text-[100%]
          text-blue-500 no-underline mb-6 block font-bold">
           <h1>reresh</h1>
          </Link>     
        </div>
    </div>
  )
}

export default page
