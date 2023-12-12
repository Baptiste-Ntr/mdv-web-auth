import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Db } from 'mongodb';

export const GET = async (req: NextApiRequest) => {

    const uri = process.env.MONGO_DB_URI || ""
    const client = new MongoClient(uri)

    const db = "Authentification"
    const collection = "User"

    if (req.method === 'GET') {
        try {
            await client.connect();
            // console.log('Connected to MongoDB');

            const database = client.db(db)
            const users = database.collection(collection)

            if (users) {
                return new Response('Connected to MongoDB and Database', {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } else {
                return new Response('Failed to connect to Database', {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            }
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
            // res.status(500).json({ message: "Failed to connect to MongoDB" })
            return new Response('Failed to connect to MongoDB', {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },

            })
        }
    } else {
        // res.status(405).json({ message: "We only support GET" })
        return new Response('We only support GET', {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
            },

        })
    }

}