import React, { useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const SIGN_UP = gql`
  mutation SIGN_UP(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      role: "user"
    ) {
      id
      firstname
      lastname
      email
      role
    }
  }
`;

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    variables: { ...userInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setUserInfo({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });
      }
    },
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await signup();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col ">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bottom-2 ">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full ">
          <h1 className="mb-8 text-3xl text-center">สมัครสมาชิก</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="firstname"
              placeholder="First Name"
              value={userInfo.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="lastname"
              placeholder="Last Name"
              value={userInfo.lastname}
              onChange={handleChange}
            />
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
              Submit
            </button>
          </form>

          <div classname="text-grey-dark mt-6">
            {success && (
              <p>
                You successfully signed up, please{" "}
                <Link href="/signin">
                  <a>sign in</a>
                </Link>
                .
              </p>
            )}

            {error && (
              <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
