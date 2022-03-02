import { pink } from '@material-ui/core/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: 'light',
        background: {
            default: '#f3f4f9',
        },
        primary: {
            main: '#2499ef',
            dark: '#2e355b',
            contrastText: '#fff'
        },
        secondary: {
            light: '#FFDBE4',
            main: '#ff4081',
            dark: '#AE939B',
            contrastText: '#000'
        },
        openTitle: '#3f4771',
        protectedTitle: pink['400'],
        type: 'light'
    }
});

export default theme