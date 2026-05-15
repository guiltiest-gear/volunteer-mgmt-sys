// backend/server.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CSC131',
    database: 'careerfair'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// API route to get users
app.get('/api/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Sign Up endpoint
app.post('/api/signup', (req, res) => {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    // Check if email already exists
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if ((/** @type {Array<any>} */ (results)).length > 0) {
            res.status(409).json({ error: 'Email already registered' });
            return;
        }

        // Insert new user
        connection.query(
            'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
            [full_name, email, password, role],
            (err, results) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(201).json({ 
                    message: 'User created successfully',
                    userid: (/** @type {{ insertId: number }} */ (results)).insertId,
                    full_name,
                    email,
                    role
                });
            }
        );
    });
});

// Sign In endpoint
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password required' });
        return;
    }

    connection.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            if ((/** @type {Array<any>} */ (results)).length === 0) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }

            const user = (/** @type {Array<any>} */ (results))[0];
            res.json({
                message: 'Signed in successfully',
                userid: user.userid,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            });
        }
    );
});

// Update email endpoint
app.post('/api/update-email', (req, res) => {
    const { userid, email } = req.body;

    if (!userid || !email) {
        res.status(400).json({ error: 'userid and email are required' });
        return;
    }

    connection.query('SELECT * FROM users WHERE email = ? AND userid != ?', [email, userid], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if ((/** @type {Array<any>} */ (results)).length > 0) {
            res.status(409).json({ error: 'Email already in use' });
            return;
        }

        connection.query('UPDATE users SET email = ? WHERE userid = ?', [email, userid], (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Email updated successfully', email });
        });
    });
});

// Update password endpoint
app.post('/api/update-password', (req, res) => {
    const { userid, currentPassword, newPassword } = req.body;

    if (!userid || !currentPassword || !newPassword) {
        res.status(400).json({ error: 'userid, currentPassword, and newPassword are required' });
        return;
    }

    connection.query('SELECT * FROM users WHERE userid = ? AND password = ?', [userid, currentPassword], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if ((/** @type {Array<any>} */ (results)).length === 0) {
            res.status(401).json({ error: 'Current password is incorrect' });
            return;
        }

        connection.query('UPDATE users SET password = ? WHERE userid = ?', [newPassword, userid], (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Password updated successfully' });
        });
    });
});

app.listen(5000, () => {
    console.log('Backend server running on port 5000');
});