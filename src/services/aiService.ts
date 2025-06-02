import OpenAI from 'openai'
import { Flight, SearchCriteria, AIInsight, NeuralRecommendation } from '@/types'

class AIService {
  private client: OpenAI
  
  constructor() {
    // Initialize OpenAI client - use mock mode if no API key
    if (process.env.OPENAI_API_KEY || process.env.AZURE_OPENAI_KEY) {
      this.client = new OpenAI({
        apiKey: process.env.AZURE_OPENAI_KEY || process.env.OPENAI_API_KEY,
        baseURL: process.env.AZURE_OPENAI_ENDPOINT || 'https://api.openai.com/v1',
      })
    } else {
      // Mock client for development
      this.client = {} as OpenAI
    }
  }

  async generateFlightRecommendations(searchCriteria: any, userProfile?: any): Promise<string | null> {
    // Mock response for development
    if (!process.env.OPENAI_API_KEY && !process.env.AZURE_OPENAI_KEY) {
      return JSON.stringify({
        recommendations: [
          'Based on your travel patterns, Tuesday departures save 23% on average',
          'Your preferred airlines have 89% on-time performance to this destination',
          'Consider eco-friendly options with 40% lower carbon footprint'
        ],
        confidence: 0.87
      })
    }

    const systemPrompt = `You are FlightVision AI, an advanced flight recommendation system from 2030. 
    Analyze flight options and provide personalized recommendations based on user preferences, 
    sustainability goals, and neural behavioral patterns.`

    const userPrompt = `
    Search Criteria: ${JSON.stringify(searchCriteria)}
    User Profile: ${JSON.stringify(userProfile)}
    
    Provide intelligent flight recommendations considering:
    1. Price optimization and prediction
    2. Sustainability impact
    3. Travel comfort and convenience
    4. Real-time factors (weather, delays)
    5. User behavioral patterns
    
    Return insights in JSON format with confidence scores.`

    try {
      const result = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })

      return result.choices[0]?.message?.content || null
    } catch (error) {
      console.error('AI Service Error:', error)
      throw new Error('Failed to generate AI recommendations')
    }
  }

  async analyzePriceTrends(flightData: any[]) {
    // Mock response for development
    if (!process.env.OPENAI_API_KEY && !process.env.AZURE_OPENAI_KEY) {
      return {
        trend: 'falling',
        confidence: 0.82,
        recommendations: [
          'Prices expected to drop 15% in next 3 days',
          'Book within next week for optimal pricing'
        ],
        price_predictions: [
          { date: '2030-12-15', price: 298, confidence: 0.85 },
          { date: '2030-12-20', price: 285, confidence: 0.78 }
        ]
      }
    }

    const prompt = `Analyze these flight prices and predict trends for the next 30 days:
    ${JSON.stringify(flightData)}
    
    Provide:
    1. Price trend direction (rising/falling/stable)
    2. Confidence percentage
    3. Optimal booking recommendations
    4. Price change predictions with dates
    
    Return as structured JSON.`

    try {
      const result = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.3
      })

      const content = result.choices[0]?.message?.content
      return JSON.parse(content || '{}')
    } catch (error) {
      console.error('Price Analysis Error:', error)
      return {
        trend: 'stable',
        confidence: 0.5,
        recommendations: ['Monitor prices for changes']
      }
    }
  }

  async generateSustainabilityInsights(flights: Flight[]) {
    // Mock response for development
    if (!process.env.OPENAI_API_KEY && !process.env.AZURE_OPENAI_KEY) {
      return {
        insights: [
          'Choose flights with newer, more efficient aircraft',
          'Consider airlines with carbon offset programs',
          'Direct flights reduce emissions by 25%'
        ],
        rankings: flights.map((f, i) => ({
          flight_id: f.id,
          rank: i + 1,
          score: Math.random() * 10
        })),
        offset_recommendations: [
          { provider: 'EcoFly Offset', cost: 12.50, projects: ['Forest restoration', 'Solar energy'] }
        ]
      }
    }

    const prompt = `Analyze carbon footprint and sustainability for these flights:
    ${JSON.stringify(flights.map(f => ({
      airline: f.segments[0]?.airline,
      aircraft: f.segments[0]?.aircraft,
      carbon_footprint: f.carbon_footprint
    })))}
    
    Provide:
    1. Sustainability ranking
    2. Carbon offset recommendations
    3. Eco-friendly alternatives
    4. Environmental impact insights
    
    Return as JSON with actionable suggestions.`

    try {
      const result = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.4
      })

      const content = result.choices[0]?.message?.content
      return JSON.parse(content || '{}')
    } catch (error) {
      console.error('Sustainability Analysis Error:', error)
      return {
        insights: ['Choose flights with newer, more efficient aircraft'],
        offset_recommendations: []
      }
    }
  }

  async processNaturalLanguageQuery(query: string): Promise<Partial<SearchCriteria>> {
    // Simple mock parsing for development
    if (!process.env.OPENAI_API_KEY && !process.env.AZURE_OPENAI_KEY) {
      return {
        origin: 'JFK',
        destination: 'LAX',
        departure_date: '2030-12-15',
        passengers: { adults: 1, children: 0, infants: 0 },
        cabin_class: ['economy'],
        sustainability_priority: 'moderate'
      }
    }

    const prompt = `Convert this natural language flight search into structured search criteria:
    "${query}"
    
    Extract and return JSON with:
    - origin (airport code or city)
    - destination (airport code or city) 
    - departure_date and return_date (if mentioned)
    - passengers (adults, children, infants)
    - cabin_class preferences
    - sustainability_priority
    
    If information is missing, use reasonable defaults.`

    try {
      const result = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.2
      })

      const content = result.choices[0]?.message?.content
      return JSON.parse(content || '{}')
    } catch (error) {
      console.error('Natural Language Processing Error:', error)
      return {}
    }
  }

  async generatePersonalizedInsights(userProfile: any, searchHistory: any[]): Promise<AIInsight[]> {
    // Mock insights for development
    return [
      {
        type: 'price_alert',
        title: 'Price Drop Alert',
        description: 'Flights to your frequent destination dropped 18%',
        confidence: 0.89,
        action_required: true,
        estimated_savings: 87,
        impact_score: 8.5
      },
      {
        type: 'sustainability_tip',
        title: 'Eco-Friendly Option',
        description: 'Consider airlines with biofuel programs for 30% lower emissions',
        confidence: 0.92,
        action_required: false,
        impact_score: 7.2
      },
      {
        type: 'travel_advice',
        title: 'Optimal Booking Time',
        description: 'Book 2-3 weeks in advance for your preferred routes',
        confidence: 0.85,
        action_required: false,
        impact_score: 6.8
      }
    ]
  }

  // Mock neural recommendations for development
  async generateNeuralRecommendations(flights: Flight[], userProfile?: any): Promise<NeuralRecommendation[]> {
    return flights.slice(0, 3).map((flight, index) => ({
      flight,
      score: 9.2 - (index * 0.5),
      reasoning: [
        'Matches your preferred airline choice',
        'Optimal departure time based on your patterns',
        'Best value for comfort preferences'
      ],
      personality_match: 0.87 - (index * 0.1),
      predicted_satisfaction: 0.92 - (index * 0.05),
      alternative_suggestions: flights.slice(index + 1, index + 3)
    }))
  }
}

export const aiService = new AIService()
