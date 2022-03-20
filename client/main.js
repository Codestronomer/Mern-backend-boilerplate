import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import createEmotionCache from './../server/createEmotionCache'

const renderMethod = module.hot ? render : hydrate;

renderMethod(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)