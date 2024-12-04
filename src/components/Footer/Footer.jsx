import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#090A0C] text-white py-4 z-[11]">
    <div className="container mx-auto flex flex-col justify-between items-center px-4">
      <div className="flex items-center space-x-4 mt-5 mb-6">
        <a href="#" className="text-white no-underline hover:underline">Home</a>
        <a href="#" className="text-white no-underline hover:underline">About</a>
        <a href="#" className="text-white no-underline hover:underline">Services</a>
        <a href="#" className="text-white no-underline hover:underline">Contact</a>
      </div>
      <div className="text-sm">
        &copy; <a href="">2024 @Yharamas. All rights reserved.</a>
      </div>
    </div>
  </footer>
  )
}
