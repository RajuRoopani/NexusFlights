import { NextRequest, NextResponse } from 'next/server'
import databaseService from '@/services/databaseService'

// GET /api/user/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const profile = await databaseService.getUserProfile(userId)
    
    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Get user profile error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

// POST /api/user/profile - Create or update user profile
export async function POST(request: NextRequest) {
  try {
    const profileData = await request.json()

    // Validate required fields
    if (!profileData.id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const profile = await databaseService.createOrUpdateUserProfile(profileData)
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Create/update user profile error:', error)
    return NextResponse.json(
      { error: 'Failed to save user profile' },
      { status: 500 }
    )
  }
}

// PUT /api/user/profile - Update user preferences
export async function PUT(request: NextRequest) {
  try {
    const { userId, preferences } = await request.json()

    if (!userId || !preferences) {
      return NextResponse.json({ 
        error: 'User ID and preferences are required' 
      }, { status: 400 })
    }

    const updatedProfile = await databaseService.updateUserPreferences(userId, preferences)
    
    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Update user preferences error:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}
