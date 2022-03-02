import React from 'react'
import { makeStyles } from '@mui/material'
import Card from '@mui/material/Card'
import { CardContent } from '@mui/material'
import { CardMedia } from '@mui/material'
import { Typography } from '@mui/material'
import bicyleImage from './../assets/images/bicycle-illustration.png'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },

    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400,
    }
}))

export default function Home() {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classses.title}>
                Home Page
            </Typography>
            <CardMedia className={classes.media} image={bicyleImage} title="Bicycle" />
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to the MERN boilerplate home page.
                </Typography>
            </CardContent>
        </Card>
    )
};