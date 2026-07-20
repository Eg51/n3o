import React from 'react'
import Link from 'next/link'
import AshTrustHero from '@/app/components/AshTrustHero'
import Business from '@/app/components/Business'
import AshTrustLogin from "@/app/components/AshTrustLogin"

const page = async () => { 
  await new Promise((resolve) => setTimeout(resolve, 2000))


  return (
    <>
      {/* <AshTrustHero/> */}
      <AshTrustLogin/>
    </>
  )
}

export default page
