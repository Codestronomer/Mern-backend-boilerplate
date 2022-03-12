import React from 'react'
import { hydrate, render } from 'react-dom'
import App from './App'
import { CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from './../server/createEmotionCache'

const cache = createEmotionCache();

function Main() {
    return (
        <CacheProvider value={cache}>
            <CssBaseline />
            <App />
        </CacheProvider>
    );
}

render(<Main />, document.getElementById('root'))