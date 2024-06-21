const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./lib/routes/route.js')
const { PORT } = require('./db/config.js')

const app = express();

app.use(cookieParser());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server runing on http://localhost:${PORT}`)
})
