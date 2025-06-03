import { NextRequest, NextResponse } from 'next/server'
import databaseService from '@/services/databaseService'
import { aiService } from '@/services/aiService'

// GET /api/alerts - Get price alerts for user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // In a real implementation, this would query the database
    const mockAlerts = [
      {
        id: 'alert-1',
        user_id: userId,
        route: 'JFK → LAX',
        current_price: 329,
        target_price: 299,
        created_at: '2025-06-01T10:00:00Z',
        status: 'active',
        criteria: {
          origin: 'JFK',
          destination: 'LAX',
          departure_date: '2025-07-15',
          cabin_class: ['economy']
        }
      },
      {
        id: 'alert-2',
        user_id: userId,
        route: 'LAX → NRT',
        current_price: 789,
        target_price: 699,
        created_at: '2025-06-01T14:30:00Z',
        status: 'active',
        criteria: {
          origin: 'LAX',
          destination: 'NRT',
          departure_date: '2025-08-20',
          cabin_class: ['business']
        }
      }
    ]

    return NextResponse.json({ alerts: mockAlerts })
  } catch (error) {
    console.error('Get price alerts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price alerts' },
      { status: 500 }
    )
  }
}

// POST /api/alerts - Create new price alert
export async function POST(request: NextRequest) {
  try {
    const alertData = await request.json()

    // Validate required fields
    if (!alertData.user_id || !alertData.criteria || !alertData.target_price) {
      return NextResponse.json({ 
        error: 'User ID, search criteria, and target price are required' 
      }, { status: 400 })
    }

    // Generate alert ID
    const alertId = `alert-${Date.now()}`
    
    const newAlert = {
      id: alertId,
      user_id: alertData.user_id,
      route: `${alertData.criteria.origin} → ${alertData.criteria.destination}`,
      target_price: alertData.target_price,
      current_price: alertData.current_price || alertData.target_price + 50,
      created_at: new Date().toISOString(),
      expires_at: alertData.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      criteria: alertData.criteria,
      notifications: {
        email: alertData.notifications?.email || true,
        push: alertData.notifications?.push || true,
        neural_insight: alertData.notifications?.neural_insight || true
      }
    }

    // In a real implementation, save to database
    console.log('Created price alert:', newAlert)

    return NextResponse.json(newAlert)
  } catch (error) {
    console.error('Create price alert error:', error)
    return NextResponse.json(
      { error: 'Failed to create price alert' },
      { status: 500 }
    )
  }
}

// DELETE /api/alerts - Delete price alert
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const alertId = searchParams.get('alertId')
    const userId = searchParams.get('userId')

    if (!alertId || !userId) {
      return NextResponse.json({ 
        error: 'Alert ID and User ID are required' 
      }, { status: 400 })
    }

    // In a real implementation, delete from database
    console.log(`Deleted price alert ${alertId} for user ${userId}`)

    return NextResponse.json({ success: true, message: 'Alert deleted successfully' })
  } catch (error) {
    console.error('Delete price alert error:', error)
    return NextResponse.json(
      { error: 'Failed to delete price alert' },
      { status: 500 }
    )
  }
}
