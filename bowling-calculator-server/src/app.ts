const express = require('express')
const cors = require('cors')
const http = require('http')
const app = express()
const server = http.Server(app)

app.use(cors());

//import controller för handling http-requests.
const bowling_rest_controller = require('./routes/bowling-calculator-routes');

//set path to api-calls.
app.use('/bowling-calculator', bowling_rest_controller);

//Start listening on port 8989.
const PORT = 5000
server.listen(PORT, () => console.log(`Server listening on Port ${PORT}`))
