import { Component, Element, Prop, State, h } from "@stencil/core";

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
  @State() searchEndpoint: string = '/search'

  @State() searchResults: any = []

  componentDidLoad() {
    this.searchInput = this.el.shadowRoot.getElementById('search-input') as HTMLInputElement
    this.searchInput.value = ''
    this.searchResults = []
    // this.searchEndpoint = `${location.hostname === 'localhost' ? 'http' : 'https'}://${this.searchDomain}/search`
  }

  doSearch() {
    let start = 0
    let query = this.searchInput.value.replace(/ /,'%20')
    console.log('doSearch', query)
    let url = `${this.searchEndpoint}?domain=${this.searchDomain}&q=${query}&start=${start}`
    fetch(url)
    .then(res => res.json())
    .then(results => {
      console.log(results)
      this.searchResults = results.items
    })

  }

  cancel() {
    console.log('cancel')
  }

  render() {
    return [
      <div class="search">
        <input class="search-btn" type="checkbox" id="search-btn"/>
        <div class="wrapper">
          <div class="search-form">
            <div class="input-wrapper">
              <sl-icon-button class="cancel" onClick={this.cancel.bind(this)} name="search" label="Clear"></sl-icon-button>
              <input
                type="text"
                id="search-input"
                class="search-input"
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
            </ul>
          }
        </div>
        <label class="search-icon" htmlFor="search-btn">
          <sl-icon name="search" label="Search"></sl-icon>
        </label>
      </div>

    ]
    }

 }