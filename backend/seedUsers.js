const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const seedUsers = async () => {
    try {
        await connectDB();
        
        await User.deleteMany({});
        console.log('Cleared existing users');

        const users = [
            {
                name: 'System Admin',
                email: 'admin@example.com',
                password: 'password123',
                role: 'Admin',
                status: 'approved',
                tier: 'mandate'
            },
            {
                name: 'John Investor',
                email: 'investor@example.com',
                password: 'password123',
                role: 'Investor',
                status: 'approved',
                tier: 'intelligence'
            },
            {
                name: 'Jane Founder',
                email: 'founder@example.com',
                password: 'password123',
                role: 'Founder',
                status: 'approved',
                tier: 'mandate'
            },
            {
                name: 'Alice Analyst',
                email: 'analyst@example.com',
                password: 'password123',
                role: 'Analyst',
                status: 'approved',
                tier: 'intelligence'
            }
        ];

        for (const userData of users) {
            const user = new User(userData);
            await user.save(); // using .save() triggers the pre-save hook for password hashing
        }

        console.log('Users seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
