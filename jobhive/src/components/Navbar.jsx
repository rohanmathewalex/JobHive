import React from 'react'
import logo from '../assets/images/JObhive.jpg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
     <>
     <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
           
            <Link className="flex flex-shrink-0 items-center mr-4" href="/">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="JobHive"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >JobHive</span
              >
            </Link>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className="text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"> Home</Link>
                <Link
                  href="/jobs"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Jobs</Link>
                <Link
                  href="/add-job"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Add Job</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
     </>
  )
}

export default Navbar
