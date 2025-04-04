import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = "devflow"; // Change to your DB name

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(MONGODB_DB);
    console.log("✅ Connected to MongoDB");
  }
  return db;
}
