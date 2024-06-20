const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./lib/routes/route.js')

const app = express();

const PORT = 3000;
const SERVERNAME = '127.0.0.1';

app.use(cookieParser());
app.use('/api', router);

app.listen(PORT, SERVERNAME, () => {
    console.log(`Server runing on http://${SERVERNAME}:${PORT}`)
})
