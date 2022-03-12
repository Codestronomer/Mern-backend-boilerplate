import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
// import config from './../config/config'
import Template from './../template';
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle'

//  modules for server side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server'
import MainRouter from './../client/MainRouter';
import { CacheProvider, ThemeProvider } from '@mui/material/styles';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from './createEmotionCache';
import theme from './../client/theme';
import { CssBaseline } from '@mui/material';
import App from './../client/App'


const CURRENT_WORKING_DIR = process.cwd();

// configure express
const app = express();

// Comment out before building for production
devBundle.compile(app);

// Middleware
// Parse body parmas and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(cookieParser());
app.use(compress());
// Secure apps by setting various HTTP headers
app.use(helmet());
// Enable CORS - Cross Origin Resouse Sharing
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


// Routes
app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.send(Template())
})
// Catch unauthorized errors
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ "error": err.name + ":" + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ":" + err.message })
        console.log(err)
    }
});


export default app