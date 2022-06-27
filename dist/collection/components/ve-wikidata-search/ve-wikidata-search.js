import { Component, Element, Event, Prop, State, h, Watch } from '@stencil/core';
export class WikidataSearch {
  constructor() {
    this.language = 'en';
    this.wdResults = [];
    this.isSearching = false;
    this.searchContinue = 0;
    this.searchFor = '';
    this.debounce = null;
    this.dropdownIsOpen = false;
  }
  connectedCallback() {
    this.reset();
  }
  componentDidLoad() {
    this.autocompleteResults = this.el.shadowRoot.getElementById('autocompleteResults');
    this.autocompleteInput = this.el.shadowRoot.getElementById('autocompleteInput');
    this.autocompleteDropdownArrow = this.el.shadowRoot.getElementById('autocompleteDropdownArrow');
    this.autocompleteContainer = this.el.shadowRoot.getElementById('autocompleteContainer');
  }
  searchForChanged() {
    this.wdResults = [];
    this.searchContinue = 0;
    this.doSearch();
  }
  doSearch() {
    if (!this.searchFor || this.isSearching)
      return;
    this.isSearching = true;
    let url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${this.searchFor}&uselang=${this.language}&language=${this.language}&format=json&origin=*&continue=${this.searchContinue}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
      this.searchContinue = res['search-continue'];
      this.wdResults = [...this.wdResults, ...res.search];
      this.dropdownIsOpen = true;
    })
      .catch(err => {
      console.log(err);
    })
      .finally(() => (this.isSearching = false));
  }
  inputHandler() {
    if (this.debounce !== null) {
      clearTimeout(this.debounce);
      this.debounce = null;
    }
    this.debounce = window.setTimeout(() => {
      this.searchFor = this.autocompleteInput.value.trim();
      this.debounce = null;
    }, 500);
  }
  dropdownIsOpenChanged(isOpen) {
    if (isOpen) {
      this.autocompleteResults.classList.add('visible');
      this.autocompleteDropdownArrow.classList.add('expanded');
      this.autocompleteContainer.setAttribute('aria-expanded', 'true');
    }
    else {
      this.autocompleteResults.classList.remove('visible');
      this.autocompleteDropdownArrow.classList.remove('expanded');
      this.autocompleteContainer.setAttribute('aria-expanded', 'false');
      this.autocompleteInput.setAttribute('aria-activedescendant', '');
    }
  }
  toggleDropdown() {
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }
  reset() {
    if (this.autocompleteInput)
      this.autocompleteInput.value = '';
    this.wdResults = [];
    this.searchContinue = 0;
    this.dropdownIsOpen = false;
  }
  itemSelected(item) {
    this.entitySelected.emit({ id: item.id, label: item.label, description: item.description });
    this.reset();
  }
  render() {
    return [
      h("div", { class: "wikidata-search" },
        h("div", { id: "autocompleteContainer", class: "autocomplete__container", role: "combobox" },
          h("input", { id: "autocompleteInput", class: "autocomplete__input", onKeyUp: this.inputHandler.bind(this), autocomplete: "off", role: "textbox", placeholder: "Search for entity" }),
          h("button", { id: "autocompleteDropdownArrow", class: "autocomplete__dropdown-arrow", style: { visibility: this.wdResults.length > 0 ? 'visible' : 'hidden' }, onClick: this.toggleDropdown.bind(this), "aria-label": "toggle dropdown" },
            h("svg", { "fill-rule": "evenodd", height: "5", viewBox: "0 0 10 5", width: "10" },
              h("title", null, "Open drop down"),
              h("path", { d: "M10 0L5 5 0 0z" }))),
          h("ul", { id: "autocompleteResults", class: "autocomplete__results", role: "listbox" },
            this.wdResults.map((item) => h("li", { onClick: this.itemSelected.bind(this, item) },
              h("ul", null,
                h("li", null,
                  h("span", { class: "label", innerHTML: item.label }),
                  item.aliases ? h("span", { class: "aliases" },
                    "(",
                    item.aliases.join(', '),
                    ")") : ''),
                h("li", { class: "description", innerHTML: item.description })))),
            this.searchContinue
              ? h("li", { onClick: this.doSearch.bind(this), class: "continue", "v-if": "searchContinue" }, "More...")
              : '')))
    ];
  }
  static get is() { return "ve-wikidata-search"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-wikidata-search.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-wikidata-search.css"]
  }; }
  static get properties() { return {
    "language": {
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
      "attribute": "language",
      "reflect": false,
      "defaultValue": "'en'"
    }
  }; }
  static get states() { return {
    "wdResults": {},
    "autocompleteResults": {},
    "autocompleteDropdownArrow": {},
    "autocompleteContainer": {},
    "autocompleteInput": {},
    "isSearching": {},
    "searchContinue": {},
    "searchFor": {},
    "debounce": {},
    "dropdownIsOpen": {}
  }; }
  static get events() { return [{
      "method": "entitySelected",
      "name": "entitySelected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "searchFor",
      "methodName": "searchForChanged"
    }, {
      "propName": "dropdownIsOpen",
      "methodName": "dropdownIsOpenChanged"
    }]; }
}
