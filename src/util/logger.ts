import {
    createLogger,
    format,
    transports
} from 'winston';
const {
    combine,
    timestamp,
    label,
    prettyPrint
} = format;
const logger = createLogger({
    level: 'info',
    format:
        combine(
            label({ label: 'environment : dev' }),
            timestamp({format: 'YYYY-MM-DD hh:mm:ss'}),
            prettyPrint()
        ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log', level: 'info' }),
        new transports.File({ filename: 'error.log', level: 'error' }),
    ]
});
export = logger;