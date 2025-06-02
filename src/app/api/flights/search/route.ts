import { NextRequest, NextResponse } from 'next/server'
import databaseService from '@/services/databaseService'
import { aiService } from '@/services/aiService'
import { SearchCriteria } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const searchCriteria: SearchCriteria = await request.json()
    
    // Validate required fields
    if (!searchCriteria.origin || !searchCriteria.destination || !searchCriteria.departure_date) {
      return NextResponse.json(
        { error: 'Missing required search criteria' },
        { status: 400 }
      )
    }

    // Search flights in database
    const flights = await databaseService.searchFlights(searchCriteria)
    
    // Get AI insights and recommendations
    const aiInsights = await aiService.generateFlightRecommendations(searchCriteria)
    const priceAnalysis = await aiService.analyzePriceTrends(flights)
    const sustainabilityInsights = await aiService.generateSustainabilityInsights(flights)

    // Calculate analytics
    const priceStats = {
      lowest_price: Math.min(...flights.map(f => f.price.total)),
      average_price: flights.reduce((sum, f) => sum + f.price.total, 0) / flights.length,
      highest_price: Math.max(...flights.map(f => f.price.total)),
      price_distribution: calculatePriceDistribution(flights)
    }

    const sustainabilityStats = {
      lowest_emissions: Math.min(...flights.map(f => f.carbon_footprint.per_passenger)),
      average_emissions: flights.reduce((sum, f) => sum + f.carbon_footprint.per_passenger, 0) / flights.length,
      eco_options_count: flights.filter(f => f.sustainability_badge).length
    }

    // Generate neural recommendations
    const neuralRecommendations = generateNeuralRecommendations(flights, searchCriteria)

    const response = {
      flights,
      total_results: flights.length,
      search_time_ms: 150, // Simulated
      ai_insights: parseAIInsights(aiInsights || '{}'),
      neural_recommendations: neuralRecommendations,
      price_analysis: priceStats,
      sustainability_analysis: sustainabilityStats,
      metadata: {
        timestamp: new Date().toISOString(),
        search_id: generateSearchId(),
        version: '2030.1.0'
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Flight search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function calculatePriceDistribution(flights: any[]) {
  const ranges = [
    [0, 300],
    [300, 600], 
    [600, 900],
    [900, 1200],
    [1200, Infinity]
  ]
  
  return ranges.map(([min, max]) => ({
    range: [min, max === Infinity ? 9999 : max],
    count: flights.filter(f => f.price.total >= min && f.price.total < max).length
  }))
}

function parseAIInsights(aiResponse: string): any[] {
  try {
    const parsed = JSON.parse(aiResponse || '{}')
    return parsed.insights || []
  } catch {
    return [
      {
        type: 'travel_advice',
        title: 'AI Processing',
        description: 'Neural networks are analyzing optimal flight patterns for your route.',
        confidence: 0.9,
        action_required: false,
        impact_score: 5
      }
    ]
  }
}

function generateNeuralRecommendations(flights: any[], criteria: SearchCriteria) {
  // Sort flights by neural score
  const scoredFlights = flights.map(flight => ({
    flight,
    score: calculateNeuralScore(flight, criteria),
    reasoning: generateReasoningForFlight(flight, criteria),
    personality_match: Math.random() * 0.3 + 0.7, // Simulated
    predicted_satisfaction: Math.random() * 0.2 + 0.8
  }))

  scoredFlights.sort((a, b) => b.score - a.score)

  return scoredFlights.slice(0, 3).map(scored => ({
    ...scored,
    alternative_suggestions: scoredFlights.slice(3, 6).map(alt => alt.flight)
  }))
}

function calculateNeuralScore(flight: any, criteria: SearchCriteria): number {
  let score = 0.5 // Base score

  // Price factor
  const priceScore = Math.max(0, 1 - flight.price.total / 1500)
  score += priceScore * 0.3

  // Sustainability factor
  if (criteria.sustainability_priority !== 'none') {
    const sustainabilityMultiplier = {
      'moderate': 0.1,
      'high': 0.2,
      'maximum': 0.3
    }[criteria.sustainability_priority] || 0

    const sustainabilityScore = flight.sustainability_badge ? 1 : 0.5
    score += sustainabilityScore * sustainabilityMultiplier
  }

  // Comfort and convenience
  const comfortScore = flight.segments[0].aircraft.comfort_rating / 10
  score += comfortScore * 0.2

  // Booking confidence
  score += flight.booking_confidence * 0.2

  return Math.min(1, Math.max(0, score))
}

function generateReasoningForFlight(flight: any, criteria: SearchCriteria): string[] {
  const reasons = []

  if (flight.price.total < 600) {
    reasons.push('Excellent value for money')
  }

  if (flight.sustainability_badge) {
    reasons.push('Environmentally responsible choice')
  }

  if (flight.booking_confidence > 0.9) {
    reasons.push('High reliability and on-time performance')
  }

  if (flight.total_duration < 480) {
    reasons.push('Optimal travel time')
  }

  if (flight.segments[0].wifi_quality === 'quantum') {
    reasons.push('Premium connectivity and amenities')
  }

  return reasons.length > 0 ? reasons : ['Balanced option for your requirements']
}

function generateSearchId(): string {
  return 'FV' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}
