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
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import App from './../client/App'


// configure express
const app = express();

// Comment out before building for production
devBundle.compile(app);

// Middleware
// Parse body parmas and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(cookieParser());
app.use(compress())
// Secure apps by setting various HTTP headers
app.use(helmet());
// Enable CORS - Cross Origin Resouse Sharing
app.use(cors());

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// Routes
app.use('/', userRoutes);
app.use('/', authRoutes);


// for client side
app.use((req, res) => {
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  )

  res.status(staticContext.statusCode || 200);
  res.send(Template({ html: reactMarkup }));
  res.end();
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