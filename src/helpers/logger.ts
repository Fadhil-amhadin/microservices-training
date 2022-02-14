const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp}: any) => {
    return `${timestamp}, [${level}], ${message}`
})
const logger = createLogger({
    level: 'info',
    format: combine (
        timestamp(), myFormat
    ),
    transports: [
      new transports.File({ filename: './logging/app.log', level: 'info' }),
      new transports.Console()
    ],
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}

export default logger