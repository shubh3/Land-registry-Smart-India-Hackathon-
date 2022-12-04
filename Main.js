import React, { Component } from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';
import Change from "./change";
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
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Fab } from '@material-ui/core';

import PublishIcon from '@material-ui/icons/Publish';
const useStyles = makeStyles((theme) => ({
  main:{
    height:'100vh',
    position:"relative"
  },
  root: {
    marginLeft:'15rem',
    marginTop:'5rem',
    position: "relative",
  },
  table:{
    padding: '2rem',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  spinner :{
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    }
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


const Main = (props) => {
  const responsive = "standard";
  const tableBodyHeight = "100%";
  // const [tableBodyMaxHeight

  const classes = useStyles();

  const [records, setrecords] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let id = localStorage.getItem('userID')
        const response = await fetch(
          `https://urvera.herokuapp.com/land/${id}`
        );
        const responseData = await response.json();
        setrecords(responseData.records);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, []);

  

  const [flag, setFlag] = useState(false);


  let addForm = e =>{

    setFlag(true);
  }
  const {register,handleSubmit,errors} = useForm();

    const onSubmit = async (data) =>{
      props.mint(data.landno)

            try {
              const response = await fetch(
                "https://urvera.herokuapp.com/land/create",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    landno:data.landno,
                    id: localStorage.getItem('userID')
                })
                 
            }
              );
              const responseData = await response.json();
              console.log('responseData', responseData)
              console.log(responseData.result);
              if (responseData.result){
                
                setFlag(false);
                const getData = async () => {
                  setLoading(true);
                  try {
                    let id = localStorage.getItem('userID')
                    const response = await fetch(
                      `https://urvera.herokuapp.com/land/${id}`
                    );
                    const responseData = await response.json();
                    setrecords(responseData.records);
                    setLoading(false);
                  } catch (error) {
                    setLoading(false);
                  }
            }

              }
            } catch (error) {
              console.log(error);
            }


    }

  const columns = [
    {
     name: "landno",
     label:"Land ID",
     draggable: false,
     options: {
      filter: true,
      sort: true
     }
    }, 
    {
      name: "creatorId",
      label:"Creator Id"  ,
      options: {
       filter: true,
       sort: true
      }
     }, 
     {
      name: "status",
      label:"Minting Status",
      options: {
       filter: true,
       sort: true
      // display: 'false',

      }
     },
     
   
  ]


  const onSearchChange =  () => {

    
    
  }
  


  const options = {
    filter: true,
    filterType: "multiselect",
    responsive,
    tableBodyHeight,
    draggableColumns: {
      enabled: true
    },
    onSearchChange:onSearchChange() ,
    ServerSide: true,
    
  };

 

  return (
    <React.Fragment>
       
        <div className={classes.root} style={{position:'relative'}} >
       { !flag &&<Button variant="contained" color="primary" onClick={addForm} style={{margin:'1rem'}}>
     Add Records
   </Button>}
     {!loading && records && !flag &&
    
     <div className={classes.table} style={{position:'relative'}}>  <MUIDataTable
        title={"Minted Land Records"}
        data={records}
        columns={columns}
        options={options}
      />
      </div>
       
     }
        
      </div>
    {flag &&  < Container component="main" style={{marginTop:'2rem'}} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PublishIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Mint Land
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
            id="landno"
            label="Land Number "
            name="landno"
            inputRef={register({required:"Land Number REQUIRED"})}

            autoFocus
          />
          {errors.username && <p style={{color:'red'}}><b>*Please Enter Land Number</b></p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Mint
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
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
}
</React.Fragment>
  );
};
export default Main;





                  
                
                 
              