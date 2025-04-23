# Deloitte Time Tracking App

A time-tracking application to report and monitor work hours, split between client hours and general hours, using Deloitte's 28-day period system.

## Features

- 28-day period calendar view
- Default work week schedule (Sun-Wed: 8.5h, Thu: 8h, Fri-Sat: 0h)
- Client hours tracking (target: 143 hours per period)
- General hours tracking
- Leave and holiday handling
- Period-aware calendar UI
- Custom leave input form
- Auto-adjustment logic for absences
- Summarized reports

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. The server will start on port 3001 by default

## API Endpoints

- `GET /api/periods/current` - Get current period information
- `GET /api/periods/:periodNumber/workdays` - Get workdays for a specific period
- `PUT /api/workdays/:id` - Update workday hours

## Database

The application uses SQLite for data storage. The database file will be created automatically when you first run the application.

## License

MIT 