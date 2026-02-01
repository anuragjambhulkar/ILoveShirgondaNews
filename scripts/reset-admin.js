const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// URI from your configuration
const uri = "mongodb+srv://rameshbhos96_db_user:Ql5bfboTnVvQwwP1@cluster0.mirjol4.mongodb.net/?appName=Cluster0";
const dbName = 'shrigonda_news';

async function resetAdmin() {
    console.log("🔌 Connecting to MongoDB Atlas...");
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Connected.");

        const db = client.db(dbName);
        const users = db.collection('users');

        const username = 'admin';
        const newPassword = 'admin123';
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(newPassword, salt);

        // Check if admin exists
        const existingAdmin = await users.findOne({ username: 'admin' });

        if (existingAdmin) {
            console.log(`Found existing admin user (ID: ${existingAdmin.id || existingAdmin._id}). Updating password...`);
            await users.updateOne(
                { username: 'admin' },
                {
                    $set: {
                        password: passwordHash,
                        updatedAt: new Date().toISOString()
                    }
                }
            );
            console.log("✅ Admin password updated to 'admin123'.");
        } else {
            console.log("Admin user not found. Creating new admin...");
            await users.insertOne({
                id: uuidv4(),
                username: 'admin',
                name: 'Admin User',
                email: 'admin@shrigondanews.com',
                password: passwordHash,
                role: 'admin',
                createdAt: new Date().toISOString()
            });
            console.log("✅ Created new admin user: admin / admin123");
        }

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await client.close();
        console.log("🔌 Disconnected.");
    }
}

resetAdmin();
