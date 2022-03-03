import { create } from './api-user';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useState } from 'react'
import Card from '@mui/material/Card';
import { CardContent, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Typography } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';



const useStyles = makeStyles(theme => ({
    card: {
        borderRadius: 16,
        boxShadow: '0 8px 16px 0 #BDC9D7',
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

export default function Signup() {
    const classes = useStyles()

    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true })
            }
        })
    }

    return (
        <div>
            <Card className="{classes.card}">
                <CardContent>
                    <Typography variant="h6" className="{classes.title}">
                        Sign Up
                    </Typography>
                    <TextField id="name"
                        label="Name"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange('name')}
                        margin="normal"
                    />
                    <br />
                    <TextField id="email"
                        type="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange('email')}
                        margin="normal"
                    />
                    <br />
                    <TextField id="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        value={values.password}
                        onChange={handleChange('password')}
                        margin="normal"
                    />
                    <br />
                    {
                        values.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                        </Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary"
                        variat="contained"
                        onClick={clickSubmit}
                        className={classes.submit}>
                        Submit</Button>
                </CardActions>
            </Card>

            <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle>Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus="autoFocus" variat="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}