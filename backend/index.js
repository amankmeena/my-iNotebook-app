const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

connectToMongo();

// cors - Middleware
app.use(cors());

// Middleware: to get req.body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})