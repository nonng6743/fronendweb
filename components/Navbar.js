import React, { useContext } from "react";
import Link from "next/link";

import { AuthContext } from "../appState/AuthProvider";



const Navbar = () => {
  const { user, signout, } = useContext(AuthContext);
 
 
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-600 bg-opacity-90 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-2xl tracking-tight ">
          <Link href="/">Kheha K.6</Link>
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/">
            <a className="block mt-5 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 text-lg">
              Home
            </a>
          </Link>
          <Link href="/Home/contactadmin">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-5">
              ติดต่อเรา
            </a>
          </Link>
          <Link href="/seller/signin">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-5">
              Seller Centre
            </a>
          </Link>
          <Link href="/seller/signup">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-5">
              ขายสินค้ากับเรา
            </a>
          </Link>
        </div>
  
        {user && (
          <div>
            <Link href="/dashboard">
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500  mr-2  lg:mt-0  ">
                  dashboard
              </a>
            </Link>
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={signout}
            >
              LOGOUT
            </button>
          </div>
        )}

        {!user && (
          <div>
            <Link href="/signup">
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500  mr-2  lg:mt-0  ">
                สมัครเป็นสมาชิก
              </a>
            </Link>

            <Link href="/signin">
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500  lg:mt-0">
                เข้าสู่ระบบ
              </a>
            </Link>
          </div>
        )}
      
      </div>
    </nav>
  );
};
export default Navbar;
