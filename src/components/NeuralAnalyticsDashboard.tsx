'use client'

import { useState, useEffect } from 'react'
import { BarChart, TrendingUp, Brain, Target, Zap, Globe } from 'lucide-react'

interface AnalyticsData {
  price_trends: {
    direction: string
    change_percentage: number
    confidence: number
    next_30_days: Array<{
      date: string
      avg_price: number
      confidence: number
    }>
  }
  demand_analysis: {
    current_demand: string
    peak_seasons: string[]
    off_peak_discount: number
    booking_velocity: {
      trend: string
      rate_change: string
    }
  }
  sustainability_metrics: {
    avg_carbon_footprint: number
    eco_options_percentage: number
    trending_green_airlines: string[]
    carbon_offset_adoption: number
  }
  neural_insights: {
    optimal_booking_window: {
      days_in_advance: number
      confidence: number
      reasoning: string
    }
    price_sensitivity_score: number
    user_behavior_patterns: string[]
  }
}

interface NeuralAnalyticsDashboardProps {
  route?: string
  className?: string
}

export default function NeuralAnalyticsDashboard({ route, className = '' }: NeuralAnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')

  useEffect(() => {
    fetchAnalytics()
  }, [route, selectedTimeframe])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        timeframe: selectedTimeframe,
        ...(route && { route })
      })
      
      const response = await fetch(`/api/analytics/trends?${params}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'falling': return 'text-green-600'
      case 'rising': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900'
    }
  }

  if (loading) {
    return (
      <div className={`animate-pulse space-y-6 ${className}`}>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Failed to load analytics data</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Brain className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Neural Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {route || 'Global Market'} • AI-powered insights
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                selectedTimeframe === timeframe
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Price Trends
              </h3>
            </div>
            <span className={`text-2xl font-bold ${getTrendColor(analytics.price_trends.direction)}`}>
              {analytics.price_trends.change_percentage > 0 ? '+' : ''}
              {analytics.price_trends.change_percentage}%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Direction:</span>
              <span className={`font-medium capitalize ${getTrendColor(analytics.price_trends.direction)}`}>
                {analytics.price_trends.direction}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.round(analytics.price_trends.confidence * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Demand Analysis */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Market Demand
              </h3>
            </div>
            <span className={`px-2 py-1 text-sm font-medium rounded-full capitalize ${getDemandColor(analytics.demand_analysis.current_demand)}`}>
              {analytics.demand_analysis.current_demand}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Booking Velocity:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {analytics.demand_analysis.booking_velocity.rate_change}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Off-peak Discount:</span>
              <span className="font-medium text-green-600">
                {analytics.demand_analysis.off_peak_discount}%
              </span>
            </div>
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sustainability
              </h3>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {analytics.sustainability_metrics.eco_options_percentage}%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Avg CO₂:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {analytics.sustainability_metrics.avg_carbon_footprint}kg
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Offset Adoption:</span>
              <span className="font-medium text-green-600">
                {analytics.sustainability_metrics.carbon_offset_adoption}%
              </span>
            </div>
          </div>
        </div>

        {/* Neural Insights */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-3">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Neural Intelligence Insights
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Optimal Booking Window
              </h4>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {analytics.neural_insights.optimal_booking_window.days_in_advance} days
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.round(analytics.neural_insights.optimal_booking_window.confidence * 100)}% confidence
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {analytics.neural_insights.optimal_booking_window.reasoning}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Behavioral Patterns
              </h4>
              <div className="space-y-2">
                {analytics.neural_insights.user_behavior_patterns.map((pattern, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{pattern}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Prediction Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          30-Day Price Predictions
        </h3>
        <div className="relative h-48 flex items-end space-x-2">
          {analytics.price_trends.next_30_days.map((prediction, index) => {
            const maxPrice = Math.max(...analytics.price_trends.next_30_days.map(p => p.avg_price))
            const height = (prediction.avg_price / maxPrice) * 100
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-sm transition-all duration-300 hover:opacity-80"
                  style={{ height: `${height}%` }}
                  title={`${new Date(prediction.date).toLocaleDateString()}: $${prediction.avg_price} (${Math.round(prediction.confidence * 100)}% confidence)`}
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                  {new Date(prediction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
