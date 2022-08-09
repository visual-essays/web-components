import { Component, Element, Event, EventEmitter, Prop, State, h, Watch } from '@stencil/core';

@Component({
  tag: 've-wikidata-search',
  styleUrl: 've-wikidata-search.css',
  shadow: true,
})
export class WikidataSearch {
  @Prop() language: string = 'en'

  @Element() el: HTMLElement;

  @State() wdResults: any[] = []

  @State() autocompleteResults: HTMLInputElement
  @State() autocompleteDropdownArrow: HTMLElement
  @State() autocompleteContainer: HTMLElement
  @State() autocompleteInput: HTMLInputElement

  connectedCallback() {
    this.reset()
  }

  @Event({ eventName: 'entity-selected', bubbles: true, composed: true }) entitySelected: EventEmitter<any>

  componentDidLoad() {
    this.autocompleteResults = this.el.shadowRoot.getElementById('autocompleteResults') as HTMLInputElement
    this.autocompleteInput = this.el.shadowRoot.getElementById('autocompleteInput') as HTMLInputElement
    this.autocompleteDropdownArrow = this.el.shadowRoot.getElementById('autocompleteDropdownArrow') as HTMLElement
    this.autocompleteContainer = this.el.shadowRoot.getElementById('autocompleteContainer') as HTMLElement
  }

  @State() isSearching: boolean = false
  @State() searchContinue: number = 0

  @State() searchFor: string = ''
  @Watch('searchFor')
  searchForChanged() {
    this.wdResults = []
    this.searchContinue = 0
    this.doSearch()
  }

  doSearch() {
    if (!this.searchFor || this.isSearching) return
    this.isSearching = true
    let url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${this.searchFor}&uselang=${this.language}&language=${this.language}&format=json&origin=*&continue=${this.searchContinue}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.searchContinue = res['search-continue']
        this.wdResults = [...this.wdResults, ...res.search]
        this.dropdownIsOpen = true
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => (this.isSearching = false))
  }

  @State() debounce: any = null
  inputHandler() {
    if (this.debounce !== null) {
      clearTimeout(this.debounce)
      this.debounce = null
    }
    this.debounce = window.setTimeout(() => {
      this.searchFor = this.autocompleteInput.value.trim()
      this.debounce = null
    }, 500)
  }

  @State() dropdownIsOpen: boolean = false
  @Watch('dropdownIsOpen')
  dropdownIsOpenChanged(isOpen: boolean) {
    if (isOpen) {
      this.autocompleteResults.classList.add('visible')
      this.autocompleteDropdownArrow.classList.add('expanded')
      this.autocompleteContainer.setAttribute('aria-expanded', 'true')
    } else {
      this.autocompleteResults.classList.remove('visible')
      this.autocompleteDropdownArrow.classList.remove('expanded')
      this.autocompleteContainer.setAttribute('aria-expanded', 'false')
      this.autocompleteInput.setAttribute('aria-activedescendant', '')
    }
  }

  toggleDropdown() {
    this.dropdownIsOpen = !this.dropdownIsOpen
  }

  reset() {
    if (this.autocompleteInput) this.autocompleteInput.value = ''
    this.wdResults = []
    this.searchContinue = 0
    this.dropdownIsOpen = false
  }

  itemSelected(item) {
    this.entitySelected.emit({id:item.id, label:item.label, description:item.description})
    this.reset()
  }

  render() {
    return [
      <div class="wikidata-search">
        <div id="autocompleteContainer" class="autocomplete__container" role="combobox">
        <input
          id="autocompleteInput"
          class="autocomplete__input"
          onKeyUp={this.inputHandler.bind(this)}
          autocomplete="off"
          role="textbox"
          placeholder="Search for entity"
        />
        <button
          id="autocompleteDropdownArrow"
          class="autocomplete__dropdown-arrow"
          style={{visibility: this.wdResults.length > 0 ? 'visible' : 'hidden'}}
          onClick={this.toggleDropdown.bind(this)}
          aria-label="toggle dropdown"
        >
          <svg fill-rule="evenodd" height="5" viewBox="0 0 10 5" width="10">
            <title>Open drop down</title>
            <path d="M10 0L5 5 0 0z"></path>
          </svg>
        </button>
        <ul id="autocompleteResults" class="autocomplete__results" role="listbox">
          { this.wdResults.map((item) =>
            <li onClick={this.itemSelected.bind(this, item)}>
              <ul>
                <li>
                  <span class="label" innerHTML={item.label}></span>
                  { item.aliases ? <span class="aliases">({item.aliases.join(', ')})</span> : '' }
                </li>
                <li class="description" innerHTML={item.description}></li>
              </ul>
            </li>
          )}
          { this.searchContinue
            ? <li onClick={this.doSearch.bind(this)} class="continue" v-if="searchContinue">More...</li>
            : ''
          }
        </ul>
      </div>
    </div>
    ]
  }
}
