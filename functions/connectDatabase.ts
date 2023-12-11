import { MongoClient, Db } from 'mongodb';

async function connectDatabase(): Promise<Db> {
    //Put uri password in .env
    const uri = 'mongodb+srv://admin:root@authentification.mnzc47o.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db(); // Replace with your database name
        return database;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

export default connectDatabase;
