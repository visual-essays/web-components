import { Component, Prop, Element, State, Listen, h } from "@stencil/core";

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'

// import '@shoelace-style/shoelace/dist/components/animation/'

// import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath('https://visual-essays.github.io/web-components/www')

 @Component({
    tag: "ve-search",
    styleUrl: "ve-search.css",
    shadow: true
 })

 export class VeSearch {
    @Prop() cx: string
    @Prop() searchDomain: string
    @Prop() searchFilters: string
    @Prop() icon : boolean = false
    @Prop() tooltip : string = ""
    @Prop() animationLength : string = "0"

    // Tag name of ve-search's parent tag. Required when embedding ve-search in other web components.
    // Component detects when user clicks, if their click is not on the ve-search component the search results dropdown is hidden.
    // If the ve-search component is embedded the click finds the parent component.
    @Prop() parentComponent : string = ""

    @State() SEARCH_QUOTA_EXCEEDED_MESSAGE: string = "Total site search quota exceeded for the day"
    @State() NO_RESULTS_MESSAGE: string = "No results"
    @State() RESULTS_PER_PAGE: number = 10
    @State() TAG_NAME: string = "ve-search"

    @Element() el: HTMLElement

    @State() query: string
    @State() items: any[] = []
    @State() error: string = ""
    @State() search: boolean = false
    @State() previousStart: number = 0
    @State() activeFilter: string = "all"
    @State() showSearchBarWidth: number

    // Dictionary object with key as path to folder mapped to value to be displayed
    @State() filtersObject: Object = new Object()

    @Listen('click', { target: 'window' })

        // Hide dropdown if user clicks elsewhere on document
        handleClick(ev) {

            var tagInComposition = false;

            // Composed path required if ve-search embedded in another web component
            var composedPath = ev.composedPath()

            for (var i = 0; i < composedPath.length; i++) {

                if (composedPath[i].localName == this.TAG_NAME) {
                    tagInComposition = true;
                }
            }

            if ((!tagInComposition) && (ev.target.localName != this.TAG_NAME)){
                this.hideOutput();
            }
        }
        
    // Reads filters given in the <ve-search> tag and stores them in filtersObjects
    fillFilters() {

        this.filtersObject["all"] = "All";

        // In the format ["tagValue:displayValue", ... , "tagValue:displayValue"]
        var splitFilters = this.searchFilters.split(",");

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

        var query = (this.el.shadowRoot.getElementById("ve-search-input") as HTMLInputElement).value;
        query = query.replace(" ", "+");

        if (query.length > 0) {

            this.error = "";
            this.search = true;
    
            if ((this.items == null) || (start == 0)) {
                this.items = [];
            }
    
            let url = `https://${this.searchDomain}/search?q=${query}&start=${start}`
    
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
                this.error = "searchQuotaExceeded"
            })
            .catch(error => {
                console.log(error)
            });

            this.previousStart = start;
        }
    }

    // Detects the enter key in the input field to begin search
    searchInputKeyPress(event) {
        if (event.key === "Enter") {
            this.doSearch(0)
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
                var link = item["link"].replace(this.searchDomain, "");
    
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
        var key;

        // Reset checked for all filters
        for (key in this.filtersObject) {
            this.el.shadowRoot.getElementById("ve-search-filter-item-" + key).removeAttribute("checked");
        }

        this.activeFilter = filter;
        this.el.shadowRoot.getElementById("ve-search-filter-item-" + filter).setAttribute("checked", "true");
    }

    // Used when <ve-search> initially an icon
    showSearchBar() {
        this.tooltip = "";

        this.showSearchBarWidth = this.el.shadowRoot.getElementById("ve-search-bar-show-button").clientWidth;

        this.el.shadowRoot.getElementById("ve-search-bar").style.display = "block";
        this.el.shadowRoot.getElementById("ve-search-bar-show-button").style.display = "none";

        this.horizontalReveal("ve-search-container");
    }

    horizontalReveal(elementID) {
        var offsetWidth;

        this.el.shadowRoot.getElementById(elementID).setAttribute("class", "horizontal-reveal");

        this.el.shadowRoot.getElementById("ve-search-horizontal-animations").innerHTML = `
            sl-tooltip {
                display: none;
            }

            .horizontal-reveal {
                animation: horizontal-animation ${this.animationLength}s;
                animation-delay: -0.01s;
            }
    
            @keyframes horizontal-animation {
                0% {
                    display: none;
                    ${offsetWidth = this.el.shadowRoot.getElementById("ve-search-container").offsetWidth};
                }
                1% {
                    display: block;
                    width: ${this.showSearchBarWidth}px;
                    overflow: hidden;
                }
                99% {
                    width: ${offsetWidth}px;
                    overflow: hidden;
                }
                100% {
                    overflow: visible;
                }
            }`;
    }

    // Displays essay filter options
    displayFilters() {

        var outputText = [];

        if (this.searchFilters.length > 0) {

            var key;
            
            for (key in this.filtersObject) {
                outputText = outputText.concat([
                    <sl-menu-item id = {"ve-search-filter-item-" + key} value = {key} onClick = {this.updateFilter.bind(this, key)}>{this.filtersObject[key]}</sl-menu-item>
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
            var outputText = [<style type = "text/css" innerHTML={noFiltersCSS}></style>]
        }

        return outputText;
    }

    // Displays search results
    displayOutput() {

        var outputText = "";
        
        // Only display items if a search has been performed
        if (this.search) {

            if (this.error == "searchQuotaExceeded") {
                outputText = `<p id = 've-search-output-error'>${this.SEARCH_QUOTA_EXCEEDED_MESSAGE}</p>`;
            }

            else {

                // Display items

                try {
                    for (let i = 0; i < this.items.length; i++) {

                        var item = this.items[i];

                        outputText += `<p id = 've-search-output-title'><a href = '${item["link"]}'>${item["title"]}</a></p>`
                        outputText += `<p id = 've-search-output-link'>${item["link"]}"</p>`;
                    }
                }
                catch (TypeError) {
                    outputText = `<p id = 've-search-output-error'>${this.NO_RESULTS_MESSAGE}</p>`;
                }
            }

            try {
                // Shows results and results hide button
                this.el.shadowRoot.getElementById("ve-search-hide-output").style.display = "inline-block";
                this.el.shadowRoot.getElementById("ve-search-dropdown").style.display = "block";
            }
            catch (TypeError) {}
        }

        return outputText;
    }

    // Adds tooltip to search icon if tool tip enabled
    displayTooltip() {

        var hideSearchBar = `
            #ve-search-bar {
                display: none;
            }`;

        var searchBarStyleSheet = [<style type = "text/css" id = "search-bar-style" innerHTML={hideSearchBar}></style>]
        
        var searchBarShowButton = [
            <sl-button id = "ve-search-bar-show-button" onclick = {() => this.showSearchBar()} circle>
                <sl-icon name = "search" label = "Search"></sl-icon>
            </sl-button>
        ]

        // Tooltip given
        if (this.tooltip.length > 0) {
            return [
            <sl-tooltip content = {this.tooltip}>
                {searchBarStyleSheet}
                {searchBarShowButton}
            </sl-tooltip>
            ]
        }

        // No tooltip
        else {
            return [
                <sl-tooltip content = {this.tooltip} disabled>
                    {searchBarStyleSheet}
                    {searchBarShowButton}
                </sl-tooltip>
            ]
        }
    }

    render() {
        var outputText = [];

        this.fillFilters();

        outputText = outputText.concat([
            <div id = "ve-search-container">

                <style id = 've-search-horizontal-animations'></style>

                <sl-button-group  id = "ve-search-bar">
            
                    <sl-dropdown id = "ve-search-filter-dropdown">
                        <sl-button id = "ve-search-active-filter" slot = "trigger" caret>{this.filtersObject[this.activeFilter]}</sl-button>
                        <sl-menu id = "ve-search-filter-menu">{this.displayFilters()}</sl-menu>
                    </sl-dropdown>
                    
                    <div id = "ve-search-input-container">

                        <input id = "ve-search-input" type = "text" placeholder = "Search the site..." onKeyPress = {this.searchInputKeyPress.bind(this)}/>
                        
                        <button id = "ve-search-hide-output" onClick = {this.invertOutput.bind(this)}>▲</button>

                    </div>

                    <sl-button id = "ve-search-search-button" onclick = {this.doSearch.bind(this, 0)}>
                        <sl-icon name = "search" label = "Search"></sl-icon>
                    </sl-button>

                </sl-button-group>

                <div id = "ve-search-dropdown" class = "vertical-reveal">
                    <div id = "ve-search-output" innerHTML = {this.displayOutput()}></div>
                    <hr id = "ve-search-end-of-output"/>
                    <button id = "ve-search-show-more" onClick = {this.doSearch.bind(this, this.previousStart + this.RESULTS_PER_PAGE)}>Show more...</button>
                </div>

            </div>
        ])

        if (this.icon) {
            outputText = outputText.concat([<div>{this.displayTooltip()}</div>]);
        }

        return outputText;
    }
 }