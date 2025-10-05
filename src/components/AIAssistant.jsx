import React, { useEffect, useState } from 'react'
import { MessageSquareIcon, SendIcon, XIcon } from 'lucide-react'

const AIAssistant = ({ userType, companyData, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Initial greeting based on user type
  useEffect(() => {
    const initialMessages = {
      company: `Hello! I'm your CO₂ Emissions Assistant. I can help summarize your reports, provide compliance recommendations, or answer questions about emissions regulations. How can I help you today?`,
      regulatory: `Welcome to the Regulatory AI Assistant. I can help analyze compliance patterns, identify companies requiring attention, or provide insights on emissions data. What information do you need?`,
      public: `Welcome to the Louisiana CO₂ Tracker. I can explain emissions data, provide information about industry compliance, or answer questions about environmental regulations. What would you like to know?`,
    }
    setMessages([
      {
        role: 'assistant',
        content: initialMessages[userType],
      },
    ])
  }, [userType])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input, userType, companyData)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={className}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-700 text-white rounded-full p-4 shadow-lg hover:bg-green-800 transition-all"
          aria-label="Open AI Assistant"
        >
          <MessageSquareIcon size={24} />
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-green-700 text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold">
              {userType === 'company'
                ? 'Company AI Assistant'
                : userType === 'regulatory'
                ? 'Regulatory AI Assistant'
                : 'Public Information Assistant'}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-green-100 text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                rows={1}
              />
              <button
                onClick={handleSend}
                className="bg-green-700 text-white p-2 rounded-r-md hover:bg-green-800"
              >
                <SendIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to generate AI responses
function generateResponse(query, userType, companyData) {
  query = query.toLowerCase()

  if (userType === 'company') {
    if (query.includes('summarize') || query.includes('summary')) {
      if (companyData?.compliance === 'Non-Compliant') {
        return `Based on your recent reports, your facility emitted ${companyData.emissions.toLocaleString()} tons of CO₂, which is ${Math.abs(companyData.yoyChange)}% ${
          companyData.yoyChange < 0 ? 'lower' : 'higher'
        } than last year. Your current status is Non-Compliant. I recommend implementing the following measures to reduce emissions: 1) Conduct an energy audit to identify inefficiencies, 2) Consider upgrading to more efficient equipment, 3) Implement a continuous monitoring system, and 4) Submit a remediation plan to LDEQ within 30 days.`
      } else if (companyData?.compliance === 'Under Review') {
        return `Your facility emitted ${companyData.emissions.toLocaleString()} tons of CO₂, which is ${Math.abs(companyData.yoyChange)}% ${
          companyData.yoyChange < 0 ? 'lower' : 'higher'
        } than last year. Your current status is Under Review. While we wait for the review to complete, I suggest preparing documentation on any unusual operational circumstances and ensuring all monitoring equipment is properly calibrated.`
      } else {
        return `Great news! Your facility emitted ${
          companyData?.emissions?.toLocaleString() || 'an acceptable amount of'
        } tons of CO₂, which is compliant with regulations. Your year-over-year change is ${
          companyData?.yoyChange || 'trending positively'
        }%. To maintain compliance, continue your current practices and consider implementing additional efficiency measures for further reductions.`
      }
    }

    if (
      query.includes('recommendation') ||
      query.includes('improve') ||
      query.includes('reduce')
    ) {
      return `Here are some recommendations to reduce your CO₂ emissions:\n\n1. Implement energy efficiency measures across your operations\n2. Consider renewable energy sources where feasible\n3. Upgrade to more efficient equipment during your next replacement cycle\n4. Optimize your production schedule to minimize energy-intensive operations during peak demand\n5. Train staff on energy conservation practices\n6. Implement a continuous monitoring system to identify inefficiencies in real-time`
    }

    if (
      query.includes('deadline') ||
      query.includes('report') ||
      query.includes('submit')
    ) {
      return `Your next quarterly report is due by the 15th of the month following the end of the quarter. Make sure to include all required data points and have your report verified by a certified environmental engineer before submission. Late submissions may result in compliance issues.`
    }
  }

  if (userType === 'regulatory') {
    if (query.includes('compliance') || query.includes('status')) {
      return `Current overall compliance rate is 78%. There are 12 companies under review and 10 non-compliant companies requiring immediate attention. The most common compliance issues this quarter are: 1) Late submissions (42%), 2) Exceeding emissions thresholds (35%), and 3) Incomplete monitoring data (23%).`
    }
    if (query.includes('trend') || query.includes('pattern')) {
      return `Emissions have decreased by 8.9% year-over-year across all industries. The Chemical sector shows the most significant reduction (12.3%), while the Energy sector shows a slight increase (2.1%). Geographic analysis indicates that companies in the Southeast region have achieved the highest reduction rates.`
    }
    if (query.includes('recommend') || query.includes('action')) {
      return `Based on current data, I recommend:\n\n1. Issuing compliance notices to the 10 non-compliant companies\n2. Scheduling on-site inspections for the 3 facilities with the highest exceedance rates\n3. Organizing a technical assistance workshop for the Energy sector to address their increasing emissions trend\n4. Reviewing permit conditions for chemical manufacturers to align with their demonstrated reduction capabilities`
    }
  }

  if (userType === 'public') {
    if (query.includes('explain') || query.includes('what is')) {
      return `CO₂ emissions are measured in tons and represent the amount of carbon dioxide released into the atmosphere by industrial activities. Louisiana tracks these emissions to monitor environmental impact and ensure companies comply with regulations designed to limit greenhouse gas emissions. The current average for the state is 11.2 million tons annually, which has decreased by 8.9% compared to last year.`
    }
    if (query.includes('industry') || query.includes('sector')) {
      return `In Louisiana, the Oil & Gas industry is the largest emitter (4,500 kilotons), followed by Chemical (3,800 kilotons), Energy (3,200 kilotons), Manufacturing (2,500 kilotons), and Transportation (1,800 kilotons). The Chemical industry has made the most progress in reducing emissions over the past year.`
    }
    if (
      query.includes('regulation') ||
      query.includes('policy') ||
      query.includes('law')
    ) {
      return `Louisiana's emissions are regulated primarily through the Louisiana Department of Environmental Quality (LDEQ) under the Louisiana Environmental Quality Act. Different industries have specific thresholds and requirements. For example, Energy companies must stay under 110 tons CO₂ per year, while Chemical manufacturers have a 75 ton threshold. Companies report quarterly and must implement continuous monitoring systems.`
    }
  }

  if (query.includes('hello') || query.includes('hi ')) {
    return `Hello! How can I assist you today with CO₂ emissions information?`
  }

  if (query.includes('thank')) {
    return `You're welcome! If you have any other questions about emissions data or compliance, feel free to ask.`
  }

  return `I'm here to help with questions about CO₂ emissions, compliance, and regulations. Could you please provide more details about what specific information you're looking for?`
}

export default AIAssistant
