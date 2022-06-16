 import { Component, Prop, Element, State, h } from "@stencil/core";
 
 @Component({
    tag: "ve-search",
    styleUrl: "ve-search.css"
 })

 export class VeSearch {

    @Prop() API: string = "AIzaSyCEoD17BDJpQxSeNpm-_vy9bJ-dHweFwEs"
    @Prop() SEARCH_ENGINE_ID: string = "0a5115e988de8e8a9"
    @Prop() SEARCH_QUOTA_EXCEEDED_MESSAGE: string = "Total site search quota exceeded for the day"
    @Prop() NO_RESULTS_MESSAGE: string = "No results"


    @Element() el: HTMLElement

    @State() query: string = "test"
    @State() items: any[] = []
    @State() error: string = ""
    @State() search: boolean = false

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
            this.items = [...this.items, ...res["items"]] 
        })
        .catch(TypeError => {
            this.error = "searchQuotaExceeded"
        })
        .catch(error => {
            console.log(error)
        });

        document.getElementById("ve-search-hide").style.display = "inline-block";
        document.getElementById("ve-search-output").style.display = "block";
    }

    searchInputKeyPress(event) {
        if (event.key === "Enter") {
            this.doSearch()
          }
    }

    displayItems() {

        var outputText = "";

        if (this.search) {

            if (this.items.length == 0) {
                outputText = this.NO_RESULTS_MESSAGE;
            }
            else if (this.error == "searchQuotaExceeded") {
                outputText = this.SEARCH_QUOTA_EXCEEDED_MESSAGE;
            }
            else {
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

    invertOutput() {

        var outputDisplay = document.getElementById("ve-search-output").style.display;

        if (outputDisplay == "none") {
            document.getElementById("ve-search-hide").innerText = "▲";
            document.getElementById("ve-search-output").style.display = "block";
        }
        else {
            document.getElementById("ve-search-hide").innerText = "▼";
            document.getElementById("ve-search-output").style.display = "none";
        }
    }

    render() {
        return [ 
            <div id = "ve-search-container">
                <input id = "ve-search-input" type = "text" placeholder = "Search the site" onKeyPress = {() => this.searchInputKeyPress(event)}/>
                <button id = "ve-search-hide" onClick = {() => this.invertOutput()}>▲</button>
                <button id = "ve-search-button" onClick = {() => this.doSearch()}>Search</button>
                <ul id = "ve-search-output"></ul>
                {this.displayItems()}
            </div>
        ]
    }
 }