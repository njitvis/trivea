import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./Sidebar.scss";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import Modes from "./Modes"
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  listroot: {
    width: '100%',
    maxWidth: 360,
  },
  paper: {

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  //------------For list and chckbox
  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const inputchanged = (event) => {
    var val = parseInt(event.target.value)
    if (val > -1) {
      setTimeout(function () {
        props.Set_deviate_by(val)
      }, 100);

    }
  }
  const show_checkboxChanged = (event,val) => {
    var myfunc = props.appHandleChange
    myfunc(val, "show_checkboxChanged")
  }
  return (
    <div className="Sidebar_parent" style={{height:window.innerHeight}}>
      <h4 className="app_title">RIEVAL </h4>
      {props.view_data==1?
      <div className="rangeSlidercontainer">
        <Modes appHandleChange={props.appHandleChange} ></Modes>
        <div className="deviation" style={{marginLeft:5, borderTop:"0px solid #eaeaea"}}>
          <p className="title_show">Margin:</p>
          <TextField
            id="outlined-size-normal"
            defaultValue={props.deviate_by}
            variant="filled"
            color="primary"
            onChange={(event) => inputchanged(event)}
            fullWidth={false}
            style={{height:24}}
          />
        </div>
      </div>:null}
    </div>
  );
}
const maptstateToprop = (state) => {
  return {
    deviate_by:state.deviate_by,
    state_range:state.state_range,
    defualt_models:state.defualt_models,
    selected_year:state.selected_year,
    sparkline_data:state.sparkline_data,
    show:state.show,
  }
}
const mapdispatchToprop = (dispatch) => {
  return {
    Set_defualt_models: (val) => dispatch({ type: "defualt_models", value: val }),
    Set_sparkline_data: (val) => dispatch({ type: "sparkline_data", value: val }),
    Set_slider_max: (val) => dispatch({ type: "slider_max", value: val }),
    Set_years_for_dropdown: (val) => dispatch({ type: "years_for_dropdown", value: val }),
    Set_selected_year: (val) => dispatch({ type: "selected_year", value: val }),
    Set_ref_year: (val) => dispatch({ type: "ref_year", value: val }),
    Set_original_data: (val) => dispatch({ type: "original_data", value: val }),
    Set_state_range: (val) => dispatch({ type: "state_range", value: val }),
    Set_deviate_by:(val) => dispatch({ type: "deviate_by", value: val }),
    Set_show:(val)=>dispatch({type:"show",value:val}),
  }
}
export default connect(maptstateToprop, mapdispatchToprop)(Sidebar);

//https://material-ui.com/api/slider/
//https://material-ui.com/components/expansion-panels/
//https://material-ui.com/api/checkbox/
//https://material-ui.com/components/radio-buttons/