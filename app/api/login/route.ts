import axios from 'axios';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export const POST = async (req: NextApiRequest) => {

    const uri = process.env.MONGO_DB_URI || ""
    const client = new MongoClient(uri)

    const db = "Authentification"
    const collection = "User"

    if (req.method === 'POST') {

        // axios.get('/connect').then(res => {
        //     console.log(res.status)
        // })

        //@ts-ignore //disable json() ts error
        const { email, password } = await req.json();

        console.log(email, password)


        try {
            await client.connect()
            const database = client.db(db)
            const users = database.collection(collection)

            // const user = await users.findOne({ "email": "test", "password": "test" })
            const user = await users.findOne({ email, password })

            if (user) {
                return new Response('Find User', {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } else {
                return new Response('User not found', {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            }
        } finally {
            await client.close();
        }
    } else {
        return new Response('We only support POST', {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

}