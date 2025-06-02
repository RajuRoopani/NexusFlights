'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plane, 
  Brain, 
  Leaf, 
  Zap, 
  Globe, 
  Search,
  Sparkles,
  Eye,
  HeadphonesIcon,
  Clock,
  TrendingUp,
  Mic,
  Bell,
  BarChart3
} from 'lucide-react'
import NeuralSearchForm from '@/components/NeuralSearchForm'
import HolographicHero from '@/components/HolographicHero'
import AIInsightPanel from '@/components/AIInsightPanel'
import SustainabilityDashboard from '@/components/SustainabilityDashboard'
import VoiceSearch from '@/components/VoiceSearch'
import PriceAlertDashboard from '@/components/PriceAlertDashboard'
import NeuralAnalyticsDashboard from '@/components/NeuralAnalyticsDashboard'

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [aiStatus, setAiStatus] = useState<'thinking' | 'ready' | 'analyzing'>('ready')
  const [showVoiceSearch, setShowVoiceSearch] = useState(false)
  const [showPriceAlerts, setShowPriceAlerts] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "Neural Flight Intelligence",
      description: "AI that learns your preferences and predicts the perfect flight",
      color: "quantum"
    },
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "Real-time carbon footprint analysis and offset integration",
      color: "eco"
    },
    {
      icon: Eye,
      title: "Holographic Interface",
      description: "3D visualization of routes, airports, and destinations",
      color: "primary"
    },
    {
      icon: Zap,
      title: "Quantum Search",
      description: "Process millions of combinations in microseconds",
      color: "quantum"
    },
    {
      icon: HeadphonesIcon,
      title: "Voice & Biometric",
      description: "Natural language queries and seamless authentication",
      color: "neural"
    },
    {
      icon: TrendingUp,
      title: "Price Prediction",
      description: "30-day price forecasting with 94% accuracy",
      color: "primary"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-950 via-neural-900 to-quantum-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <Plane className="h-8 w-8 text-primary-400 animate-float" />
              <div className="absolute inset-0 bg-primary-400 blur-xl opacity-20 animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold holographic-text">
                FlightVision
              </h1>
              <p className="text-xs text-neural-400 font-mono">2030.ai</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-right">
              <p className="text-sm text-neural-300">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-neural-400 font-mono">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ai-thinking ${
              aiStatus === 'ready' ? 'bg-eco-500/20 text-eco-300' :
              aiStatus === 'thinking' ? 'bg-quantum-500/20 text-quantum-300' :
              'bg-primary-500/20 text-primary-300'
            }`}>
              <Sparkles className="inline h-3 w-3 mr-1" />
              AI {aiStatus.toUpperCase()}
            </div>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-6">
              <span className="holographic-text">The Future</span>
              <br />
              <span className="text-white">of Flight</span>
            </h2>
            <p className="text-xl md:text-2xl text-neural-300 max-w-3xl mx-auto leading-relaxed">
              Experience AI-native flight comparison with quantum-enhanced search, 
              sustainability optimization, and neural preference learning
            </p>
          </motion.div>

          {/* Main Search Interface */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <NeuralSearchForm onSearch={(criteria) => setAiStatus('analyzing')} />
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="futuristic-card p-6 rounded-2xl group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-4 group-hover:animate-quantum-glow`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-neural-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* AI Insights and Sustainability Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <AIInsightPanel />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <SustainabilityDashboard />
            </motion.div>
          </div>

          {/* Advanced Features Panel */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="futuristic-card p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                <Brain className="h-6 w-6 text-quantum-400 mr-3" />
                AI-Powered Flight Intelligence
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Voice Search Toggle */}
                <motion.button
                  onClick={() => setShowVoiceSearch(!showVoiceSearch)}
                  className={`p-6 rounded-xl border transition-all duration-300 ${
                    showVoiceSearch 
                      ? 'border-quantum-400 bg-quantum-500/20' 
                      : 'border-neural-700 bg-neural-800/50 hover:border-quantum-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mic className={`h-8 w-8 mx-auto mb-3 ${
                    showVoiceSearch ? 'text-quantum-400' : 'text-neural-400'
                  }`} />
                  <h4 className="font-semibold text-white mb-2">Voice Search</h4>
                  <p className="text-sm text-neural-300">
                    Speak naturally to find flights
                  </p>
                </motion.button>

                {/* Price Alerts Toggle */}
                <motion.button
                  onClick={() => setShowPriceAlerts(!showPriceAlerts)}
                  className={`p-6 rounded-xl border transition-all duration-300 ${
                    showPriceAlerts 
                      ? 'border-primary-400 bg-primary-500/20' 
                      : 'border-neural-700 bg-neural-800/50 hover:border-primary-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bell className={`h-8 w-8 mx-auto mb-3 ${
                    showPriceAlerts ? 'text-primary-400' : 'text-neural-400'
                  }`} />
                  <h4 className="font-semibold text-white mb-2">Price Alerts</h4>
                  <p className="text-sm text-neural-300">
                    Get notified of price drops
                  </p>
                </motion.button>

                {/* Analytics Toggle */}
                <motion.button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className={`p-6 rounded-xl border transition-all duration-300 ${
                    showAnalytics 
                      ? 'border-eco-400 bg-eco-500/20' 
                      : 'border-neural-700 bg-neural-800/50 hover:border-eco-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BarChart3 className={`h-8 w-8 mx-auto mb-3 ${
                    showAnalytics ? 'text-eco-400' : 'text-neural-400'
                  }`} />
                  <h4 className="font-semibold text-white mb-2">Neural Analytics</h4>
                  <p className="text-sm text-neural-300">
                    Deep flight market insights
                  </p>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Voice Search Component */}
          <AnimatePresence>
            {showVoiceSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <VoiceSearch onVoiceResult={(query: string) => {
                  console.log('Voice search result:', query)
                  setAiStatus('analyzing')
                }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price Alerts Dashboard */}
          <AnimatePresence>
            {showPriceAlerts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <PriceAlertDashboard userId="demo-user" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Neural Analytics Dashboard */}
          <AnimatePresence>
            {showAnalytics && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <NeuralAnalyticsDashboard route="JFK-LAX" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-quantum-500 to-primary-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-quantum-500/50 transition-all duration-300 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <Globe className="h-8 w-8 text-white animate-spin" style={{ animationDuration: '10s' }} />
      </motion.button>
    </div>
  )
}
