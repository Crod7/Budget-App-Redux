// Checks to see if a user exists in the database by email. Returns true or false. 

import clientPromise from "@/lib/database/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Budget_App");

        if (req.method === "GET") {
            const { email } = req.query;

            if (!email) {
                return res.status(400).json({ error: "email is required" });
            }

            const existingUser = await db.collection("Users").findOne({ email });

            if (existingUser) {
                return res.status(200).json({ exists: true });
            } else {
                return res.status(200).json({ exists: false });
            }
        } else {
            return res.status(400).json({ error: "Bad Request" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "An error occurred" });
    }
};
