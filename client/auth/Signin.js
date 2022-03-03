import React, { useState } from 'react';
import { signin } from './api-auth';
import { auth } from './auth-helper';
import Redirect from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';


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
    const classes = useStyles()
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

    const { from } = props.location.state || {
        from: {
            pathname: '/'
        }
    }

    const { redirectToReferrer } = values
    if (redirectToReferrer) {
        return (<Redirect to={from} />)
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variat="h6" className={classes.title}>
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
                        className={classes.textField}
                        value={values.password}
                        onChange={handleChange('password')}
                        margin="normal"
                    />
                    <br />
                </CardContent>
                <CardActions>
                    <Button color="primary"
                        variant="contained"
                        onClick={clickSubmit}
                        className={classes.submit}>
                        Submit
                    </Button>
                </CardActions>
            </Card>

        </div>
    )
}