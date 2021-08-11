  
import React from "react"
import Head from "next/head"

import Navbar from "./Navbar"

const PageLayout = ({ children }) => {
  return (
    <div className="bg-blue-100	" >
      <Head>
        <title>My Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {children}
    </div>
  )
}

export default PageLayout