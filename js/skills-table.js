const SkillType = Object.freeze({
    Language:  "Languages",
    WebDev:    "WebDev",
    Databases: "Databases",
    Testing:   "Testing",
    Tools:     "Tools",
    Concepts:  "Concepts",
});

const SkillColor = {
    [SkillType.Language]:  ColorBlind.Blue,
    [SkillType.WebDev]:    ColorBlind.Orange,
    [SkillType.Databases]: ColorBlind.Yellow,
    [SkillType.Testing]:   ColorBlind.Red,
    [SkillType.Tools]:     ColorBlind.Purple,
    [SkillType.Concepts]:  ColorBlind.Grey,
};

const BazSkillsData = [
    {
        id: "python",
        name: "Python",
        proficiency: 9,
        enjoyment: 10,
        type: SkillType.Language,
        alternateType: null,
    },
    {
        id: "sql",
        name: "SQL",
        proficiency: 6,
        enjoyment: 9,
        type: SkillType.Databases,
        alternateType: null,
    },
    {
        id: "linux",
        name: "Linux",
        proficiency: 8,
        enjoyment: 8,
        type: SkillType.Tools,
        alternateType: null,
    },
    {
        id: "django",
        name: "Django",
        proficiency: 5,
        enjoyment: 8,
        type: SkillType.WebDev,
        alternateType: null,
    },
    {
        id: "postgresql",
        name: "PostgreSQL",
        proficiency: 5,
        enjoyment: 8,
        type: SkillType.Databases,
        alternateType: null,
    },
    {
        id: "aws",
        name: "AWS",
        proficiency: 2,
        enjoyment: 3,
        type: SkillType.WebDev,
        alternateType: null,
    },
    {
        id: "d3",
        name: "D3.js",
        proficiency: 7,
        enjoyment: 9,
        type: SkillType.WebDev,
        alternateType: null,
    },
    {
        id: "javascript",
        name: "JavaScript",
        proficiency: 7,
        enjoyment: 6,
        type: SkillType.Language,
        alternateType: null,
    },
    {
        id: "java",
        name: "Java",
        proficiency: 7,
        enjoyment: 4,
        type: SkillType.Language,
        alternateType: null,
    },
    {
        id: "c++",
        name: "C / C++",
        proficiency: 5,
        enjoyment: 6,
        type: SkillType.Language,
        alternateType: null,
    },
    {
        id: "r",
        name: "R",
        proficiency: 3,
        enjoyment: 7,
        type: SkillType.Language,
        alternateType: null,
    },
    {
        id: "docker",
        name: "Docker",
        proficiency: 3,
        enjoyment: 7,
        type: SkillType.Tools,
        alternateType: null,
    },
    {
        id: "shell",
        name: "Shell Scripting",
        proficiency: 8,
        enjoyment: 6,
        type: SkillType.Language,
        alternateType: null,
    },
    {
        id: "latex",
        name: "LaTeX",
        proficiency: 6,
        enjoyment: 4,
        type: SkillType.Tools,
        alternateType: null,
    },
    {
        id: "complexity-analysis",
        name: "Complexity Analysis",
        proficiency: 6,
        enjoyment: 7,
        type: SkillType.Concepts,
        alternateType: null,
    },
    {
        id: "agile",
        name: "Agile",
        proficiency: 7,
        enjoyment: 8,
        type: SkillType.Concepts,
        alternateType: null,
    },
    {
        id: "automated-testing",
        name: "Automated Testing",
        proficiency: 8,
        enjoyment: 9,
        type: SkillType.Concepts,
        alternateType: null,
    },
    {
        id: "typescript",
        name: "TypeScript",
        proficiency: 7,
        enjoyment: 8,
        type: SkillType.Language,
        alternateType: null,
    },
    {
        id: "selenium",
        name: "Selenium",
        proficiency: 8,
        enjoyment: 5,
        type: SkillType.Testing,
        alternateType: null,
    },
    // {
    //     id: "jira",
    //     name: "Jira Jockeying",
    //     proficiency: 8,
    //     enjoyment: 5,
    //     type: SkillType.Tools,
    //     alternateType: null,
    // },
    {
        id: "mongodb",
        name: "MongoDB",
        proficiency: 1,
        enjoyment: 4,
        type: SkillType.Databases,
        alternateType: null,
    },
    {
        id: "tensorflow",
        name: "TensorFlow",
        proficiency: 2,
        enjoyment: 7,
        type: SkillType.Tools,
        alternateType: null,
    },
    {
        id: "lisp",
        name: "Lisp",
        proficiency: 5,
        enjoyment: 8,
        type: SkillType.Language,
        alternateType: null,
    },
    {
        id: "testcafe",
        name: "TestCafé",
        proficiency: 8,
        enjoyment: 7,
        type: SkillType.Testing,
        alternateType: null,
    },
    {
        id: "junit",
        name: "JUnit",
        proficiency: 7,
        enjoyment: 6,
        type: SkillType.Testing,
        alternateType: null,
    },
    {
        id: "html",
        name: "HTML",
        proficiency: 8,
        enjoyment: 7,
        type: SkillType.WebDev,
        alternateType: null,
    },
    {
        id: "css",
        name: "CSS",
        proficiency: 7,
        enjoyment: 7,
        type: SkillType.WebDev,
        alternateType: null,
    },
    {
        id: "digitalocean",
        name: "DigitalOcean",
        proficiency: 6,
        enjoyment: 8,
        type: SkillType.WebDev,
        alternateType: null,
    },
    {
        id: "macos",
        name: "macOS",
        proficiency: 7,
        enjoyment: 9,
        type: SkillType.Tools,
        alternateType: null,
    },
    {
        id: "windows",
        name: "Windows",
        proficiency: 7,
        enjoyment: 6,
        type: SkillType.Tools,
        alternateType: null,
    },
    {
        id: "git",
        name: "Git",
        proficiency: 8,
        enjoyment: 6,
        type: SkillType.Tools,
        alternateType: null,
    },
    {
        id: "gimp",
        name: "GIMP",
        proficiency: 4,
        enjoyment: 7,
        type: SkillType.Tools,
        alternateType: null,
    },
    {
        id: "powershell",
        name: "Powershell",
        proficiency: 4,
        enjoyment: 7,
        type: SkillType.Tools,
        alternateType: null,
    }
];

function createSkillsLegend(updateFn) {
    function performClick(_event, skillType) {
        const allSelected = legend.selectAll(".selected").size() === Object.keys(SkillType).length;
        const alreadySelected = d3.select(this.parentNode).classed("selected");

        if(alreadySelected && !allSelected) {
            legend.selectAll(".legend-item").classed("selected", true);
            updateFn(sortFn, showAllSkills);
        } else {
            const showThisSkill = d => d.type === skillType || d.alternateType === skillType;
            legend.selectAll(".legend-item")
                .classed("selected", false)
                .selectAll(".legend-text");
            d3.select(this.parentNode).classed("selected", true);
            updateFn(sortFn, showThisSkill);
        }
    }

    const legend = d3.select("#skills-legend");

    const legendItems = legend.selectAll(".legend-item")
        .data(Object.values(SkillType)).enter()
        .append("div")
            .attr("class", "legend-item selected");
        
    legendItems.append("span")
        .attr("class", "legend-text")
        .text(d => d)
        .style("background-color", d => SkillColor[d])
        .on("click", performClick)
        .style("cursor", "pointer");
}

function createSkillsTable(data) {

    const maxProficiency = 10;

    function populateRow(d) {
        const row = d3.select(this);

        // add logo
        row.append("td")
            .attr("class", "skill-logo-cell")
            .append("img")
                .attr("id", d => `${d.id}-skill-logo`)
                .attr("src", d => `images/${d.id}-logo.webp`)
                .attr("alt", d => `${d.name} Logo`)
                .attr("loading", "lazy");
    
        // add skill name
        row.append("td")
            .attr("class", "skill-name-cell")
            .text(d => d.name);
    
        // add bar
        row.append("td")
            .attr("class", "progress-bar-cell")
            .append("div")
                .attr("class", "progress-bar-background")
                .append("div")
                    .attr("class", "progress-bar-foreground")
                    .style("background", d => SkillColor[d.type])
                    .style("width", d => `${(d.proficiency/maxProficiency) * 100}%`);
    }

    var getKey = function(d) {
        return d.id;
    };

    const container = d3.select("#skills-table");
    const table = container.append("table");
    const tableBody = table.append("tbody");

    const update = function(sortFn, filterFn) {
        const rawData = JSON.parse(JSON.stringify(BazSkillsData)); // deep copy
        const data = rawData.sort(sortFn).filter(filterFn);

        // data join
        const rows = tableBody.selectAll("tr")
            .data(data, getKey);

        // enter selection
        rows.enter().append("tr")
            .attr("class", "skill-row")
            .each(populateRow);

        // enter + update selection
        rows.order(sortFn);

        // exit selection
        rows.exit().remove();
    }

    return update;
}

const sortDesc = (d1, d2) => d3.descending(d1.proficiency, d2.proficiency);
const sortAsc = (d1, d2) => d3.ascending(d1.proficiency, d2.proficiency);
const showAllSkills = d => true;

let sortFn = sortDesc;
let filterFn = showAllSkills;

const updateTable = createSkillsTable(BazSkillsData);
updateTable(sortFn, filterFn);

createSkillsLegend(updateTable);