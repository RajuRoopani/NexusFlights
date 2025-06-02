'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Plane,
  Zap
} from 'lucide-react'
import { AIInsight } from '@/types'

export default function AIInsightPanel() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI insights loading
    setTimeout(() => {
      setInsights([
        {
          type: 'price_alert',
          title: 'Price Drop Alert',
          description: 'NYC → London flights are 23% cheaper than last week. Book now for $150 savings.',
          confidence: 0.92,
          action_required: true,
          estimated_savings: 150,
          impact_score: 8
        },
        {
          type: 'sustainability_tip',
          title: 'Eco-Friendly Alternative',
          description: 'Choose KLM\'s SAF-powered flights for 40% lower carbon emissions.',
          confidence: 0.87,
          action_required: false,
          impact_score: 9
        },
        {
          type: 'travel_advice',
          title: 'Optimal Travel Time',
          description: 'Departing 2 hours later reduces delays by 65% based on weather patterns.',
          confidence: 0.78,
          action_required: false,
          impact_score: 6
        },
        {
          type: 'disruption_warning',
          title: 'Weather Advisory',
          description: 'Storm system may affect flights on Dec 15-16. Consider flexible dates.',
          confidence: 0.84,
          action_required: true,
          impact_score: 7
        }
      ])
      setIsLoading(false)
    }, 2000)
  }, [])

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'price_alert':
        return <DollarSign className="h-5 w-5" />
      case 'sustainability_tip':
        return <CheckCircle className="h-5 w-5" />
      case 'travel_advice':
        return <Clock className="h-5 w-5" />
      case 'disruption_warning':
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Brain className="h-5 w-5" />
    }
  }

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'price_alert':
        return 'primary'
      case 'sustainability_tip':
        return 'eco'
      case 'travel_advice':
        return 'quantum'
      case 'disruption_warning':
        return 'orange'
      default:
        return 'neural'
    }
  }

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
          <div className="w-10 h-10 bg-gradient-to-br from-quantum-500 to-primary-500 rounded-xl flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">AI Insights</h3>
            <p className="text-sm text-neural-400">Real-time intelligence</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-eco-400 rounded-full animate-pulse" />
          <span className="text-xs text-eco-400 font-medium">LIVE</span>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="ai-thinking bg-neural-800/30 rounded-xl p-4 border border-neural-700"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-neural-700 rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neural-700 rounded animate-pulse" />
                    <div className="h-3 bg-neural-700 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          insights.map((insight, index) => (
            <motion.div
              key={index}
              className="bg-neural-800/30 rounded-xl p-4 border border-neural-700 hover:border-primary-500/30 transition-all duration-300 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 bg-${getInsightColor(insight.type)}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-${getInsightColor(insight.type)}-400`}>
                    {getInsightIcon(insight.type)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-white group-hover:text-primary-300 transition-colors">
                      {insight.title}
                    </h4>
                    {insight.action_required && (
                      <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">
                        Action
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neural-300 mb-3 leading-relaxed">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Zap className="h-3 w-3 text-quantum-400" />
                        <span className="text-xs text-neural-400">
                          {Math.round(insight.confidence * 100)}% confident
                        </span>
                      </div>
                      {insight.estimated_savings && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3 text-eco-400" />
                          <span className="text-xs text-eco-400 font-medium">
                            ${insight.estimated_savings} savings
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-3 rounded-full ${
                              i < insight.impact_score / 2 
                                ? 'bg-primary-400' 
                                : 'bg-neural-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-neural-400 ml-1">impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-neural-700">
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-500/10 border border-primary-500/20 rounded-xl text-primary-300 hover:bg-primary-500/20 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plane className="h-4 w-4" />
            <span className="text-sm font-medium">Track Prices</span>
          </motion.button>
          <motion.button
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-quantum-500/10 border border-quantum-500/20 rounded-xl text-quantum-300 hover:bg-quantum-500/20 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">AI Alerts</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
