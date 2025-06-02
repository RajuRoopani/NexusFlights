'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plane, 
  Clock, 
  MapPin, 
  DollarSign, 
  Leaf, 
  Zap,
  Heart,
  Star,
  TrendingUp,
  TrendingDown,
  Wifi,
  Utensils,
  Luggage
} from 'lucide-react'
import { Flight, FlightCardProps } from '@/types'

export default function FlightCard({ flight, onSelect, onCompare, showPrediction = true, highlightSustainability = false }: FlightCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const getPriceChangeIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-red-400" />
      case 'falling':
        return <TrendingDown className="h-4 w-4 text-green-400" />
      default:
        return <div className="h-4 w-4 bg-yellow-400 rounded-full" />
    }
  }

  const getSustainabilityBadge = () => {
    if (!flight.sustainability_badge) return null
    
    const badges = {
      eco_champion: { color: 'eco', text: 'Eco Champion' },
      carbon_neutral: { color: 'green', text: 'Carbon Neutral' },
      offset_included: { color: 'blue', text: 'Offset Included' }
    }
    
    const badge = badges[flight.sustainability_badge]
    return (
      <div className={`px-2 py-1 bg-${badge.color}-500/20 text-${badge.color}-300 text-xs rounded-full font-medium`}>
        {badge.text}
      </div>
    )
  }

  return (
    <motion.div
      className={`futuristic-card p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
        highlightSustainability && flight.sustainability_badge ? 'ring-2 ring-eco-400/50' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-quantum-500 rounded-xl flex items-center justify-center">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {flight.segments[0].airline.name}
            </h3>
            <p className="text-sm text-neural-400">
              {flight.segments[0].flight_number}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-2xl font-bold text-white">
              ${flight.price.total.toLocaleString()}
            </span>
            {showPrediction && (
              <div className="flex items-center space-x-1">
                {getPriceChangeIcon(flight.price.price_prediction.trend)}
                <span className="text-xs text-neural-400">
                  {flight.price.price_prediction.confidence * 100}%
                </span>
              </div>
            )}
          </div>
          {getSustainabilityBadge()}
        </div>
      </div>

      {/* Route Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-xl font-bold text-white">
              {formatTime(flight.segments[0].departure.time)}
            </p>
            <p className="text-sm text-neural-400">
              {flight.segments[0].departure.airport.code}
            </p>
          </div>
          
          <div className="flex-1 relative">
            <div className="h-px bg-gradient-to-r from-primary-500 to-quantum-500 mx-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-neural-800 px-3 py-1 rounded-full">
                <span className="text-xs text-neural-300">
                  {formatDuration(flight.total_duration)}
                </span>
              </div>
            </div>
            {flight.segments.length > 1 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              </div>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-xl font-bold text-white">
              {formatTime(flight.segments[flight.segments.length - 1].arrival.time)}
            </p>
            <p className="text-sm text-neural-400">
              {flight.segments[flight.segments.length - 1].arrival.airport.code}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Leaf className="h-4 w-4 text-eco-400 mr-1" />
            <span className="text-sm font-medium text-eco-400">
              {flight.carbon_footprint.total_kg}kg
            </span>
          </div>
          <p className="text-xs text-neural-400">CO₂</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-white">
              {(flight.booking_confidence * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-xs text-neural-400">Confidence</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Clock className="h-4 w-4 text-primary-400 mr-1" />
            <span className="text-sm font-medium text-white">
              {flight.delay_prediction.probability * 100}%
            </span>
          </div>
          <p className="text-xs text-neural-400">On-time</p>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-neutral-700 pt-4 mt-4"
          >
            {/* Amenities */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {flight.segments[0].amenities.slice(0, 6).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-neural-700/50 text-xs text-neural-300 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Aircraft Info */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-2">Aircraft</h4>
              <p className="text-sm text-neural-300">
                {flight.segments[0].aircraft.type} - {flight.segments[0].aircraft.model}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Wifi className="h-3 w-3 text-primary-400" />
                  <span className="text-xs text-neural-400 capitalize">
                    {flight.segments[0].wifi_quality} WiFi
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3 text-quantum-400" />
                  <span className="text-xs text-neural-400">
                    {flight.segments[0].aircraft.comfort_rating}/10 Comfort
                  </span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-2">Price Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-neural-400">Base fare</span>
                  <span className="text-white">${flight.price.base}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neural-400">Taxes & fees</span>
                  <span className="text-white">${flight.price.taxes + flight.price.fees}</span>
                </div>
                <div className="flex justify-between font-semibold pt-1 border-t border-neural-700">
                  <span className="text-white">Total</span>
                  <span className="text-primary-400">${flight.price.total}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-4">
        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(flight)
          }}
          className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-quantum-500 rounded-xl text-white font-semibold hover:from-primary-400 hover:to-quantum-400 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Select Flight
        </motion.button>
        
        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            onCompare(flight)
          }}
          className="px-6 py-3 border border-neural-600 rounded-xl text-neural-300 hover:border-primary-400 hover:text-primary-300 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Compare
        </motion.button>
      </div>

      {/* AI Prediction Overlay */}
      <AnimatePresence>
        {isHovered && showPrediction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-4 right-4 bg-neural-900/90 backdrop-blur-sm border border-quantum-400/30 rounded-lg p-3 max-w-xs"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-4 w-4 text-quantum-400" />
              <span className="text-sm font-semibold text-white">AI Prediction</span>
            </div>
            <p className="text-xs text-neural-300 leading-relaxed">
              Price {flight.price.price_prediction.trend} trend detected. 
              {flight.price.price_prediction.trend === 'falling' && ' Consider waiting 2-3 days for better deals.'}
              {flight.price.price_prediction.trend === 'rising' && ' Book soon to avoid price increases.'}
              {flight.price.price_prediction.trend === 'stable' && ' Stable pricing window - good time to book.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
