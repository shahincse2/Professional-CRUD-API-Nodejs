const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// ১. রিকোয়েস্ট লগিং (Morgan)
app.use(morgan('dev'));

// ২. সিকিউরিটি রেট লিমিটিং (১৫ মিনিটে সর্বোচ্চ ১০০ রিকোয়েস্ট)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { status: "fail", message: "Too many requests, please try again later." }
});
app.use(limiter);

// ৩. বডি পার্সার
app.use(express.json());

// ৪. এপিআই রুটস কানেক্ট করা
app.use('/api/v1', apiRoutes);

// ৫. ভুল URL বা Route হ্যান্ডলার (৪MD Error)
// কোনো পাথ ('*') বা '(.*)' দেওয়ার প্রয়োজন নেই
app.use((req, res) => {
    res.status(404).json({ status: "fail", message: "Route Not Found" });
});

// ৬. গ্লোবাল এরর হ্যান্ডলার (সার্ভার ক্রাশ হওয়া ঠেকাবে)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: "error", message: "Internal Server Error!" });
});

// ৭. সার্ভার স্টার্ট (লোকাল আইপি এবং লোকাল হোস্ট দুইভাবেই কাজ করবে)
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Access on LAN: http://192.168.0.196:${PORT}`);
});