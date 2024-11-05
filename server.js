const express = require('express');
const app = express();
const db = require('./server/helper/db');
const cors = require('cors');

app.use(cors());
app.use(express.json());

db.getInstace();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});