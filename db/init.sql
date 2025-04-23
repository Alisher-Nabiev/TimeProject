CREATE TABLE IF NOT EXISTS periods (
    id TEXT PRIMARY KEY,
    period_number INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS workdays (
    id TEXT PRIMARY KEY,
    period_id TEXT NOT NULL,
    date DATE NOT NULL,
    day_of_week TEXT NOT NULL,
    is_work_day BOOLEAN NOT NULL,
    expected_hours REAL NOT NULL,
    logged_hours REAL DEFAULT 0,
    client_hours REAL DEFAULT 0,
    general_hours REAL DEFAULT 0,
    FOREIGN KEY (period_id) REFERENCES periods(id)
);

CREATE TABLE IF NOT EXISTS exceptions (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    type TEXT NOT NULL,
    hours_adjusted REAL NOT NULL
); 