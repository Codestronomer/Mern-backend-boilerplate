import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import config from './../config/config'
import mongoose from 'mongoose'

// configure express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    };
    console.info(`Server started on port ${config.port}`);
});

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database ${config.mongoUri}`)
})

export default app