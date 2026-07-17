import React from 'react'
import Link from 'next/link'

const page = async () => { // 1. Make it async
  // 2. Add something to await so loading triggers
  await new Promise((resolve) => setTimeout(resolve, 1500)) // 1.5s fake delay
  
  // Or real fetch: const res = await fetch('https://api.com/data')

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Qpage</h1>
      <p>This is Qpage content</p>
      <Link href={"/yage"} className="text-blue-500 underline mt-4 block">
        Go to Yage
      </Link>
    </div>
  )
}

export default page