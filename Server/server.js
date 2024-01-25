
const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();
const port = 5000;

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '2712'));
const session = driver.session();


app.get('/', (req, res) => {
  res.send('Welcome to the Neo4j React App!');
});


app.get('/api/data', async (req, res) => {
  try {
    const result = await session.run('MATCH (n) RETURN n LIMIT 25');
    const nodes = result.records.map(record => record.get(0).properties);
    res.json(nodes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
