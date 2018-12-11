let sizes;

responses = {};

var multikey;

var lc_x,lc_y,lc_line,lc_svg,lc_g,lc_legend,parseTime,lc_tooltip; //Line chart D3 constants
var lc_color = d3.schemeCategory10;

function generateCharts(selector) {
    $(selector).append($('<div />', {id:'chartCont',style:`width:${sizes.chart.width}px;`}));
    genTitle(selector + ' #chartCont');
    genLineChart(selector + ' #chartCont');
}

function setSizes() {
    var totalWidth = Math.min(Math.max($(window).width() * 0.6,800),1000);
    var totalHeight = (window.innerHeight * 0.95);

    var footHeight = 100;
    var headHeight = 140;

    return {
        foot: {
            width:totalWidth,
            height:footHeight
        },
        header:{
            width: totalWidth,
            height:headHeight
        },
        switchCompare: {
            width:40,height:30
        },
        chart: {
            width:totalWidth,
            height: totalHeight - footHeight - headHeight,
            margin:{top:20,right:20,bottom:30,left:40}
        }
    }
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
        .attr('width',sizes.chart.width + 'px')
        .attr('height',sizes.chart.height + 'px');
    lc_g = lc_svg.append("g")
        .attr("transform", "translate(" + sizes.chart.margin.left + "," + sizes.chart.margin.top + ")");

    var height = sizes.chart.height - sizes.chart.margin.top - sizes.chart.margin.bottom;

    var width = sizes.chart.width - sizes.chart.margin.left - sizes.chart.margin.right;

    parseTime = d3.timeParse('%Y');


    lc_x = d3.scaleTime()
        .rangeRound([0,width])
        .domain([parseTime(2004),parseTime(2018)]);

    lc_y = d3.scaleLinear()
        .rangeRound([height,0])
        .domain([-3,3]);


    lc_line = d3.line()
        .defined(function (d) {return d; })
        .x(function(d) {
            return lc_x(parseTime(d.period));
        })
        .y(function(d) {
            return lc_y(d.value);
        });

    genFooter(selector);

    lc_g.append('g').attr('transform','translate(0,' + height + ')')
        .call(d3.axisBottom(lc_x));
        //.select('.domain').remove() - wtf is doing this?

    lc_g.append('g')
        .call(d3.axisLeft(lc_y).ticks(7));
    lc_g.append('image')
        .attr('xlink:href','img/g_z_cdy.JPG')
        .attr('x',-40)
        .attr('y',lc_y(2.95))
        .attr('width',40)
        .attr('height',40)
        .style("text-anchor", "middle");


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

    updTitle('#appCont #lineChartTitle h4');

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
    yrs = Array.from(new Array(13), (x,i) => i + 2005);

    function filterResults (yr) {
            el = result.data.interindexes.find(x=> x.period == yr);
            if(typeof el === 'undefined') {
                return null
            }
            else {
                return {period:yr,value:el.value}
            }
    }
    let data = yrs.map(filterResults);

    lines = lc_g.select('#lines');
    lines.append('path')
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", function() {if (faded) {return '#d1d4d3'} else {return lc_color[rank]}})
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", function() {if (faded) {return 1.5} else {return 1.5}})
        .attr("stroke-dasharray", function() {if (faded) {return 8} else {return 0}})
        .attr("d", lc_line);
    if (!faded) {
        lines.append('g').selectAll('circle')
            .data(data.filter(function(d) { return d; }))
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
        .attr('transform','translate(0,' + rank * 25 + ')');
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

function updTitle(selector) {
    el = $(selector + ' #LineChartTitle');

    let multipurpose = Object.keys(ddlconfig).find(x => ddlconfig[x].multiple === true);

    let s = '';

    let fields = $('#ddl_fields select').select2('data');
    let countries = $('#ddl_countries select').select2('data');
    let methods = $('#ddl_methods select').select2('data');

    switch (multipurpose) {
        case 'countries':
            s = `Globalization in ${fields[0].text} measured by ${methods[0].text}`;
            break;
        case 'fields':
            s = `Globalization in ${countries[0].text} measured by ${methods[0].text}`;
            break;
        case 'methods':
            s = `Globalization in ${countries[0].text} in ${fields[0].text}`;
            break;
    }
    $(selector).text(s)
}

function genTitle(selector) {
    $(selector).append($('<div />', {id:'LineChartTitle'}));
    $(selector + ' #lineChartTitle').append('<h4 />');

    updTitle(selector + ' #lineChartTitle h4');
    $(selector + ' #lineChartTitle h4').css('width', sizes.chart.width + 'px');
    $(selector + ' #lineChartTitle h4').css('margin-left', (sizes.chart.width/2)*-1 + 'px');
    //    width:1000px;
    //     margin-left: -500px;

}

function genFooter(selector) {
    $(selector).append($('<div />', {id:'LineChartFooter'}));
    s = 'Source: <a class="modalLink" onclick="showModal(\'modScopus\')">Scopus</a>; $G_{c,d,y}^Z = 0$ ' +
        'is an average across all countries, disciplines and years. $G_{c,d,y}^Z = 1$ is one standard deviation above average. ' +
        '$G_{c,d,y}^Z$ only reported when calculated from at least 30 journals. ' +
        'The sudden jumps can be, in most cases, explained by entrance or exit of important journals in Scopus';
    $(selector + ' #lineChartFooter').append('<p>'+ s +'</p>');
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"LineChartFooter"]);

}