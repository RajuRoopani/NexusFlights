# 🚀 NexusFlights - AI-Native Flight Portal for 2030

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Azure-Ready-0078d4?style=for-the-badge&logo=microsoft-azure&logoColor=white" alt="Azure">
  <img src="https://img.shields.io/badge/AI-Powered-green?style=for-the-badge&logo=openai&logoColor=white" alt="AI Powered">
</div>

## 🌟 Overview

NexusFlights is a next-generation AI-native flight comparison portal designed for the year 2030. This futuristic platform combines cutting-edge technology with sustainable travel solutions, featuring holographic UI themes, neural network-powered search algorithms, and comprehensive environmental impact tracking.

## ✨ Key Features

### 🧠 AI-Powered Intelligence
- **Neural Flight Search**: Advanced AI algorithms predict prices and suggest optimal routes
- **Behavioral Analytics**: Machine learning analyzes user patterns for personalized recommendations
- **Voice Search Integration**: Natural language processing for hands-free flight discovery
- **Predictive Insights**: AI forecasts flight delays, price changes, and travel trends

### 🌱 Sustainability Focus
- **Carbon Footprint Tracking**: Real-time environmental impact calculations
- **Eco-Airline Rankings**: Comprehensive sustainability scoring system
- **Green Travel Recommendations**: AI-suggested eco-friendly travel alternatives
- **Environmental Impact Dashboard**: Detailed sustainability metrics and reporting

### 🎯 Smart Features
- **Real-time Price Alerts**: Intelligent monitoring with personalized notifications
- **Neural User Profiling**: AI-driven user preference learning and adaptation
- **Holographic UI**: Futuristic interface design with immersive visual elements
- **Multi-dimensional Search**: Advanced filtering with AI-enhanced recommendations

### 📊 Analytics & Insights
- **Market Trend Analysis**: Comprehensive flight market analytics
- **User Behavior Tracking**: Neural network analysis of travel patterns
- **Price Prediction Models**: ML-powered fare forecasting
- **Performance Dashboards**: Real-time system and user metrics

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React 18**: Modern React with hooks and context

### Backend & Services
- **API Routes**: Next.js serverless functions
- **AI Services**: Custom neural network implementations
- **Mock Database**: Comprehensive flight data simulation
- **Voice Recognition**: Web Speech API integration

### Infrastructure
- **Azure Static Web Apps**: Cloud hosting platform
- **Bicep Templates**: Infrastructure as Code
- **GitHub Actions**: CI/CD pipeline ready
- **Serverless Functions**: Azure Functions integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RajuRoopani/NexusFlights.git
   cd NexusFlights
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### Flight Search
```
POST /api/flights/search
```
- AI-powered flight search with neural recommendations
- Returns comprehensive flight data with sustainability metrics

### User Profile
```
GET /api/user/profile?userId={id}
```
- Retrieve user profile with neural behavioral analysis
- Returns personalized preferences and travel patterns

### Price Alerts
```
POST /api/alerts
GET /api/alerts?userId={id}
```
- Create and manage intelligent price monitoring
- AI-driven alert optimization

### Analytics
```
GET /api/analytics/trends
```
- Market insights and neural network analysis
- Comprehensive travel trend data

## 🌍 Sustainability Features

### Carbon Footprint Calculator
- Real-time CO2 emission calculations
- Flight-specific environmental impact metrics
- Comparative analysis across airlines and routes

### Eco-Airline Scoring
- Comprehensive sustainability rankings
- Environmental certification tracking
- Green initiative monitoring

### Sustainable Travel Recommendations
- AI-suggested eco-friendly alternatives
- Carbon offset integration
- Sustainable accommodation partnerships

## ☁️ Deployment

### Azure Static Web Apps
The project is configured for seamless deployment to Azure:

1. **Azure CLI Setup**
   ```bash
   az login
   az account set --subscription "your-subscription-id"
   ```

2. **Deploy to Azure**
   ```bash
   az staticwebapp create \
     --name nexusflights \
     --resource-group your-rg \
     --source https://github.com/RajuRoopani/NexusFlights \
     --location "Central US" \
     --branch main \
     --app-location "/" \
     --api-location "api" \
     --output-location "out"
   ```

## 🛫 Real Flight Data Integration

NexusFlights now integrates with actual flight data providers to deliver real-time pricing and availability. This section covers the configuration and usage of the real flight API integration.

### API Providers Integration

#### Primary Provider: Amadeus API
- **Purpose**: Real-time flight search, pricing, and booking
- **Coverage**: Global flight data from 400+ airlines
- **Setup**: Sign up at [Amadeus for Developers](https://developers.amadeus.com/)
- **Required**: `AMADEUS_API_KEY` and `AMADEUS_API_SECRET`

#### Secondary Provider: Skyscanner API  
- **Purpose**: Additional flight options and price comparison
- **Coverage**: Comprehensive global coverage with price predictions
- **Setup**: Apply for access at [Skyscanner Partners](https://partners.skyscanner.net/)
- **Required**: `SKYSCANNER_API_KEY`

#### Carbon Emissions: Carbon Interface API
- **Purpose**: Real carbon footprint calculations
- **Setup**: Sign up at [Carbon Interface](https://www.carboninterface.com/)
- **Required**: `CARBON_INTERFACE_API_KEY`

### Configuration Steps

1. **Copy Environment File**:
   ```bash
   cp .env.example .env.local
   ```

2. **Configure API Keys**:
   ```bash
   # Required for real flight data
   AMADEUS_API_KEY=your_actual_amadeus_key
   AMADEUS_API_SECRET=your_actual_amadeus_secret
   SKYSCANNER_API_KEY=your_actual_skyscanner_key
   CARBON_INTERFACE_API_KEY=your_actual_carbon_key
   ```

3. **Set Up Azure Services** (Optional for caching):
   ```bash
   COSMOS_DB_ENDPOINT=your_cosmos_endpoint
   COSMOS_DB_KEY=your_cosmos_key
   ```

### Real-Time Flight Search

The system now provides real flight data through multiple API endpoints:

#### Flight Search API
```typescript
POST /api/flights/search
{
  "origin": "JFK",
  "destination": "LAX", 
  "departure_date": "2025-07-15",
  "passengers": { "adults": 2, "children": 0, "infants": 0 },
  "cabin_class": ["economy"]
}
```

**Response includes**:
- Real-time prices from multiple providers
- Actual flight schedules and availability
- Carbon footprint calculations
- AI-powered recommendations
- Price prediction analytics

#### Price Monitoring API
```typescript
POST /api/price-monitoring
{
  "action": "start",
  "searchParams": { /* flight search criteria */ },
  "targetPrice": 450,
  "userId": "user123"
}
```

**Features**:
- Real-time price tracking every 30 minutes
- Automatic alerts when prices drop
- Price trend analysis and predictions
- Smart recommendations (buy now vs. wait)

#### Sustainability API
```typescript
POST /api/sustainability/carbon
{
  "distance_km": 3944,
  "aircraft_type": "boeing_787",
  "passengers": 2,
  "cabin_class": "economy"
}
```

**Returns**:
- Accurate carbon emissions data
- Sustainability ratings (A-F scale)
- Offset cost calculations
- Environmental recommendations

### Data Sources & Accuracy

#### Flight Data Quality
- **Live Pricing**: Updated every 15-30 minutes
- **Availability**: Real-time seat availability
- **Routes**: 500M+ route combinations
- **Airlines**: 400+ airlines worldwide
- **Accuracy**: 95%+ price accuracy guarantee

#### Caching Strategy
- **Flight Data**: 5-minute TTL for price data
- **Route Info**: 1-hour TTL for static data  
- **Carbon Data**: 30-minute TTL for calculations
- **Fallback**: Mock data during API outages

#### Error Handling
- **Primary API Failure**: Automatic fallback to secondary provider
- **All APIs Down**: Serves cached data with timestamps
- **No Cache**: Falls back to enhanced mock data
- **Rate Limiting**: Intelligent request throttling

### Monitoring & Analytics

#### Real-Time Monitoring
- API response times and success rates
- Data freshness indicators
- Provider performance metrics
- Cost tracking per API call

#### Price Analytics
- Historical price trends (30-day history)
- Demand-based pricing predictions
- Route popularity analytics
- Seasonal price variation insights

### Development vs Production

#### Development Mode
```bash
NODE_ENV=development
# Uses test API endpoints with limited data
# Fallback to mock data when needed
# Reduced rate limits for testing
```

#### Production Mode  
```bash
NODE_ENV=production
# Full production API access
# Real-time pricing and availability
# Full rate limits and caching
# Complete monitoring and alerting
```

### Cost Optimization

#### API Usage Management
- Intelligent caching to reduce API calls
- Request batching for multiple searches
- Rate limiting to stay within quotas
- Cost monitoring with usage alerts

#### Estimated Costs (Monthly)
- **Amadeus API**: $50-200 (based on search volume)
- **Skyscanner API**: $100-300 (enterprise pricing)
- **Carbon Interface**: $20-50 (per calculation)
- **Azure Services**: $30-100 (storage and compute)

### Troubleshooting

#### Common Issues
1. **API Key Invalid**: Check environment variables
2. **Rate Limit Exceeded**: Implement request throttling
3. **No Flight Data**: Verify route and date validity
4. **Cache Issues**: Clear Redis cache and restart

#### Debug Mode
```bash
# Enable detailed API logging
DEBUG_FLIGHT_API=true
DEBUG_CARBON_CALCULATION=true
DEBUG_PRICE_MONITORING=true
```

### Future Enhancements

#### Planned Integrations
- **Sabre API**: Additional GDS integration
- **Google Flights**: Price comparison data
- **Weather APIs**: Disruption prediction
- **Airport APIs**: Real-time gate and delay info

#### Advanced Features
- Machine learning price predictions
- Dynamic pricing optimization
- Multi-city route planning
- Corporate travel integration

---

## 📊 API Usage Dashboard

<div align="center">
  <p><strong>Ready for 2030's Next-Generation Travel Experience</strong></p>
  <p>Built with ❤️ for the future of sustainable travel</p>
</div>
