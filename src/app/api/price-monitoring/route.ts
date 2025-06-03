import { NextRequest, NextResponse } from 'next/server'
import { priceMonitoringService } from '@/services/priceMonitoringService'
import { FlightSearchParams, PriceAlert } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { action, searchParams, targetPrice, userId, monitorId } = await request.json()

    switch (action) {
      case 'start':
        if (!searchParams || !targetPrice || !userId) {
          return NextResponse.json(
            { error: 'Missing required fields: searchParams, targetPrice, userId' },
            { status: 400 }
          )
        }

        const monitoringId = await priceMonitoringService.startPriceMonitoring(
          searchParams as FlightSearchParams,
          targetPrice,
          userId,
          (alert: PriceAlert) => {
            // In a real implementation, this would send notifications
            console.log('Price alert triggered:', alert)
            // Could integrate with push notifications, email, etc.
          }
        )

        return NextResponse.json({
          success: true,
          monitorId: monitoringId,
          message: 'Price monitoring started successfully'
        })

      case 'stop':
        if (!monitorId) {
          return NextResponse.json(
            { error: 'Missing monitorId' },
            { status: 400 }
          )
        }

        priceMonitoringService.stopPriceMonitoring(monitorId)
        return NextResponse.json({
          success: true,
          message: 'Price monitoring stopped'
        })

      case 'current_price':
        if (!searchParams) {
          return NextResponse.json(
            { error: 'Missing searchParams' },
            { status: 400 }
          )
        }

        const currentPrice = await priceMonitoringService.getCurrentPrice(
          searchParams as FlightSearchParams
        )

        return NextResponse.json({
          success: true,
          currentPrice,
          timestamp: new Date().toISOString()
        })

      case 'trend_analysis':
        if (!monitorId) {
          return NextResponse.json(
            { error: 'Missing monitorId' },
            { status: 400 }
          )
        }

        const trendAnalysis = priceMonitoringService.getPriceTrend(monitorId)
        return NextResponse.json({
          success: true,
          ...trendAnalysis
        })

      case 'list_active':
        const activeMonitoring = priceMonitoringService.getActiveMonitoring()
        return NextResponse.json({
          success: true,
          activeMonitoring,
          count: activeMonitoring.length
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported: start, stop, current_price, trend_analysis, list_active' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Price monitoring API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
