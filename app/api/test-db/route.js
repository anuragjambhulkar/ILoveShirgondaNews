import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URL;

    if (!uri) {
        return NextResponse.json({
            status: 'error',
            message: 'MONGODB_URI is not defined in environment variables'
        }, { status: 500 });
    }

    try {
        const client = await MongoClient.connect(uri, {
            connectTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });

        await client.db('admin').command({ ping: 1 });
        await client.close();

        return NextResponse.json({
            status: 'success',
            message: 'Successfully connected to MongoDB!'
        });
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'Failed to connect to MongoDB',
            error: error.message
        }, { status: 500 });
    }
}
