import { CosmosClient } from '@azure/cosmos'
import { DefaultAzureCredential } from '@azure/identity'
import { Flight, UserProfile, SearchCriteria, AIInsight } from '@/types'

class DatabaseService {
  private client: CosmosClient | null = null
  private database: any = null
  private isConnected: boolean = false
  
  constructor() {
    const endpoint = process.env.COSMOS_DB_ENDPOINT
    
    if (endpoint) {
      try {
        // Use Managed Identity in production
        this.client = new CosmosClient({
          endpoint,
          aadCredentials: new DefaultAzureCredential()
        })
        
        this.database = this.client.database('flightvision')
        this.isConnected = true
      } catch (error) {
        console.warn('Failed to connect to Cosmos DB, using mock data:', error)
        this.isConnected = false
      }
    } else {
      console.log('No Cosmos DB endpoint configured, using mock data for development')
      this.isConnected = false
    }
  }

  // Flight operations
  async searchFlights(criteria: SearchCriteria): Promise<Flight[]> {
    if (!this.isConnected) {
      return this.getMockFlights(criteria)
    }

    try {
      const container = this.database.container('flights')
      
      const querySpec = {
        query: `
          SELECT * FROM c 
          WHERE c.departure.airport.code = @origin 
          AND c.arrival.airport.code = @destination
          AND c.departure.date >= @departureDate
          ORDER BY c.price.total ASC
        `,
        parameters: [
          { name: '@origin', value: criteria.origin },
          { name: '@destination', value: criteria.destination },
          { name: '@departureDate', value: criteria.departure_date }
        ]
      }

      const { resources } = await container.items.query(querySpec).fetchAll()
      
      // Apply filters and sorting based on criteria
      return this.applySearchFilters(resources, criteria)
    } catch (error) {
      console.error('Flight search error:', error)
      return this.getMockFlights(criteria)
    }
  }  // Mock data for development
  private getMockFlights(criteria: SearchCriteria): Flight[] {
    const baseFlights: Flight[] = [
      {
        id: '1',
        segments: [{
          id: 'seg1',
          airline: {
            code: 'UA',
            name: 'United Airlines',
            logo: '/airlines/united.png',
            sustainability_score: 8.5,
            carbon_offset_program: true,
            neural_boarding: true,
            quantum_safety_rating: 9.2
          },
          flight_number: 'UA2030',
          departure: {
            airport: {
              code: 'JFK',
              name: 'John F. Kennedy International',
              city: 'New York',
              country: 'USA',
              timezone: 'America/New_York',
              coordinates: { lat: 40.6413, lng: -73.7781 },
              sustainability_rating: 8.0,
              biometric_enabled: true,
              ar_preview_available: true
            },
            time: '2025-07-15T14:30:00Z'
          },
          arrival: {
            airport: {
              code: 'LAX',
              name: 'Los Angeles International',
              city: 'Los Angeles',
              country: 'USA',
              timezone: 'America/Los_Angeles',
              coordinates: { lat: 33.9425, lng: -118.4081 },
              sustainability_rating: 7.5,
              biometric_enabled: true,
              ar_preview_available: true
            },
            time: '2025-07-15T17:45:00Z'
          },
          duration: 375,
          aircraft: {
            type: 'Boeing',
            model: '787-9',
            emissions_per_km: 0.15,
            comfort_rating: 8.5
          },
          cabin_class: 'economy',
          amenities: ['wifi', 'entertainment', 'meals', 'power'],
          wifi_quality: 'premium'
        }],
        total_duration: 375,
        total_distance: 3944,
        price: {
          base: 350,
          taxes: 75,
          fees: 25,
          total: 450,
          currency: 'USD',
          price_prediction: {
            trend: 'stable',
            confidence: 0.87,
            predicted_changes: [
              { date: '2025-06-03', price: 445, probability: 0.85 },
              { date: '2025-06-04', price: 440, probability: 0.82 }
            ]
          }
        },
        carbon_footprint: {
          total_kg: 1200,
          per_passenger: 1200,
          offset_cost: 15.50,
          comparison_to_average: 0.85
        },
        baggage: {
          carry_on_included: true,
          checked_included: 0,
          additional_fees: { checked_bag: 35, overweight: 100 }
        },
        booking_confidence: 0.92,
        delay_prediction: {
          probability: 0.15,
          expected_delay_minutes: 8,
          factors: ['weather', 'air_traffic']
        },
        sustainability_badge: 'carbon_neutral'
      },
      {
        id: '2',
        segments: [{
          id: 'seg2',
          airline: {
            code: 'DL',
            name: 'Delta Air Lines',
            logo: '/airlines/delta.png',
            sustainability_score: 9.1,
            carbon_offset_program: true,
            neural_boarding: true,
            quantum_safety_rating: 9.5
          },
          flight_number: 'DL1847',
          departure: {
            airport: {
              code: 'JFK',
              name: 'John F. Kennedy International',
              city: 'New York',
              country: 'USA',
              timezone: 'America/New_York',
              coordinates: { lat: 40.6413, lng: -73.7781 },
              sustainability_rating: 8.0,
              biometric_enabled: true,
              ar_preview_available: true
            },
            time: '2025-07-15T09:15:00Z'
          },
          arrival: {
            airport: {
              code: 'LAX',
              name: 'Los Angeles International',
              city: 'Los Angeles',
              country: 'USA',
              timezone: 'America/Los_Angeles',
              coordinates: { lat: 33.9425, lng: -118.4081 },
              sustainability_rating: 7.5,
              biometric_enabled: true,
              ar_preview_available: true
            },
            time: '2025-07-15T12:30:00Z'
          },
          duration: 375,
          aircraft: {
            type: 'Airbus',
            model: 'A350-900',
            emissions_per_km: 0.13,
            comfort_rating: 9.2
          },
          cabin_class: 'economy',
          amenities: ['wifi', 'entertainment', 'meals', 'power', 'usb'],
          wifi_quality: 'quantum'
        }],
        total_duration: 375,
        total_distance: 3944,
        price: {
          base: 420,
          taxes: 75,
          fees: 25,
          total: 520,
          currency: 'USD',
          price_prediction: {
            trend: 'falling',
            confidence: 0.91,
            predicted_changes: [
              { date: '2025-06-03', price: 505, probability: 0.89 },
              { date: '2025-06-04', price: 490, probability: 0.85 }
            ]
          }
        },
        carbon_footprint: {
          total_kg: 1100,
          per_passenger: 1100,
          offset_cost: 14.25,
          comparison_to_average: 0.78
        },
        baggage: {
          carry_on_included: true,
          checked_included: 1,
          additional_fees: { extra_checked_bag: 45, overweight: 100 }
        },
        booking_confidence: 0.95,
        delay_prediction: {
          probability: 0.08,
          expected_delay_minutes: 5,
          factors: ['minimal_risk']
        },
        sustainability_badge: 'eco_champion'
      }
    ]
    
    return baseFlights.filter(flight => {
      if (criteria.cabin_class && criteria.cabin_class.length > 0) {
        return criteria.cabin_class.includes(flight.segments[0].cabin_class)
      }
      return true
    })
  }

  private applySearchFilters(flights: Flight[], criteria: SearchCriteria): Flight[] {
    return flights
  }

  // User profile operations
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    return {
      id: userId,
      preferences: {
        preferred_airlines: [],
        preferred_airports: [],
        cabin_class_preference: 'economy',
        meal_preferences: [],
        seat_preferences: [],
        sustainability_commitment: 'high',
        budget_flexibility: 5,
        time_flexibility: 3
      },
      travel_history: [],
      neural_profile: {
        stress_tolerance: 7,
        adventure_seeking: 6,
        luxury_preference: 4,
        environmental_consciousness: 8,
        technology_adoption: 9
      }
    }
  }

  async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    return { ...await this.getUserProfile(userId)!, ...profile } as UserProfile
  }

  async createOrUpdateUserProfile(profileData: any): Promise<UserProfile> {
    // In a real implementation, this would save to database
    const existingProfile = await this.getUserProfile(profileData.id)
    
    if (existingProfile) {
      return this.updateUserProfile(profileData.id, profileData)
    }
    
    return {
      id: profileData.id,
      preferences: profileData.preferences || {
        preferred_airlines: [],
        preferred_airports: [],
        cabin_class_preference: 'economy',
        meal_preferences: [],
        seat_preferences: [],
        sustainability_commitment: 'high',
        budget_flexibility: 5,
        time_flexibility: 3
      },
      travel_history: [],
      neural_profile: {
        stress_tolerance: 7,
        adventure_seeking: 6,
        luxury_preference: 4,
        environmental_consciousness: 8,
        technology_adoption: 9
      }
    }
  }

  async updateUserPreferences(userId: string, preferences: any): Promise<UserProfile> {
    const profile = await this.getUserProfile(userId)
    if (!profile) {
      throw new Error('User not found')
    }
    
    return {
      ...profile,
      preferences: { ...profile.preferences, ...preferences }
    }
  }

  async getAIInsights(criteria: SearchCriteria): Promise<AIInsight[]> {
    return [
      {
        type: 'price_alert',
        title: 'Price Drop Expected',
        description: 'Prices are likely to drop by 15% in the next 3 days.',
        confidence: 0.85,
        action_required: true,
        estimated_savings: 67,
        impact_score: 8.5
      },
      {
        type: 'sustainability_tip',
        title: 'Eco-Friendly Options Available',
        description: 'Consider airlines with biofuel programs for 30% lower emissions.',
        confidence: 0.92,
        action_required: false,
        impact_score: 7.2
      }
    ]
  }
}

// Export singleton instance
export default new DatabaseService()
