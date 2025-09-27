import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CompanyDashboard from './pages/CompanyDashboard'
import RegulatoryDashboard from './pages/RegulatoryDashboard'
import PublicDashboard from './pages/PublicDashboard'
import ComplianceMap from './pages/ComplianceMap'
import Navigation from './components/Navigation'
export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route
              path="/regulatory-dashboard"
              element={<RegulatoryDashboard />}
            />
            <Route path="/public-dashboard" element={<PublicDashboard />} />
            <Route path="/compliance-map" element={<ComplianceMap />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
