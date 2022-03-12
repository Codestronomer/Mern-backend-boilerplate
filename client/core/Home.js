import React from 'react'
import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card'
import { CardContent } from '@mui/material'
import { CardMedia } from '@mui/material'
import { Typography } from '@mui/material'
import bicyleImage from './../assets/images/bicycle-illustration.png'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    card: {
        borderRadius: 16,
        boxShadow: '0 8px 16px 0 #BDC9D7',
        overflow: 'hidden',
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
    },

    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400,
    }
}))

export default function Home() {
    const classes = useStyles()
    return (
        <Card className={classes.card} style={{
            borderRadius: "16px",
            boxShadow: '0 8px 16px 0 #BDC9D7',
            overflow: 'hidden'
        }}>
            <Typography variant="h6" className={classes.title} style={{
                margin: "7px",
            }}>
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