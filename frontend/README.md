# Cloud Security Alerts Frontend

A modern, responsive frontend application for monitoring and managing cloud security alerts.

## Features

- 📊 **Dashboard** - Comprehensive analytics with charts and statistics
- 🔍 **Alert Management** - Search, filter, and paginate through security alerts
- 📈 **Data Visualization** - Interactive charts using Recharts
- 🎨 **Modern UI** - Beautiful design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite and React

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Axios** - API client

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Configuration

The frontend connects to the backend API at `http://127.0.0.1:8000` by default. You can change this by setting the `VITE_API_URL` environment variable.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── package.json        # Dependencies
```

## Features Overview

### Dashboard
- Total alerts count
- Severity breakdown (pie chart)
- Status distribution (bar chart)
- Top sources (horizontal bar chart)
- Timeline of alerts (line chart)

### Alerts List
- Search functionality
- Filter by severity, status, and source
- Pagination
- Responsive table layout

### Alert Details
- Complete alert information
- Resource details
- Raw JSON view
- Metadata display

