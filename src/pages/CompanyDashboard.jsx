import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { PlusIcon, AlertCircleIcon, ClockIcon, XIcon } from 'lucide-react'
import NewEmissionsReportForm from '../components/NewEmissionReportForm'
import PastReportsModal from '../components/PastReportModal'
const mockData = [
  {
    month: 'Jan',
    emissions: 4000,
  },
  {
    month: 'Feb',
    emissions: 3000,
  },
  {
    month: 'Mar',
    emissions: 2000,
  },
  {
    month: 'Apr',
    emissions: 2780,
  },
  {
    month: 'May',
    emissions: 1890,
  },
  {
    month: 'Jun',
    emissions: 2390,
  },
]
const initialReports = [
  {
    id: '1',
    period: 'Q1 2023',
    submissionDate: 'April 15, 2023',
    totalEmissions: '12,450',
    status: 'Compliant',
    facility: 'Main Plant',
    notes: 'All emissions within acceptable range.',
  },
  {
    id: '2',
    period: 'Q4 2022',
    submissionDate: 'January 15, 2023',
    totalEmissions: '14,320',
    status: 'Compliant',
    facility: 'Main Plant',
    notes: 'Minor increase due to holiday production.',
  },
  {
    id: '3',
    period: 'Q3 2022',
    submissionDate: 'October 15, 2022',
    totalEmissions: '15,670',
    status: 'Late Submission',
    facility: 'Main Plant',
    notes: 'Delay due to equipment calibration issues.',
  },
]
const CompanyDashboard = () => {
  const [showNewReportForm, setShowNewReportForm] = useState(false)
  const [showPastReports, setShowPastReports] = useState(false)
  const [reports, setReports] = useState(initialReports)
  const handleNewReportSubmit = (newReport) => {
    setReports([newReport, ...reports])
    setShowNewReportForm(false)
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your emissions data, track compliance, and view reporting
          history.
        </p>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          className="flex items-center justify-center gap-2 p-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          onClick={() => setShowNewReportForm(true)}
        >
          <PlusIcon size={20} />
          <span>New Emissions Report</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          onClick={() => setShowPastReports(true)}
        >
          <ClockIcon size={20} />
          <span>View Past Reports</span>
        </button>
        {/* <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
          <AlertCircleIcon size={20} />
          <span>Compliance Status</span>
        </button> */}
      </div>
      {/* Compliance Alerts */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Upcoming Deadline:</span> Q2
              Emissions Report due in 15 days
            </p>
          </div>
        </div>
      </div>
      {/* Emissions Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Monthly CO₂ Emissions (2023)
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis unit=" tons" />
              <Tooltip
                formatter={(value) => [`${value} tons`, 'CO₂ Emissions']}
              />
              <Legend />
              <Bar dataKey="emissions" name="CO₂ Emissions" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Reports */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Report Period
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Submission Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Emissions
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.slice(0, 3).map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.submissionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.totalEmissions} tons
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* New Emissions Report Modal */}
      {showNewReportForm && (
        <NewEmissionsReportForm
          onClose={() => setShowNewReportForm(false)}
          onSubmit={handleNewReportSubmit}
        />
      )}
      {/* Past Reports Modal */}
      {showPastReports && (
        <PastReportsModal
          reports={reports}
          onClose={() => setShowPastReports(false)}
        />
      )}
    </div>
  )
}
export default CompanyDashboard
