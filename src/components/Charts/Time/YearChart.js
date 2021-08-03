import React, { Component } from 'react';
import * as d3 from 'd3';
import * as explanation_chart from "../04_explanation_chart";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import * as algo1 from "../../../Algorithms/algo1";
import * as deviation_chart from "../01_deviation_chart"
import * as misc_algo from '../misc_algo'
import * as $ from 'jquery';
class SlopeChart extends Component {
  constructor(props) {
    super(props);
    this.line_color = null;
    this.state = { height_slope_exp_chart: 700, mouseX: 0, mouseY: 0 }
  }
  componentDidMount() {
    this.setState({ width: window.innerHeight })
  }
  shouldComponentUpdate(prevProps, prevState) {
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    // Range1
    var min = this.props.time_mode_range[0], max = this.props.time_mode_range[1];
    var d = (max - min) / 8;
    var diverginColor = d3.scaleLinear().domain([min + d * 7, min + d * 6, min + d * 5, min + d * 4, min + d * 3, min + d * 2, min]).interpolate(d3.interpolateRgb).range(['#00429d', '#4771b2', '#73a2c6', '#a5d5d8', /*'#ffffe0',*/ '#ffbcaf', '#f4777f', '#cf3759', '#93003a']);
    
    var selected_instances = d3.range(this.props.time_mode_range[0], this.props.time_mode_range[1] + 1)
    var number_of_charts = 9
    var features_with_score = algo1.features_with_score(this.props.dataset, this.props.defualt_models, this.props.time_mode_range, this.props.time_mode_year1, number_of_charts, this.props.rank_data)
    var sorted_features = Object.entries(features_with_score).sort((a, b) => a[1] - b[1]).slice(0, number_of_charts)
    deviation_chart.Create_deviation_chart('y1d','y1e', selected_instances, this.props.original_data, this.props.defualt_models, this.props.anim_config, this.props.time_mode_year1, this.props.average_m, this.props.clicked_circles, this.props.Set_clicked_circles, diverginColor)
    explanation_chart.CreatexpChart('y1e', selected_instances, sorted_features, this.props.lime_data, this.props.time_mode_year1, this.props.defualt_models, this.props.clicked_circles, this.props.Set_clicked_circles, diverginColor, this.props.anim_config, this.props.clicked_features, this.props.Set_clicked_features)

    // Range2
    var selected_instances2 = d3.range(this.props.time_mode_range[0], this.props.time_mode_range[1] + 1)
    var features_with_score2 = algo1.features_with_score(this.props.dataset, this.props.defualt_models, this.props.time_mode_range, this.props.time_mode_year2, number_of_charts, this.props.rank_data)
    var sorted_features2 = Object.entries(features_with_score2).sort((a, b) => a[1] - b[1]).slice(0, number_of_charts)
    deviation_chart.Create_deviation_chart('y2d','y2e', selected_instances2, this.props.original_data, this.props.defualt_models, this.props.anim_config, this.props.time_mode_year2, this.props.average_m, this.props.clicked_circles, this.props.Set_clicked_circles, diverginColor)
    explanation_chart.CreatexpChart('y2e', selected_instances2, sorted_features2, this.props.lime_data, this.props.time_mode_year2, this.props.defualt_models, this.props.clicked_circles, this.props.Set_clicked_circles, diverginColor, this.props.anim_config, this.props.clicked_features, this.props.Set_clicked_features)
    //---------------------------------
    misc_algo.draw_lines(this.props.clicked_circles, diverginColor, this.props.anim_config, sorted_features)
    misc_algo.handle_transparency("circle2", this.props.clicked_circles, this.props.anim_config)

  }
  render() {
    return (
      <Grid container direction="row" justifyContent="space-between" className="slope_chart_exp" style={{ backgroundColor: 'white', padding: "0px 0px", border: "1px solid #eaeaea", width: "100%", boxShadow: "-2px 1px 4px -1px white" }}>
        <Grid container item direction="column" justifyContent="space-between" style={{ paddingRight: 0, border: "1px solid #a0a0a0", height: "100%", width: "49.4%" }}>
          <p style={{ margin: 0, paddingLeft: "45%", backgroundColor: "rgb(232, 232, 232,0.4)", fontWeight: "bolder", borderBottom: "1px solid #cecece" }}>{"Year : "+this.props.time_mode_year1}</p>
          <Grid item style={{ backgroundColor: "rgb(232, 232, 232,0.4)", height: ($(".slope_chart_exp").height() * 0.69 - 25), overflow: "scroll" }}><svg id="y1d" style={{ width: "100%", marginRight: "3%" }}></svg></Grid>
          <Grid item style={{ backgroundColor: "rgb(232, 232, 232,0.4)", marginTop: 5, paddingTop: 5, paddingRight: 3, height: $(".slope_chart_exp").height() * 0.3 }}><svg id="y1e" style={{ width: "100%", height: "100%" }}></svg></Grid>
        </Grid>
        <Grid container item direction="column" justifyContent="space-between" style={{ marginLeft: "1%", padding: 0, border: "1px solid #a0a0a0", height: "100%", width: "49.4%" }}>
          <p style={{ margin: 0, paddingLeft: "45%", backgroundColor: "rgb(232, 232, 232,0.4)", fontWeight: "bolder", borderBottom: "1px solid #cecece" }}>{"Year : "+this.props.time_mode_year2}</p>
          <Grid item style={{ backgroundColor: "rgb(232, 232, 232,0.4)", height: ($(".slope_chart_exp").height() * 0.69 - 25), overflow: "scroll" }}><svg id="y2d" style={{ width: "100%", marginRight: "3%" }}></svg></Grid>
          <Grid item style={{ backgroundColor: "rgb(232, 232, 232,0.4)", marginTop: 5, paddingTop: 5, paddingRight: 3, height: $(".slope_chart_exp").height() * 0.3 }}><svg id="y2e" style={{ width: "100%", height: "100%" }}></svg></Grid>
        </Grid>
      </Grid>
    )
  }
}
const maptstateToprop = (state) => {
  return {
    time_mode_model: state.time_mode_model,
    time_mode_range: state.time_mode_range,
    deviate_by: state.deviate_by,
    time_mode_year1: state.time_mode_year1,
    time_mode_year2: state.time_mode_year2,
    deviate_by: state.deviate_by,
    clicked_items_in_slopechart: state.clicked_items_in_slopechart,
    tracking: state.tracking,
    defualt_models: state.defualt_models,
    original_data: state.original_data,
    time_mode_model: state.time_mode_model,
    chart_scale_type: state.chart_scale_type,
    features_with_score: state.features_with_score,
    dataset: state.dataset,
    histogram_data: state.histogram_data,
    sparkline_data: state.sparkline_data,
    dataset: state.dataset,
    anim_config: state.anim_config,
    show: state.show,
    default_model_scores: state.default_model_scores,
    sort_by: state.sort_by,
    average_m: state.average_m,
    average_y: state.average_y,
    lime_data: state.lime_data,
    features_with_score: state.features_with_score,
    rank_data: state.rank_data,
    clicked_circles: state.clicked_circles,
    clicked_features: state.clicked_features
  }
}
const mapdispatchToprop = (dispatch) => {
  return {
    Set_clicked_circles: (val) => dispatch({ type: "clicked_circles", value: val }),
    Set_prev_prop: (val) => dispatch({ type: "prev_prop", value: val }),
    Set_sparkline_data: (val) => dispatch({ type: "sparkline_data", value: val }),
    Set_clicked_items_in_slopechart: (val) => dispatch({ type: "clicked_items_in_slopechart", value: val }),
    Set_replay: (val) => dispatch({ type: "replay", value: val }),
    Set_clicked_features: (val) => dispatch({ type: "clicked_features", value: val }),
  }
}
export default connect(maptstateToprop, mapdispatchToprop)(SlopeChart);