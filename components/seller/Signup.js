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
    $tel: String!
    $ID_Card: String!
    $address: String!
    $namestore: String!
    $store_type: String!
    $imageUrl: String!
  ) {
    signupSeller(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      role: "seller"
      tel: $tel
      ID_Card: $ID_Card
      address: $address
      namestore: $namestore
      store_type: $store_type
      imageUrl: $imageUrl
    ) {
      id
      firstname
      lastname
      email
      role
      tel
      ID_Card
      address
      namestore
      store_type
      imageUrl
    }
  }
`;

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    tel: "",
    ID_Card: "",
    address: "",
    namestore: "",
    store_type: "",
    imageUrl: "",
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
          tel: "",
          ID_Card: "",
          address: "",
          namestore: "",
          store_type: "",
          imageUrl: "",
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
    <div className="font-sans antialiased bg-grey-lightest">
      <div className="w-full bg-grey-lightest" style={{ paddingTop: "4rem" }}>
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
              Create an account
            </div>
            <form onSubmit={handleSubmit}>
              <div className="py-4 px-8">
                <div className="flex mb-4">
                  <div className="w-1/2 mr-1">
                    <label className="block text-grey-darker text-sm font-bold mb-2">
                      First Name
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={userInfo.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-1/2 ml-1">
                    <label className="block text-grey-darker text-sm font-bold mb-2">
                      Last Name
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={userInfo.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-grey-darker text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    type="email"
                    name="email"
                    placeholder="You email address"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                   
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    name="password"
                    type="password"
                    placeholder="Your secure password"
                    value={userInfo.password}
                    onChange={handleChange}
                  />
                  <p className="text-grey text-xs mt-1">
                    At least 6 characters
                  </p>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                  >
                    Address
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    name="address"
                    type="address"
                    placeholder="Your address"
                    value={userInfo.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                   
                  >
                    ID_Card
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    name="ID_Card"
                    type="text"
                    placeholder="Your ID_Card 13 number"
                    value={userInfo.ID_Card}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                
                  >
                    telephone number
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    name="tel"
                    type="tel"
                    placeholder="Your telephone number"
                    value={userInfo.tel}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                   
                  >
                    Nmae Store
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    name="namestore"
                    type="text"
                    placeholder="Your of namestore"
                    value={userInfo.namestore}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    
                  >
                    type Store
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    name="store_type"
                    type="text"
                    placeholder="Your type Store"
                    value={userInfo.store_type}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                  
                  >
                    imageUrl
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    name="imageUrl"
                    type="text"
                    placeholder="Your imageUrl"
                    value={userInfo.imageUrl}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
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
    </div>
  );
}

export default Signup;
