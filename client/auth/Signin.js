import React, { useState } from 'react';
import { signin } from './api-auth';
import auth from './auth-helper';
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Button, Card, CardActions, CardContent, Icon, TextField, Typography } from '@mui/material';


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


export default function Signin(props) {
    const classes = useStyles();
    const location = useLocation();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        signin(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirectToReferrer: true })
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const { from } = location.state || {
        from: {
            pathname: '/'
        }
    }

    const { redirectToReferrer } = values
    if (redirectToReferrer) {
        return (<Navigate to={from} />)
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" className={classes.title}>
                        Sign In
                    </Typography>
                    <TextField id="email" label="Email"
                        className={classes.textField}
                        value={values.email}
                        onChange={handleChange('email')}
                        margin="normal" />
                    <br />
                    <TextField id="password"
                        label="password"
                        type="password"
                        className={classes.textField}
                        value={values.password}
                        onChange={handleChange('password')}
                        margin="normal"
                    />
                    <br />
                    {
                        values.error && (<Typography color="error" component='p'>
                            <Icon className={classes.error} color="error">error</Icon>
                            {values.error}
                        </Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary"
                        variant="contained"
                        onClick={clickSubmit}
                        className={classes.submit}>
                        Sign In
                    </Button>
                </CardActions>
            </Card>

        </div>
    )
}