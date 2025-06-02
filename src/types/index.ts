// Flight-related types
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  sustainability_rating: number;
  biometric_enabled: boolean;
  ar_preview_available: boolean;
}

export interface Airline {
  code: string;
  name: string;
  logo: string;
  sustainability_score: number;
  carbon_offset_program: boolean;
  neural_boarding: boolean;
  quantum_safety_rating: number;
}

export interface FlightSegment {
  id: string;
  airline: Airline;
  flight_number: string;
  departure: {
    airport: Airport;
    time: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: Airport;
    time: string;
    terminal?: string;
    gate?: string;
  };
  duration: number; // minutes
  aircraft: {
    type: string;
    model: string;
    emissions_per_km: number;
    comfort_rating: number;
  };
  cabin_class: 'economy' | 'premium_economy' | 'business' | 'first' | 'neural_pod';
  amenities: string[];
  wifi_quality: 'basic' | 'premium' | 'quantum';
}

export interface Flight {
  id: string;
  segments: FlightSegment[];
  total_duration: number;
  total_distance: number;
  price: {
    base: number;
    taxes: number;
    fees: number;
    total: number;
    currency: string;
    price_prediction: {
      trend: 'rising' | 'falling' | 'stable';
      confidence: number;
      predicted_changes: Array<{
        date: string;
        price: number;
        probability: number;
      }>;
    };
  };
  carbon_footprint: {
    total_kg: number;
    per_passenger: number;
    offset_cost: number;
    comparison_to_average: number;
  };
  baggage: {
    carry_on_included: boolean;
    checked_included: number;
    additional_fees: Record<string, number>;
  };
  booking_confidence: number;
  delay_prediction: {
    probability: number;
    expected_delay_minutes: number;
    factors: string[];
  };
  sustainability_badge?: 'eco_champion' | 'carbon_neutral' | 'offset_included';
}

// Search and filter types
export interface SearchCriteria {
  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabin_class: FlightSegment['cabin_class'][];
  max_price?: number;
  max_duration?: number;
  preferred_airlines?: string[];
  sustainability_priority: 'none' | 'moderate' | 'high' | 'maximum';
  neural_preferences?: {
    comfort_priority: number; // 1-10
    time_priority: number; // 1-10
    price_priority: number; // 1-10
    sustainability_priority: number; // 1-10
  };
}

export interface SearchFilters {
  price_range: [number, number];
  departure_time_range: [string, string];
  arrival_time_range: [string, string];
  max_stops: number;
  airlines: string[];
  airports: string[];
  amenities: string[];
  sustainability_features: string[];
  sort_by: 'price' | 'duration' | 'sustainability' | 'ai_recommended' | 'neural_score';
  ai_optimization: 'price' | 'time' | 'comfort' | 'eco' | 'balanced';
}

// AI and user experience types
export interface UserProfile {
  id: string;
  preferences: {
    preferred_airlines: string[];
    preferred_airports: string[];
    cabin_class_preference: FlightSegment['cabin_class'];
    meal_preferences: string[];
    seat_preferences: string[];
    sustainability_commitment: 'low' | 'medium' | 'high' | 'maximum';
    budget_flexibility: number; // 1-10
    time_flexibility: number; // 1-10
  };
  travel_history: Array<{
    flight_id: string;
    date: string;
    rating: number;
    review?: string;
  }>;
  neural_profile: {
    stress_tolerance: number;
    adventure_seeking: number;
    luxury_preference: number;
    environmental_consciousness: number;
    technology_adoption: number;
  };
  biometric_data?: {
    facial_recognition_enabled: boolean;
    voice_recognition_enabled: boolean;
    preferred_language: string;
    accessibility_needs: string[];
  };
}

export interface AIInsight {
  type: 'price_alert' | 'better_option' | 'sustainability_tip' | 'travel_advice' | 'disruption_warning';
  title: string;
  description: string;
  confidence: number;
  action_required: boolean;
  related_flight_id?: string;
  estimated_savings?: number;
  impact_score: number;
}

export interface NeuralRecommendation {
  flight: Flight;
  score: number;
  reasoning: string[];
  personality_match: number;
  predicted_satisfaction: number;
  alternative_suggestions: Flight[];
}

// API response types
export interface SearchResponse {
  flights: Flight[];
  total_results: number;
  search_time_ms: number;
  ai_insights: AIInsight[];
  neural_recommendations: NeuralRecommendation[];
  price_analysis: {
    lowest_price: number;
    average_price: number;
    highest_price: number;
    price_distribution: Array<{
      range: [number, number];
      count: number;
    }>;
  };
  sustainability_analysis: {
    lowest_emissions: number;
    average_emissions: number;
    eco_options_count: number;
  };
}

// Real-time data types
export interface FlightStatus {
  flight_id: string;
  status: 'scheduled' | 'boarding' | 'departed' | 'in_flight' | 'arrived' | 'delayed' | 'cancelled';
  current_location?: {
    lat: number;
    lng: number;
    altitude: number;
    speed: number;
  };
  delay_minutes?: number;
  gate_changes?: Array<{
    timestamp: string;
    old_gate: string;
    new_gate: string;
  }>;
  weather_impact?: {
    severity: 'low' | 'medium' | 'high';
    description: string;
    estimated_delay: number;
  };
}

export interface PriceAlert {
  id: string;
  user_id: string;
  criteria: SearchCriteria;
  target_price: number;
  current_price: number;
  price_change: number;
  alert_type: 'drop' | 'threshold' | 'trend_change';
  created_at: string;
  expires_at: string;
}

// Component props types
export interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
  onCompare: (flight: Flight) => void;
  showPrediction?: boolean;
  highlightSustainability?: boolean;
}

export interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  initialCriteria?: Partial<SearchCriteria>;
  aiSuggestions?: boolean;
}

export interface HolographicMapProps {
  flights: Flight[];
  selectedFlight?: Flight;
  onFlightSelect: (flight: Flight) => void;
  showRealTimeData?: boolean;
}
