import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart, ClipboardCheck, AlertCircle } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Louisiana CO₂ Emissions Reporting Platform
            </h1>
            <p className="text-xl mb-8">
              A centralized platform for tracking, reporting, and managing
              carbon emissions across Louisiana's industries.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/company-dashboard"
                className="inline-block px-6 py-3 bg-white text-green-800 font-medium rounded-md shadow hover:bg-gray-100 transition"
              >
                Company Portal
              </Link>
              <Link
                to="/regulatory-dashboard"
                className="inline-block px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition"
              >
                Regulatory Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Platform Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <BarChart size={28} className="text-green-700" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              Data Reporting & Visualization
            </h3>
            <p className="text-gray-600 text-center">
              Easily input emissions and carbon capture data with automated
              validation and real-time visualizations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <ClipboardCheck size={28} className="text-green-700" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              Compliance Tracking
            </h3>
            <p className="text-gray-600 text-center">
              Automatically check regulatory requirements based on industry
              sector and track submission deadlines.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <AlertCircle size={28} className="text-green-700" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
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
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Who Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-green-700">
                Companies
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Simplified emissions reporting</li>
                <li>• Automated compliance checks</li>
                <li>• Deadline reminders</li>
                <li>• Historical data tracking</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-green-700">
                Regulators
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Real-time compliance monitoring</li>
                <li>• Industry-wide data analysis</li>
                <li>• Streamlined oversight</li>
                <li>• Automated reporting</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-green-700">
                Public
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Transparent emissions data</li>
                <li>• Easy-to-understand visualizations</li>
                <li>• Industry performance tracking</li>
                <li>• Environmental impact awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            Ready to streamline your CO₂ reporting?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join Louisiana's centralized platform for emissions tracking and
            compliance management.
          </p>
          <Link
            to="/company-dashboard"
            className="inline-block px-8 py-4 bg-green-700 text-white font-medium rounded-md shadow-md hover:bg-green-800 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
