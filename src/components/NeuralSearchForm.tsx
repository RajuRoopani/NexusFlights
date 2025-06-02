'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Mic, 
  Search, 
  Sparkles,
  ArrowRightLeft,
  Settings,
  Leaf
} from 'lucide-react'
import { SearchCriteria } from '@/types'

interface NeuralSearchFormProps {
  onSearch: (criteria: SearchCriteria) => void
  initialCriteria?: Partial<SearchCriteria>
}

export default function NeuralSearchForm({ onSearch, initialCriteria }: NeuralSearchFormProps) {
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [searchCriteria, setSearchCriteria] = useState<Partial<SearchCriteria>>({
    origin: initialCriteria?.origin || '',
    destination: initialCriteria?.destination || '',
    departure_date: initialCriteria?.departure_date || '',
    return_date: initialCriteria?.return_date || '',
    passengers: initialCriteria?.passengers || { adults: 1, children: 0, infants: 0 },
    cabin_class: initialCriteria?.cabin_class || ['economy'],
    sustainability_priority: initialCriteria?.sustainability_priority || 'moderate'
  })

  const handleVoiceSearch = () => {
    setIsVoiceActive(!isVoiceActive)
    // Simulate voice recognition
    setTimeout(() => {
      setIsVoiceActive(false)
      setSearchCriteria({
        ...searchCriteria,
        origin: 'JFK',
        destination: 'LHR'
      })
    }, 3000)
  }

  const handleSearch = () => {
    if (searchCriteria.origin && searchCriteria.destination && searchCriteria.departure_date) {
      onSearch(searchCriteria as SearchCriteria)
    }
  }

  const swapCities = () => {
    setSearchCriteria({
      ...searchCriteria,
      origin: searchCriteria.destination,
      destination: searchCriteria.origin
    })
  }

  return (
    <motion.div 
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Neural Header */}
      <div className="text-center mb-8">
        <motion.div 
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-quantum-500/20 to-primary-500/20 rounded-full border border-quantum-400/30 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="h-5 w-5 text-quantum-400 animate-neural-wave" />
          <span className="text-quantum-300 font-medium">Neural Search Interface</span>
        </motion.div>
        <h3 className="text-2xl font-semibold text-white mb-2">
          Where would you like to explore?
        </h3>
        <p className="text-neural-300">
          Use natural language or voice commands for intelligent flight discovery
        </p>
      </div>

      {/* Main Search Form */}
      <div className="glass-morphism rounded-3xl p-8 border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Origin & Destination */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-neural-300 mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-neural-400" />
                <input
                  type="text"
                  value={searchCriteria.origin}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, origin: e.target.value })}
                  placeholder="New York (JFK)"
                  className="w-full pl-12 pr-4 py-4 bg-neural-800/50 border border-neural-600 rounded-2xl text-white placeholder-neural-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={swapCities}
                className="p-3 bg-neural-700/50 rounded-full hover:bg-primary-500/20 transition-all duration-200"
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRightLeft className="h-5 w-5 text-neural-300" />
              </motion.button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-neural-300 mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-neural-400" />
                <input
                  type="text"
                  value={searchCriteria.destination}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, destination: e.target.value })}
                  placeholder="London (LHR)"
                  className="w-full pl-12 pr-4 py-4 bg-neural-800/50 border border-neural-600 rounded-2xl text-white placeholder-neural-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-neural-300 mb-2">
                Departure
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-4 h-5 w-5 text-neural-400" />
                <input
                  type="date"
                  value={searchCriteria.departure_date}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, departure_date: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-neural-800/50 border border-neural-600 rounded-2xl text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-neural-300 mb-2">
                Return (Optional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-4 h-5 w-5 text-neural-400" />
                <input
                  type="date"
                  value={searchCriteria.return_date}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, return_date: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-neural-800/50 border border-neural-600 rounded-2xl text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Passengers & Options */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-neural-300 mb-2">
                Passengers
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-4 h-5 w-5 text-neural-400" />
                <select
                  value={searchCriteria.passengers?.adults || 1}
                  onChange={(e) => setSearchCriteria({
                    ...searchCriteria,
                    passengers: {
                      ...searchCriteria.passengers!,
                      adults: parseInt(e.target.value)
                    }
                  })}
                  className="w-full pl-12 pr-4 py-4 bg-neural-800/50 border border-neural-600 rounded-2xl text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-neural-300 mb-2">
                Sustainability
              </label>
              <div className="relative">
                <Leaf className="absolute left-4 top-4 h-5 w-5 text-eco-400" />
                <select
                  value={searchCriteria.sustainability_priority}
                  onChange={(e) => setSearchCriteria({
                    ...searchCriteria,
                    sustainability_priority: e.target.value as any
                  })}
                  className="w-full pl-12 pr-4 py-4 bg-neural-800/50 border border-neural-600 rounded-2xl text-white focus:border-eco-400 focus:ring-2 focus:ring-eco-400/20 transition-all duration-200"
                >
                  <option value="none">Standard</option>
                  <option value="moderate">Eco-Conscious</option>
                  <option value="high">Green Priority</option>
                  <option value="maximum">Carbon Neutral Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <motion.button
            onClick={handleVoiceSearch}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
              isVoiceActive 
                ? 'bg-quantum-500 text-white animate-pulse' 
                : 'bg-neural-700/50 text-neural-300 hover:bg-quantum-500/20 hover:text-quantum-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className={`h-5 w-5 ${isVoiceActive ? 'animate-bounce' : ''}`} />
            <span>{isVoiceActive ? 'Listening...' : 'Voice Search'}</span>
          </motion.button>

          <div className="flex items-center space-x-4">
            <motion.button
              className="p-3 bg-neural-700/50 rounded-2xl hover:bg-neural-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <Settings className="h-5 w-5 text-neural-300" />
            </motion.button>

            <motion.button
              onClick={handleSearch}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-quantum-500 rounded-2xl text-white font-semibold hover:from-primary-400 hover:to-quantum-400 transition-all duration-300 shadow-lg hover:shadow-primary-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="h-5 w-5" />
              <span>Neural Search</span>
              <Sparkles className="h-4 w-4 animate-neural-wave" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <motion.div 
        className="mt-6 flex flex-wrap gap-3 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          'NYC to Tokyo next week',
          'Sustainable flight to Paris',
          'Business class to Dubai',
          'Cheapest to Bangkok'
        ].map((suggestion, index) => (
          <motion.button
            key={suggestion}
            className="px-4 py-2 bg-neural-800/30 border border-neural-600/50 rounded-full text-sm text-neural-300 hover:border-primary-400/50 hover:text-primary-300 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}
