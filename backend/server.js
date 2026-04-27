const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const ndaRoutes = require('./routes/nda');
const dataRoutes = require('./routes/data');
const accessRequestRoutes = require('./routes/accessRequest');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/access-requests', accessRequestRoutes);

app.use('/api/v1/nda', ndaRoutes);
app.use('/api/v1/data', dataRoutes);

app.get('/', (req, res) => {
    res.send('NDA & Role Management System API is running...');
});

const seedDatabase = require('./config/seeder');

const startServer = async () => {
    await connectDB();
    await seedDatabase();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
};

startServer();
