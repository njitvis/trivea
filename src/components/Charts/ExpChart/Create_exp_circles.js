import * as d3 from "d3";
export default function CreatexpCircle(d, selection, selected_instances, 
    lime_data, selected_year, default_models, clicked_circles, Set_clicked_circles, diverginColor, anim_config, item_width, item_height,deviation_array) {
//console.log('deviation_array',deviation_array)
    var margin = { item_top_margin: 25, item_bottom_margin: 6, circ_radius: 5, item_left_margin: 6, item_right_margin: 6 }
    var feature_name = d[0]
    var feature_contrib_name = d[0] + "_contribution"

    var circ_data = []
    var sum_data = []
    default_models.map(model => {
        lime_data[model].map(item => {
            if (item['1-qid'] == selected_year && selected_instances.includes(parseInt(item['two_realRank']))) {
                sum_data.push(parseFloat(item[feature_contrib_name]))
                item['id'] = item['State'].replace(/ /g, '').replace(/[^a-zA-Z ]/g, "") + model.replace(/ /g, '').replace(/[^a-zA-Z ]/g, "")
                circ_data.push(item)
            }
        })
    })
    // Draw circle starts here
    if(isNaN(lime_data[default_models[0]][0][feature_name])){
        var yScale = d3.scaleBand().domain(lime_data[default_models[0]].map(item=>item[feature_name])).range([margin.item_top_margin, item_height - margin.item_bottom_margin])
    }
    else{
        var yScale = d3.scaleLinear().domain([d3.min(circ_data.map(item => parseFloat(item[d[0]]))), d3.max(circ_data.map(item => parseFloat(item[d[0]])))]).range([margin.item_top_margin, item_height - margin.item_bottom_margin])
    }    
    var xScale = d3.scaleLinear().domain([d3.min(circ_data.map(item => parseFloat(item[feature_contrib_name]))), d3.max(circ_data.map(item => parseFloat(item[feature_contrib_name])))]).range([margin.item_left_margin, item_width - margin.item_right_margin])
    //----------
    var my_mean = d3.mean(sum_data)
    //----------
    selection.selectAll(".my_mean_line").data([0]).join("line").attr("class","my_mean_line").attr("x1",xScale(my_mean)).attr("x2",xScale(my_mean)).attr("y1",18).attr("y2",item_height).attr('stroke',"rgb(96, 96, 96,0.5)").attr('stroke-width',1)
    var rScale=d3.scaleLinear().domain(d3.extent(deviation_array)).range([2,5])
    var mycircles = selection.selectAll(".my_circles").data(circ_data, d => d['id']).join(
        enter => enter.append('circle')
            .attr('id', d => d['id'])
            .attr('class', d => 'my_circles')
            .attr('fill', d => diverginColor(d['two_realRank']))
            .attr("transform", function (d, i) {
                var x_transform = xScale(parseFloat(d[feature_contrib_name]))
                var y_transform = getRandomArbitrary(margin.item_top_margin, item_height - margin.item_bottom_margin,i)
                return "translate(" + x_transform + "," + y_transform + ")";
            })
            .attr("r", d=>rScale(d['deviation']))
        // Update
        , update => update.attr('class', d => d['id'] + ' items circle2 my_circles')
            .transition().duration(anim_config.circle_animation).delay(anim_config.rank_animation + anim_config.deviation_animation + anim_config.feature_animation)
            .attr("transform", function (d, i) {
                var x_transform = xScale(parseFloat(d[feature_contrib_name]))
                var y_transform = getRandomArbitrary(margin.item_top_margin, item_height - margin.item_bottom_margin,i)
                return "translate(" + x_transform + "," + y_transform + ")";
            })
            .attr('id', d => d['id'])
        , exit => exit.remove())
    mycircles.on('click', d=>{
        Set_clicked_circles(clicked_circles.includes(d['id']) ? clicked_circles.filter(item => item != d['id']) : [...clicked_circles, d['id']])
    }
    )
    // Draw circle ends here
    function getRandomArbitrary ( min, max, seed ) {
        min = min || 0;
        max = max || 1;
        var rand;
        if ( typeof seed === "number" ) {
          seed = ( seed * 9301 + 49297 ) % 233280;
          var rnd = seed / 233280;
          var disp = Math.abs( Math.sin( seed ) );
          rnd = ( rnd + disp ) - Math.floor( ( rnd + disp ) );
          rand = Math.floor( min + rnd * ( max - min + 1 ) );
        } else {
          rand  = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        }
        return rand;
      }
}