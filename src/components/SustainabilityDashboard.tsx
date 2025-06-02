'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Leaf, 
  TreePine, 
  Zap, 
  Droplets,
  Wind,
  Award,
  TrendingDown,
  Target,
  Globe
} from 'lucide-react'

export default function SustainabilityDashboard() {
  const [carbonData, setCarbonData] = useState({
    totalOffset: 2847,
    treesPlanted: 142,
    greenFlights: 89,
    carbonReduction: 34.5
  })

  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setCarbonData(prev => ({
        totalOffset: prev.totalOffset + Math.floor(Math.random() * 10),
        treesPlanted: prev.treesPlanted + (Math.random() > 0.7 ? 1 : 0),
        greenFlights: prev.greenFlights + (Math.random() > 0.8 ? 1 : 0),
        carbonReduction: prev.carbonReduction + (Math.random() - 0.5) * 0.1
      }))
      setTimeout(() => setIsAnimating(false), 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sustainabilityMetrics = [
    {
      icon: TreePine,
      label: 'CO₂ Offset',
      value: `${carbonData.totalOffset.toLocaleString()}`,
      unit: 'kg',
      color: 'eco',
      trend: '+12%'
    },
    {
      icon: Leaf,
      label: 'Trees Planted',
      value: carbonData.treesPlanted.toString(),
      unit: 'trees',
      color: 'eco',
      trend: '+8%'
    },
    {
      icon: Zap,
      label: 'Green Flights',
      value: carbonData.greenFlights.toString(),
      unit: 'bookings',
      color: 'primary',
      trend: '+23%'
    },
    {
      icon: TrendingDown,
      label: 'Reduction',
      value: carbonData.carbonReduction.toFixed(1),
      unit: '%',
      color: 'quantum',
      trend: 'target'
    }
  ]

  const ecoAirlines = [
    { name: 'EcoAir', score: 94, badge: 'Carbon Neutral' },
    { name: 'GreenWings', score: 91, badge: 'SAF Pioneer' },
    { name: 'SustainableSky', score: 88, badge: 'Electric Fleet' },
    { name: 'CleanJet', score: 85, badge: 'Offset Leader' }
  ]

  return (
    <motion.div 
      className="futuristic-card p-6 rounded-2xl h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-eco-500 to-primary-500 rounded-xl flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Sustainability Hub</h3>
            <p className="text-sm text-neural-400">Global impact tracking</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-eco-400 rounded-full animate-pulse" />
          <span className="text-xs text-eco-400 font-medium">REAL-TIME</span>
        </div>
      </div>

      {/* Sustainability Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {sustainabilityMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className={`bg-${metric.color}-500/10 border border-${metric.color}-500/20 rounded-xl p-4 ${
              isAnimating ? 'animate-quantum-glow' : ''
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`h-5 w-5 text-${metric.color}-400`} />
              {metric.trend !== 'target' && (
                <span className="text-xs text-eco-400 font-medium">{metric.trend}</span>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-white">{metric.value}</span>
                <span className="text-sm text-neural-400">{metric.unit}</span>
              </div>
              <p className="text-xs text-neural-400">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Carbon Offset Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white">2030 Carbon Goals</h4>
          <span className="text-xs text-eco-400">67% Complete</span>
        </div>
        <div className="relative">
          <div className="h-3 bg-neural-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-eco-500 to-primary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '67%' }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
          <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
            <span className="text-xs font-medium text-white">Net Zero by 2030</span>
          </div>
        </div>
      </div>

      {/* Top Eco Airlines */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
          <Award className="h-4 w-4 text-eco-400 mr-2" />
          Top Eco Airlines
        </h4>
        <div className="space-y-3">
          {ecoAirlines.map((airline, index) => (
            <motion.div
              key={airline.name}
              className="flex items-center justify-between p-3 bg-neural-800/30 rounded-lg border border-neural-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-eco-500/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-eco-400">
                    {airline.name.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{airline.name}</p>
                  <p className="text-xs text-eco-400">{airline.badge}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-eco-400">{airline.score}</p>
                <p className="text-xs text-neural-400">score</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <motion.button
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-eco-500/10 border border-eco-500/20 rounded-xl text-eco-300 hover:bg-eco-500/20 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <TreePine className="h-4 w-4" />
          <span className="text-sm font-medium">Plant Trees</span>
        </motion.button>
        
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            className="flex items-center justify-center space-x-2 px-3 py-2 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-300 hover:bg-primary-500/20 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <Target className="h-3 w-3" />
            <span className="text-xs">Goals</span>
          </motion.button>
          
          <motion.button
            className="flex items-center justify-center space-x-2 px-3 py-2 bg-quantum-500/10 border border-quantum-500/20 rounded-lg text-quantum-300 hover:bg-quantum-500/20 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <Wind className="h-3 w-3" />
            <span className="text-xs">Offset</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
