import React, { useState } from 'react'
import { XIcon } from 'lucide-react'
const NewEmissionsReportForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    period: '',
    facility: '',
    totalEmissions: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }
  const validateForm = () => {
    const newErrors = {}
    if (!formData.period) {
      newErrors.period = 'Reporting period is required'
    }
    if (!formData.facility) {
      newErrors.facility = 'Facility is required'
    }
    if (!formData.totalEmissions) {
      newErrors.totalEmissions = 'Total emissions value is required'
    } else if (isNaN(formData.totalEmissions.replace(/,/g, ''))) {
      newErrors.totalEmissions = 'Emissions must be a number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const today = new Date()
      const formattedDate = `${today.toLocaleString('default', {
        month: 'long',
      })} ${today.getDate()}, ${today.getFullYear()}`
      const newReport = {
        id: Date.now().toString(),
        period: formData.period,
        submissionDate: formattedDate,
        totalEmissions: formData.totalEmissions,
        facility: formData.facility,
        notes: formData.notes,
        status: 'Compliant', // Default status for new submissions
      }
      onSubmit(newReport)
    }
  }
  return (
    <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={20} />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          New Emissions Report
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="period"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reporting Period*
              </label>
              <select
                id="period"
                name="period"
                value={formData.period}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.period ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Period</option>
                <option value="Q1 2023">Q1 2023</option>
                <option value="Q2 2023">Q2 2023</option>
                <option value="Q3 2023">Q3 2023</option>
                <option value="Q4 2023">Q4 2023</option>
              </select>
              {errors.period && (
                <p className="text-red-500 text-xs mt-1">{errors.period}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="facility"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Facility/Location*
              </label>
              <input
                type="text"
                id="facility"
                name="facility"
                value={formData.facility}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.facility ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g. Main Plant"
              />
              {errors.facility && (
                <p className="text-red-500 text-xs mt-1">{errors.facility}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="totalEmissions"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Total Emissions (tons)*
              </label>
              <input
                type="text"
                id="totalEmissions"
                name="totalEmissions"
                value={formData.totalEmissions}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.totalEmissions ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g. 12,450"
              />
              {errors.totalEmissions && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.totalEmissions}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes/Comments
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Add any additional information about this report..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default NewEmissionsReportForm
