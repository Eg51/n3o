import React from 'react'
import Link from 'next/link'

const page = async () => { // 1. Make it async
  // 2. Add something to await so loading triggers
  await new Promise((resolve) => setTimeout(resolve, 1500)) 
  


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Yage</h1>
      <p>This is Yage content</p>
      <Link href={"/sign up"} className="text-blue-500 underline mt-4 block">
        Back to Qpage
      </Link>
    </div>
  )
}

export default page
