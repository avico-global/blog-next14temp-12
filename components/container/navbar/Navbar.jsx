import React, { useState, useEffect, useRef } from "react";
import Fullcontainer from "@/components/common/Fullcontainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import { Search } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";
import Logo from "./Logo";

export default function Navbar({ logo, categories, imagePath, blog_list }) {
  const [sidebar, setSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const sidebarRef = useRef(null);
  const searchRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setSidebar(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false);
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebar]);

  // Search functionality
  const handleSearchToggle = () => {
    setOpenSearch(!openSearch);
    setSearchQuery("");
    setFilteredBlogs([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredBlogs([]);
      return;
    }

    const filtered =
      blog_list?.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      ) || [];
    setFilteredBlogs(filtered);
  };

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
        setSearchQuery("");
        setFilteredBlogs([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const lastThreeBlogs = blog_list?.slice(-3) || [];

  return (
    <>
      <Fullcontainer
        className={`border-b border-gray-100/20 bg-white/95 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out transform ${
          sidebar ? "shadow-lg translate-y-0 opacity-100" : "translate-y-0"
        } hover:shadow-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-50/30 before:via-purple-50/30 before:to-pink-50/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500`}
      >
        <Container className="flex justify-between items-center py-6">
          {/* Mobile Menu and Logo */}
          <div className="md:hidden flex flex-row gap-4 items-center">
            <button
              title="Open Menu"
              onClick={() => setSidebar(true)}
              className="relative overflow-hidden group px-5 py-2.5 rounded-full bg-gradient-to-r from-background1 via-background3 to-background4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10 text-sm font-medium tracking-wide">
                Menu
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            </button>
            <Link
              title="Home"
              href="/"
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative group">
                <Logo logo={logo} imagePath={imagePath} />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 capitalize gap-12 items-center justify-center text-base font-medium text-gray-700">
            {categories?.slice(0, 2)?.map((category, index) => (
              <Link
                key={index}
                href={`/category/${sanitizeUrl(category.title)}`}
                className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-background3 hover:via-background4 hover:to-background1 transition-all duration-300 relative group py-2 hover:-translate-y-0.5"
                title={category.title}
              >
                {category.title}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r hover:from-background3 hover:via-background4 hover:to-background1 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}

            <Logo logo={logo} imagePath={imagePath} />

            {categories?.slice(2, 4)?.map((category, index) => (
              <Link
                key={index}
                href={`/category/${sanitizeUrl(category.title)}`}
                className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-background3 hover:via-background4 hover:to-background1 transition-all duration-300 relative group py-2 hover:-translate-y-0.5"
                title={category.title}
              >
                {category.title}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r hover:from-background3 hover:via-background4 hover:to-background1 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </div>

          {/* Enhanced Search */}
          <div ref={searchRef} className="relative">
            <button
              title="Search Articles"
              onClick={handleSearchToggle}
              className="relative overflow-hidden group px-5 py-2.5 rounded-full bg-gradient-to-r from-background1 via-background2 to-background4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10 text-sm font-medium tracking-wide flex items-center gap-2">
                <Search size={16} />
                Search
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-background1 to-background3 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            </button>

            {openSearch && (
              <div className="absolute right-0 top-full mt-6 w-[450px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/20 overflow-hidden transform transition-all duration-300 animate-fadeIn">
                <div className="p-5 border-b border-gray-100/20 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full px-6 py-3.5 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white/80 transition-all duration-300 placeholder:text-gray-400"
                      placeholder="Search articles..."
                      autoFocus
                    />
                  </div>
                </div>
                <div className="max-h-[450px] overflow-y-auto">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, index) => (
                      <Link
                        key={index}
                        href={`/${sanitizeUrl(blog.title)}`}
                        className="block p-5 hover:bg-gray-50/80 transition-colors duration-300"
                        title={blog.title}
                      >
                        <h4 className="text-sm font-medium text-gray-900">
                          {blog.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1.5">
                          {blog.article_category}
                        </p>
                      </Link>
                    ))
                  ) : searchQuery ? (
                    <div className="p-5 text-sm text-gray-500 text-center">
                      No results found
                    </div>
                  ) : (
                    <div className="p-5">
                      <p className="font-medium text-gray-900 mb-4">
                        Recent Articles
                      </p>
                      {lastThreeBlogs.map((blog, index) => (
                        <Link
                          key={index}
                          href={`/${sanitizeUrl(blog.title)}`}
                          className="block py-3 px-4 rounded-lg hover:bg-gray-50/80 transition-all duration-300 mb-2"
                          title={blog.title}
                        >
                          <p className="text-sm text-gray-900">{blog.title}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {blog.article_category}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Fullcontainer>

      {/* Sidebar with enhanced design */}
      <div
        className={`fixed top-0 ${
          sidebar ? "right-0" : "-right-full"
        } h-screen w-[85%] sm:w-[400px] bg-gradient-to-br from-background2 via-background4 to-background3 text-white shadow-2xl z-50 transition-all duration-500 ease-in-out overflow-y-auto`}
        ref={sidebarRef}
      >
        <div className="p-8 h-full flex flex-col">
          <button
            title="Close Menu"
            onClick={() => setSidebar(false)}
            className="self-end relative overflow-hidden group px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10 text-sm font-medium tracking-wide">
              Close
            </span>
            <span className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
          </button>

          <div className="flex justify-center my-12">
            <Logo logo={logo} imagePath={imagePath} />
          </div>

          <nav className="space-y-8">
            {categories?.map((category, index) => (
              <Link
                key={index}
                href={`/${sanitizeUrl(category.title)}`}
                className="block text-lg text-center hover:text-gray-300 transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => setSidebar(false)}
                title={category.title}
              >
                <span className="relative group">
                  {category.title}
                  <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-white/30 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
