const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://abegas88:IZNwm83qdrYXv3GT@cluster0.44dc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=ControlerUsers";

async function updateUsers() {
    try {
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
