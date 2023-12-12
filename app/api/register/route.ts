import axios from "axios";
import { MongoClient } from "mongodb";
import { NextApiRequest } from "next";

export const POST = async (req: NextApiRequest) => {

    const uri = process.env.MONGO_DB_URI || ""
    const client = new MongoClient(uri)

    const db = "Authentification"
    const collection = "User"

    if (req.method === 'POST') {

        //@ts-ignore //disable json() ts error
        const { email, password, passwordConfirmation } = await req.json()

        try {
            await client.connect()
            const database = client.db(db)
            const users = database.collection(collection)

            const user = await users.insertOne({ email, password })

            if (password.length < 8) {
                return new Response('Password too short, 8 characters minimum', {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } else if (password !== passwordConfirmation) {
                return new Response('Password and confirmation are not the same', {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } else if (password.length >= 8 && password === passwordConfirmation) {
                if (user) {
                    return new Response('User created', {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                } else {
                    return new Response('User not created', {
                        status: 404,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                }
            }

        } finally {
            await client.close()
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