// Adapted from: https://bost.ocks.org/mike/map/

const CountryJsonUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Visited = 0;
const WantToVisit = 1;
const NotVisited = 2;

const ColorVisited     = ColorBlind.Blue;
const ColorWantToVisit = ColorBlind.Red;
const ColorNotVisited  = ColorBlind.Grey;

const CountryData = {
    "Canada": Visited,
    "United Arab Emirates": Visited,
    "Morocco": Visited,
    "Turkey": Visited,
    "United States of America": Visited,
    "France": Visited,
    "Egypt": Visited,
    "Oman": Visited,
    "North Korea": Visited, // haha! just kidding
    "Poland": WantToVisit,
    "Germany": WantToVisit,
    "India": WantToVisit,
    "Mexico": WantToVisit,
    "Argentina": WantToVisit,
    "China": WantToVisit,
    "Japan": WantToVisit,
    "New Zealand": WantToVisit,
    "Iraq": WantToVisit,
    "Spain": WantToVisit,
    "Thailand": WantToVisit,
    "Australia": WantToVisit,
    "Iran": WantToVisit,
    "Denmark": WantToVisit,
    "Sweden": WantToVisit,
    "Iceland": WantToVisit,
    "Yemen": WantToVisit,
    "Lebanon": WantToVisit,
    "Greece": WantToVisit,
    "Netherlands": WantToVisit,
}

const LegendData = [
    { label: "Visited",     color: ColorVisited     },
    { label: "Want to go",  color: ColorWantToVisit },
    { label: "Not visited", color: ColorNotVisited  },
];

function createWorldMap(data) {

    function countryClass(d) {
        const status = countryStatus(d); 
        let cls = "country";
    
        if (status === Visited) {
            cls += " visited";
        } else if (status === WantToVisit) {
            cls += " want-to-visit";
        } else {
            cls += " not-visited"
        }

        return cls;
    }
    
    function countryColor(d) {
        const status = countryStatus(d);

        if (status === Visited) {
            return ColorVisited;
        } else if (status === WantToVisit) {
            return ColorWantToVisit;
        } else {
            return ColorNotVisited;
        }
    }
    
    function countryName(d) {
        return d.properties.name;
    }

    function countryStatus(d) {
        const country = countryName(d);

        if (data.hasOwnProperty(country)) {
            return data[country];
        } else {
            return NotVisited;
        }
    }

    function mouseover(_event, d) {
        d3.select(this).classed("hovered", true);
    
        // put this country path element last in the DOM so the border renders nicely
        g.selectAll("path").sort(function(a, b) {
            return countryName(d) === countryName(a) ? 1 : -1;
        })
    }
    
    function mouseout(_event, d) {
        d3.select(this).classed("hovered", false);
    }

    let width = 1000;
    let height = 520;

    let projection = d3.geoNaturalEarth2();

    let chart = d3.select("#world-map");

    let svg = chart.append("svg")
        .attr("width", width)
        .attr("height", height);

    let graticule = d3.geoGraticule();
    let outline = graticule.outline();
    let geoPath = d3.geoPath(projection);

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule line")
        .attr("d", geoPath);

    svg.append("path")
        .datum(outline)
        .attr("class", "graticule outline")
        .attr("d", geoPath);

    let g = svg.append("g");
        
    d3.json(CountryJsonUrl).then(topology => {
        const countries = topojson.feature(topology, topology.objects.countries).features;
        
        g.selectAll("path")
            .data(countries)
            .enter().append("path")
                .attr("d", geoPath)
                .attr("id", countryName)
                .attr("class", countryClass)
                .attr("fill", countryColor)
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .append('title')
                    .text(countryName);
    });

    const legendContainer = chart.append("div")
        .attr("id", "world-map-legend")
        .attr("class", "legend");

    const legendItems = legendContainer.selectAll(".legend-item")
        .data(LegendData).enter()
        .append("div")
            .attr("class", "legend-item");
    
    legendItems.append("span")
        .attr("class", "legend-text")
        .text(d => d.label)
        .style("background-color", d => d.color);
}

createWorldMap(CountryData);