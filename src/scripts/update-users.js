const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

async function updateUsers() {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not set');
        }
        
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        // Update all existing users to set emailVerified to false if it doesn't exist
        const result = await mongoose.connection.db.collection('users').updateMany(
            { emailVerified: { $exists: false } },
            { $set: { emailVerified: false } }
        );

        console.log(`Updated ${result.modifiedCount} users`);
        
        // Show all users and their verification status
        const users = await mongoose.connection.db.collection('users').find({}).toArray();
        console.log("\nAll users:");
        users.forEach(user => {
            console.log(`- ${user.email}: emailVerified = ${user.emailVerified}`);
        });

        await mongoose.disconnect();
        console.log("\nDone!");
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

updateUsers();
