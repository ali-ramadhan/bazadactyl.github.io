// Adapted from: https://observablehq.com/@tezzutezzu/world-history-timeline
//          and: https://bl.ocks.org/d3noob/8952219
//          and: https://www.d3-graph-gallery.com/graph/interactivity_tooltip.html

const ExperienceType = Object.freeze({
    Software:  "Software",
    People:    "People",
    Teaching:  "Teaching",
    Education: "Education",
    Travel:    "Travel",
});

const ExperienceColor = {
    [ExperienceType.Software]:  ColorBlind.Blue,
    [ExperienceType.People]:    ColorBlind.Orange,
    [ExperienceType.Teaching]:  ColorBlind.Yellow,
    [ExperienceType.Education]: ColorBlind.Red,
    [ExperienceType.Travel]:    ColorBlind.Purple,
};

const BazExperienceData = [
    {
        employer: "Nuba Gastown",
        position: "Food Expediter",
        shortName: "Nuba",
        type: ExperienceType.People,
        location: "Vancouver, BC",
        startDate: "2013-01",
        endDate: "2013-06",
        htmlId: "nuba",
    },
    {
        employer: "Carleton University",
        position: "Bachelor of Computer Science",
        shortName: "University",
        type: ExperienceType.Education,
        location: "Ottawa, ON",
        startDate: "2013-09",
        endDate: "2018-04",
        htmlId: "computer-science",
    },
    {
        employer: "El Camino",
        position: "Support Staff",
        shortName: "El Camino",
        type: ExperienceType.People,
        location: "Ottawa, ON",
        startDate: "2014-05",
        endDate: "2015-05",
        htmlId: "el-camino",
    },
    {
        employer: "Self-employed as the 'Top Comp Tutor'",
        position: "Computer Science Private Tutor",
        shortName: "Private Tutor",
        type: ExperienceType.Teaching,
        location: "Ottawa, ON",
        startDate: "2015-09",
        endDate: "2016-04",
        htmlId: "private-tutor",
    },
    {
        employer: "Carleton University",
        position: "Teaching Assistant",
        shortName: "Teaching Assistant",
        type: ExperienceType.Teaching,
        location: "Ottawa, ON",
        startDate: "2016-01",
        endDate: "2017-12",
        htmlId: "teaching-assistant",
    },
    {
        employer: "Ciena — Wavelength Service Management Division",
        position: "Software Developer Co-op",
        shortName: "Ciena (WSM)",
        type: ExperienceType.Software,
        location: "Kanata, ON",
        startDate: "2015-09",
        endDate: "2015-12",
        htmlId: "ciena-wsm",
    },
    {
        employer: "Interset",
        position: "Software Developer Co-op",
        shortName: "Interset",
        type: ExperienceType.Software,
        location: "Kanata, ON",
        startDate: "2016-05",
        endDate: "2016-08",
        htmlId: "interset",
    },
    {
        employer: "Ciena — Blue Planet Division",
        position: "Software Developer Co-op",
        shortName: "Ciena (Blue Planet)",
        type: ExperienceType.Software,
        location: "Kanata, ON",
        startDate: "2017-01",
        endDate: "2017-08",
        htmlId: "ciena-blue-planet",
    },
    {
        employer: "Road Trip",
        position: "East Coast",
        shortName: "Road Trip!",
        type: ExperienceType.Travel,
        location: "Quebec, Labrador, Newfoundland, Nova Scotia, New Brunswick",
        startDate: "2018-05",
        endDate: "2018-06",
        htmlId: "road-trip",
    },
    {
        employer: "Camp Winston",
        position: "Camp Counselor",
        shortName: "Camp Counselor",
        type: ExperienceType.People,
        location: "Muskoka, ON",
        startDate: "2018-06",
        endDate: "2018-08",
        htmlId: "camp-winston",
    },
    {
        employer: "Kinaxis — Algorithms Team",
        position: "Advisory Test Developer",
        shortName: "Kinaxis",
        type: ExperienceType.Software,
        location: "Kanata, ON",
        startDate: "2018-10",
        endDate: null,
        htmlId: "kinaxis",
    },
];

function createExperienceTimeline(rawData) {

    function tooltipHtml(d) {
        const formattedStartDate = formatDate(d.startDate);
        const formattedEndDate = d.endDate === today ? "Present" : formatDate(d.endDate);
        return `
            <div id="timeline-tooltip-position">
                <b>${d.position}</b>
            </div>
            <div id="timeline-tooltip-employer">
                ${d.employer}
            </div>
            <div id="timeline-tooltip-location">
                ${d.location}
            </div>
            <div id="timeline-tooltip-type">
                <b style="color:${darker(color(d))}">${d.type}</b>
            </div>
            <div id="timeline-tooltip-date">
                ${formattedStartDate} — ${formattedEndDate}
            </div>
        `;
    }

    function showTooltip(_event, d) {
        d3.select(this).select("rect")
            .attr("fill", darker(color(d)));

        tooltip
            .classed("selected", true)
            .html(tooltipHtml(d));
    }

    function updateTooltip(event) {
        const node = svg; // get x-y relative to the entire chart
        const [x, y] = d3.pointer(event, node);
        const tooltipHeight = tooltip.node().getBoundingClientRect().height;

        tooltip
            .style("left", `${x + 35}px`)
            .style("top", `${y - tooltipHeight/2}px`);
    }

    function hideTooltip(_event, d) {
        d3.select(this).select("rect")
            .attr("fill", color(d));
        tooltip.classed("selected", false);
    }

    function selectExperience(_event, d) {
        const alreadySelected = d3.select(this).select("rect").classed("selected");
        
        if (alreadySelected) {
            return;
        }

        d3.selectAll(".experience-group-text")
            .style("display", "none");

        d3.selectAll(".experience-text")
            .style("display", "none");
        
        d3.selectAll(".bar")
            .classed("selected", false);
        
        d3.select(this).select("rect")
            .classed("selected", true);

        const sectionIdToShow = `#${d.htmlId}`;

        d3.select(sectionIdToShow)
            .style("display", "block");

        let groupId;

        if (d.type === ExperienceType.Software) {
            groupId = "software-experience";
        } else if (d.type === ExperienceType.Teaching) {
            groupId = "teaching-experience";
        } else if (d.type === ExperienceType.People) {
            groupId = "people-experience";
        } else {
            groupId = "";
        }

        if (groupId) {
            d3.select(`#${groupId}`)
                .style("display", "block");
        }
    }

    function drawRect(d) {
        const group = d3.select(this);
        const barX = x(d.startDate);
        const barWidth = x(d.endDate) - x(d.startDate);
      
        group.style("cursor", "pointer");
      
        group.append("rect")
            .attr("class", "bar")
            .attr("x", barX + margin.left)
            .attr("rx", 10)
            .attr("height", y.bandwidth())
            .attr("width", barWidth)
            .attr("fill", color(d));

        group.append("text")
            .text(d.shortName)
            .attr("class", "bar-label")
            .attr("y", 4)
            .attr("dominant-baseline", "hanging")
            .each(function(d) {
                const putTextRightOfBar = margin.left + barX + barWidth < chartWidth * 0.90;

                const textX = putTextRightOfBar ? (margin.left + barX + barWidth + 5) : (margin.left + barX - 5);
                const textAnchor = putTextRightOfBar ? "start" : "end";

                d3.select(this).attr("x", textX);
                d3.select(this).attr("text-anchor", textAnchor);
            });

        group
            .on("mouseover", showTooltip)
            .on("mousemove", updateTooltip)
            .on("mouseleave", hideTooltip)
            .on("click", selectExperience);
    }

    const parseDate = d3.timeParse("%Y-%m");
    const formatDate = d3.timeFormat("%B %Y");
    const formatTickDate = d3.timeFormat("%Y");
    const today = new Date();

    let data = rawData.map(raw => {
        let d = {...raw}; // shallow copy
        d.startDate = parseDate(d.startDate);
        d.endDate = d.endDate ? parseDate(d.endDate) : today;
        return d;
    }).sort((a, b) => a.startDate - b.startDate);

    let margin = {
        top: 20,
        left: 20,
        right: 35,
        bottom: 30,
    }

    const defaultWidth = 900;
    const defaultHeight = 450;

    const screenWidth = document.documentElement.clientWidth;
    const widthAvailable = Math.min(defaultWidth, screenWidth);

    let chartWidth = widthAvailable - margin.left - margin.right;
    let chartHeight = defaultHeight - margin.top - margin.bottom;

    let color = d => ExperienceColor[d.type];
    let darker = c => d3.color(c).darker();

    let minDate = d3.min(data, d => d.startDate);
    let maxDate = d3.max(data, d => d.endDate);

    const monthsPadding = 6;
    const paddedMinDate = (new Date(minDate)).setMonth(minDate.getMonth() - monthsPadding);
    const paddedMaxDate = (new Date(maxDate)).setMonth(maxDate.getMonth() + monthsPadding);

    let x = d3.scaleTime()
        .domain([paddedMinDate, paddedMaxDate])
        .range([0, chartWidth - margin.left - margin.right])

    let y = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, chartHeight - margin.bottom - margin.top])
        .padding(0.2);

    let xAxis = d3.axisBottom(x)
        .tickPadding(2)
        .tickSize(5)
        .tickFormat(formatTickDate)
        .ticks(d3.timeYear.every(widthAvailable < defaultWidth ? 2 : 1));

    var tooltip = d3.select("#experience-timeline")
        .append("div")
        .attr("class", "tooltip")
        .attr("id", "timeline-tooltip");

    let chart = d3.select("#experience-timeline");

    let svg = chart.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);
        
    const defs = svg.append('defs')
    
    defs.append('marker')
        .attr('id', 'arrowhead-right')
        .attr('refX', 1)
        .attr('refY', 10)
        .attr('markerWidth', 10)
        .attr('markerHeight', 10)
        .append('path')
            .attr('d', 'M 0 0 L 10 5 L 0 10 z')
            .attr('stroke', ColorDarkBlack)
            .attr('stroke-width', 1)
            .attr('fill', ColorDarkBlack);

    defs.append('marker')
        .attr('id', 'arrowhead-left')
        .attr('refX', 9)
        .attr('refY', 10)
        .attr('markerWidth', 10)
        .attr('markerHeight', 10)
        .append('path')
            .attr('d', 'M 0 5 L 10 0 L 10 10 z')
            .attr('stroke', ColorDarkBlack)
            .attr('stroke-width', 1)
            .attr('fill', ColorDarkBlack);
    

    svg.append("g")
        .attr("transform", `translate(${margin.left} ${chartHeight-margin.bottom})`)
        .attr("id", "x-axis")
        .call(xAxis)
        .attr("font-size", 14);

    svg.select('#x-axis path.domain')
        .attr('marker-start', 'url(#arrowhead-left)');

    svg.select('#x-axis path.domain')
        .attr('marker-end', 'url(#arrowhead-right)');

    let barsGroup = svg.append("g")
        .attr("id", "bar-groups");

    let bars = barsGroup.selectAll("g")
        .data(data)
        .enter().append("g")
            .attr("class", "bar-group")
            .attr("id", d => `bar-${d.htmlId}`)
            .attr("transform", (d, i) => `translate(0 ${y(i)})`)
            .each(drawRect);

    const legendContainer = chart.append("div")
        .attr("id", "timeline-legend")
        .attr("class", "legend");
    
    const legendItems = legendContainer.selectAll(".legend-item")
        .data(Object.values(ExperienceType)).enter()
        .append("div")
            .attr("class", "legend-item");
        
    legendItems.append("span")
        .attr("class", "legend-text")
        .text(d => d)
        .style("background-color", d => ExperienceColor[d]);

    // show the Kinaxis section on load
    d3.select('#bar-kinaxis').dispatch('click');
}

createExperienceTimeline(BazExperienceData);