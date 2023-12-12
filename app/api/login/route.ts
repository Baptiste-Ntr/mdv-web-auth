import axios from 'axios';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcryptjs';

export const POST = async (req: NextApiRequest) => {

    const uri = process.env.MONGO_DB_URI || ""
    const client = new MongoClient(uri)

    const db = "Authentification"
    const collection = "User"

    if (req.method === 'POST') {

        //@ts-ignore //disable json() ts error
        const { email, password } = await req.json();

        console.log(email, password)


        try {
            await client.connect()
            const database = client.db(db)
            const users = database.collection(collection)

            const user = await users.findOne({ email })

            if (user) {

                const compare = await bcrypt.compare(password, user.password)

                if (compare) {
                    console.log("User found")
                    return new Response('Find User', {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                } else {
                    console.error('Wrong password')
                    return new Response('Wrong password', {
                        status: 401,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                }
            } else {
                console.log("User not found")
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