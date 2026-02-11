# Calc - Modern Calculator

A clean, modern calculator web application built with Next.js, TypeScript, and Tailwind CSS. Designed for daily productivity with a fully responsive interface.

## Features

- Basic arithmetic operations (+, -, ×, ÷)
- Decimal point support
- Clear (C) and backspace (⌫) functionality
- Keyboard support for all operations
- Responsive design for mobile, tablet, and desktop
- Error handling (e.g., division by zero)
- Clean, modern UI with visual feedback

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Docker optimized for Coolify

## Quick Start

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

### Docker Deployment

#### Build and run with Docker:
```bash
npm run docker:build
npm run docker:run
```

#### Using Docker Compose:
```bash
npm run docker:compose
# or with rebuild:
npm run docker:compose-build
```

## Docker Configuration

The application is optimized for deployment with Coolify:

- Multi-stage Docker build for minimal image size
- Health checks configured
- Proper user permissions
- Production-ready configuration

### Environment Variables

Copy `.env.example` to `.env` and adjust as needed:
```bash
cp .env.example .env
```

## Project Structure

```
├── app/                    # Next.js app router pages and components
│   ├── components/        # Reusable React components
│   │   ├── Calculator.tsx
│   │   └── Button.tsx
│   ├── layout.tsx        # Root layout
│   ├── page.tsx         # Main calculator page
│   └── globals.css      # Global styles
├── lib/                  # Utility functions
│   └── calculate.ts     # Calculation logic
├── public/              # Static assets
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container

## License

MIT
