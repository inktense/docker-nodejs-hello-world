import express from 'express';
import { createClient } from 'redis';


const app = express();
const client = createClient({
  url: 'redis://redis-server:6379'
});

await client.connect();

client.on('error', err => console.log('Redis Client Error', err));
await client.set('visits', 0);

app.get('/', async (req, res) => {
  const value = await client.get('visits')
  if(value){
    res.send('Number of visits is ' + value);
    await client.set('visits', parseInt(value) + 1);
  }
});

app.listen(8081, () => {
  console.log('Listening on port 4001');
});