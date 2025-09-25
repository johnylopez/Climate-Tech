import React from 'react'
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
import { Plus, AlertCircle, Clock } from 'lucide-react'

const mockData = [
  { month: 'Jan', emissions: 4000 },
  { month: 'Feb', emissions: 3000 },
  { month: 'Mar', emissions: 2000 },
  { month: 'Apr', emissions: 2780 },
  { month: 'May', emissions: 1890 },
  { month: 'Jun', emissions: 2390 },
]

const CompanyDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your emissions data, track compliance, and view reporting
          history.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button className="flex items-center justify-center gap-2 p-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
          <Plus size={20} />
          <span>New Emissions Report</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
          <Clock size={20} />
          <span>View Past Reports</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
          <AlertCircle size={20} />
          <span>Compliance Status</span>
        </button>
      </div>

      {/* Compliance Alerts */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
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
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                {['Report Period', 'Submission Date', 'Total Emissions', 'Status'].map(
                  (col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Q1 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  April 15, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  12,450 tons
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Compliant
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Q4 2022
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  January 15, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  14,320 tons
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Compliant
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Q3 2022
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  October 15, 2022
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15,670 tons
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Late Submission
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
