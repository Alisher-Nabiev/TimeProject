const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/init');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Helper function to calculate period dates
function calculatePeriodDates(periodNumber) {
    // For period 9 (January 12 - February 8, 2025)
    const period9Start = new Date('2025-01-12T00:00:00.000Z');
    const period9End = new Date('2025-02-08T00:00:00.000Z');
    
    // For period 10 (February 9 - March 8, 2025)
    const period10Start = new Date('2025-02-09T00:00:00.000Z');
    const period10End = new Date('2025-03-08T00:00:00.000Z');
    
    // For period 11 (March 9 - April 5, 2025)
    const period11Start = new Date('2025-03-09T00:00:00.000Z');
    const period11End = new Date('2025-04-05T00:00:00.000Z');
    
    // For period 12 (April 6 - May 3, 2025)
    const period12Start = new Date('2025-04-06T00:00:00.000Z');
    const period12End = new Date('2025-05-03T00:00:00.000Z');
    
    // For period 13 (May 4 - May 31, 2025)
    const period13Start = new Date('2025-05-04T00:00:00.000Z');
    const period13End = new Date('2025-05-31T00:00:00.000Z');
    
    // For period 14 (June 1 - June 28, 2025)
    const period14Start = new Date('2025-06-01T00:00:00.000Z');
    const period14End = new Date('2025-06-28T00:00:00.000Z');
    
    // For period 15 (June 29 - July 26, 2025)
    const period15Start = new Date('2025-06-29T00:00:00.000Z');
    const period15End = new Date('2025-07-26T00:00:00.000Z');
    
    // For period 16 (July 27 - August 23, 2025)
    const period16Start = new Date('2025-07-27T00:00:00.000Z');
    const period16End = new Date('2025-08-23T00:00:00.000Z');
    
    // For period 17 (August 24 - September 20, 2025)
    const period17Start = new Date('2025-08-24T00:00:00.000Z');
    const period17End = new Date('2025-09-20T00:00:00.000Z');
    
    // For period 18 (September 21 - October 18, 2025)
    const period18Start = new Date('2025-09-21T00:00:00.000Z');
    const period18End = new Date('2025-10-18T00:00:00.000Z');
    
    // For period 19 (October 19 - November 15, 2025)
    const period19Start = new Date('2025-10-19T00:00:00.000Z');
    const period19End = new Date('2025-11-15T00:00:00.000Z');
    
    // For period 20 (November 16 - December 13, 2025)
    const period20Start = new Date('2025-11-16T00:00:00.000Z');
    const period20End = new Date('2025-12-13T00:00:00.000Z');
    
    // For period 21 (December 14 - December 31, 2025)
    const period21Start = new Date('2025-12-14T00:00:00.000Z');
    const period21End = new Date('2025-12-31T00:00:00.000Z');

    switch (periodNumber) {
        case 9:
            return { startDate: period9Start, endDate: period9End };
        case 10:
            return { startDate: period10Start, endDate: period10End };
        case 11:
            return { startDate: period11Start, endDate: period11End };
        case 12:
            return { startDate: period12Start, endDate: period12End };
        case 13:
            return { startDate: period13Start, endDate: period13End };
        case 14:
            return { startDate: period14Start, endDate: period14End };
        case 15:
            return { startDate: period15Start, endDate: period15End };
        case 16:
            return { startDate: period16Start, endDate: period16End };
        case 17:
            return { startDate: period17Start, endDate: period17End };
        case 18:
            return { startDate: period18Start, endDate: period18End };
        case 19:
            return { startDate: period19Start, endDate: period19End };
        case 20:
            return { startDate: period20Start, endDate: period20End };
        case 21:
            return { startDate: period21Start, endDate: period21End };
        default:
            throw new Error('Invalid period number. Must be between 9 and 21.');
    }
}

// Helper function to format date for database
function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Invalid date');
    }
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get current period
app.get('/api/periods/current', (req, res) => {
    try {
        // Start with period 11
        const periodNumber = 11;
        const { startDate, endDate } = calculatePeriodDates(periodNumber);
        
        res.json({
            periodNumber,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate)
        });
    } catch (error) {
        console.error('Error in /api/periods/current:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get workdays for a period
app.get('/api/periods/:periodNumber/workdays', (req, res) => {
    try {
        const periodNumber = parseInt(req.params.periodNumber, 10);
        if (isNaN(periodNumber) || periodNumber < 9 || periodNumber > 21) {
            throw new Error('Invalid period number. Must be between 9 and 21.');
        }
        const { startDate, endDate } = calculatePeriodDates(periodNumber);
        
        // First, check if we have workdays for this period
        db.all(
            `SELECT * FROM workdays WHERE date BETWEEN ? AND ? ORDER BY date`,
            [formatDate(startDate), formatDate(endDate)],
            (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ error: 'Database error' });
                    return;
                }

                // If no workdays exist or we don't have all days, create them
                if (rows.length === 0 || rows.length < Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1) {
                    // Delete existing workdays for this period to avoid duplicates
                    db.run(
                        `DELETE FROM workdays WHERE date BETWEEN ? AND ?`,
                        [formatDate(startDate), formatDate(endDate)],
                        (err) => {
                            if (err) {
                                console.error('Database error:', err);
                                res.status(500).json({ error: 'Database error' });
                                return;
                            }

                            const workdays = [];
                            const currentDate = new Date(startDate);
                            
                            while (currentDate <= endDate) {
                                const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
                                const isWorkDay = !['Friday', 'Saturday'].includes(dayOfWeek);
                                const expectedHours = isWorkDay ? (dayOfWeek === 'Thursday' ? 8 : 8.5) : 0;
                                
                                workdays.push({
                                    id: uuidv4(),
                                    period_id: uuidv4(),
                                    date: formatDate(currentDate),
                                    day_of_week: dayOfWeek,
                                    is_work_day: isWorkDay,
                                    expected_hours: expectedHours,
                                    logged_hours: 0,
                                    client_hours: 0,
                                    general_hours: 0,
                                    exception_type: null
                                });
                                
                                currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                            }

                            // Insert workdays into database
                            const stmt = db.prepare(`
                                INSERT INTO workdays (
                                    id, period_id, date, day_of_week, is_work_day, 
                                    expected_hours, logged_hours, client_hours, general_hours,
                                    exception_type
                                )
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `);

                            workdays.forEach(day => {
                                stmt.run(
                                    day.id,
                                    day.period_id,
                                    day.date,
                                    day.day_of_week,
                                    day.is_work_day,
                                    day.expected_hours,
                                    day.logged_hours,
                                    day.client_hours,
                                    day.general_hours,
                                    day.exception_type
                                );
                            });

                            stmt.finalize();
                            res.json(workdays);
                        }
                    );
                } else {
                    res.json(rows);
                }
            }
        );
    } catch (error) {
        console.error('Error in /api/periods/:periodNumber/workdays:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

// Get period summary
app.get('/api/periods/:periodNumber/summary', (req, res) => {
    try {
        const periodNumber = parseInt(req.params.periodNumber, 10);
        if (isNaN(periodNumber) || periodNumber < 9 || periodNumber > 21) {
            throw new Error('Invalid period number. Must be between 9 and 21.');
        }
        const { startDate, endDate } = calculatePeriodDates(periodNumber);
        
        db.get(
            `SELECT 
                SUM(logged_hours) as total_hours,
                SUM(client_hours) as total_client_hours,
                SUM(general_hours) as total_general_hours,
                COUNT(CASE WHEN is_work_day = 1 THEN 1 END) as total_workdays
            FROM workdays 
            WHERE date BETWEEN ? AND ?`,
            [formatDate(startDate), formatDate(endDate)],
            (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ error: 'Database error' });
                    return;
                }

                res.json({
                    periodNumber: periodNumber,
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                    totalHours: result.total_hours || 0,
                    totalClientHours: result.total_client_hours || 0,
                    totalGeneralHours: result.total_general_hours || 0,
                    totalWorkdays: result.total_workdays || 0,
                    remainingClientHours: Math.max(0, 143 - (result.total_client_hours || 0))
                });
            }
        );
    } catch (error) {
        console.error('Error in /api/periods/:periodNumber/summary:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

// Add exception (leave/holiday)
app.post('/api/exceptions', (req, res) => {
    try {
        const { date, type, hours_adjusted } = req.body;
        
        // Validate input
        if (!date || !type || hours_adjusted === undefined) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Check if exception already exists for this date
        db.get('SELECT * FROM exceptions WHERE date = ?', [date], (err, existing) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            if (existing) {
                res.status(400).json({ error: 'Exception already exists for this date' });
                return;
            }

            // Insert new exception
            const id = uuidv4();
            db.run(
                'INSERT INTO exceptions (id, date, type, hours_adjusted) VALUES (?, ?, ?, ?)',
                [id, date, type, hours_adjusted],
                function(err) {
                    if (err) {
                        console.error('Database error:', err);
                        res.status(500).json({ error: 'Database error' });
                        return;
                    }

                    // Update workday for this date
                    db.run(
                        `UPDATE workdays 
                         SET is_work_day = 0, 
                             expected_hours = 0 
                         WHERE date = ?`,
                        [date],
                        function(err) {
                            if (err) {
                                console.error('Database error:', err);
                                res.status(500).json({ error: 'Database error' });
                                return;
                            }
                            res.json({ 
                                message: 'Exception added successfully',
                                id,
                                date,
                                type,
                                hours_adjusted
                            });
                        }
                    );
                }
            );
        });
    } catch (error) {
        console.error('Error in /api/exceptions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get exceptions for a period
app.get('/api/periods/:periodNumber/exceptions', (req, res) => {
    try {
        const { periodNumber } = req.params;
        const { startDate, endDate } = calculatePeriodDates(parseInt(periodNumber));
        
        db.all(
            'SELECT * FROM exceptions WHERE date BETWEEN ? AND ? ORDER BY date',
            [formatDate(startDate), formatDate(endDate)],
            (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ error: 'Database error' });
                    return;
                }
                res.json(rows);
            }
        );
    } catch (error) {
        console.error('Error in /api/periods/:periodNumber/exceptions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update workday hours
app.put('/api/workdays/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { logged_hours, expected_hours } = req.body;
        
        // First get the current workday
        db.get('SELECT * FROM workdays WHERE id = ?', [id], (err, workday) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            if (!workday) {
                res.status(404).json({ error: 'Workday not found' });
                return;
            }

            // Calculate client vs general hours
            let clientHours = 0;
            let generalHours = 0;

            // Get total client hours for the period
            db.get(
                'SELECT SUM(client_hours) as total FROM workdays WHERE period_id = ?',
                [workday.period_id],
                (err, result) => {
                    if (err) {
                        console.error('Database error:', err);
                        res.status(500).json({ error: 'Database error' });
                        return;
                    }

                    const totalClientHours = result.total || 0;
                    const remainingClientHours = Math.max(0, 143 - totalClientHours);

                    if (remainingClientHours > 0) {
                        clientHours = Math.min(logged_hours, remainingClientHours);
                        generalHours = logged_hours - clientHours;
                    } else {
                        generalHours = logged_hours;
                    }

                    // Update the workday
                    db.run(
                        `UPDATE workdays 
                         SET logged_hours = ?, 
                             client_hours = ?, 
                             general_hours = ?,
                             expected_hours = ?
                         WHERE id = ?`,
                        [logged_hours, clientHours, generalHours, expected_hours, id],
                        function(err) {
                            if (err) {
                                console.error('Database error:', err);
                                res.status(500).json({ error: 'Database error' });
                                return;
                            }
                            res.json({ 
                                message: 'Updated successfully',
                                clientHours,
                                generalHours
                            });
                        }
                    );
                }
            );
        });
    } catch (error) {
        console.error('Error in /api/workdays/:id:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

// Add new endpoint for updating exception type (sick day/time off)
app.put('/api/workdays/:id/exception', (req, res) => {
    try {
        const { id } = req.params;
        const { exception_type } = req.body;
        
        // Update the workday with the exception
        db.run(
            `UPDATE workdays 
             SET exception_type = ?,
                 is_work_day = ?,
                 expected_hours = ?
             WHERE id = ?`,
            [
                exception_type,
                exception_type ? 0 : 1, // Set is_work_day to false if there's an exception
                exception_type ? 0 : null, // Set expected_hours to 0 if there's an exception
                id
            ],
            function(err) {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ error: 'Database error' });
                    return;
                }

                res.json({ 
                    message: 'Updated successfully',
                    id,
                    exception_type
                });
            }
        );
    } catch (error) {
        console.error('Error in /api/workdays/:id/exception:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 