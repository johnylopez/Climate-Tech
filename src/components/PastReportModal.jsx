import React, { useState } from 'react'
import { XIcon, SearchIcon, FilterIcon } from 'lucide-react'
const PastReportsModal = ({ reports, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedReport, setSelectedReport] = useState(null)
  // Filter and sort reports
  const filteredReports = reports
    .filter((report) => {
      // Filter by search term
      const matchesSearch =
        report.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.facility.toLowerCase().includes(searchTerm.toLowerCase())
      // Filter by status
      const matchesStatus =
        filterStatus === 'all' || report.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === 'date') {
        const dateA = new Date(a.submissionDate)
        const dateB = new Date(b.submissionDate)
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
      } else if (sortBy === 'emissions') {
        const emissionsA = parseFloat(a.totalEmissions.replace(/,/g, ''))
        const emissionsB = parseFloat(b.totalEmissions.replace(/,/g, ''))
        return sortOrder === 'asc'
          ? emissionsA - emissionsB
          : emissionsB - emissionsA
      } else {
        // Sort by period (Q1, Q2, etc.)
        return sortOrder === 'asc'
          ? a.period.localeCompare(b.period)
          : b.period.localeCompare(a.period)
      }
    })
  const handleViewDetails = (report) => {
    setSelectedReport(report)
  }
  const handleCloseDetails = () => {
    setSelectedReport(null)
  }
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-4 relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={20} />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Past Emissions Reports
        </h2>
        {selectedReport ? (
          // Report details view
          <div>
            <button
              onClick={handleCloseDetails}
              className="mb-4 flex items-center text-green-700 hover:text-green-800"
            >
              ← Back to reports list
            </button>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {selectedReport.period} Report
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="font-medium">{selectedReport.submissionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedReport.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {selectedReport.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Emissions</p>
                  <p className="font-medium">
                    {selectedReport.totalEmissions} tons
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Facility</p>
                  <p className="font-medium">{selectedReport.facility}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="mt-1">
                  {selectedReport.notes || 'No notes provided.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Reports list view
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              {/* Filters */}
              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md appearance-none pr-8"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Compliant">Compliant</option>
                    <option value="Late Submission">Late Submission</option>
                  </select>
                  <FilterIcon
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md appearance-none pr-8"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="period">Sort by Period</option>
                    <option value="emissions">Sort by Emissions</option>
                  </select>
                  <FilterIcon
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <button
                  onClick={toggleSortOrder}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {filteredReports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No reports found matching your search criteria.
                </div>
              ) : (
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
                        Facility
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((report) => (
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.facility}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700">
                          <button
                            onClick={() => handleViewDetails(report)}
                            className="hover:text-green-900 hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default PastReportsModal
