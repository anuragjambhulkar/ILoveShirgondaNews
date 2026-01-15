const { MongoClient } = require('mongodb');

// The connection string from your .env
const uri = "mongodb+srv://rameshbhos96_db_user:Ql5bfboTnVvQwwP1@cluster0.mirjol4.mongodb.net/shrigonda_news?retryWrites=true&w=majority&appName=Cluster0";

console.log("Testing MongoDB connection...");
console.log("URI:", uri.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

async function testConnection() {
    try {
        console.log("Attempting to connect...");
        const client = new MongoClient(uri, {
            connectTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });

        await client.connect();
        console.log("✅ SUCCESS! Connected to MongoDB successfully.");

        const db = client.db('shrigonda_news');
        const result = await db.command({ ping: 1 });
        console.log("Ping result:", result);

        await client.close();
    } catch (error) {
        console.error("❌ FAILED to connect.");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);

        if (error.message.includes('ECONNREFUSED')) {
            console.log("\n--- DIAGNOSIS ---");
            console.log("ECONNREFUSED means the connection was blocked by a firewall.");
            console.log("Since you already whitelisted the IP in MongoDB Atlas,");
            console.log("this is 99% likely caused by YOUR HOSTING PROVIDER blocking outgoing port 27017.");
            console.log("You must contact their support and ask to open port 27017.");
        }
    }
}

testConnection();
