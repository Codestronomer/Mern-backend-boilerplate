import { read } from 'api-user.js';
import React, { useState, useEffect } from 'react';
import auth from './../auth/auth-helper';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ListItemSecondaryAction } from '@mui/material';
import { ListItemText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Person } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { Redirect, Link } from 'react-router-dom'
import DeleteUser from './DeleteUser';



const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },

    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
}))

export default function Profile({ match }) {
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal
        const jwt = auth.isAuthenticated()

        read({
            userId: match.params.userId
        }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [match.params.userId])
    if (redirectToSignin) {
        return <Redirect to="/signin" />
    }

    return (
        <Paper className={useStyles.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                    {
                        auth.isAuthenticated().user && auth.isAuthenticated().user._Id == user._id &&
                        (
                            <ListItemSecondaryAction>
                                <Link to={`/user/edit/${user._id}`}>
                                    <IconButton aria-label="Edit" color="primary">
                                        <Edit />
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={user._id} />
                            </ListItemSecondaryAction>
                        )
                    }
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()} />
                </ListItem>
            </List>
        </Paper>
    )
}