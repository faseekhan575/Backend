const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}));

app.options('*', cors()); // enable preflight requests for all routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const routes = require('./routes/mail');
app.use("/api/mail", routes);

app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).send('CORS Error: Origin not allowed');
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
