const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI and Client
const uri = "mongodb+srv://tawheedshimul:tawheedshimul@cluster0.ohlrycr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    const userCollection = client.db('USERDB').collection('users');
    const categoriesCollection = client.db('USERDB').collection('categories');
    const postCollection = client.db('USERDB').collection('posts');

    // Routes
    app.get('/categories', async (req, res) => {
      try {
        const categories = await categoriesCollection.find().toArray();
        res.send(categories);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch categories', error });
      }
    });

    app.get('/posts', async (req, res) => {
      try {
        const posts = await postCollection.find().toArray();
        res.send(posts);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch posts', error });
      }
    });

    app.post('/users', async (req, res) => {
      try {
        const user = req.body;
        console.log('New user:', user);
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to add user', error });
      }
    });

    // Base route
    app.get('/', (req, res) => {
      res.send('Simple CRUD is running');
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

connectToMongoDB().catch(console.error);

// Start server
app.listen(port, () => {
  console.log(`CRUD is running on port ${port}`);
});
