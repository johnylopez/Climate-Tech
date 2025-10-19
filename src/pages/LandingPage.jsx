import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChartIcon,
  ClipboardCheckIcon,
  AlertCircleIcon,
  ArrowDownIcon,
  LineChartIcon,
  LeafIcon,
  FactoryIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from 'lucide-react'
import VideoBackground from '../components/VideoBackground'
// import EmissionsParticles from '../components/EmissionsParticles'
import appData from '../data/appData.json'
const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false)
  const { stats } = appData
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="w-full bg-white">
      {/* Hero Section with Video Background */}
      <div className="relative overflow-hidden h-screen">
        <VideoBackground className="h-full" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6 text-white leading-tight">
                <span className="text-green-300">CO₂NNECT</span>{' '}
                <br></br>Louisiana CO₂ Platform
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                A centralized platform for tracking, reporting, and managing
                carbon emissions across Louisiana's industries.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/company-dashboard"
                  className="inline-flex items-center px-8 py-4 bg-white text-green-800 font-medium rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1"
                >
                  <span>Company Portal</span>
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/regulatory-dashboard"
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white font-medium rounded-full hover:bg-white hover:bg-opacity-10 transition-all transform hover:-translate-y-1"
                >
                  <span>Regulatory Dashboard</span>
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">Explore More</span>
            <ArrowDownIcon className="h-6 w-6 text-white animate-bounce" />
          </div>
        </div>
      </div>
      {/* Stats Counter Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Making an Impact
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Tracking emissions data across Louisiana
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3 text-green-600">
                <FactoryIcon size={28} />
              </div>
              <p className="text-4xl font-bold text-green-700">
                {stats.registeredCompanies}
              </p>
              <p className="text-gray-600 mt-1">Registered Companies</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3 text-green-600">
                <LineChartIcon size={28} />
              </div>
              <p className="text-4xl font-bold text-green-700">
                {stats.trackedCO2}
              </p>
              <p className="text-gray-600 mt-1">Tons CO₂ Tracked</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3 text-green-600">
                <LeafIcon size={28} />
              </div>
              <p className="text-4xl font-bold text-green-700">
                {stats.emissionsReduction}
              </p>
              <p className="text-gray-600 mt-1">Emissions Reduction</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3 text-green-600">
                <CheckCircleIcon size={28} />
              </div>
              <p className="text-4xl font-bold text-green-700">
                {stats.complianceRate}
              </p>
              <p className="text-gray-600 mt-1">Compliance Rate</p>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Platform Features
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <BarChartIcon size={32} className="text-green-700" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4">
              Data Reporting & Visualization
            </h3>
            <p className="text-gray-600 text-center">
              Easily input emissions and carbon capture data with automated
              validation and real-time visualizations.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <ClipboardCheckIcon size={32} className="text-green-700" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4">
              Compliance Tracking
            </h3>
            <p className="text-gray-600 text-center">
              Automatically check regulatory requirements based on industry
              sector and track submission deadlines.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <AlertCircleIcon size={32} className="text-green-700" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4">
              Regulatory Oversight
            </h3>
            <p className="text-gray-600 text-center">
              Comprehensive dashboards for regulators to ensure accountability
              and monitor compliance.
            </p>
          </div>
        </div>
      </div>
      {/* Stakeholders Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Who Benefits</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
                <FactoryIcon size={28} className="text-green-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Companies
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Simplified emissions reporting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Automated compliance checks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Deadline reminders</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Historical data tracking</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
                <ClipboardCheckIcon size={28} className="text-green-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Regulators
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Real-time compliance monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Industry-wide data analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Streamlined oversight</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Automated reporting</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
                <LineChartIcon size={28} className="text-green-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Public
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Transparent emissions data</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Easy-to-understand visualizations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Industry performance tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Environmental impact awareness</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 py-20 text-white">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to streamline your CO₂ reporting?
          </h2>
          <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
            Join Louisiana's centralized platform for emissions tracking and
            compliance management.
          </p>
          <Link
            to="/company-dashboard"
            className="inline-flex items-center px-10 py-5 bg-white text-green-800 font-medium rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1"
          >
            <span className="text-lg">Get Started</span>
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default LandingPage
