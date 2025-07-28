# Duel API

A backend service for managing duels and game interactions. Built with NestJS and TypeScript.

## What's this?

This API handles the backend logic for duel-based gameplay. It connects to a PostgreSQL database hosted on AWS RDS and is deployed on Heroku in the EU region.

## Getting Started

### Prerequisites
- Node.js (18+)
- Bun
- PostgreSQL database

### Installation

```bash
bun install
```

### Environment Setup

Copy the environment variables and update them:

```bash
cp .env.example .env
```

Make sure to set:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NODE_ENV` - Set to `development` for local work
- `PORT` - API port (defaults to 3000)
- `CORS_ORIGIN` - Frontend URL for CORS

### Running the API

```bash
# Development with hot reload
bun run start:dev

# Production build
bun run build
bun run start:prod
```

## Database

The API uses PostgreSQL with SSL enabled for production. Database migrations and schema are managed through the application.

## Deployment

This project is set up for Heroku deployment with Terraform for infrastructure management:

```bash
# Deploy infrastructure
cd terraform
terraform plan
terraform apply

# Deploy code to Heroku
git push heroku main
```

The app runs in the EU region (`eu`) on Heroku.

## API Documentation

*Add your API endpoints documentation here as you build them*

## Development

```bash
# Run tests
bun test

# Run tests with coverage
bun run test:cov

# Run e2e tests
bun run test:e2e
```

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (AWS RDS)
- **Deployment**: Heroku (EU region)
- **Infrastructure**: Terraform
- **Runtime**: Bun

## Contributing

This is a personal project, but if you spot any issues or have suggestions, feel free to open an issue.

## License

MIT
