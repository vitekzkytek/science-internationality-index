svgSize = {
    width: '600',
    height: '400',
    margin:{top:20,right:20,bottom:20,left:40}
};

responses = {};

var multikey;

var lc_x,lc_y,lc_line,lc_svg,lc_g,lc_legend,parseTime,lc_tooltip; //Line chart D3 constants
var lc_color = d3.schemeCategory10;

function generateCharts(selector) {
    $(selector).append($('<div />', {id:'chartCont'}));
    genLineChart(selector + ' #chartCont');
}


function genLineChart(selector) {
    $(selector).append($('<div />', {id:'LineChartCont'}));
    $('div.tooltip').remove();


    lc_tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    lc_svg = d3.select(selector + ' #LineChartCont')
        .append('svg')
        .attr('id','svgLineChart')
        .attr('width',svgSize.width + 'px')
        .attr('height',svgSize.height + 'px');
    lc_g = lc_svg.append("g")
        .attr("transform", "translate(" + svgSize.margin.left + "," + svgSize.margin.top + ")");

    var height = svgSize.height - svgSize.margin.top - svgSize.margin.bottom;

    var width = svgSize.width - svgSize.margin.left - svgSize.margin.right;

    parseTime = d3.timeParse('%Y');


    lc_x = d3.scaleTime()
        .rangeRound([0,width])
        .domain([parseTime(2000),parseTime(2018)]);

    lc_y = d3.scaleLinear()
        .rangeRound([height,0])
        .domain([-3,3]);


    lc_line = d3.line()
        .x(function(d) {
            return lc_x(parseTime(d.period));
        })
        .y(function(d) {
            return lc_y(d.value);
        });

    lc_g.append('g').attr('transform','translate(0,' + height + ')')
        .call(d3.axisBottom(lc_x));
        //.select('.domain').remove() - wtf is doing this?

    lc_g.append('g')
        .call(d3.axisLeft(lc_y));
        //.append('')pi

    lc_g.append('g').attr('id','lines');

    lc_legend = lc_g.append('g')
        .attr('id','legend')
        .attr('transform','translate(25,0)');

    updLineChart()
}

function updLineChart() {
    lc_g.select('#lines').selectAll("*").remove();
    lc_g.select('#legend').selectAll("*").remove();

    var reqs = genReqsList();
    var j = 0;
    var rank = 0;
    for (var i in reqs) {
        processLine(reqs[i],i)
    }
}


function processLine(req,rank) {
    var ajaxobj = retrieveInterindex(req);
    $.post(ajaxobj.url, ajaxobj.data, function (result, status, response) {
        DrawLine(result, rank, req.faded);
        DrawLegend(result.data[multikey], rank, req.faded);
    });
}
function DrawLine(result,rank,faded) {

    lines = lc_g.select('#lines');
    lines.append('path')
        .datum(result.data.interindexes)
        .attr("fill", "none")
        .attr("stroke", function() {if (faded) {return '#d1d4d3'} else {return lc_color[rank]}})
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", function() {if (faded) {return 1.5} else {return 1.5}})
        .attr("stroke-dasharray", function() {if (faded) {return 8} else {return 0}})
        .attr("d", lc_line);
    if (!faded) {
        lines.append('g').selectAll('circle')
            .data(result.data.interindexes)
            .enter()
            .append('circle')
            .attr('r', 3)
            .attr('stroke', lc_color[rank])
            .attr('stroke-width', 2)
            .attr('fill', lc_color[rank])
            .attr('cx', function (d) {
                return lc_x(parseTime(d.period))
            })
            .attr('cy', function (d) {
                return lc_y(d.value)
            })
            .on("mouseover", function (d) {
                lc_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                lc_tooltip.html(Math.round(d.value * 100) / 100)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                lc_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }

}


function DrawLegend(result,rank,faded) {
    var g = lc_legend.append('g')
        .attr('id',result[0].name)
        .attr('transform','translate(' + rank * 150 + ',0)');
    if (faded) {
        g.append('line')
            .attr('x1',0)
            .attr('x2',20)
            .attr('y1',0)
            .attr('y2',0)
            .attr('stroke','#d1d4d3')
            .attr('stroke-width',1.5)
            .attr('stroke-dasharray',8)
    }else {
        g.append('circle')
            .attr('r', 7)
            .attr('fill', lc_color[rank]);
    }
    g.append('text')
        .attr('transform','translate(12,7)')
        .text(result[0].name);
}

function genReqsList() {
    var purposes = Object.keys(ddlconfig);
    multikey = Object.keys(ddlconfig).find(key => ddlconfig[key].multiple === true);

    var result = [];

    if (multikey === 'countries') {
        result.push({countries:'_AV',fields:ddlconfig.fields.selectedVals[0],methods:ddlconfig.methods.selectedVals[0],faded:true});
    }

    for (i = 0; i < ddlconfig[multikey].selectedVals.length; i++) {
        var obj = {};
        for (p in purposes) {
            // obj['faded'] = purposes[p] === 'countries';

            obj[purposes[p]] = (purposes[p] === multikey) ? ddlconfig[purposes[p]].selectedVals[i] : ddlconfig[purposes[p]].selectedVals[0];
        }
        obj['faded'] = false;
        result.push(obj)
    }
    return result;
}
