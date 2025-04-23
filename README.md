# Time Tracking Application

A time tracking application for managing work hours and periods.

## Deployment on NAS

### Prerequisites
- Docker installed on your NAS
- Docker Compose installed on your NAS

### Steps to Deploy

1. Create a directory on your NAS:
```bash
mkdir -p /volume1/docker/time-tracking-app
```

2. Copy all files to the NAS directory:
```bash
scp -r * user@your-nas-ip:/volume1/docker/time-tracking-app/
```

3. SSH into your NAS and navigate to the application directory:
```bash
ssh user@your-nas-ip
cd /volume1/docker/time-tracking-app
```

4. Build and start the application:
```bash
docker-compose up -d --build
```

The application will be available at:
- `http://your-nas-ip:3001`

### Data Persistence
- The database is stored in the `db` directory and is persisted through Docker volumes
- To backup your data, copy the `db` directory from the NAS

### Updating the Application
1. Copy new files to the NAS
2. Run:
```bash
docker-compose down
docker-compose up -d --build
```

## Development

### Running Locally
1. Install dependencies:
```bash
npm install
cd client && npm install
```

2. Start the server:
```bash
npm start
```

3. Start the client (in a new terminal):
```bash
cd client && npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

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