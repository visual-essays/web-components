'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f005592.js');

const veSearchCss = "#ve-search-input-container{outline:none;border:1px rgb(212, 212, 216) solid;background:white;border-left:none;border-right:none;border-radius:0px}#ve-search-input{outline:none;border:none;margin-top:5%;padding-left:10px}#ve-search-bar-show-button::part(base),#ve-search-search-button::part(base),#ve-search-filter-dropdown>sl-button::part(base){background-color:white}#ve-search-bar{width:max-content}#ve-search-bar:hover{box-shadow:0 0 10px rgb(146, 209, 248)}#ve-search-hide-output{background:none;border:none;display:none;padding-right:10px;cursor:pointer}#ve-search-dropdown{width:70%;display:none;border:1px rgb(212, 212, 216) solid;background-color:white;border-radius:3px;padding:7px;margin-top:0;position:absolute;z-index:2}#ve-search-output{margin-left:10px}#ve-search-output>*{font-family:Roboto, sans-serif}#ve-search-output-title{margin-bottom:0}#ve-search-output-title>a{text-decoration:none;color:rgb(147 179 243)}#ve-search-output-link{font-style:italic;font-size:0.8em;color:rgb(60, 131, 40);margin-top:0%}#ve-search-output-title>a:visited{color:rgb(188 140 242)}#ve-search-end-of-output{height:1px;width:99%;background-color:rgb(212, 212, 216);border:none}#ve-search-show-more{border:none;background:none;margin-left:9px;cursor:pointer}";

const VeSearch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.filters = "";
    this.icon = false;
    this.tooltip = "";
    this.API = "AIzaSyCEoD17BDJpQxSeNpm-_vy9bJ-dHweFwEs"; // Needs to be changed to one linked to Kent Maps
    this.DOMAIN = "https://kent-maps.online/";
    this.SEARCH_QUOTA_EXCEEDED_MESSAGE = "Total site search quota exceeded for the day";
    this.NO_RESULTS_MESSAGE = "No results";
    this.RESULTS_PER_PAGE = 10;
    this.items = [];
    this.error = "";
    this.search = false;
    this.previousStart = 0;
    this.activeFilter = "all";
    // Dictionary object with key as path to folder mapped to value to be displayed
    this.filtersObject = new Object();
  }
  // @ClickOutside()
  // hideOutputOnOutsideClick() {
  //     console.log("hideOutputOnOutsideClick()");
  //     this.hideOutput();
  // }
  // Reads filters given in the <ve-search> tag and stores them in filtersObjects
  fillFilters() {
    this.filtersObject["all"] = "All";
    // In the format ["tagValue:displayValue", ... , "tagValue:displayValue"]
    var splitFilters = this.filters.split(",");
    for (var i = 0; i < splitFilters.length; i++) {
      // In the format ["tagValue", "displayValue"]
      var splitFilter = splitFilters[i].split(":");
      splitFilter[0] = splitFilter[0].replace(" ", "");
      this.filtersObject[splitFilter[0]] = splitFilter[1];
    }
  }
  // Loads JSON file of Google site search
  // start is search result to start on
  doSearch(start) {
    var query = this.el.shadowRoot.getElementById("ve-search-input").value;
    query = query.replace(" ", "+");
    this.error = "";
    this.search = true;
    if ((this.items == null) || (start == 0)) {
      this.items = [];
    }
    let url = `https://www.googleapis.com/customsearch/v1?key=${this.API}&cx=${this.cx}&q=${query}&start=${start}`;
    // let url = `http://localhost:3333/v1.json`; // Pre-created JSON to test with after daily searches reached
    fetch(url)
      .then(res => res.json())
      .then(res => {
      this.items = this.items.concat(this.applyFilters(res["items"]));
      // If there is no more results after these
      if (res["queries"]["nextPage"] == null) {
        this.el.shadowRoot.getElementById("ve-search-end-of-output").style.display = "none";
        this.el.shadowRoot.getElementById("ve-search-show-more").style.display = "none";
      }
      else {
        this.el.shadowRoot.getElementById("ve-search-end-of-output").style.display = "block";
        this.el.shadowRoot.getElementById("ve-search-show-more").style.display = "block";
      }
    })
      .catch(_ => {
      this.error = "searchQuotaExceeded";
    })
      .catch(error => {
      console.log(error);
    });
    this.previousStart = start;
    // Shows results and results hide button
    this.el.shadowRoot.getElementById("ve-search-hide-output").style.display = "inline-block";
    this.el.shadowRoot.getElementById("ve-search-dropdown").style.display = "block";
  }
  // Detects the enter key in the input field to begin search
  searchInputKeyPress(event) {
    if (event.key === "Enter") {
      this.doSearch(0);
    }
  }
  // Apply the selected filters to the search results (items)
  applyFilters(items) {
    var filteredItems = [];
    if (this.activeFilter == "all") {
      return items;
    }
    else {
      for (let i = 0; i < items.length; i++) {
        var item = items[i];
        var link = item["link"].replace(this.DOMAIN, "");
        if (link.startsWith(this.activeFilter)) {
          filteredItems.push(item);
        }
        // Code for when tags used for filtering rather than file path (not tested)
        // var metaTags = item["pagemap"]["metatags"];
        // for (let j = 0; j < metaTags.length; j++) {
        //     var metaTag = metaTags[i];
        //     if (metaTag == this.activeFilter) {
        //         filteredItems.push(item);
        //     }
        // }
      }
      return filteredItems;
    }
  }
  // Hide search output if currently shown and visa-versa
  // Activated when user presses the hide button
  invertOutput() {
    var outputDisplay = this.el.shadowRoot.getElementById("ve-search-dropdown").style.display;
    if (outputDisplay == "block") {
      this.hideOutput();
    }
    else {
      this.showOutput();
    }
  }
  hideOutput() {
    this.el.shadowRoot.getElementById("ve-search-hide-output").innerText = "▼";
    this.el.shadowRoot.getElementById("ve-search-dropdown").style.display = "none";
  }
  showOutput() {
    this.el.shadowRoot.getElementById("ve-search-hide-output").innerText = "▲";
    this.el.shadowRoot.getElementById("ve-search-dropdown").style.display = "block";
  }
  updateFilter(filter) {
    this.activeFilter = filter;
    this.el.shadowRoot.getElementById("ve-search-filter-item-" + filter).setAttribute("checked", "true");
  }
  // Used when <ve-search> initially an icon
  showSearchBar() {
    this.el.shadowRoot.getElementById("ve-search-bar").style.display = "block";
    this.el.shadowRoot.getElementById("ve-search-bar-show-button").style.display = "none";
  }
  // Displays essay filter options
  displayFilters() {
    var outputText = [];
    if (this.filters.length > 0) {
      var key;
      for (key in this.filtersObject) {
        outputText = outputText.concat([
          index.h("sl-menu-item", { id: "ve-search-filter-item-" + key, value: key, onClick: this.updateFilter.bind(this, key) }, this.filtersObject[key])
        ]);
      }
    }
    // If there are no filters hide the filter dropdown
    else {
      var noFiltersCSS = `
            #ve-search-input-container {
                border-left: 1px rgb(212, 212, 216) solid;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
            }
            #ve-search-filter-dropdown {
                display: none;
            }`;
      var outputText = [index.h("style", { type: "text/css", innerHTML: noFiltersCSS })];
    }
    return outputText;
  }
  // Displays search results
  displayOutput() {
    var outputText = "";
    // Only display items if a search has been performed
    if (this.search) {
      if (this.items.length == 0) {
        outputText = `<p>${this.NO_RESULTS_MESSAGE}</p>`;
      }
      else if (this.error == "searchQuotaExceeded") {
        outputText = `<p>${this.SEARCH_QUOTA_EXCEEDED_MESSAGE}</p>`;
      }
      else {
        // Display items
        for (let i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          outputText += `<p id = 've-search-output-title'><a href = '${item["link"]}'>"${item["title"]}</a></p>`;
          outputText += `<p id = 've-search-output-link'>${item["link"]}"</p>`;
        }
      }
    }
    return outputText;
  }
  // Adds tooltip to search icon if tool tip enabled
  displayTooltip() {
    var hideSearchBar = `
            #ve-search-bar {
                display: none;
            }`;
    var searchBarStyleSheet = [index.h("style", { type: "text/css", id: "search-bar-style", innerHTML: hideSearchBar })];
    var searchBarShowButton = [
      index.h("sl-button", { id: "ve-search-bar-show-button", onclick: () => this.showSearchBar() }, index.h("sl-icon", { name: "search", label: "Search" }))
    ];
    // Tooltip given
    if (this.tooltip.length > 0) {
      return [
        index.h("sl-tooltip", { content: this.tooltip }, searchBarStyleSheet, searchBarShowButton)
      ];
    }
    // No tooltip
    else {
      return [
        index.h("sl-tooltip", { content: this.tooltip, disabled: true }, searchBarStyleSheet, searchBarShowButton)
      ];
    }
  }
  render() {
    var outputText = [];
    this.fillFilters();
    outputText = outputText.concat([
      index.h("div", { id: "search-container" }, index.h("sl-button-group", { id: "ve-search-bar" }, index.h("sl-dropdown", { id: "ve-search-filter-dropdown" }, index.h("sl-button", { id: "ve-search-active-filter", slot: "trigger", caret: true }, this.filtersObject[this.activeFilter]), index.h("sl-menu", { id: "ve-search-filter-menu" }, this.displayFilters())), index.h("div", { id: "ve-search-input-container" }, index.h("input", { id: "ve-search-input", type: "text", placeholder: "Search the site...", onKeyPress: this.searchInputKeyPress.bind(this) }), index.h("button", { id: "ve-search-hide-output", onClick: this.invertOutput.bind(this) }, "\u25B2")), index.h("sl-button", { id: "ve-search-search-button", onclick: this.doSearch.bind(this, 0) }, index.h("sl-icon", { name: "search", label: "Search" }))), index.h("div", { id: "ve-search-dropdown" }, index.h("div", { id: "ve-search-output", innerHTML: this.displayOutput() }), index.h("hr", { id: "ve-search-end-of-output" }), index.h("button", { id: "ve-search-show-more", onClick: this.doSearch.bind(this, this.previousStart + this.RESULTS_PER_PAGE) }, "Show more...")))
    ]);
    if (this.icon) {
      outputText = outputText.concat([index.h("div", null, this.displayTooltip())]);
    }
    return outputText;
  }
  get el() { return index.getElement(this); }
};
VeSearch.style = veSearchCss;

exports.ve_search = VeSearch;
