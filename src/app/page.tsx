// import React from 'react'
// import Link from 'next/link'
// import AshTrustHero from '@/app/components/AshTrustHero'
// import Business from '@/app/components/Business'
// import AshTrustLogin from "@/app/components/AshTrustLogin"
// import ChatWidget from './components/ChatWidget'
// import AdminUserChat from './components/AdminUserChat'


// const page = async () => { 
//   await new Promise((resolve) => setTimeout(resolve, 2000))


//   return (
//     <>
//       <AshTrustHero/>
//       <ChatWidget/>
//       <AdminUserChat/>
//       {/* <AshTrustLogin/> */}
//     </>
//   )
// }

// export default page
import React from 'react'
import AshTrustHero from '@/app/components/AshTrustHero'
import ChatWidget from './components/ChatWidget'
import ChatWidgett from './components/ChatWidgett'
// import AdminUserChat from './components/AdminUserChat' // Remove this from here

const ADMIN_UID = "aQxcpCiG56tvhbbaVqaZ3a5CrIU1HUYTR8";

const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <>
      <AshTrustHero />
      {/* <ChatWidget /> */}
      <ChatWidgett />

    </>
  )
}

export default page
