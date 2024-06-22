const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7000;

// middleware 
app.use(cors());
app.use(express.json());



// mongo code 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tawheedhello:tawheedhello@cluster0.wrpiuoe.mongodb.net/";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const userCollection = client.db('USERDB').collection('users')

    const categoriesCollection = client.db('USERDB').collection('categories')
    const postCollection = client.db('USERDB').collection('posts')
    const blogsCollection = client.db('USERDB').collection('blogs')


    app.get('/categories', async (req, res) => {
      const LeftNav = categoriesCollection.find()
      const result = await LeftNav.toArray();
      res.send(result);
    })


    app.get('/posts', async (req, res) => {
      const posts = postCollection.find()
      const result = await posts.toArray();
      res.send(result);
    })



    app.post('/blogs', async (req, res) => {
      const blogs = req.body;
      console.log('new user', blogs);
      const result = await blogsCollection.insertOne(blogs);
      res.send(result);
    });

    app.get('/blogs', async (req, res) => {
      const blogs = blogsCollection.find()
      const result = await blogs.toArray();
      res.send(result);
    })



    app.post('/posts', async (req, res) => {
      const posts = req.body;
      console.log('new user', posts);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/', (req, res) => {
  res.send('Simple crud is running')
});


app.listen(port, () => {
  console.log(`crud is running on ${port}`)
});


