import express from 'express';
const cors = require('cors');
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API 12345' });
});

app.get('/test',(req, res)=>{
  res.jsonp('testing 123');
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
