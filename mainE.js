const express = require('express')
const app = express()
const fs = require('fs')
const winston = require('winston')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// middleware to log request information and display console output on the web page
app.use(function(req, res, next) {
    // log request information
    logger.info(req.method + ' ' + req.url);
    // display console output on the web page
    console.log = function(d) {
        process.stdout.write(d + '\n');
        logger.info(d);
    };
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/logs', function(req, res) {
    res.set('Content-Type', 'text/plain');
    let readStream = fs.createReadStream('logs/combined.log');
    readStream.pipe(res);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
