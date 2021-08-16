
import * as d3 from 'd3';
import * as $ from 'jquery';
import * as misc_algo from './misc_algo'
import Create_lasso_circles from "./lasso_circle"
export function CreatexpChart(parent_id, selected_instances, sorted_features, lime_data, selected_year, defualt_models, clicked_circles, Set_clicked_circles, diverginColor, anim_config, clicked_features, Set_clicked_features) {
  //Create_lasso_circles(parent_id,lime_data,defualt_models,selected_year,selected_instances,sorted_features,diverginColor,Set_clicked_circles)
  //----------------
  var margin = { item_top_margin: 15, right: 14, bottom: 0, left: 20, circ_radius: 5, item_left_margin: 25, item_right_margin: 3 }
  var parent_width = $("#" + parent_id).width() - margin.item_left_margin
  var parent_height = $("#" + parent_id).height() - margin.item_top_margin * 2
  var item_width = parent_width / sorted_features.length - margin.item_right_margin
  var item_height = parent_height
  var parent_svg = d3.select("#" + parent_id)
  // Draw ++ --
  parent_svg.selectAll(".ylabels").data([[.125, "++"], [.375, "+"], [.5, "0"], [.625, "-"], [.875, "--"]]).join('text').attr('class', 'ylabels').attr("y", d => d[0] * item_height).attr("x", margin.item_left_margin - 5).attr('text-anchor', 'end').attr('dominant-baseline', 'hanging').text(d => d[1]).attr("font-size", 14).attr('fill', "#636363")
  // Add title rectangle, title text and rectangles around each feature
  parent_svg.selectAll('.feature_g').data(sorted_features, d => d[0]).join(
    enter => enter.append('g').attr('class', 'feature_g').attr('transform', (d, svg_index) => "translate(" + (margin.item_left_margin + item_width * svg_index + (margin.item_right_margin * svg_index)) + ",0)").attr('x_transformation', (d, svg_index) => (margin.item_left_margin + item_width * svg_index + (margin.item_right_margin * svg_index)))
      .attr("id", d => d[0].replace(/[^\w\s]/gi, ''))
      .attr('add_title_rect', function (d) { d3.select(this).selectAll('.title_rect').data([0]).join('rect').attr('class', 'title_rect').attr('width', item_width + 2).attr('x', -1).attr('height', margin.item_top_margin).attr('fill', '#d1d1d1') })
      .attr('add_title_text', function (d, svg_index) { d3.select(this).selectAll(".title_text").data([0]).join('text').attr('class', 'title_text').text(d[0]).attr('y', 0).attr('dominant-baseline', 'hanging').attr("font-size", 12).attr('x', 10).attr('text-anchor', 'start') })
      .attr('add_item_rect', function (d, svg_index) { d3.select(this).selectAll('.item_rect').data([0]).join('rect').attr('class', 'item_rect').attr('width', item_width).attr('height', item_height).attr('y', margin.item_top_margin).attr('fill', clicked_features.includes(d[0]) ? "#F8FDB8" : '#f2f2f2').attr('fill-opacity', 1).attr('stroke', '#b2b0b0') })
      .attr('svg_index', (d, svg_index) => svg_index)
      .attr('add_contrib_lines', function (d, svg_index) {
        d3.select(this).selectAll(".mylines").data([[.25], [.5], [.75]]).join('line').attr('class', 'mylines')
          .attr('x1', 0).attr('x2', item_width)
          .attr('y1', d => d * (item_height + margin.item_top_margin)).attr('y2', d => d * (item_height + margin.item_top_margin)).attr('stroke-width', 1).attr("stroke", "#bababa")
      })
    , update => {
      //parent_svg.selectAll('.feature_g').attr('opacity',0.5)
      //update.attr('opacity',1)
      return update.transition().duration(anim_config.feature_animation).delay(anim_config.rank_animation + anim_config.deviation_animation).attr('transform', (d, svg_index) => "translate(" + (margin.item_left_margin + item_width * svg_index + (margin.item_right_margin * svg_index)) + ",0)").attr('x_transformation', (d, svg_index) => (margin.item_left_margin + item_width * svg_index + (margin.item_right_margin * svg_index)))
        .attr("id", d => d[0].replace(/[^\w\s]/gi, ''))
        .attr('svg_index', (d, svg_index) => svg_index)
        .attr('add_title_rect', function (d) { d3.select(this).selectAll('.title_rect').data([0]).join('rect').attr('class', 'title_rect').attr('width', item_width + 2).attr('x', -1).attr('height', margin.item_top_margin).attr('fill', '#d1d1d1') })
        .attr('add_title_text', function (d, svg_index) { d3.select(this).selectAll(".title_text").data([0]).join('text').attr('class', 'title_text').text(d[0]).attr('y', 0).attr('dominant-baseline', 'hanging').attr("font-size", 12).attr('x', 10).attr('text-anchor', 'start') })
        .attr('add_item_rect', function (d, svg_index) { d3.select(this).selectAll('.item_rect').data([0]).join('rect').attr('class', 'item_rect').attr('width', item_width).attr('height', item_height).attr('y', margin.item_top_margin).attr('fill', clicked_features.includes(d[0]) ? "#F8FDB8" : '#f2f2f2').attr('fill-opacity', 1).attr('stroke', '#b2b0b0') })
        //Add circles and lines to divide the rectangle
        .attr('add_contrib_lines', function (d, svg_index) {
          d3.select(this).selectAll(".mylines").data([[.25], [.5], [.75]]).join('line').attr('class', 'mylines')
            .attr('x1', 0).attr('x2', item_width)
            .attr('y1', d => d * (item_height + margin.item_top_margin)).attr('y2', d => d * (item_height + margin.item_top_margin)).attr('stroke-width', 1).attr("stroke", "#bababa")
        })
    }
    , exit => exit.remove())
  //---------------------------------------------------------------------------------------------------------------------------------------------------
}

export function CreatexpCircle(parent_id, selected_instances, sorted_features, lime_data, selected_year, defualt_models, clicked_circles, Set_clicked_circles, diverginColor, anim_config, clicked_features, Set_clicked_features) {
  
}