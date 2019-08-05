const express = require('express')
const bodyParser = require("body-parser")
const api = require('./routes/api')
const cors = require('cors')

const PORT = 3000

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api', api) //consuming the api route


// app.get('/', (req, res) => {
//     res.send("Hello from the server!")
// })
app.listen(PORT, () => {
    console.log("Server running on locahost: " + PORT)
})