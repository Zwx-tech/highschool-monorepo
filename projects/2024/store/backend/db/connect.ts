import { Db, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGODB_URI);

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"; // Replace with your MongoDB connection string

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connect(): Promise<Db> {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You are connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  return client.db("store");
}
