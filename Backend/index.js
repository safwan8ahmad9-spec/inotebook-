require('dotenv').config({ path: './key.env' });

var cors = require('cors');
const express = require('express');
const connectToMongo = require('./db');

connectToMongo();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('iNotebook backend is running');
});

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});