const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./lib/routes/route.js')
const { PORT } = require('./db/config.js')

const app = express();

const SERVERNAME = 'localhost';

app.use(cookieParser());
app.use('/api', router);

app.listen(PORT, SERVERNAME, () => {
    console.log(`Server runing on http://${SERVERNAME}:${PORT}`)
})
