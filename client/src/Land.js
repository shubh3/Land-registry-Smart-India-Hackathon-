import React, { Component } from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';
import Change from "./change";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
    marginLeft:'15rem',
    marginTop:'5rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  spinner :{
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    }
  }
}));

const Land = (props) => {
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
        const response = await fetch(
          "https://urvera.herokuapp.com/govTransfer/all"
        );
        const responseData = await response.json();
        setrecords(responseData.lands);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log(records);

 

  // const columns = ["landno","fullName", "state", "district","taluka","adhaarNo","pincode","status"];
  const columns = [
    {
     name: "landno",
     label:"Land Number",
     draggable: false,
     options: {
      filter: true,
      sort: true
     }
    }, 
    {
      name: "fullName",
      label:"Full Name",
      options: {
       filter: true,
       sort: true
      }
     }, 
     {
      name: "state",
      label:"State",
      options: {
       filter: true,
       sort: true
      }
     },
     {
      name: "district",
      label:"District",
      options: {
       filter: true,
       sort: true

      }
     },
     {
      name: "taluka",
      label:"Taluka",
      options: {
       filter: true,
       sort: true

      }
     },
     {
      name: "adhaarNo",
      label:"Aadhaar Number",
      options: {
       filter: false,
       sort: true

      }
     },
     {
      name: "pincode",
      label:"Pincode",
      options: {
       filter: true,
       sort: true

      }
     },
     {
      name: "status",
      label:"Land Status",
      options: {
       filter: true,
       sort: true
      // display: 'false',

      }
     },
     
   
  ]


  const onSearchChange =  () => {

    console.log('hello');
    
    
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
    <div>
      <div className={classes.spinner}>
       { loading && <CircularProgress />}
        </div>
        <div className={classes.root}>
     {!loading && records && <MUIDataTable
        title={"Land Records"}
        data={records}
        columns={columns}
        options={options}
      />
     }
      </div>
    </div>
  );
};
export default Land;
