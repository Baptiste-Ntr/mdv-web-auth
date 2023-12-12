import { MongoClient, Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export const Login = async (req: NextApiRequest, res: NextApiResponse) => {

    const uri = process.env.MONGO_DB_URI || ""
    const client = new MongoClient(uri)

    const db = "Authentification"
    const collection = "User"

    if (req.method === 'GET') {
        const { email, password } = req.body;

        try {
            await client.connect()
            const database = client.db(db)
            const users = database.collection(collection)

            const user = await users.findOne({ email, password })

            if (user) {
                res.status(200).json({ message: "User found" })
            } else {
                res.status(401).json({ message: "User not found" })
            }
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: "We only support GET" })
    }

}