import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MenuIcon, XIcon } from 'lucide-react'
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navLinks = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Company Dashboard',
      path: '/company-dashboard',
    },
    {
      name: 'Regulatory Dashboard',
      path: '/regulatory-dashboard',
    },
    {
      name: 'Public Data',
      path: '/public-dashboard',
    },
    {
      name: 'Compliance Map',
      path: '/compliance-map',
    },
  ]
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-green-700 font-bold text-xl">
                CO₂NNECT
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === link.path ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-green-100'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-green-100'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
export default Navigation
