import React from 'react'
import Link from 'next/link'
import BankRegistrationForm from '../components/BankRegistrationForm'
import Carousel from '../components/Carousel'




const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))


  return (
    <div className="flex bg-radial items-center justify-around from-blue-200 to-cyan-200 to-gray-300  ">

      <BankRegistrationForm />

      <Carousel />



    </div>
  )
}

export default page
