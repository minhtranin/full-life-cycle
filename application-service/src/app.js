import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import routes from './routes';
import cookieParser from 'cookie-parser';
// import Redis from 'ioredis';
import config from './config';
import fs from 'fs';
import { importDb, workerLoop } from './utils/event';

const app = express();

// const redis = new Redis({
//     port: config.redisPort,
//     host: config.redisHost,
//     password: config.redisPass
// });

// redis.on('error', (error) => {
//     console.error(error.message, error);
//     process.exit(1);
// });
app.on('import', importDb);

// redis.monitor(function (err, monitor) {
//     monitor.on("monitor", function (time, args, source, database) {
//         console.log(`${new Date()}-${args}-${source}`)
//     });
//   });

//   redis.subscribe('crawler');
//   redis.on('message', function(channel, message){
//     // app.emit('import', message);
//     console.log(message);
//   });
// workerLoop(); loop to check available queue
// const lua = fs.readFileSync(__dirname + '/../script.lua').toString();
// redis.defineCommand('testcommand', {
//   numberOfKeys: 0,
//    lua,
// });
// redis.testcommand("linkedlist for queue", (err, e) => {
//     console.log(e, 'Ss', err);
// });
// app.locals.redis = redis;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(morgan('dev', {
    skip(req, res) {
        return req.originalUrl === '/healthz' && res.statusCode === 200;
    }
}));
// app.use(app.router);
app.use('/', routes);
app.use((_, res) => {
    console.log(res.data);
    //return ''
    return res.status(200).send(res.data);
});
app.use(errorHandler());
app.listen(config.port, () => {
    console.log('Express server listening on %d, in %s mode',
        config.port, app.get('env'));
});
export default app;

/**
 * @author Minhtran
 */
