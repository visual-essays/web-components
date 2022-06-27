import { Component, Prop, Element, State, h } from "@stencil/core";
//  import { ClickOutside } from "stencil-click-outside";
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath(location.port === '3333' ? '' : '/web-components/');
export class VeSearch {
  constructor() {
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
          h("sl-menu-item", { id: "ve-search-filter-item-" + key, value: key, onClick: this.updateFilter.bind(this, key) }, this.filtersObject[key])
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
      var outputText = [h("style", { type: "text/css", innerHTML: noFiltersCSS })];
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
    var searchBarStyleSheet = [h("style", { type: "text/css", id: "search-bar-style", innerHTML: hideSearchBar })];
    var searchBarShowButton = [
      h("sl-button", { id: "ve-search-bar-show-button", onclick: () => this.showSearchBar() },
        h("sl-icon", { name: "search", label: "Search" }))
    ];
    // Tooltip given
    if (this.tooltip.length > 0) {
      return [
        h("sl-tooltip", { content: this.tooltip },
          searchBarStyleSheet,
          searchBarShowButton)
      ];
    }
    // No tooltip
    else {
      return [
        h("sl-tooltip", { content: this.tooltip, disabled: true },
          searchBarStyleSheet,
          searchBarShowButton)
      ];
    }
  }
  render() {
    var outputText = [];
    this.fillFilters();
    outputText = outputText.concat([
      h("div", { id: "search-container" },
        h("sl-button-group", { id: "ve-search-bar" },
          h("sl-dropdown", { id: "ve-search-filter-dropdown" },
            h("sl-button", { id: "ve-search-active-filter", slot: "trigger", caret: true }, this.filtersObject[this.activeFilter]),
            h("sl-menu", { id: "ve-search-filter-menu" }, this.displayFilters())),
          h("div", { id: "ve-search-input-container" },
            h("input", { id: "ve-search-input", type: "text", placeholder: "Search the site...", onKeyPress: this.searchInputKeyPress.bind(this) }),
            h("button", { id: "ve-search-hide-output", onClick: this.invertOutput.bind(this) }, "\u25B2")),
          h("sl-button", { id: "ve-search-search-button", onclick: this.doSearch.bind(this, 0) },
            h("sl-icon", { name: "search", label: "Search" }))),
        h("div", { id: "ve-search-dropdown" },
          h("div", { id: "ve-search-output", innerHTML: this.displayOutput() }),
          h("hr", { id: "ve-search-end-of-output" }),
          h("button", { id: "ve-search-show-more", onClick: this.doSearch.bind(this, this.previousStart + this.RESULTS_PER_PAGE) }, "Show more...")))
    ]);
    if (this.icon) {
      outputText = outputText.concat([h("div", null, this.displayTooltip())]);
    }
    return outputText;
  }
  static get is() { return "ve-search"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-search.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-search.css"]
  }; }
  static get properties() { return {
    "cx": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "cx",
      "reflect": false
    },
    "filters": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "filters",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "icon": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "icon",
      "reflect": false,
      "defaultValue": "false"
    },
    "tooltip": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "tooltip",
      "reflect": false,
      "defaultValue": "\"\""
    }
  }; }
  static get states() { return {
    "API": {},
    "DOMAIN": {},
    "SEARCH_QUOTA_EXCEEDED_MESSAGE": {},
    "NO_RESULTS_MESSAGE": {},
    "RESULTS_PER_PAGE": {},
    "query": {},
    "items": {},
    "error": {},
    "search": {},
    "previousStart": {},
    "activeFilter": {},
    "filtersObject": {}
  }; }
  static get elementRef() { return "el"; }
}
