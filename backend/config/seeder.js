const mongoose = require('mongoose');
const User = require('../models/User');
const SensitiveData = require('../models/SensitiveData');
const NDAVersion = require('../models/NDAVersion');

const seedDatabase = async () => {
    try {
        const dbName = mongoose.connection.name;
        console.log(`--- Seeding Process Started for DB: ${dbName} ---`);

        // 1. Seed Users
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (!adminExists) {
            console.log('Seeding pre-defined users...');
            const users = [
                { name: 'System Admin', email: 'admin@example.com', password: 'password123', role: 'Admin', status: 'approved', tier: 'mandate' },
                { name: 'Elite Investor', email: 'investor@example.com', password: 'password123', role: 'Investor', status: 'approved', tier: 'intelligence' },
                { name: 'Startup Founder', email: 'founder@example.com', password: 'password123', role: 'Founder', status: 'approved', tier: 'mandate' },
                { name: 'Data Analyst', email: 'analyst@example.com', password: 'password123', role: 'Analyst', status: 'approved', tier: 'intelligence' },
            ];
            await User.create(users);
            console.log('Users seeded successfully');
        }

        // 2. Seed Sensitive Data
        const dataExists = await SensitiveData.findOne({ title: 'Q1 Financial Projection' });
        if (!dataExists) {
            console.log('Seeding sensitive data assets...');
            const dummyData = [
                { 
                    title: 'Q1 Financial Projection', 
                    content: 'Highly confidential revenue forecasts showing 300% growth potential in the AI sector.', 
                    allowedRoles: ['Admin', 'Investor', 'Analyst'] 
                },
                { 
                    title: 'Internal Security Audit', 
                    content: 'Detailed report on firewall configurations and potential vulnerability patches.', 
                    allowedRoles: ['Admin', 'Analyst'] 
                },
                { 
                    title: 'Founder Strategy Roadmap', 
                    content: 'Secret plans for the next 2 years including M&A targets and new product launches.', 
                    allowedRoles: ['Admin', 'Founder'] 
                }
            ];
            await SensitiveData.insertMany(dummyData);
            console.log('Sensitive data seeded successfully');
        }

        // 3. Seed NDA Version
        const ndaExists = await NDAVersion.findOne({ version: 'v1.0' });
        if (!ndaExists) {
            console.log('Seeding initial NDA version...');
            await NDAVersion.create({
                version: 'v1.0',
                effective_date: new Date(),
                summary_text: [
                    "Confidential information is restricted",
                    "Use limited to approved purposes",
                    "Digital signatures are audit-logged"
                ],
                is_active: true
            });
            console.log('NDA Version seeded successfully');
        }

        console.log('--- Seeding Process Completed ---');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    }
};

module.exports = seedDatabase;
