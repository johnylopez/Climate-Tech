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
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { InfoIcon } from 'lucide-react'
const industryData = [
  {
    name: 'Oil & Gas',
    emissions: 4500,
  },
  {
    name: 'Chemical',
    emissions: 3800,
  },
  {
    name: 'Manufacturing',
    emissions: 2500,
  },
  {
    name: 'Energy',
    emissions: 3200,
  },
  {
    name: 'Transportation',
    emissions: 1800,
  },
]
const regionData = [
  {
    name: 'Southeast',
    value: 35,
  },
  {
    name: 'Southwest',
    value: 25,
  },
  {
    name: 'Northeast',
    value: 15,
  },
  {
    name: 'Northwest',
    value: 10,
  },
  {
    name: 'Central',
    value: 15,
  },
]
const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6']
const PublicDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Public CO₂ Emissions Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Transparent data on Louisiana's carbon emissions and industry
          performance.
        </p>
      </div>
      {/* Information Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <InfoIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              This dashboard provides public access to Louisiana's industrial
              CO₂ emissions data. All data is updated quarterly.
            </p>
          </div>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm uppercase font-medium">
            Total Annual Emissions
          </p>
          <p className="text-4xl font-bold text-gray-800 mt-2">11.2M</p>
          <p className="text-gray-500">metric tons of CO₂</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm uppercase font-medium">
            Year-Over-Year Change
          </p>
          <p className="text-4xl font-bold text-green-600 mt-2">-8.9%</p>
          <p className="text-gray-500">from previous year</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm uppercase font-medium">
            Reporting Companies
          </p>
          <p className="text-4xl font-bold text-gray-800 mt-2">243</p>
          <p className="text-gray-500">across all industries</p>
        </div>
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Industry Emissions Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Emissions by Industry</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={industryData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit=" kt" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  formatter={(value) => [`${value} kilotons`, 'CO₂ Emissions']}
                />
                <Legend />
                <Bar dataKey="emissions" name="CO₂ Emissions" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Regional Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Regional Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {regionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Top Emitters Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top CO₂ Emitters</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Industry
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Annual Emissions
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  YoY Change
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Compliance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Louisiana Petrochemical Inc.
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Chemical
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  890,450 tons
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  -5.2%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Compliant
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Gulf Coast Energy
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Energy
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  765,320 tons
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  +2.8%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Under Review
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Bayou Oil Refineries
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Oil & Gas
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  712,670 tons
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  -8.3%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Compliant
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
export default PublicDashboard
