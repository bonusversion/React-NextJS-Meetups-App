import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://bonusversion:gaor5WG2A7NcPj0K@cluster0-shard-00-00.gkbnc.mongodb.net:27017,cluster0-shard-00-01.gkbnc.mongodb.net:27017,cluster0-shard-00-02.gkbnc.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-5qtmtj-shard-0&authSource=admin&retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log("result", result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
};
export default handler;
