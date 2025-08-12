const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const routes = require('./routes/mail');
app.use("/api/mail", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); 
