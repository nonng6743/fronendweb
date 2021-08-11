import React from "react"

import apolloClient from "../apollo/apolloClient"
import Signup from "../components/SignUp"


const SignpuPage = () => {
  return <Signup />
}

export default apolloClient(SignpuPage)