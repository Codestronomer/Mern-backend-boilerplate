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
import MainRouter from './../client/MainRouter';
import { CacheProvider, ThemeProvider } from '@mui/material/styles';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from './createEmotionCache';
import theme from './../client/theme';
import { CssBaseline } from '@mui/material';
import App from './../client/App'

function renderFullPage(html, css) {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>My page</title>
        ${css}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <App />
            </ThemeProvider>
        </CacheProvider>,
    );


    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(html);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    // Send the rendered page back to the client.
    res.send(renderFullPage(html, emotionCss));
}

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
app.use(compress())
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


// for client side 
// app.use(handleRender);

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