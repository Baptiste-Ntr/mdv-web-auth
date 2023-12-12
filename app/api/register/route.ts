import axios from "axios";
import { MongoClient } from "mongodb";
import { NextApiRequest } from "next";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest) => {

    const uri = process.env.MONGO_DB_URI || ""
    const client = new MongoClient(uri)

    const db = "Authentification"
    const collection = "User"

    if (req.method === 'POST') {

        //@ts-ignore //disable json() ts error
        let { email, password, passwordConfirmation } = await req.json()

        try {
            await client.connect()
            const database = client.db(db)
            const users = database.collection(collection)

            const existUser = await users.findOne({ email })


            if (existUser) {
                return new Response('User already exist', {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } else {

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

                    let salt = await bcrypt.genSalt(10)
                    let hash = await bcrypt.hash(password, salt);
                    let hashConfirm = await bcrypt.hash(passwordConfirmation, salt);

                    password = hash
                    passwordConfirmation = hashConfirm

                    const user = await users.insertOne({ email, password })

                    if (user) {
                        return new Response('User created', {
                            status: 200,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                    } else {
                        return new Response('User not created', {
                            status: 400,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                    }
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