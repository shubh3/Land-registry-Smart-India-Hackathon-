import React, { Component } from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';
import { browserHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
    marginLeft:'15rem',
    marginTop:'9rem'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Urvara
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


export default function Auth() {

    const {register,handleSubmit,errors} = useForm();

    const onSubmit = async (data) =>{
        console.log(data);

            try {
              const response = await fetch(
                "https://urvera.herokuapp.com/user/login",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username:data.username,
                    password:data.password
                })
            }
              );
              const responseData = await response.json();
              console.log('responseData', responseData)
              if(responseData.message){
                history.push('/auth');
              }
              else if (responseData.token){
                  localStorage.setItem('token',responseData.token);
                  localStorage.setItem('userID',responseData.userID);
                  history.push('/');

              }
            } catch (error) {
              console.log(error);
            }


    }
   

  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
    < Container component="main" style={{marginTop:'10rem'}} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}
       onSubmit={handleSubmit(onSubmit)}
       noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username "
            name="username"
            inputRef={register({required:"USERNAME REQUIRED"})}

            autoFocus
          />
          {errors.username && <p style={{color:'red'}}><b>*Please Enter UserName</b></p>}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={register({required:"PASSWORD REQUIRED"})}
            autoComplete="current-password"
          />
          {errors.password && <p style={{color:'red'}}><b>*Please Enter Password</b></p>}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
};
