import { r as registerInstance, e as createEvent, h, g as getElement } from './index-e29ebc89.js';

const veWikidataSearchCss = ":host{font-family:Roboto, sans-serif}*{box-sizing:border-box}.autocomplete__container{display:flex;position:relative;align-items:center;justify-content:flex-end;float:left;width:100%;max-width:500px;height:100%}textarea:focus,input:focus{outline:none}.wikidata-search{display:inline-block;height:calc(1.5em + 0.75rem + 2px);margin-right:3px;border:1px solid #ccc;border-radius:3px;width:100%;background-color:white}.wikidata-search i{padding-left:6px;font-size:1.2rem;color:#333}.autocomplete__results.visible{visibility:visible;min-width:320px}.autocomplete__input{display:block;width:100%;min-width:240px;height:100%;border:none;padding-left:0.5rem;border-radius:3px;font-size:1.1rem}.autocomplete__input:focus{border-color:hsl(221, 61%, 40%)}.autocomplete__dropdown-arrow{position:absolute;right:0;top:0;background:transparent;border:none;cursor:pointer;height:100%;transition:transform 0.2s linear}.autocomplete__dropdown-arrow.expanded{transform:rotate(-180deg)}.autocomplete__results{visibility:hidden;position:absolute;top:100%;margin-top:0;width:100%;overflow-y:auto;border:1px solid #999;padding:0;max-height:400px;background:white;z-index:500}.autocomplete__results>li{list-style:none;padding:0.3rem 0.5rem;cursor:pointer;color:black}.autocomplete__results ul{list-style-type:none;padding-left:0}.autocomplete__results>li:hover{background:hsl(212, 10%, 60%)}.autocomplete__results>li:focus{background:hsl(212, 10%, 70%)}.label{font-weight:bold}.aliases{font-style:italic}.description{font-size:0.9rem;padding:2px 0}.continue{font-weight:bold;background-color:#ddd}.search{display:grid;border-radius:0;background-color:#555;color:white;width:100%;align-items:center}";

const WikidataSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entitySelected = createEvent(this, "entitySelected", 7);
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
      h("div", { class: "wikidata-search" }, h("div", { id: "autocompleteContainer", class: "autocomplete__container", role: "combobox" }, h("input", { id: "autocompleteInput", class: "autocomplete__input", onKeyUp: this.inputHandler.bind(this), autocomplete: "off", role: "textbox", placeholder: "Search for entity" }), h("button", { id: "autocompleteDropdownArrow", class: "autocomplete__dropdown-arrow", style: { visibility: this.wdResults.length > 0 ? 'visible' : 'hidden' }, onClick: this.toggleDropdown.bind(this), "aria-label": "toggle dropdown" }, h("svg", { "fill-rule": "evenodd", height: "5", viewBox: "0 0 10 5", width: "10" }, h("title", null, "Open drop down"), h("path", { d: "M10 0L5 5 0 0z" }))), h("ul", { id: "autocompleteResults", class: "autocomplete__results", role: "listbox" }, this.wdResults.map((item) => h("li", { onClick: this.itemSelected.bind(this, item) }, h("ul", null, h("li", null, h("span", { class: "label", innerHTML: item.label }), item.aliases ? h("span", { class: "aliases" }, "(", item.aliases.join(', '), ")") : ''), h("li", { class: "description", innerHTML: item.description })))), this.searchContinue
        ? h("li", { onClick: this.doSearch.bind(this), class: "continue", "v-if": "searchContinue" }, "More...")
        : '')))
    ];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "searchFor": ["searchForChanged"],
    "dropdownIsOpen": ["dropdownIsOpenChanged"]
  }; }
};
WikidataSearch.style = veWikidataSearchCss;

export { WikidataSearch as ve_wikidata_search };
