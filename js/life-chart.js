const BazLifeData = [
    {"date": "1995-01", "value": 10, "description": "Born."},
    {"date": "1996-01", "value": 8}, // TODO add descriptions to data points
    {"date": "1997-01", "value": 8},
    {"date": "1998-01", "value": 8},
    {"date": "1999-01", "value": 6},
    {"date": "2000-01", "value": 7},
    {"date": "2001-01", "value": 8},
    {"date": "2002-01", "value": 7},
    {"date": "2003-01", "value": 7},
    {"date": "2004-01", "value": 8},
    {"date": "2005-01", "value": 7},
    {"date": "2006-01", "value": 4},
    {"date": "2007-01", "value": 5},
    {"date": "2008-01", "value": 7},
    {"date": "2009-01", "value": 6},
    {"date": "2010-01", "value": 3},
    {"date": "2011-01", "value": 5},
    {"date": "2012-01", "value": 6},
    {"date": "2013-01", "value": 7},
    {"date": "2014-01", "value": 2},
    {"date": "2015-01", "value": 5},
    {"date": "2016-01", "value": 7},
    {"date": "2017-01", "value": 8},
    {"date": "2018-01", "value": 10},
    {"date": "2019-01", "value": 8},
    {"date": "2020-01", "value": 4},
    {"date": "2021-01", "value": 8},
];

function createLifeChart(data) {
    
    function date(d) {
        return new Date(d.date);
    }

    var height = 350;
    var width = 700;
    var margin = ({top: 20, right: 30, bottom: 30, left: 40});

    var xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    var x = d3.scaleUtc()
        .domain(d3.extent(data, d => date(d)))
        .range([margin.left, width - margin.right]);

    var yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y));

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top]);

    var line = d3.line()
        .defined(d => !isNaN(d.value))
        .x(d => x(date(d)))
        .y(d => y(d.value))
        .curve(d3.curveBasis);

    var svg = d3.select("#life-chart")
        .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
}

createLifeChart(BazLifeData);