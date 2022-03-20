import React from 'react'
import MainRouter from './MainRouter'
import { ThemeProvider, CacheProvider } from '@mui/material/styles'
import theme from './theme'
import { hot } from 'react-hot-loader'


const App = () => {

    return (

        <ThemeProvider theme={theme}>
            <MainRouter />
        </ThemeProvider>

    )

};

export default App;