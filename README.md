# Calc - Productivity Calculator

A modern, responsive calculator built with Next.js 14, TypeScript, and Tailwind CSS. Features dark/light mode toggle, keyboard support, and proper arithmetic operations.

## Features

- **Modern UI**: Clean, minimalist design with dark/light mode
- **Full Responsiveness**: Works on all device sizes
- **Keyboard Support**: Use digits, operators, Enter for equals, Escape to clear
- **Proper Calculations**: Implements PEMDAS with decimal precision
- **Error Handling**: Displays clear error messages for invalid operations
- **Accessibility**: ARIA labels and keyboard navigation support

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next-themes for dark mode
- React Hooks for state management

## Getting Started

### Development

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

### Build for Production

```bash
npm run build
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended for Coolify)

```bash
docker-compose up -d
```

### Environment Variables

- `PORT`: Port to run the application (default: 3000)
- `NEXT_PUBLIC_APP_NAME`: Application name (default: "Calc")

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/             # Utility functions (calculator logic)
├── public/          # Static assets
├── types/           # TypeScript type definitions
├── Dockerfile       # Container configuration
└── docker-compose.yml # Multi-container setup
```

## License

MIT