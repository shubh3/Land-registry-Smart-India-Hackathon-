import React, { Component } from "react";
import { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";
import Change from "./change";
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
import Backdrop from "@material-ui/core/Backdrop";
import * as moment from "moment";

import {
  dataCategories,
  dataProducts,
  dataOrders,
} from "../src/components/data/states";
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
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
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
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
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
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

const Govt = (props) => {
  console.log("props", props);
  const responsive = "standard";
  const tableBodyHeight = "100%";
  // const [tableBodyMaxHeight

  const classes = useStyles();

  const [records, setrecords] = useState([]);

  const [success, SetSucess] = useState(false);

  const [open, setOpen] = React.useState(false);

  const [Categories, setCategories] = React.useState([]);

  const [state, setState] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [taluka, setTaluka] = React.useState("");
  useEffect(() => {
    setCategories(dataCategories);

    const getData = async () => {
      setOpen(true);
      try {
        let id = localStorage.getItem("userID");
        const response = await fetch(
          `https://urvera.herokuapp.com/govTransfer/${id}`
        );
        const responseData = await response.json();
        setrecords(responseData.records);
        setOpen(false);
      } catch (error) {
        setOpen(false);
      }
    };
    getData();
  }, []);

  console.log(records);
  const [flag, setFlag] = useState(false);

  let addForm = (e) => {
    setFlag(true);
  };
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const curDate = new Date();

    props.govtransfer(data.landno, data.adhaarNo, data.fullName,state,district,taluka);
    try {
      setOpen(true);
      const response = await fetch(
        "https://urvera.herokuapp.com/govTransfer/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            landno: data.landno,
            plotno: data.plotno,
            fullName: data.fullName,
            adhaarNo: data.adhaarNo,
            landArea: data.landArea,
            surveyno: data.surveyno,
            pincode: data.pincode,
            state: state,
            district: district,
            taluka: taluka,
            address: data.address,
            timeStamp: curDate,
            creatorId: localStorage.getItem("userID"),
          }),
        }
      );

      const responseData = await response.json();
      console.log("responseData", responseData);
      console.log(responseData.result);
      if (responseData.result) {
        SetSucess(true);
        setOpen(false);
        setFlag(false);
        console.log(flag);
        try {
          let id = localStorage.getItem("userID");
          const response = await fetch(
            `https://urvera.herokuapp.com/govTransfer/${id}`
          );
          const responseData = await response.json();
          setrecords(responseData.records);
          setOpen(false);
        } catch (error) {
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "landno",
      label: "Land Number",
      draggable: false,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "surveyno",
      label: "Survey Number",
      options: {
        filter: true,
        sort: true,
        // display: "false",
      },
    },
    {
      name: "plotno",
      label: "Plot Number",
      options: {
        filter: true,
        sort: true,
        display: "false",
      },
    },
    {
      name: "fullName",
      label: "Full Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "adhaarNo",
      label: "Aadhaar Number",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "district",
      label: "District",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "taluka",
      label: "Taluka",
      options: {
        filter: true,
        sort: true,
      },
    },
    
    {
      name: "pincode",
      label: "Pincode",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "timeStamp",
      label: "Created At",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
        moment(new Date(value)).format("DD-MM-YYYY"),
      // display: 'false',
    },
    },
    {
      name: "status",
      label: "Land Status",
      options: {
        filter: true,
        sort: true,
        // display: "false",
      },
    },
 
    {
      name: "landArea",
      label: "Land Area (in Hectors)",
      options: {
        filter: true,
        sort: true,
        display: "false",

      },
    },
  
   
    {
      name: "address",
      label: "Complete Address",
      options: {
        filter: true,
        sort: true,
        display: "false",
      },
    },
  ];

  const onSearchChange = () => {};
  const onRowClick = (rowData: string[]) => {
    console.log("----RowClick");
    console.log("rowMeta: ", rowData);
  };
  const onCancel = () => {
    setFlag(false);
  }

  const options = {
    filter: true,
    filterType: "multiselect",
    responsive,
    tableBodyHeight,
    draggableColumns: {
      enabled: true,
    },
    onSearchChange: onSearchChange(),
    onRowClick: onRowClick,
    ServerSide: true,
  };

  const defaultItemCategory = { categoryName: "Select Category ..." };
  const defaultItemProduct = { productName: "Select Product ..." };
  const defaultItemOrder = { orderName: "Select Order ..." };

  const handleChangeState = (event) => {
    setState(event.target.value);
  };
  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };
  const handleChangeTaluka = (event) => {
    setTaluka(event.target.value);
  };

  const States = ["Maharashtra", "Karantaka", "Diu & Daman", "TamilNadu"];

  const Districts = [
    "Pune",
    "Mumbai",
    "Satara",
    "Belgaum",
    "Bijapur",
    "Diu District",
    "Chennai North",
    "Chennai Central",
  ];
  const Taluka = ["Haveli", "Mulshi", "Bhanapi", "Virginia", "Ambattur"];

  // const data = Categories.map((item : ) =>{
  //   item.map(data =>{
  //     console.log(data);
  //   })
  // })

  return (
    <React.Fragment>
      <div className={classes.root} style={{ position: "relative" }}>
        {!flag && (
            <Button
              variant="contained"
              color="primary"
              onClick={addForm}
              style={{ margin: "2rem" }}
            >
              Regsiter Land
            </Button>
        )}
        {open && (
          <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {!open && records && !flag && (
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
              Register Land To Farmer
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
                    id="plotno"
                    label="Plot Number "
                    name="plotno"
                    inputRef={register({ required: "Plot Number REQUIRED" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Plot Number</b>
                    </p>
                  )}
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="surveyno"
                label="Survey Number"
                name="surveyno"
                inputRef={register({ required: "Survey Number REQUIRED" })}
                autoFocus
              />

              {errors.username && (
                <p style={{ color: "red" }}>
                  <b>*Please Enter Full Name</b>
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
                inputRef={register({ required: "Full Name REQUIRED" })}
                autoFocus
              />

              {errors.username && (
                <p style={{ color: "red" }}>
                  <b>*Please Enter Full Name</b>
                </p>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                id="aadharNo"
                label="Aadhar Number "
                name="adhaarNo"
                inputRef={register({ required: "Aadhar Number REQUIRED" })}
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
                    required
                    fullWidth
                    id="landArea"
                type="number"

                    label="Land Area "
                    name="landArea"
                    placeholder="Please Add Area in Hectors"
                    inputRef={register({ required: "Land Area  REQUIRED" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Land Area </b>
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                type="number"

                    id="pincode"
                    label="Pincode"
                    name="pincode"
                    inputRef={register({ required: "Pincode REQUIRED" })}
                    autoFocus
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>
                      <b>*Please Enter Pincode</b>
                    </p>
                  )}
                </Grid>
              </Grid>
              <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">State</InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  placeholder="Select"
                  value={state}
                  onChange={handleChangeState}
                  style={{ width: "200px" }}
                  inputRef={register}
                >
                  {States.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">
                  District
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  placeholder="Select"
                  value={district}
                  onChange={handleChangeDistrict}
                  style={{ width: "180px" }}
                  inputRef={register}
                >
                  {Districts.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">
                  Taluka
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  placeholder="Select"
                  value={taluka}
                  onChange={handleChangeTaluka}
                  style={{ width: "180px" }}
                  inputRef={register}
                >
                  {Taluka.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Complete Address"
                name="address"
                inputRef={register}
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register Land
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={onCancel}
              >
                Cancel
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
export default Govt;

// this.props.mint(landno)
