import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb+srv://rameshbhos96_db_user:Ql5bfboTnVvQwwP1@cluster0.mirjol4.mongodb.net/?appName=Cluster0';
const dbName = process.env.DB_NAME || 'shrigonda_news';

let cachedPromise = null;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

export async function connectToDatabase() {
  if (cachedPromise) {
    return cachedPromise;
  }

  const opts = {
    maxPoolSize: 10,
    minPoolSize: 1, // Reduced for serverless
    connectTimeoutMS: 10000, // Fail faster (10s)
    socketTimeoutMS: 45000,
  };

  console.log('🔌 Connecting to MongoDB...');
  console.log('URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Log masked URI

  cachedPromise = MongoClient.connect(uri, opts).then((client) => {
    console.log('✅ Connected to MongoDB:', dbName);
    return {
      client,
      db: client.db(dbName),
    };
  }).catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    console.error('❌ Cause:', error.cause);
    cachedPromise = null; // Reset promise on error so we can try again
    throw error;
  });

  return cachedPromise;
}

export async function getCollection(collectionName) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}