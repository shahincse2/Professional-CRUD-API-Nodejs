const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// 1. Request logging (Morgan)
app.use(morgan('dev'));

// 2. Security rate limiting (maximum 100 requests in 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { status: "fail", message: "Too many requests, please try again later." }
});
app.use(limiter);

// 3. Body parser
app.use(express.json());

// 4. Connecting API routes
app.use('/api/v1', apiRoutes);

// 5. Wrong URL or Route Handler (4MD Error)
app.use((req, res) => {
    res.status(404).json({ status: "fail", message: "Route Not Found" });
});

// 6. Global error handler (will prevent server crash)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: "error", message: "Internal Server Error!" });
});

// 7. Start the server (local IP and local host will work both ways)
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Access on LAN: http://192.168.0.196:${PORT}`);
});