import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { InfoIcon } from 'lucide-react'
import appData from '../data/appData.json'
import AIAssistant from '../components/AIAssistant.jsx'
// Fix for default marker icons in react-leaflet
// @ts-ignore
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})
// Custom marker icons based on compliance status
const createMarkerIcon = (status) => {
  let color = '#10B981' // Green for Compliant
  if (status === 'Under Review') {
    color = '#F59E0B' // Yellow for Under Review
  } else if (status === 'Non-Compliant') {
    color = '#EF4444' // Red for Non-Compliant
  }
  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${status === 'Compliant' ? 'green' : status === 'Under Review' ? 'gold' : 'red'}.png`,
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
}
const ComplianceMap = () => {
  const [selectedCompany, setSelectedCompany] = useState(null)
  const { companies, louisianaGeoJSON } = appData
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Compliance Map</h1>
        <p className="text-gray-600 mt-2">
          Interactive map of Louisiana showing company locations and compliance
          status.
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
              Click on any marker to view detailed information about the
              company's emissions and compliance status.
            </p>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Compliance Status Legend
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Compliant</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm text-gray-600">Under Review</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-600">Non-Compliant</span>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="h-[600px] w-full rounded-md overflow-hidden">
          <MapContainer
            center={[31.1801, -91.8749]}
            zoom={7}
            scrollWheelZoom={true}
            style={{
              height: '100%',
              width: '100%',
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Louisiana state outline */}
            <GeoJSON
              data={louisianaGeoJSON}
              style={{
                fillColor: '#e5e7eb',
                weight: 2,
                opacity: 1,
                color: '#6b7280',
                fillOpacity: 0.1,
              }}
            />
            {/* Company markers */}
            {companies.map((company) => (
              <Marker
                key={company.id}
                position={company.position}
                icon={createMarkerIcon(company.compliance)}
                eventHandlers={{
                  click: () => {
                    setSelectedCompany(company)
                  },
                }}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-base mb-1">{company.name}</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <div className="text-gray-600">Industry:</div>
                      <div className="font-medium">{company.industry}</div>
                      <div className="text-gray-600">Emissions:</div>
                      <div className="font-medium">
                        {company.emissions.toLocaleString()} tons
                      </div>
                      <div className="text-gray-600">YoY Change:</div>
                      <div
                        className={`font-medium ${company.yoyChange < 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {company.yoyChange > 0 ? '+' : ''}
                        {company.yoyChange}%
                      </div>
                      <div className="text-gray-600">Status:</div>
                      <div>
                        <span
                          className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${company.compliance === 'Compliant' ? 'bg-green-100 text-green-800' : company.compliance === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {company.compliance}
                        </span>
                      </div>
                      <div className="text-gray-600">Facility:</div>
                      <div className="font-medium">{company.facility}</div>
                      <div className="text-gray-600">Last Report:</div>
                      <div className="font-medium">{company.lastReport}</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      {/* Selected Company Details - for mobile or more detailed view */}
      {selectedCompany && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">{selectedCompany.name}</h2>
            <span
              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${selectedCompany.compliance === 'Compliant' ? 'bg-green-100 text-green-800' : selectedCompany.compliance === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
            >
              {selectedCompany.compliance}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Industry
              </h3>
              <p className="text-base">{selectedCompany.industry}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Facility
              </h3>
              <p className="text-base">{selectedCompany.facility}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Annual CO₂ Emissions
              </h3>
              <p className="text-base">
                {selectedCompany.emissions.toLocaleString()} tons
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Year-Over-Year Change
              </h3>
              <p
                className={`text-base ${selectedCompany.yoyChange < 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {selectedCompany.yoyChange > 0 ? '+' : ''}
                {selectedCompany.yoyChange}%
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Last Report Submitted
              </h3>
              <p className="text-base">{selectedCompany.lastReport}</p>
            </div>
          </div>
        </div>
      )}
      {/* AI Assistant for Public Users */}
      <AIAssistant userType="public" />
    </div>
  )
}
export default ComplianceMap
