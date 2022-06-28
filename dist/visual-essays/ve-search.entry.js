import { r as registerInstance, h, g as getElement } from './index-e29ebc89.js';
import './button-da6549df.js';
import { r, c as component_styles_default, s as s4, $, _ as __decorateClass, i as i2, g as e, n, f as emit, o, h as watch } from './chunk.GP3HCHHG-12935597.js';
import './icon-9d4c8e57.js';
import './menu-5f65989e.js';
import './tooltip-210a958e.js';
import { f as focusVisibleSelector } from './chunk.YTNS3I2U-c4b5dc94.js';
import { g as getTextContent } from './chunk.3IYPB6RR-015e6daf.js';
import './chunk.6WMYSCDC-38d8f355.js';
import './chunk.H262HIXG-c1faf1f9.js';

// src/components/button-group/button-group.styles.ts
var button_group_styles_default = r`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;

// src/components/button-group/button-group.ts
var BUTTON_CHILDREN = ["sl-button", "sl-radio-button"];
var SlButtonGroup = class extends s4 {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--focus");
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--focus");
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--hover");
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--hover");
  }
  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
    slottedElements.forEach((el) => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);
      if (button !== null) {
        button.classList.add("sl-button-group__button");
        button.classList.toggle("sl-button-group__button--first", index === 0);
        button.classList.toggle("sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--last", index === slottedElements.length - 1);
      }
    });
  }
  render() {
    return $`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
SlButtonGroup.styles = button_group_styles_default;
__decorateClass([
  i2("slot")
], SlButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  e()
], SlButtonGroup.prototype, "label", 2);
SlButtonGroup = __decorateClass([
  n("sl-button-group")
], SlButtonGroup);
function findButton(el) {
  return BUTTON_CHILDREN.includes(el.tagName.toLowerCase()) ? el : el.querySelector(BUTTON_CHILDREN.join(","));
}

// src/components/menu-item/menu-item.styles.ts
var menu_item_styles_default = r`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: var(--sl-color-neutral-400);
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item,
  :host(${focusVisibleSelector}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }
`;

// src/components/menu-item/menu-item.ts
var SlMenuItem = class extends s4 {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.value = "";
    this.disabled = false;
  }
  firstUpdated() {
    this.setAttribute("role", "menuitem");
  }
  getTextLabel() {
    return getTextContent(this.defaultSlot);
  }
  handleCheckedChange() {
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleDefaultSlotChange() {
    const textLabel = this.getTextLabel();
    if (typeof this.cachedTextLabel === "undefined") {
      this.cachedTextLabel = textLabel;
      return;
    }
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      emit(this, "sl-label-change");
    }
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      "menu-item": true,
      "menu-item--checked": this.checked,
      "menu-item--disabled": this.disabled,
      "menu-item--has-submenu": false
    })}
      >
        <span class="menu-item__check">
          <sl-icon name="check-lg" library="system" aria-hidden="true"></sl-icon>
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot @slotchange=${this.handleDefaultSlotChange}></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="system" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `;
  }
};
SlMenuItem.styles = menu_item_styles_default;
__decorateClass([
  i2("slot:not([name])")
], SlMenuItem.prototype, "defaultSlot", 2);
__decorateClass([
  i2(".menu-item")
], SlMenuItem.prototype, "menuItem", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "checked", 2);
__decorateClass([
  e()
], SlMenuItem.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "disabled", 2);
__decorateClass([
  watch("checked")
], SlMenuItem.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled")
], SlMenuItem.prototype, "handleDisabledChange", 1);
SlMenuItem = __decorateClass([
  n("sl-menu-item")
], SlMenuItem);

const veSearchCss = "#ve-search-input-container{outline:none;border:1px rgb(212, 212, 216) solid;background:white;border-left:none;border-right:none;border-radius:0px}#ve-search-output-error{color:black}#ve-search-input{outline:none;border:none;margin-top:5%;padding-left:10px}#ve-search-search-button::part(base),#ve-search-filter-dropdown>sl-button::part(base){background-color:white}#ve-search-bar{width:max-content}#ve-search-bar:hover{box-shadow:0 0 10px rgb(146, 209, 248)}#ve-search-hide-output{background:none;border:none;display:none;padding-right:10px;cursor:pointer}#ve-search-dropdown{width:95%;display:none;border:1px rgb(212, 212, 216) solid;background-color:white;border-radius:3px;padding:7px;margin-top:0;position:absolute;z-index:2;overflow:scroll;max-height:300px}#ve-search-output{margin-left:10px}#ve-search-output>*{font-family:Roboto, sans-serif}#ve-search-output-title{margin-bottom:0}#ve-search-output-title>a{text-decoration:none;color:rgb(147 179 243)}#ve-search-output-link{font-style:italic;font-size:0.8em;color:rgb(60, 131, 40);margin-top:0%}#ve-search-output-title>a:visited{color:rgb(188 140 242)}#ve-search-end-of-output{height:1px;width:99%;background-color:rgb(212, 212, 216);border:none}#ve-search-show-more{border:none;background:none;margin-left:9px;cursor:pointer}";

const VeSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.filters = "";
    this.icon = false;
    this.tooltip = "";
    this.animationLength = "0";
    // Tag name of ve-search's parent tag. Required when embedding ve-search in other web components.
    // Component detects when user clicks, if their click is not on the ve-search component the search results dropdown is hidden.
    // If the ve-search component is embedded the click finds the parent component.
    this.parentComponent = "";
    this.API = "AIzaSyCEoD17BDJpQxSeNpm-_vy9bJ-dHweFwEs"; // Needs to be changed to one linked to Kent Maps
    this.DOMAIN = "https://kent-maps.online/";
    this.SEARCH_QUOTA_EXCEEDED_MESSAGE = "Total site search quota exceeded for the day";
    this.NO_RESULTS_MESSAGE = "No results";
    this.RESULTS_PER_PAGE = 10;
    this.TAG_NAME = "ve-search";
    this.items = [];
    this.error = "";
    this.search = false;
    this.previousStart = 0;
    this.activeFilter = "all";
    // Dictionary object with key as path to folder mapped to value to be displayed
    this.filtersObject = new Object();
  }
  // Hide dropdown if user clicks elsewhere on document
  handleClick(ev) {
    var tagInComposition = false;
    // Composed path required if ve-search embedded in another web component
    var composedPath = ev.composedPath();
    for (var i = 0; i < composedPath.length; i++) {
      if (composedPath[i].localName == this.TAG_NAME) {
        tagInComposition = true;
      }
    }
    if ((!tagInComposition) && (ev.target.localName != this.TAG_NAME)) {
      this.hideOutput();
    }
  }
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
    if (query.length > 0) {
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
    }
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
      if (this.error == "searchQuotaExceeded") {
        outputText = `<p id = 've-search-output-error'>${this.SEARCH_QUOTA_EXCEEDED_MESSAGE}</p>`;
      }
      else {
        // Display items
        try {
          for (let i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            outputText += `<p id = 've-search-output-title'><a href = '${item["link"]}'>${item["title"]}</a></p>`;
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
      catch (TypeError) { }
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
      h("sl-button", { id: "ve-search-bar-show-button", onclick: () => this.showSearchBar(), circle: true }, h("sl-icon", { name: "search", label: "Search" }))
    ];
    // Tooltip given
    if (this.tooltip.length > 0) {
      return [
        h("sl-tooltip", { content: this.tooltip }, searchBarStyleSheet, searchBarShowButton)
      ];
    }
    // No tooltip
    else {
      return [
        h("sl-tooltip", { content: this.tooltip, disabled: true }, searchBarStyleSheet, searchBarShowButton)
      ];
    }
  }
  render() {
    var outputText = [];
    this.fillFilters();
    outputText = outputText.concat([
      h("div", { id: "ve-search-container" }, h("style", { id: 've-search-horizontal-animations' }), h("sl-button-group", { id: "ve-search-bar" }, h("sl-dropdown", { id: "ve-search-filter-dropdown" }, h("sl-button", { id: "ve-search-active-filter", slot: "trigger", caret: true }, this.filtersObject[this.activeFilter]), h("sl-menu", { id: "ve-search-filter-menu" }, this.displayFilters())), h("div", { id: "ve-search-input-container" }, h("input", { id: "ve-search-input", type: "text", placeholder: "Search the site...", onKeyPress: this.searchInputKeyPress.bind(this) }), h("button", { id: "ve-search-hide-output", onClick: this.invertOutput.bind(this) }, "\u25B2")), h("sl-button", { id: "ve-search-search-button", onclick: this.doSearch.bind(this, 0) }, h("sl-icon", { name: "search", label: "Search" }))), h("div", { id: "ve-search-dropdown", class: "vertical-reveal" }, h("div", { id: "ve-search-output", innerHTML: this.displayOutput() }), h("hr", { id: "ve-search-end-of-output" }), h("button", { id: "ve-search-show-more", onClick: this.doSearch.bind(this, this.previousStart + this.RESULTS_PER_PAGE) }, "Show more...")))
    ]);
    if (this.icon) {
      outputText = outputText.concat([h("div", null, this.displayTooltip())]);
    }
    return outputText;
  }
  get el() { return getElement(this); }
};
VeSearch.style = veSearchCss;

export { VeSearch as ve_search };
