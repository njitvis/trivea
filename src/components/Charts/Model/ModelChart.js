import React, { Component } from 'react';
import * as d3 from 'd3';
import * as explanation_chart from "../explanation_chart";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import * as algo1 from "../../../Algorithms/algo1";
import * as deviation_chart from "../deviation_chart"
import * as misc_algo from '../misc_algo'
class SlopeChart extends Component {
  constructor(props) {
    super(props);
    this.line_color = null;
    this.state = { height_slope_exp_chart: 700, mouseX: 0, mouseY: 0 }
  }
  componentDidMount() {
    console.log(this.props.lime_data)
    this.setState({ width: window.innerHeight })
  }
  shouldComponentUpdate(prevProps, prevState) {
    
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    // var diverginColor = d3.scaleLinear().domain([this.props.state_range[0], this.props.state_range[1]]).range(['#93003a','#00429d'])
    var min = this.props.state_range[0], max = this.props.state_range[1];
    var d = (max - min) / 8;
    var diverginColor = d3.scaleLinear().domain([min + d * 7, min + d * 6, min + d * 5, min + d * 4, min + d * 3, min + d * 2, min]).interpolate(d3.interpolateRgb).range(['#00429d', '#4771b2', '#73a2c6', '#a5d5d8', /*'#ffffe0',*/ '#ffbcaf', '#f4777f', '#cf3759', '#93003a']);
    var selected_instances = d3.range(this.props.state_range[0], this.props.state_range[1] + 1)
    var number_of_charts = 9
    var features_with_score = algo1.features_with_score(this.props.dataset, this.props.defualt_models, this.props.state_range, this.props.selected_year, number_of_charts, this.props.rank_data)
    var sorted_features = Object.entries(features_with_score).sort((a, b) => a[1] - b[1]).slice(0, 18)

    deviation_chart.Create_deviation_chart('dev_plot_container', 'exp', selected_instances, this.props.original_data, this.props.defualt_models, this.props.anim_config, this.props.selected_year, this.props.average_m, this.props.clicked_circles, this.props.Set_clicked_circles, diverginColor,this.props.sparkline_data,this.props.Set_selected_year)
    explanation_chart.CreatexpChart("exp", selected_instances, sorted_features, this.props.lime_data, this.props.selected_year, this.props.defualt_models, this.props.clicked_circles, this.props.Set_clicked_circles, diverginColor, this.props.anim_config, this.props.clicked_features, this.props.Set_clicked_features)
    explanation_chart.CreatexpCircle("exp", selected_instances, sorted_features, this.props.lime_data, this.props.selected_year, this.props.defualt_models, this.props.clicked_circles, this.props.Set_clicked_circles, diverginColor, this.props.anim_config, this.props.clicked_features, this.props.Set_clicked_features)
    misc_algo.draw_lines(this.props.clicked_circles, diverginColor, this.props.anim_config, sorted_features)
    misc_algo.handle_transparency("circle2", this.props.clicked_circles, this.props.anim_config)
  }
  render() {
    return (
      <Grid container className="slope_chart_exp" style={{ backgroundColor: 'white', padding: "0px 0px", border: "1px solid #eaeaea", width: "99%", boxShadow: "-2px 1px 4px -1px white" }}>
        <svg id="dev_plot_container" style={{ width: "100%", height: "50%", marginBottom: 10 }}></svg>
        <div style={{ width: "100%", height: "100%" }}>
          <svg id="mds" style={{ width: "20%", height: "50%" }}></svg>
          <svg id="exp" style={{ width: "80%", height: "50%" }}></svg>
        </div>
      </Grid>
    )
  }
}
const maptstateToprop = (state) => {
  return {
    state_range: state.state_range,
    selected_year: state.selected_year,
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
    Set_selected_year: (val) => dispatch({ type: "selected_year", value: val }),
  }
}
export default connect(maptstateToprop, mapdispatchToprop)(SlopeChart);