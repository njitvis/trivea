import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./TopBar.scss";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as d3 from 'd3';
import DefaultModels from './DefaultModels'
import Sort from './Sort'
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as algo1 from "../../Algorithms/algo1"
const useStyles = makeStyles((theme) => ({
  MuiAutocompleteroot: {
    marginTop: 0,
  },
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
function TopBar(props) {
  const classes = useStyles();
  const handleyearChange = (event, value, reason) => {
    if (reason == 'select-option') {
      props.Set_selected_year(value)
      var myfunc = props.appHandleChange
      myfunc(value, "year_changed")
    }
  };
  var handle_year_click = (year) => {
    if(year=="All"){props.Set_selected_years([...props.years_for_dropdown])}
    else{
      if (props.selected_years.includes(year)) {
        props.Set_selected_years(props.selected_years.filter(item=>item!=year))
      }
      else {
        props.Set_selected_years([...props.selected_years,year])
      }  
    }
  }
  var handle_model_click=(model)=>{
    if(model=="All"){props.Set_defualt_models([...props.all_models])}
    else if(model=="Average"){props.Set_average_m(!props.average_m)}
    else{
      if (props.defualt_models.includes(model)) {
        props.Set_defualt_models(props.defualt_models.filter(item=>item!=model))
      }
      else {
        props.Set_defualt_models([...props.defualt_models,model])
      }  
    }
  }
  return (
    <div>
    <div><h5 style={{ display: "inline-block", marginLeft: 30 }}>Years:</h5>{props.years_for_dropdown.map(item => <p className={props.selected_years.includes(item) ? "years_p_selected years_p" : "years_p"} onClick={() => handle_year_click(item)}>{item}</p>)}</div>
    <div><h5 style={{ display: "inline-block", marginLeft: 30 }}>Models:</h5>{props.all_models.map(item => <p className={props.defualt_models.includes(item) ? "years_p_selected years_p" : "years_p"} onClick={() => handle_model_click(item)}>{item}</p>)}<p className="years_p" style={{ display: "inline-block"}} onClick={() => handle_model_click("All")}>All</p> <p className={props.average_m ? "years_p_selected years_p" : "years_p"} style={{ display: "inline-block"}} onClick={() => handle_model_click("Average")}>Average</p></div>
    </div>
  );
}
const maptstateToprop = (state) => {
  return {
    all_models:state.all_models,
    selected_years: state.selected_years,
    tracking: state.tracking,
    selected_year: state.selected_year,
    years_for_dropdown: state.years_for_dropdown,
    defualt_models: state.defualt_models,
    mode: state.mode,
    prev_prop: state.prev_prop,
    state_range: state.state_range,
    replay: state.replay,
    grouped_by_year_data: state.grouped_by_year_data,
    clicked_items_in_slopechart: state.clicked_items_in_slopechart,
    range_mode_range1: state.range_mode_range1,
    range_mode_range2: state.range_mode_range2,
    time_mode_range: state.time_mode_range,
    mode: state.mode, // Model mode model
    sort_by: state.sort_by,
    average_m:state.average_m

  }
}
const mapdispatchToprop = (dispatch) => {
  return {
    add: (val) => dispatch({ type: "add", value: val }),
    Set_selected_years: (val) => dispatch({ type: "selected_years", value: val }),
    Set_selected_year: (val) => dispatch({ type: "selected_year", value: val }),
    set_tracking: (val) => dispatch({ type: "tracking", value: val }),
    Set_histogram_data: (val) => dispatch({ type: "histogram_data", value: val }),
    Set_changed: (val) => dispatch({ type: "changed", value: val }),
    Set_state_range: (val) => dispatch({ type: "state_range", value: val }),
    Set_slider_max: (val) => dispatch({ type: "slider_max", value: val }),
    Set_range_mode_range1: (val) => dispatch({ type: "range_mode_range1", value: val }),
    Set_range_mode_range2: (val) => dispatch({ type: "range_mode_range2", value: val }),
    Set_time_mode_range: (val) => dispatch({ type: "time_mode_range", value: val }),
    Set_pop_over_models: (val) => dispatch({ type: "pop_over_models", value: val }),
    Set_defualt_models: (val) => dispatch({ type: "defualt_models", value: val }),
    Set_default_model_scores: (val) => dispatch({ type: "default_model_scores", value: val }),
    Set_average_m: (val) => dispatch({ type: "average_m", value: val }),
  }
}
export default connect(maptstateToprop, mapdispatchToprop)(TopBar);

//https://material-ui.com/api/slider/
//https://material-ui.com/components/expansion-panels/
//https://material-ui.com/api/checkbox/
//https://material-ui.com/components/radio-buttons/