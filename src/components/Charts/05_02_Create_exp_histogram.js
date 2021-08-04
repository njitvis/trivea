import * as d3 from "d3";
export default function CreatexpHistogram(d, selection, selected_instances, sorted_features, lime_data, selected_year, defualt_models, clicked_circles, Set_clicked_circles, diverginColor, anim_config, clicked_features, Set_clicked_features) {
    var margin = { item_top_margin: 6, item_bottom_margin: 6, circ_radius: 5, item_left_margin: 6, item_right_margin: 6 }
    var item_width = d3.select("#svg2").attr("width")
    var item_height = d3.select("#svg2").attr("height")
    var feature_name = d[0]
    defualt_models.map(model => {
        var hist_data = []
        lime_data[model].map(item => {
            if (item['1-qid'] == selected_year && selected_instances.includes(parseInt(item['two_realRank']))) {
                hist_data.push(parseFloat(item[feature_name]))
                hist_data.push(item)
            }
        })
        // Draw circle starts here
        var y = d3.scaleLinear().domain([d3.min(hist_data.map(item => parseFloat(item[d[0]]))), d3.max(hist_data.map(item => parseFloat(item[d[0]])))])
            .range([margin.item_top_margin, item_height - margin.item_bottom_margin])
        var x = d3.scaleLinear().domain([d3.min(hist_data.map(item => parseFloat(item[feature_name]))), d3.max(hist_data.map(item => parseFloat(item[feature_name])))])
            .range([margin.item_left_margin, item_width - margin.item_right_margin])
        
        // set the parameters for the histogram
        var histogram = d3.histogram()
            .value(function (d) { return d })   // I need to give the vector of value
            .thresholds(x.ticks(7)); // then the numbers of bins

        // And apply this function to data to get the bins
        var bins = histogram(hist_data);
        console.log(bins)


    })

}