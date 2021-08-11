import React, { useState ,useContext} from "react"
import Router from "next/router"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Cookies from "js-cookie"

import { AuthContext } from "../appState/AuthProvider"

const LOG_IN = gql`
  mutation LOG_IN($email: String!, $password: String!) {
    login(email: $email, password: $password, ) {
      user {
        id
        firstname
        lastname
        email
        role
      }
      jwt
    }
  }
`

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const { setAuthUser } = useContext(AuthContext)

  const [login, { loading, error }] = useMutation(LOG_IN, {
    variables: { ...userInfo },
    onCompleted: data => {
      if (data) {
        setAuthUser(data.login.user)
        Cookies.set("jwt", data.login.jwt)
        setUserInfo({
          email: "",
          password: ""
        })
        if(data.login.user.role === "user"){
          Router.push("/user")
        }
        if(data.login.user.role === "admin"){
          Router.push("/admin")
        }
        if(data.login.user.role === "seller"){
          Router.push("/seller/sellermanages")
        }
      }
    }
  })

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      await login()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col ">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bottom-2 ">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full ">
          <h1 className="mb-8 text-3xl text-center">เข้าสู่ระบบ</h1>
    <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleChange}
            />
            <button
             type="submit"
             className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              disabled={loading}
            >
              Login
            </button>
          </form>
            <div style={{ width: "30%", margin: "auto" }}>
        {error && (
          <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
        )}
      </div>
    </div>
    </div>
    </div>
  )
}

export default Signin