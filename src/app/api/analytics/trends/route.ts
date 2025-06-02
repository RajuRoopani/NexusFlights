import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/services/aiService'

// GET /api/analytics/trends - Get market trends and analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const route = searchParams.get('route')
    const timeframe = searchParams.get('timeframe') || '30d'

    // Mock analytics data for development
    const mockTrends = {
      route: route || 'Global Market',
      timeframe,
      price_trends: {
        direction: 'falling',
        change_percentage: -12.5,
        confidence: 0.87,
        next_30_days: [
          { date: '2025-06-03', avg_price: 345, confidence: 0.92 },
          { date: '2025-06-10', avg_price: 332, confidence: 0.89 },
          { date: '2025-06-17', avg_price: 318, confidence: 0.85 },
          { date: '2025-06-24', avg_price: 307, confidence: 0.81 },
          { date: '2025-07-01', avg_price: 298, confidence: 0.76 }
        ]
      },
      demand_analysis: {
        current_demand: 'high',
        peak_seasons: ['July', 'December'],
        off_peak_discount: 25,
        booking_velocity: {
          trend: 'increasing',
          rate_change: '+18%'
        }
      },
      sustainability_metrics: {
        avg_carbon_footprint: 450, // kg CO2
        eco_options_percentage: 32,
        trending_green_airlines: ['EcoAir', 'GreenWings', 'SustainableFly'],
        carbon_offset_adoption: 67 // percentage
      },
      neural_insights: {
        optimal_booking_window: {
          days_in_advance: 21,
          confidence: 0.91,
          reasoning: 'Historical data shows 23% savings when booking 3 weeks ahead'
        },
        price_sensitivity_score: 7.8,
        user_behavior_patterns: [
          'Most users book morning flights for business trips',
          'Weekend departures see 15% price premium',
          'Sustainability features influence 42% of bookings'
        ]
      },
      real_time_factors: {
        weather_impact: {
          severity: 'low',
          affected_routes: ['NYC-MIA', 'LAX-SEA'],
          estimated_delays: 15 // minutes
        },
        fuel_prices: {
          trend: 'stable',
          impact_on_fares: 'minimal'
        },
        airport_congestion: {
          high_traffic_airports: ['JFK', 'LAX', 'ORD'],
          recommended_alternatives: ['LGA', 'BUR', 'MDW']
        }
      }
    }

    return NextResponse.json(mockTrends)
  } catch (error) {
    console.error('Get analytics trends error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}

// POST /api/analytics/track - Track user search behavior
export async function POST(request: NextRequest) {
  try {
    const trackingData = await request.json()

    // Validate required fields
    if (!trackingData.user_id || !trackingData.event_type) {
      return NextResponse.json({ 
        error: 'User ID and event type are required' 
      }, { status: 400 })
    }

    const analyticsEvent = {
      id: `event-${Date.now()}`,
      user_id: trackingData.user_id,
      event_type: trackingData.event_type, // search, view, book, compare
      timestamp: new Date().toISOString(),
      search_criteria: trackingData.search_criteria,
      flight_data: trackingData.flight_data,
      user_agent: trackingData.user_agent,
      session_id: trackingData.session_id,
      neural_context: {
        time_spent: trackingData.time_spent,
        interactions: trackingData.interactions || [],
        preferences_inferred: trackingData.preferences_inferred || {}
      }
    }

    // In a real implementation, save to analytics database
    console.log('Tracked analytics event:', analyticsEvent)

    return NextResponse.json({ 
      success: true, 
      event_id: analyticsEvent.id,
      insights: {
        personalization_score: Math.random() * 10,
        recommendation_confidence: 0.75 + Math.random() * 0.25
      }
    })
  } catch (error) {
    console.error('Track analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    )
  }
}

// GET /api/analytics/insights - Get personalized insights
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Generate personalized insights using AI service
    const insights = await aiService.generatePersonalizedInsights(
      { id: userId }, // Mock user profile
      [] // Mock search history
    )

    const extendedInsights = {
      user_id: userId,
      generated_at: new Date().toISOString(),
      insights,
      neural_score: 8.7,
      behavioral_patterns: {
        preferred_booking_time: '2-3 weeks in advance',
        price_sensitivity: 'medium',
        sustainability_focus: 'high',
        travel_frequency: 'monthly'
      },
      recommendations: [
        'Enable price drop alerts for your frequent routes',
        'Consider mid-week departures for 20% savings',
        'Join airline loyalty programs for better upgrades'
      ],
      next_actions: [
        { type: 'price_alert', priority: 'high', description: 'Set alert for NYC-LAX route' },
        { type: 'calendar_sync', priority: 'medium', description: 'Connect calendar for optimal booking times' },
        { type: 'sustainability', priority: 'medium', description: 'Explore carbon offset options' }
      ]
    }

    return NextResponse.json(extendedInsights)
  } catch (error) {
    console.error('Get personalized insights error:', error)
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}
