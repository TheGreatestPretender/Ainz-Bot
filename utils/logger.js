const winston = require('winston');

//creating logger structure
const logger = windston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({ fileName: 'error.log', level: 'error'}),
        new winston.transports.File({ fileName: 'combined.log' }),
    ]
});


//if we are not in prod then log to the console with the format:
//`${info.level}: ${info.message} JSON.stringify({ ...rest }) 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}

module.exports = {
    logger: logger
}