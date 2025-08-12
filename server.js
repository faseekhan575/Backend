const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3001;

const allowedOrigins = process.env.ALLOWED_ORIGIN
? process.env.ALLOWED_ORIGIN.split(',').map(origin => origin.trim())
: [];

  app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const routes = require('./routes/mail');
app.use("/api/mail", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); 
