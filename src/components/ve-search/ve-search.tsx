 import { Component, Prop, Element, State, h } from "@stencil/core";
 
 @Component({
    tag: "ve-search",
    styleUrl: "ve-search.css"
 })

 export class VeSearch {

    @Prop() API: string = "AIzaSyCEoD17BDJpQxSeNpm-_vy9bJ-dHweFwEs" // Needs to be changed to one linked to Kent Maps
    @Prop() SEARCH_ENGINE_ID: string = "0a5115e988de8e8a9"
    @Prop() DOMAIN: string = "https://kent-maps.online/"
    @Prop() SEARCH_QUOTA_EXCEEDED_MESSAGE: string = "Total site search quota exceeded for the day"
    @Prop() NO_RESULTS_MESSAGE: string = "No results"

    @Element() el: HTMLElement

    @State() query: string = "test"
    @State() items: any[] = []
    @State() error: string = ""
    @State() search: boolean = false

    // Dictionary object with key as path to folder mapped to value to be displayed
    @State() filters: Object = new Object()

    // Better solution should be found to allow ve-search re-use, potentially through meta tags
    fillFilters() {
        this.filters["16c"] = "16c";
        this.filters["17c"] = "17c";
        this.filters["18c"] = "18c";
        this.filters["19c"] = "19c";
        this.filters["20c"] = "20c";
        this.filters["21c"] = "21c";
        this.filters["austen"] = "Jane Austen";
        this.filters["canterbury"] = "Canterbury";
        this.filters["churches"] = "Churches";
        this.filters["dickens"] = "Dickens";
    }

    // Loads JSON file of Google site search
    doSearch() {

        this.items = [];
        this.error = "";
        this.search = true;

        var query = (document.getElementById("ve-search-input") as HTMLInputElement).value;
        query = query.replace(" ", "+");
    
        let url = `https://www.googleapis.com/customsearch/v1?key=${this.API}&cx=${this.SEARCH_ENGINE_ID}&q=${query}`;

        // let url = `http://localhost:3333/v1.json`; // Pre-created JSON to test with after daily searches reached

        fetch(url)
        .then(res => res.json())
        .then(res => {
            this.items = this.applyFilters([...this.items, ...res["items"]])
        })
        .catch(TypeError => {
            this.error = "searchQuotaExceeded"
        })
        .catch(error => {
            console.log(error)
        });

        // Shows results and results hide button
        document.getElementById("ve-search-hide-button").style.display = "inline-block";
        document.getElementById("ve-search-output").style.display = "block";
    }

    // Detects the enter key in the input field to begin search
    searchInputKeyPress(event) {

        if (event.key === "Enter") {
            this.doSearch()
          }
    }

    // Displays essay filter options
    displayFilters() {

        // Fills this.filters with pre-defined filter options
        this.fillFilters();

        var key;
        var outputText = "<p id = 've-search-filter-heading'>Show essays from:<p>";

        for (key in this.filters) {
            outputText += "<li><input type = 'checkbox' id = 've-search-filter-" + key + "'> ";
            outputText += this.filters[key] + "</input></li>";
        }

        var outputElement = document.getElementById("ve-search-filters");
        outputElement.innerHTML = outputText;
    }

    // Apply the selected filters to the search results (items)
    applyFilters(items) {

        var key;
        var activeFilters = [];
        var filteredItems = [];

        // Generate a list of active filters by checking which inputs have been checked
        for (key in this.filters) {
            var element = document.getElementById("ve-search-filter-" + key);
            var isChecked = (element as HTMLInputElement).checked;   

            if (isChecked) {
                activeFilters.push(key);
            }
        }

        // If no active filters selected, all items should be included in results
        if (activeFilters.length == 0) {
            return items;
        }

        // Checks if item included in one of the active filters for all items
        for (let i = 0; i < items.length; i++) {

            var item = items[i];
            var link = item["link"].replace(this.DOMAIN, "");

            for (let j = 0; j < activeFilters.length; j++) {

                var filter = activeFilters[j];
                    
                if (link.startsWith(filter)) {
                    filteredItems.push(item);
                }
            }
        }

        return filteredItems;
    }

    // Displays Google results to output div
    displayItems() {

        var outputText = "";

        // Only display items if a search has been performed
        if (this.search) {

            if (this.items.length == 0) {
                outputText = this.NO_RESULTS_MESSAGE;
            }

            else if (this.error == "searchQuotaExceeded") {
                outputText = this.SEARCH_QUOTA_EXCEEDED_MESSAGE;
            }

            else {

                // Display items
                for (let i = 0; i < this.items.length; i++) {
                    
                    var item = this.items[i];
                    
                    outputText += "<li><a class = 've-search-link' href = '" + item["link"] + "'>";
                    outputText += item["title"] + "</a>";
                    outputText += "<p class = 've-search-snippet'><i>" + item["snippet"] + "</i></p></li>";
                }
            }
    
            var outputElement = document.getElementById("ve-search-output");
            outputElement.innerHTML = outputText;
        }
    }

    // Hide search output if currently shown and visa-versa
    // Activated when user presses the hide button
    invertOutput() {

        var outputDisplay = document.getElementById("ve-search-output").style.display;

        // Hide output
        if (outputDisplay == "block") {
            document.getElementById("ve-search-hide-button").innerText = "▼ Results";
            document.getElementById("ve-search-output").style.display = "none";
        }

        // Show output
        else {
            document.getElementById("ve-search-hide-button").innerText = "▲ Results";
            document.getElementById("ve-search-output").style.display = "block";
        }
    }

    // Hide filters if currently shown and visa-versa
    // Activated when user presses the filters button
    invertFilters() {

        var filtersDisplay = document.getElementById("ve-search-filters").style.display;

        // Hide output
        if (filtersDisplay == "block") {
            document.getElementById("ve-search-filters-button").innerText = "▼ Filters";
            document.getElementById("ve-search-filters").style.display = "none";
        }

        // Show output
        else {
            
            // this.displayFilters();

            // Generates the required HTML to show the filters if it has not already been filtered
            if (Object.keys(this.filters).length == 0) {
                this.displayFilters();
            }

            document.getElementById("ve-search-filters-button").innerText = "▲ Filters";
            document.getElementById("ve-search-filters").style.display = "block";
        }
    }

    render() {
        return [ 
            <div id = "ve-search-container">
                <input id = "ve-search-input" type = "text" placeholder = "Search the site" onKeyPress = {() => this.searchInputKeyPress(event)}/>
                <button id = "ve-search-hide-button" onClick = {() => this.invertOutput()}>▼ Results</button>
                <button id = "ve-search-filters-button" onClick = {() => this.invertFilters()}>▼ Filters</button>
                <button id = "ve-search-button" onClick = {() => this.doSearch()}>Search</button>
                <div id = "ve-search-dropdown">
                    <ul id = "ve-search-filters"></ul>                
                    <ul id = "ve-search-output"></ul>
                </div>
                {this.displayItems()}
            </div>
            
        ]
    }
 }