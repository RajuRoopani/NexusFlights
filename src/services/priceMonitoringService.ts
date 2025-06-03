// Real-time price monitoring service for flight data
import { FlightDataService } from './flightDataProviders'
import { FlightSearchParams, Flight, PriceAlert } from '@/types'

export class PriceMonitoringService {
  private flightDataService: FlightDataService
  private monitoringIntervals: Map<string, NodeJS.Timeout> = new Map()
  private priceHistory: Map<string, number[]> = new Map()

  constructor() {
    this.flightDataService = new FlightDataService()
  }

  /**
   * Start monitoring a specific route for price changes
   */
  async startPriceMonitoring(
    searchParams: FlightSearchParams,
    targetPrice: number,
    userId: string,
    alertCallback?: (alert: PriceAlert) => void
  ): Promise<string> {
    const monitorId = this.generateMonitorId(searchParams)
    
    // Clear any existing monitoring for this route
    this.stopPriceMonitoring(monitorId)
    
    console.log(`Starting price monitoring for ${searchParams.origin} -> ${searchParams.destination}`)
    
    // Check prices every 30 minutes
    const interval = setInterval(async () => {
      try {
        await this.checkPriceChanges(searchParams, targetPrice, userId, monitorId, alertCallback)
      } catch (error) {
        console.error('Price monitoring error:', error)
      }
    }, 30 * 60 * 1000) // 30 minutes
    
    this.monitoringIntervals.set(monitorId, interval)
    
    // Initial price check
    await this.checkPriceChanges(searchParams, targetPrice, userId, monitorId, alertCallback)
    
    return monitorId
  }

  /**
   * Stop monitoring for a specific route
   */
  stopPriceMonitoring(monitorId: string): void {
    const interval = this.monitoringIntervals.get(monitorId)
    if (interval) {
      clearInterval(interval)
      this.monitoringIntervals.delete(monitorId)
      this.priceHistory.delete(monitorId)
      console.log(`Stopped price monitoring for ${monitorId}`)
    }
  }

  /**
   * Get current lowest price for a route
   */
  async getCurrentPrice(searchParams: FlightSearchParams): Promise<number | null> {
    try {
      const flights = await this.flightDataService.searchFlights(searchParams)
      if (flights.length === 0) return null
      
      return Math.min(...flights.map(f => f.price.total))
    } catch (error) {
      console.error('Error getting current price:', error)
      return null
    }
  }

  /**
   * Get price trend analysis for a route
   */
  getPriceTrend(monitorId: string): {
    trend: 'rising' | 'falling' | 'stable';
    change_percentage: number;
    prediction: 'buy_now' | 'wait' | 'monitor';
  } {
    const history = this.priceHistory.get(monitorId) || []
    
    if (history.length < 2) {
      return { trend: 'stable', change_percentage: 0, prediction: 'monitor' }
    }

    const recent = history.slice(-5) // Last 5 price points
    const oldest = recent[0]
    const newest = recent[recent.length - 1]
    
    const changePercentage = ((newest - oldest) / oldest) * 100
    
    let trend: 'rising' | 'falling' | 'stable' = 'stable'
    if (changePercentage > 5) trend = 'rising'
    else if (changePercentage < -5) trend = 'falling'
    
    let prediction: 'buy_now' | 'wait' | 'monitor' = 'monitor'
    if (trend === 'rising' && changePercentage > 10) prediction = 'buy_now'
    else if (trend === 'falling') prediction = 'wait'
    
    return {
      trend,
      change_percentage: Math.round(changePercentage * 100) / 100,
      prediction
    }
  }

  /**
   * Get all active monitoring sessions
   */
  getActiveMonitoring(): string[] {
    return Array.from(this.monitoringIntervals.keys())
  }

  private async checkPriceChanges(
    searchParams: FlightSearchParams,
    targetPrice: number,
    userId: string,
    monitorId: string,
    alertCallback?: (alert: PriceAlert) => void
  ): Promise<void> {
    const currentPrice = await this.getCurrentPrice(searchParams)
    
    if (currentPrice === null) {
      console.warn(`No price data available for ${monitorId}`)
      return
    }

    // Update price history
    const history = this.priceHistory.get(monitorId) || []
    history.push(currentPrice)
    
    // Keep only last 24 hours of data (48 data points with 30min intervals)
    if (history.length > 48) {
      history.shift()
    }
    this.priceHistory.set(monitorId, history)

    // Check for price alerts
    const previousPrice = history.length > 1 ? history[history.length - 2] : currentPrice
    const priceChange = currentPrice - previousPrice
    
    // Alert conditions
    const shouldAlert = 
      currentPrice <= targetPrice || // Target price reached
      (priceChange < 0 && Math.abs(priceChange) > 50) || // Significant drop
      (priceChange > 0 && Math.abs(priceChange) > 100) // Significant increase

    if (shouldAlert && alertCallback) {
      const alert: PriceAlert = {
        id: `alert_${Date.now()}`,
        user_id: userId,
        criteria: {
          origin: searchParams.origin,
          destination: searchParams.destination,
          departure_date: searchParams.departure_date,
          return_date: searchParams.return_date,
          passengers: {
            adults: searchParams.adults,
            children: searchParams.children || 0,
            infants: searchParams.infants || 0
          },
          cabin_class: [searchParams.cabin_class || 'economy'],
          sustainability_priority: 'moderate'
        },
        target_price: targetPrice,
        current_price: currentPrice,
        price_change: priceChange,
        alert_type: currentPrice <= targetPrice ? 'threshold' : 
                   priceChange < 0 ? 'drop' : 'trend_change',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
      
      alertCallback(alert)
    }

    console.log(`Price check for ${monitorId}: $${currentPrice} (change: ${priceChange >= 0 ? '+' : ''}$${priceChange})`)
  }

  private generateMonitorId(searchParams: FlightSearchParams): string {
    return `${searchParams.origin}_${searchParams.destination}_${searchParams.departure_date}_${searchParams.cabin_class}`
  }
}

// Export singleton instance
export const priceMonitoringService = new PriceMonitoringService()
