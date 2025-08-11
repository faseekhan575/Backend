const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
const routes = require('./routes/mail')
app.use("/api/mail", routes)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
