import React from 'react'
import { hydrate, render } from 'react-dom'
import App from './App'
import createEmotionCache from './../server/createEmotionCache'

// const cache = createEmotionCache();

// function Main() {
//     return (
//         <CacheProvider value={cache}>
//             <CssBaseline />
//             <App />
//         </CacheProvider>
//     );
// }

render(<App />, document.getElementById('root'))