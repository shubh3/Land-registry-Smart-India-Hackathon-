import React, { Component } from "react";
import { useEffect, useState } from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { browserHistory } from "react-router";
import { Fab } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import PublishIcon from "@material-ui/icons/Publish";
const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
    position: "relative",
  },
  root: {
    marginLeft: "15rem",
    marginTop: "5rem",
    position: "relative",
  },
  table: {
    padding: "2rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  spinner: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Urvara
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Beneficiary = (props) => {
  const responsive = "standard";
  const tableBodyHeight = "100%";
  // const [tableBodyMaxHeight

  const classes = useStyles();

  const [records, setrecords] = useState();
  
  const [loading, setLoading] = useState(false);

  const [success, SetSucess] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let id = localStorage.getItem("userID");
        const response = await fetch(`http://urvera.herokuapp.com/scheme`);
        const responseData = await response.json();
        setrecords(responseData.schemes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, []);
  console.log('records', records)
  // if(success){
  //     const getData = async () => {
  //       setLoading(true);

  //     };
  // }

  const [flag, setFlag] = useState(false);

  let addForm = (e) => {
    setFlag(true);
  };
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
   // console.log('data', data)

    try {
      const response = await fetch("http://urvera.herokuapp.com/land/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          landno: data.landno,
          id: localStorage.getItem("userID"),
        }),
      });
      const responseData = await response.json();
      console.log("responseData", responseData);
      console.log(responseData.result);
      if (responseData.result) {
        SetSucess(true);
        setFlag(false);
        console.log(flag);
        try {
          let id = localStorage.getItem("userID");
          const response = await fetch(`http://urvera.herokuapp.com/land/${id}`);
          const responseData = await response.json();
          setrecords(responseData.records);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
     name: "schemeNumber",
     label:"Scheme Number",
     options: {
      filter: true,
      sort: true
     }
    }, 
    {
      name: "name",
      label:"Scheme Name",
      options: {
       filter: true,
       sort: true
      }
     }, 
     {
      name: "description",
      label:"Description",
      options: {
       filter: true,
       sort: true
      // display: 'false',

      }
     },
     {
        name: "area",
        label:"Area Criteria(in Hectors)",
        options: {
         filter: true,
         sort: true
        // display: 'false',
  
        }
       },
       {
        name: "amount",
        label:"Total Amount",
        options: {
         filter: true,
         sort: true
        // display: 'false',
  
        }
       },
       {
        name: "type",
        label:"Scheme Origin",
        options: {
         filter: true,
         sort: true
        // display: 'false',
  
        }
       },
     
       {
        name: "installment",
        label:"Installment",
        options: {
         filter: true,
         sort: true
        // display: 'false',
  
        }
    }
   
  ]

  const onSearchChange = () => {};

  const options = {
    filter: true,
    filterType: "multiselect",
    responsive,
    tableBodyHeight,
    draggableColumns: {
      enabled: true,
    },
    onSearchChange: onSearchChange(),
    ServerSide: true,
  };

  const [age, setAge] = React.useState("");
  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <React.Fragment>
      <div className={classes.root} style={{ position: "relative" }}>
        {!flag && (
          <Button
            variant="contained"
            color="primary"
            onClick={addForm}
            style={{ margin: "1rem" }}
          >
            Add Scheme
          </Button>
        )}
        {!loading && records && !flag && (
          <div className={classes.table} style={{ position: "relative" }}>
            {" "}
            <MUIDataTable
              title={"Transfered Land Records"}
              data={records}
              columns={columns}
              options={options}
            />
          </div>
        )}
      </div>
      {flag && (
        <Container component="main" style={{ marginTop: "2rem" }} maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PublishIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             New Scheme
            </Typography>
            <form
              className={classes.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="landno"
                    label="Land Number "
                    name="landno"
                    inputRef={register({ required: "Land Number REQUIRED" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Land Number</b>
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="area"
                    label="Area (in Hectare)"
                    name="area"
                    inputRef={register({ required: "Area REQUIRED" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Amount</b>
                    </p>
                  )}
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Scheme Name"
                name="name"
                inputRef={register({ required: "Scheme Name REQUIRED" })}
                autoFocus
              />

              {errors.username && (
                <p style={{ color: "red" }}>
                  <b>*Please Enter Scheme Name</b>
                </p>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name "
                name="fullName"
                inputRef={register({ required: "Land Number REQUIRED" })}
                autoFocus
              />

              {errors.username && (
                <p style={{ color: "red" }}>
                  <b>*Please Enter Land Number</b>
                </p>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="aadharNo"
                label="Aadhar Number "
                name="aadharNo"
                inputRef={register({ required: "Land Number REQUIRED" })}
                autoFocus
              />

              {errors.username && (
                <p style={{ color: "red" }}>
                  <b>*Please Enter Aadhar Number</b>
                </p>
              )}



              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    //required
                    fullWidth
                    id="familyCount"
                    label="Family Count"
                    name="familyCount"
                   //inputRef={register({ required: "Land Number REQUIRED" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Land Area</b>
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="amount"
                    label="Scheme Amount"
                    name="amount"
                    inputRef={register({ required: "Amount is required" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Amount</b>
                    </p>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="income"
                    label="Annual Income "
                    name="income"
                   // inputRef={register({ required: "Land Number REQUIRED" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Annual Income</b>
                    </p>
                  )}
                </Grid>
              {/* </Grid>
              <Grid container spacing={2}> */}

              <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="pincode"
                    label="Pincode"
                    name="pincode"
                   // inputRef={register({ required: "Land Number REQUIRED" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Pincode</b>
                    </p>
                  )}
                </Grid>
                </Grid>
                <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <FormControl className={classes.margin} >
        <InputLabel id="demo-customized-select-label" >Select</InputLabel>
        <Select
        
        style={{width:'200px'}}
        defaultValue="State"
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          inputRef={register({ required: "Select type" })}
        >
          <MenuItem value=""><em>Type</em> </MenuItem>
          <MenuItem value={10}>Central </MenuItem>
          <MenuItem value={20}>State</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
      <FormControl className={classes.margin} >
        <InputLabel id="demo-customized-select-label" >Category</InputLabel>
        <Select
        style={{width:'200px'}}
        defaultValue="State"
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          inputRef={register({ required: "Select Category" })}
        >
          <MenuItem  value=""><em>Category</em> </MenuItem>
          <MenuItem value={10}>Open</MenuItem>
          <MenuItem value={20}>OBC</MenuItem>
          <MenuItem value={30}>SC/ST</MenuItem>
          <MenuItem value={40}>VJNT</MenuItem>
        </Select>
      </FormControl>
</Grid>
</Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
               Submit
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
      )}
    </React.Fragment>
  );
};
export default Beneficiary;