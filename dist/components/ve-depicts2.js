import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { g as getManifest, s as sha256, i as imageInfo, a as getDepictedEntities, b as getEntityData, l as label, c as summary, t as thumbnail, d as source, e as sourceId } from './utils.js';
import './chunk.BQLXYG6H.js';
import { a as setBasePath } from './chunk.GP3HCHHG.js';
import './chunk.H262HIXG.js';
import './chunk.COG46KYT.js';
import './chunk.Q6VLS7NX.js';
import './chunk.RP2CLKS2.js';
import { d as defineCustomElement$2 } from './ve-wikidata-search2.js';

const veDepictsDialogCss = ":host{font-family:Roboto, sans-serif}.wrapper{max-height:40vh;min-height:20vh;overflow-y:scroll}h4{margin:0 0 3px 0;font-size:1.2rem;font-weight:600}.card{max-height:200px}.card-body{padding:0.5rem;max-height:200px;overflow-y:scroll}.card-img{max-height:200px;object-fit:contain}.card-text{font-size:0.9rem;overflow-y:scroll}.depicted-entities{padding:0;list-style:none;overflow-y:scroll}.depicted-entities li{display:flex;align-items:center;justify-content:center;gap:18px}.depicted-entities li>*{flex:1;text-align:center;padding:6px 0}.header{border-bottom:2px solid black}div.label{text-align:left;min-width:30%}.controls{display:flex;align-items:center;justify-content:right;gap:18px}.controls button{cursor:pointer}.control label{margin-bottom:0}.depicts{padding:9px}.depicts .entities ul{margin:0;padding-left:6px;list-style-type:none}.depicts .entities ul li{display:grid;grid-auto-flow:column;align-items:center}.depicts .entities .controls{display:flex;justify-content:right}.depicts .entities .controls label{padding-left:6px;font-family:\"Helvetica Narrow\",\"Arial Narrow\",Tahoma,Arial,Helvetica,sans-serif}.buttons{display:grid;grid-auto-flow:column;justify-content:end;grid-column-gap:12px}";

const DepictsDialog = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.depictedChanged = createEvent(this, "depictedChanged", 7);
    this.show = false;
    this.depicted = [];
    this._depicted = []; // private copy
  }
  showChanged(show) {
    if (show) {
      this.dialog.show();
    }
    else {
      this.dialog.hide();
    }
  }
  async onDepictedChanged(depicted) {
    this._depicted = [...depicted];
  }
  async connectedCallback() {
    // console.log(`Depicts.Dialog.connectedCallback label=${this.label} summary=${this.summary} thumbnail=${this.thumbnail} imageHash=${this.imageHash} source=${this.source} sourceId=${this.sourceId} depicted=${this.depicted.length}`)
    if (this.depicted) {
      this._depicted = [...this.depicted];
    }
  }
  componentDidLoad() {
    this.dialog = this.el.shadowRoot.getElementById('depicts-dialog');
    this.dialog.addEventListener('sl-hide', () => this.show = false);
    if (this.show)
      this.dialog.show();
  }
  async onEntitySelected(event) {
    this._depicted = [...this._depicted, ...[event.detail]];
  }
  parseStatements(statements, type) {
    return Object.fromEntries(Object.entries(statements)
      .map(([pid, values]) => {
      return [
        pid,
        values.map((value) => {
          let datavalue = { type: value.type, value: value.value };
          if (value.type === 'wikibase-entityid') {
            datavalue.value = {
              id: value,
              'entity-type': 'item',
              'numeric-id': parseInt(value.value.slice(1))
            };
          }
          let property = {
            mainsnak: {
              snaktype: 'value',
              property: pid,
              datavalue
            }
          };
          if (type)
            property.type = type;
          if (type === 'statement')
            property.rank = value.rank || 'normal';
          if (value.qualifiers) {
            property.qualifiers = this.parseStatements(value.qualifiers);
            property['qualifiers-order'] = Object.keys(property.qualifiers);
          }
          return property;
        })
      ];
    }));
  }
  toEntityJSON({ id, labels, descriptions, statements }) {
    return {
      id,
      labels: labels
        ? Object.fromEntries(Object.entries(labels).map(([language, value]) => [language, { language, value }]))
        : {},
      descriptions: descriptions
        ? Object.fromEntries(Object.entries(descriptions).map(([language, value]) => [language, { language, value }]))
        : {},
      statements: statements
        ? this.parseStatements(statements, 'statement')
        : {}
    };
  }
  async onProminentToggled(event) {
    let qid = event.detail;
    this._depicted = this._depicted.map(entity => { entity.prominent = entity.id === qid ? !entity.prominent : entity.prominent; return entity; });
  }
  onDroToggled(event) {
    let qid = event.detail;
    this._depicted = this._depicted.map(entity => { entity.dro = entity.id === qid ? !entity.dro : entity.dro; return entity; });
  }
  onEntityRemoved(event) {
    let qid = event.detail;
    this._depicted = this._depicted.filter(entity => entity.id !== qid);
  }
  close() {
    this.show = false;
    this._depicted = [...this.depicted];
  }
  async apply() {
    let statements = {
      P180: this._depicted.map(entity => {
        return {
          type: 'wikibase-entityid',
          value: entity.id,
          rank: entity.prominent ? 'preferred' : 'normal'
        };
      })
    };
    if (this.source) {
      statements.P854 = [{ type: 'string', value: this.source }]; // reference URL
    }
    let dro = this._depicted.filter(entity => entity.dro);
    if (dro.length > 0)
      statements.P6243 = dro.map(entity => {
        return {
          type: 'wikibase-entityid',
          value: entity.id,
          rank: entity.prominent ? 'preferred' : 'normal'
        };
      });
    let entity = this.toEntityJSON({ id: this.sourceId, statements });
    let endpoint = `https://www.jstor.org/api/labs-search-service/labs/about/_doc/${this.imageHash}/`;
    let resp = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(entity),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    if (resp.ok) {
      let depictsElements = Array.from(document.querySelectorAll('ve-depicts'));
      this.depicted = this._depicted;
      depictsElements.forEach(el => el.refresh(this.depicted));
    }
    this.show = false;
  }
  render() {
    return [
      h("sl-dialog", { id: "depicts-dialog", label: "Entities depicted in image", class: "dialog-overview" }, h("div", { style: { display: 'flex', padding: '12px', border: '1px solid #ccc', marginBottom: '18px' } }, this.thumbnail
        ? h("img", { style: { maxWidth: '40%', height: '100%' }, src: this.thumbnail, alt: this.label })
        : '', h("div", { style: { display: 'flex', flexDirection: 'column', padding: '0px' } }, h("div", { innerHTML: this.label, style: { padding: '0 12px', fontSize: '1.2em', fontWeight: 'bold' } }), this.summary
        ? h("div", { innerHTML: this.summary })
        : null)), h("ve-wikidata-search", null), h("div", { class: "wrapper" }, h("div", { class: "ve-depicts" }, h("ve-depicts", { depicted: this._depicted, format: "table" }))), h("sl-button", { slot: "footer", onClick: this.close.bind(this) }, "Cancel"), h("sl-button", { slot: "footer", variant: "primary", onClick: this.apply.bind(this) }, "Apply"))
    ];
  }
  get el() { return this; }
  static get watchers() { return {
    "show": ["showChanged"],
    "depicted": ["onDepictedChanged"]
  }; }
  static get style() { return veDepictsDialogCss; }
}, [1, "ve-depicts-dialog", {
    "show": [1540],
    "depicted": [1040],
    "label": [1],
    "summary": [1],
    "thumbnail": [1],
    "imageHash": [1, "image-hash"],
    "source": [1],
    "sourceId": [1, "source-id"],
    "dialog": [32],
    "_depicted": [32]
  }, [[0, "entitySelected", "onEntitySelected"], [0, "prominentToggled", "onProminentToggled"], [0, "droToggled", "onDroToggled"], [0, "entityRemoved", "onEntityRemoved"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-depicts-dialog", "ve-depicts", "ve-depicts-dialog", "ve-wikidata-search"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-depicts-dialog":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DepictsDialog);
      }
      break;
    case "ve-depicts":
      if (!customElements.get(tagName)) {
        defineCustomElement();
      }
      break;
    case "ve-depicts-dialog":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
    case "ve-wikidata-search":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const veDepictsCss = ":host{font-family:Roboto, sans-serif}*{box-sizing:border-box}.depicted-entities ul{margin:12px 0 0 0}.cards ul{padding:12px;list-style:none}.cards li{padding:6px}.card{display:flex;align-items:center;gap:12px}.card img{max-width:80px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)}.card div{display:flex;flex-direction:column;align-self:flex-start;gap:6px}.card div{display:flex;flex-direction:column;align-self:flex-start;gap:6px}.card .label{text-decoration:none;font-size:1.1em;font-weight:bold;color:black}.card .label:hover{text-decoration:underline}ul.depicted-entities.table{padding:0;list-style:none;overflow-y:scroll}.depicted-entities.table li{display:flex;align-items:center;justify-content:center;gap:18px}.depicted-entities.table li>*{flex:1;text-align:center;padding:6px 0}.header{border-bottom:2px solid black}.depicted-entities.table .header div.label{text-align:center;min-width:30%}.depicted-entities.table div.label{text-align:left;min-width:30%}.controls{display:flex;align-items:center;justify-content:right;gap:18px}.controls button{cursor:pointer}.control label{margin-bottom:0}";

setBasePath(location.port === '3333' ? '' : '/web-components/');
const Depicts = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.prominentToggled = createEvent(this, "prominentToggled", 7);
    this.droToggled = createEvent(this, "droToggled", 7);
    this.entityRemoved = createEvent(this, "entityRemoved", 7);
    this.depicted = [];
    this.format = 'default';
    this.editable = false;
    this.entityData = {};
    this.entityDataInSync = false;
  }
  async connectedCallback() {
    // console.log(`ve-depicts.connectedCallback format=${this.format} depicted=${this.depicted.length}`)
    if (this.manifest) {
      this._manifest = await getManifest(this.manifest);
      this.imageHash = sha256(imageInfo(this._manifest).id);
      this.depicted = await getDepictedEntities(this.imageHash);
    }
    else if (this.depicted) {
      this.getEntityData();
    }
  }
  async depictedChanged() {
    this.getEntityData();
  }
  async getEntityData() {
    this.entityDataInSync = false;
    this.entityData = await getEntityData(this.depicted.map(entity => entity.id));
    this.entityDataInSync = true;
  }
  async refresh(depicted) {
    this.depicted = depicted;
    this.getEntityData();
  }
  toggleDro(qid) {
    this.droToggled.emit(qid);
  }
  toggleProminent(qid) {
    this.prominentToggled.emit(qid);
  }
  removeEntity(qid) {
    this.entityRemoved.emit(qid);
  }
  async edit() {
    let dialog = this.el.shadowRoot.querySelector('ve-depicts-dialog');
    dialog.show = !dialog.show;
  }
  label(qid) {
    var _a;
    return (_a = this.entityData[qid]) === null || _a === void 0 ? void 0 : _a.label;
  }
  defaultFormat() {
    return h("div", { class: "depicted-entities" }, h("ul", null, this.depicted.map((entity) => h("li", null, h("a", { href: `https://www.wikidata.org/entity/${entity.id}`, innerHTML: this.label(entity.id) })))), this.editable
      ? h("ve-depicts-dialog", { depicted: this.depicted, label: label(this._manifest), summary: summary(this._manifest), thumbnail: thumbnail(this._manifest), imageHash: this.imageHash, source: source(this._manifest), sourceId: sourceId(this._manifest) })
      : null);
  }
  tableFormat() {
    return h("div", null, h("ul", { class: "depicted-entities table" }, h("li", { class: "header" }, h("div", { class: "label" }, "Entity"), h("div", { class: "dro" }, "Digital representation of"), h("div", { class: "prominent" }, "Prominent"), h("div", { class: "controls" })), this.depicted.map((entity) => h("li", null, h("div", { class: "label", innerHTML: this.label(entity.id) }), h("div", { class: "dro" }, h("input", { type: "checkbox", id: "dro", name: "dro", checked: entity.dro, onClick: this.toggleDro.bind(this, entity.id) })), h("div", { class: "prominent" }, h("input", { type: "checkbox", id: "prominent", name: "prominent", checked: entity.prominent, onClick: this.toggleProminent.bind(this, entity.id) })), h("div", { class: "controls" }, h("sl-tooltip", { content: "Remove entity" }, h("sl-icon-button", { onClick: this.removeEntity.bind(this, entity.id), id: "remove-icon", name: "trash", label: "Remove entity" })))))));
  }
  cardsFormat() {
    return h("div", { class: "depicted-entities cards" }, h("ul", null, this.depicted.map((entity) => {
      var _a, _b, _c;
      return h("li", null, h("div", { class: "card" }, h("img", { src: (_a = this.entityData[entity.id]) === null || _a === void 0 ? void 0 : _a.thumbnail }), h("div", null, h("a", { class: "label", href: `https://www.wikidata.org/entity/${entity.id}`, innerHTML: (_b = this.entityData[entity.id]) === null || _b === void 0 ? void 0 : _b.label }), h("span", { class: "description", innerHTML: (_c = this.entityData[entity.id]) === null || _c === void 0 ? void 0 : _c.description }))));
    })));
  }
  render() {
    return this.entityDataInSync
      ? this.format === 'table'
        ? this.tableFormat()
        : this.format === 'cards'
          ? this.cardsFormat()
          : this.defaultFormat()
      : null;
  }
  get el() { return this; }
  static get watchers() { return {
    "depicted": ["depictedChanged"]
  }; }
  static get style() { return veDepictsCss; }
}, [1, "ve-depicts", {
    "manifest": [1],
    "depicted": [1040],
    "format": [1],
    "editable": [4],
    "_manifest": [32],
    "entityData": [32],
    "entityDataInSync": [32],
    "imageHash": [32],
    "refresh": [64],
    "edit": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-depicts", "ve-depicts", "ve-depicts-dialog", "ve-wikidata-search"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-depicts":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Depicts);
      }
      break;
    case "ve-depicts":
      if (!customElements.get(tagName)) {
        defineCustomElement();
      }
      break;
    case "ve-depicts-dialog":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
    case "ve-wikidata-search":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

export { Depicts as D, DepictsDialog as a, defineCustomElement$1 as b, defineCustomElement as d };
