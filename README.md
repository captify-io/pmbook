# @captify-io/pmbook

Strategic alignment and business operations platform for government contracting, built for the Captify framework.

## Overview

PMBook is a comprehensive project management and business operations platform designed specifically for government contractors. It provides tools for strategic planning, contract management, performance tracking, and business intelligence.

## Installation

### As a Captify Package

```bash
# Install in a Captify application
npm install @captify-io/pmbook
# or
pnpm add @captify-io/pmbook
```

### Usage with Captify Core

```javascript
import { CommandCenter } from "@captify-io/pmbook/app";
import { ContractService } from "@captify-io/pmbook/services";
```

## Features

### 📊 Command Center
- Real-time business health monitoring
- Key performance indicators (KPIs)
- Executive dashboards
- Alert management

### 📑 Contract Management
- Contract lifecycle tracking
- Financial performance monitoring
- Compliance management
- Document storage and retrieval

### 📈 Performance Tracking
- Business metrics analysis
- Burn rate calculations
- Revenue forecasting
- Trend analysis

### 🎯 Strategic Planning
- OKR management
- Strategic initiative tracking
- Roadmap visualization
- Goal alignment

### 💼 Work Stream Management
- Project portfolio management
- Resource allocation
- Task tracking
- Team collaboration

### 🔍 Intelligence & Analytics
- Business intelligence dashboards
- Predictive analytics
- Custom reporting
- Data-driven insights

### 🛠️ Service Delivery
- Service catalog management
- SLA tracking
- Incident management
- Customer satisfaction metrics

## Package Structure

```
@captify-io/pmbook/
├── app/          # Client-side React components and pages
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and helpers
├── services/     # Server-side business logic
└── types/        # TypeScript type definitions
```

## Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- TypeScript 5+

### Setup

```bash
# Clone the repository
git clone https://github.com/captify-io/pmbook.git
cd pmbook

# Install dependencies
pnpm install

# Build the package
pnpm build

# Development mode with hot reload
pnpm dev
```

### Scripts

- `pnpm build` - Build all package exports
- `pnpm dev` - Start development mode with file watching
- `pnpm clean` - Clean build artifacts
- `pnpm type-check` - Run TypeScript type checking

## API Reference

### Client Components

#### CommandCenter
Main dashboard component displaying business metrics and KPIs.

```typescript
import { CommandCenter } from "@captify-io/pmbook/app";
```

#### ContractsPage
Contract management interface with CRUD operations.

```typescript
import { ContractsPage } from "@captify-io/pmbook/app";
```

### Server Services

#### ContractService
Backend service for contract data management.

```typescript
import { ContractService } from "@captify-io/pmbook/services";
```

#### PerformanceService
Analytics and performance calculation service.

```typescript
import { PerformanceService } from "@captify-io/pmbook/services";
```

## Configuration

The package integrates seamlessly with Captify's configuration system. Ensure your Captify application has the necessary AWS credentials and DynamoDB tables configured.

### Required Environment Variables

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

### DynamoDB Tables

The following tables are required:
- `Contracts`
- `Performance`
- `Strategic`
- `WorkStreams`
- `Services`

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and questions:
- GitHub Issues: [https://github.com/captify-io/pmbook/issues](https://github.com/captify-io/pmbook/issues)
- Documentation: [Captify Docs](https://docs.captify.io)

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Captify IO

---

Built with ❤️ for the government contracting community.