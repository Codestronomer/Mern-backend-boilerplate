import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import config from './../config/config'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// configure express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// Routes
app.use('/', userRoutes);
app.use('/', authRoutes);


app.get('/', async (req, res) => {
    res.status(200).send(Template())
});

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ "error": err.name + ":" + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ":" + err.message })
        console.log(err)
    }
});


export default app