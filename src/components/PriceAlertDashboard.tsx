'use client'

import { useState, useEffect } from 'react'
import { Bell, BellOff, TrendingDown, TrendingUp, AlertTriangle, X, Plus } from 'lucide-react'

interface PriceAlert {
  id: string
  route: string
  current_price: number
  target_price: number
  created_at: string
  status: 'active' | 'triggered' | 'expired'
  criteria: {
    origin: string
    destination: string
    departure_date: string
    cabin_class: string[]
  }
}

interface PriceAlertDashboardProps {
  userId: string
  className?: string
}

export default function PriceAlertDashboard({ userId, className = '' }: PriceAlertDashboardProps) {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newAlert, setNewAlert] = useState({
    route: '',
    target_price: '',
    criteria: {
      origin: '',
      destination: '',
      departure_date: '',
      cabin_class: ['economy']
    }
  })

  useEffect(() => {
    fetchAlerts()
  }, [userId])

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/alerts?userId=${userId}`)
      const data = await response.json()
      setAlerts(data.alerts || [])
    } catch (error) {
      console.error('Failed to fetch alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createAlert = async () => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          target_price: parseFloat(newAlert.target_price),
          criteria: newAlert.criteria
        })
      })

      if (response.ok) {
        await fetchAlerts()
        setShowCreateForm(false)
        setNewAlert({
          route: '',
          target_price: '',
          criteria: {
            origin: '',
            destination: '',
            departure_date: '',
            cabin_class: ['economy']
          }
        })
      }
    } catch (error) {
      console.error('Failed to create alert:', error)
    }
  }

  const deleteAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts?alertId=${alertId}&userId=${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setAlerts(alerts.filter(alert => alert.id !== alertId))
      }
    } catch (error) {
      console.error('Failed to delete alert:', error)
    }
  }

  const getPriceChangeIcon = (current: number, target: number) => {
    if (current <= target) {
      return <TrendingDown className="w-4 h-4 text-green-500" />
    }
    return <TrendingUp className="w-4 h-4 text-red-500" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'triggered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Price Alerts
          </h2>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
            {alerts.filter(a => a.status === 'active').length} Active
          </span>
        </div>

        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Alert</span>
        </button>
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Create Price Alert
              </h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Origin (e.g., JFK)"
                  value={newAlert.criteria.origin}
                  onChange={(e) => setNewAlert({
                    ...newAlert,
                    criteria: { ...newAlert.criteria, origin: e.target.value }
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Destination (e.g., LAX)"
                  value={newAlert.criteria.destination}
                  onChange={(e) => setNewAlert({
                    ...newAlert,
                    criteria: { ...newAlert.criteria, destination: e.target.value }
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <input
                type="date"
                value={newAlert.criteria.departure_date}
                onChange={(e) => setNewAlert({
                  ...newAlert,
                  criteria: { ...newAlert.criteria, departure_date: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <input
                type="number"
                placeholder="Target Price ($)"
                value={newAlert.target_price}
                onChange={(e) => setNewAlert({ ...newAlert, target_price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={createAlert}
                  disabled={!newAlert.criteria.origin || !newAlert.criteria.destination || !newAlert.target_price}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <BellOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Price Alerts Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first price alert to get notified when flight prices drop
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Create Your First Alert
            </button>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {alert.route}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      {getPriceChangeIcon(alert.current_price, alert.target_price)}
                      <span>Current: ${alert.current_price}</span>
                    </div>
                    <div>Target: ${alert.target_price}</div>
                    <div>{new Date(alert.criteria.departure_date).toLocaleDateString()}</div>
                  </div>

                  {alert.current_price <= alert.target_price && (
                    <div className="mt-2 flex items-center space-x-2 text-green-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Price target reached!</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
