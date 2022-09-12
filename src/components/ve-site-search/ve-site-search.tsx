import { Component, Element, Prop, State, Watch, h } from "@stencil/core";

import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: "ve-site-search",
  styleUrl: "ve-site-search.css",
  shadow: true
})

export class VeSiteSearch {

  @Prop() searchDomain: string

  @Element() el: HTMLElement

  @State() searchInput: HTMLInputElement
  @State() checkbox: HTMLInputElement
  @State() searchEndpoint: string = '/search'

  @State() currentQuery: string = ''
  @State() searchResults: any = []
  @State() totalResults: number = 0

  @State() isVisible: boolean = false

  @Watch('isVisible')
  isVisibleChanged(isVisible:boolean) {
    this.checkbox.checked = isVisible
    if (isVisible) this.searchInput.focus()
  }

  componentDidLoad() {
    this.searchInput = this.el.shadowRoot.getElementById('search-input') as HTMLInputElement
    this.checkbox = this.el.shadowRoot.getElementById('search-btn') as HTMLInputElement
    this.searchInput.value = ''
    this.searchResults = []
  }

  doSearch() {
    let query = this.searchInput.value.replace(/ /,'%20')
    let start = query === this.currentQuery ? this.searchResults.length + 1 : 1
    let url = `${this.searchEndpoint}?domain=${this.searchDomain}&q=${query}&start=${start}`
    fetch(url)
    .then(res => res.json())
    .then(results => {
      this.totalResults = parseInt(results.searchInformation.totalResults)
      let items = results.items.map(item => {
        let link = new URL(item.link)
        item.link = `${location.origin}${link.pathname}`
        return item
      })
      this.searchResults = query !== this.currentQuery ? items : [...this.searchResults, ...items]
      this.currentQuery = query
    })
  }

  inputHandler(evt:KeyboardEvent) {
    if (evt.key === 'Enter') this.doSearch()
  }

  cancel() {
    this.isVisible = false
    this.searchInput.value = ''
    this.currentQuery = ''
    this.totalResults = 0
    this.searchResults = []
  }

  searchClicked() {
    this.isVisible = !this.isVisible
  }

  renderSav() {
    return [
      <div class="search">
        <input class="search-btn" type="checkbox" id="search-btn"/>
        <div class="wrapper">
          <div class="search-form">
            <div class="input-wrapper">
              <sl-icon-button class="cancel" onClick={this.cancel.bind(this)} name="x-circle" label="Clear"></sl-icon-button>
              <input
                type="text"
                id="search-input"
                class="search-input"
                onKeyUp={this.inputHandler.bind(this)}
                autocomplete="off"
                role="textbox"
                placeholder="Search site"
              />
            </div>
            <sl-tooltip content="Submit">
              <div class="search-submit" onClick={this.doSearch.bind(this)}>
                <sl-icon name="search" label="Search"></sl-icon>
              </div>
            </sl-tooltip>          
          </div>
          { this.searchResults.length > 0 && <ul class="search-results">
              {this.searchResults.map((item) => 
                <li>
                  <a href={item.link}>
                    <h3 innerHTML={item.htmlTitle}></h3>
                    <p innerHTML={item.htmlSnippet}></p>
                  </a>
                </li>
              )}
              {this.totalResults > this.searchResults.length &&
              <li>
                <div class="more" onClick={this.doSearch.bind(this)}>More</div>
              </li>
              }
            </ul>
          }
        </div>
        <label class="search-icon" htmlFor="search-btn">
          <sl-icon name="search" label="Search"></sl-icon>
        </label>
      </div>

    ]
    
  }
  
  render() {
    return [
      <div class="search">
        <input class="search-btn" type="checkbox" id="search-btn"/>
        <div class="wrapper">
          <div class="search-form">
            <div class="input-wrapper">
              <sl-icon-button class="cancel" onClick={this.cancel.bind(this)} name="x-circle" label="Clear"></sl-icon-button>
              <input
                type="text"
                id="search-input"
                class="search-input"
                onKeyUp={this.inputHandler.bind(this)}
                autocomplete="off"
                role="textbox"
                placeholder="Search site"
              />
            </div>      
          </div>
          { this.searchResults.length > 0 && <ul class="search-results">
              {this.searchResults.map((item) => 
                <li>
                  <a href={item.link}>
                    <h3 innerHTML={item.htmlTitle}></h3>
                    <p innerHTML={item.htmlSnippet}></p>
                  </a>
                </li>
              )}
              {this.totalResults > this.searchResults.length &&
              <li>
                <div class="more" onClick={this.doSearch.bind(this)}>More</div>
              </li>
              }
            </ul>
          }
        </div>
        <label class="search-icon" htmlFor="search-btn">
          <sl-icon-button onClick={this.searchClicked.bind(this)} name="search" label="Search"></sl-icon-button>
        </label>
      </div>

    ]
  }

 }