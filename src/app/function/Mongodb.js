import { MongoClient } from 'mongodb';

const uri = "";
let client;

// Function to connect to the database
async function connectToDatabase() {
  if (!client) {
    try {
      client = new MongoClient(uri);
      await client.connect();  // Attempt to connect to the database
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error.message);
      throw new Error("Database connection failed");
    }
  }
  return client;  // Return the existing client
}

// Function to get a specific collection from the database
async function getCollection(collectionName) {
  const client = await connectToDatabase();
  try {
    const db = client.db("userData");
    return db.collection(collectionName);  // Return the collection
  } catch (error) {
    console.error("Error accessing collection:", error.message);
    throw new Error("Could not access the specified collection");
  }
}

// Function to close the database connection (optional)
async function closeConnection() {
  if (client) {
    try {
      await client.close();  // Close the client connection
      client = null;  // Set client to null after closing
      console.log("MongoDB connection closed");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error.message);
    }
  }
}

process.on('SIGINT', async () => {
   closeConnection();
    process.exit(0);
  });

export { getCollection, closeConnection };
