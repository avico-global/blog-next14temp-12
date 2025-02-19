import React, { useState, useEffect } from "react";
import Fullcontainer from "@/components/common/Fullcontainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  Ellipsis,
  SearchIcon,
  X,
} from "lucide-react";

export default function Navbar() {
  const categories = ["Travel", "Lifestyle", "Beauty", "Art and Design"];
  const element = categories.slice(0, 2);
  const element2 = categories.slice(2, 4);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  return (
    <>
      <Fullcontainer
        className={`border bg-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          showNavbar ? "shadow-md translate-y-0 opacity-100" : ""
        }`}
      >
        <Container className="flex justify-between items-center py-3">
          <div className="hidden md:flex gap-3 text-white">
            <Link className="bg-black rounded-full p-2" href="/">
              <TwitterIcon className="w-4 h-4" />
            </Link>
            <Link className="bg-blue-700 rounded-full p-2" href="/">
              <FacebookIcon className="w-4 h-4" />
            </Link>
            <Link className="bg-red-700 rounded-full p-2" href="/">
              <InstagramIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="md:hidden flex flex-row gap-4 items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="cursor-pointer text-black bg-gray-200 rounded-full p-2"
            >
              <Ellipsis className="w-4 h-4" />
            </button>
            <Link href="/">
              <Image src={logo} alt="logo" width={60} height={60} />
            </Link>
          </div>
          <div className="hidden md:flex gap-7 items-center justify-center text-lg text-black">
            {element.map((item, index) => (
              <Link key={index} href={`/${item.toLowerCase()}`}>
                {item}
              </Link>
            ))}
            <Link href="/">
              <Image src={logo} alt="logo" width={80} height={80} />
            </Link>
            {element2.map((item, index) => (
              <Link key={index} href={`/${item.toLowerCase()}`}>
                {item}
              </Link>
            ))}
          </div>
          <div>
            <SearchIcon className="w-4 h-4" />
          </div>
        </Container>
      </Fullcontainer>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 flex flex-col h-full">
          {/* Close Button */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="self-end p-2"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image src={logo} alt="logo" width={80} height={80} />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6">
            {categories.map((item, index) => (
              <Link 
                key={index} 
                href={`/${item.toLowerCase()}`}
                className="block text-lg text-center hover:text-gray-600 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="mt-auto pb-8">
            <div className="flex justify-center gap-4">
              <Link className="bg-black rounded-full p-2" href="/">
                <TwitterIcon className="w-4 h-4 text-white" />
              </Link>
              <Link className="bg-blue-700 rounded-full p-2" href="/">
                <FacebookIcon className="w-4 h-4 text-white" />
              </Link>
              <Link className="bg-red-700 rounded-full p-2" href="/">
                <InstagramIcon className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
