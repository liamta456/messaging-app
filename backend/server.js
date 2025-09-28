const express = require('express');
const app = express();
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/messages', authMiddleware, messageRoutes);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});