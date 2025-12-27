import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// --- DATABASE PATH CONFIGURATION ---
// Vercel: Use /tmp (Temporary storage)
// Local: Use project root (process.cwd())
const DB_FILE = process.env.VERCEL 
    ? path.join('/tmp', 'bookings.json') 
    : path.join(process.cwd(), 'bookings.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// --- Helper Function: Safely Read Database ---
const readDatabase = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            fs.writeFileSync(DB_FILE, JSON.stringify([]));
            return [];
        }
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return fileContent.trim() ? JSON.parse(fileContent) : [];
    } catch (err) {
        console.error("Database read error:", err);
        return [];
    }
};

// --- API Routes ---

app.get('/api/bookings', (req, res) => {
    const data = readDatabase();
    res.json(data);
});

app.post('/api/bookings', (req, res) => {
    try {
        const bookings = readDatabase();
        const newBooking = req.body;
        bookings.push(newBooking);
        fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
        res.status(201).json(newBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save booking' });
    }
});

app.delete('/api/bookings/:id', (req, res) => {
    try {
        let bookings = readDatabase();
        const { id } = req.params;
        bookings = bookings.filter(b => b.id !== id);
        fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

// --- SERVE REACT FRONTEND (Production/Vercel) ---
// Note: On Vercel, the frontend is served by their CDN, but this fallback 
// allows local "npm run start" to work if you built the app.
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

// Start Server (Only if running locally)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
        console.log(`💾 Data File: ${DB_FILE}`);
    });
}

export default app;