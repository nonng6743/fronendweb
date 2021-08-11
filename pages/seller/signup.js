import React from "react"
import Signup from "../../components/seller/Signup"

import apolloClient from "../../apollo/apolloClient"



const SignpuPage = () => {
  return <Signup />
}

export default apolloClient(SignpuPage)