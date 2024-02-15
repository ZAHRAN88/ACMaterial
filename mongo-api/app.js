const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3001;

// MongoDB connection URI
const uri = 'mongodb+srv://323230221:790fXpXhf957Nl3U@cluster0.xfblsng.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  const db = client.db('Material'); // Replace 'your_database_name' with your database name

  // Middleware to parse JSON requests
  app.use(express.json());

  // POST request to add data
  app.post('/api/data', (req, res) => {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Insert data into MongoDB
    db.collection('M24').insertOne(data, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      res.status(201).json({ message: 'Data added successfully', id: result.insertedId });
    });
  });

  // GET request to retrieve data
  app.get('/api/data', (req, res) => {
    db.collection('M24').find().toArray((err, data) => {
      if (err) {
        console.error('Error retrieving data:', err);
        return res.status(500).json({ error: 'Error retrieving data' });
      }
      res.status(200).json(data);
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
