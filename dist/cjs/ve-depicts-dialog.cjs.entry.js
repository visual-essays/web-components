'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f005592.js');
require('./chunk.RP2CLKS2-a7f5b409.js');
require('./chunk.GP3HCHHG-fdad49b5.js');
require('./chunk.KO3SJXDW-0d70a765.js');
require('./chunk.3IYPB6RR-e2a8903b.js');

const veDepictsDialogCss = ":host{font-family:Roboto, sans-serif}.wrapper{max-height:40vh;min-height:20vh;overflow-y:scroll}h4{margin:0 0 3px 0;font-size:1.2rem;font-weight:600}.card{max-height:200px}.card-body{padding:0.5rem;max-height:200px;overflow-y:scroll}.card-img{max-height:200px;object-fit:contain}.card-text{font-size:0.9rem;overflow-y:scroll}.depicted-entities{padding:0;list-style:none;overflow-y:scroll}.depicted-entities li{display:flex;align-items:center;justify-content:center;gap:18px}.depicted-entities li>*{flex:1;text-align:center;padding:6px 0}.header{border-bottom:2px solid black}div.label{text-align:left;min-width:30%}.controls{display:flex;align-items:center;justify-content:right;gap:18px}.controls button{cursor:pointer}.control label{margin-bottom:0}.depicts{padding:9px}.depicts .entities ul{margin:0;padding-left:6px;list-style-type:none}.depicts .entities ul li{display:grid;grid-auto-flow:column;align-items:center}.depicts .entities .controls{display:flex;justify-content:right}.depicts .entities .controls label{padding-left:6px;font-family:\"Helvetica Narrow\",\"Arial Narrow\",Tahoma,Arial,Helvetica,sans-serif}.buttons{display:grid;grid-auto-flow:column;justify-content:end;grid-column-gap:12px}";

const DepictsDialog = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.depictedChanged = index.createEvent(this, "depictedChanged", 7);
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
      index.h("sl-dialog", { id: "depicts-dialog", label: "Entities depicted in image", class: "dialog-overview" }, index.h("div", { style: { display: 'flex', padding: '12px', border: '1px solid #ccc', marginBottom: '18px' } }, this.thumbnail
        ? index.h("img", { style: { maxWidth: '40%', height: '100%' }, src: this.thumbnail, alt: this.label })
        : '', index.h("div", { style: { display: 'flex', flexDirection: 'column', padding: '0px' } }, index.h("div", { innerHTML: this.label, style: { padding: '0 12px', fontSize: '1.2em', fontWeight: 'bold' } }), this.summary
        ? index.h("div", { innerHTML: this.summary })
        : null)), index.h("ve-wikidata-search", null), index.h("div", { class: "wrapper" }, index.h("div", { class: "ve-depicts" }, index.h("ve-depicts", { depicted: this._depicted, format: "table" }))), index.h("sl-button", { slot: "footer", onClick: this.close.bind(this) }, "Cancel"), index.h("sl-button", { slot: "footer", variant: "primary", onClick: this.apply.bind(this) }, "Apply"))
    ];
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "show": ["showChanged"],
    "depicted": ["onDepictedChanged"]
  }; }
};
DepictsDialog.style = veDepictsDialogCss;

exports.ve_depicts_dialog = DepictsDialog;
