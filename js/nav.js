function navButtonClicked(event) {
    const clickedButtonId = event.target.id;
    const buttons = document.getElementsByClassName("nav-button");

    for (const button of buttons) {
        if (button.id === clickedButtonId) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    }

    const sectionIdToShow = clickedButtonId.split("-")[1];
    const sections = document.getElementsByTagName("portfolio-section");

    for (const section of sections) {
        if (section.id === sectionIdToShow) {
            section.classList.add("selected");
        } else {
            section.classList.remove("selected");
        }
    }

    setSectionUrlParam(sectionIdToShow);
}

function addNavClickListeners() {
    const navButtons = document.getElementsByClassName("nav-button");

    for (const button of navButtons) {
        button.addEventListener("click", navButtonClicked);
    }
}

function setSectionUrlParam(val) {
    const url = window.location.href;
    const param = "section";

    let newUrl;

    if (url.includes("?")) {
        const base = url.split("?")[0];
        newUrl = `${base}?${param}=${val}`;
    } else {
        newUrl = `${url}?${param}=${val}`;
    }
    
    history.replaceState(null, null, [newUrl]);
}

function selectSectionFromUrlParam() {
    const url = window.location.href;

    const defaultSectionId = "home";
    const defaultNavId = "nav-" + defaultSectionId;
    
    if (!url.includes("?")) {
        document.getElementById(defaultNavId).classList.add("selected");
        document.getElementById(defaultSectionId).classList.add("selected");
        return;
    }

    const paramPair = url.split("?")[1];

    const paramKey = paramPair.split("=")[0];
    const paramVal = paramPair.split("=")[1];

    if (paramKey === "section") {
        const sectionId = paramVal;
        const navId = `nav-${paramVal}`;

        document.getElementById(navId).classList.add("selected");
        document.getElementById(sectionId).classList.add("selected");
    } else {
        document.getElementById(defaultNavId).classList.add("selected");
    }
}

selectSectionFromUrlParam();
addNavClickListeners();