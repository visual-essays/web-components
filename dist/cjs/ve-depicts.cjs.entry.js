'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f005592.js');
const utils = require('./utils-37a145e2.js');
require('./chunk.KO3SJXDW-0d70a765.js');
const chunk_GP3HCHHG = require('./chunk.GP3HCHHG-fdad49b5.js');
require('./chunk.COG46KYT-c6ea5d41.js');
require('./openseadragon-d6a5fb09.js');

const veDepictsCss = ":host{font-family:Roboto, sans-serif}*{box-sizing:border-box}.depicted-entities ul{margin:12px 0 0 0}.cards ul{padding:12px;list-style:none}.cards li{padding:6px}.card{display:flex;align-items:center;gap:12px}.card img{max-width:80px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)}.card div{display:flex;flex-direction:column;align-self:flex-start;gap:6px}.card div{display:flex;flex-direction:column;align-self:flex-start;gap:6px}.card .label{text-decoration:none;font-size:1.1em;font-weight:bold;color:black}.card .label:hover{text-decoration:underline}ul.depicted-entities.table{padding:0;list-style:none;overflow-y:scroll}.depicted-entities.table li{display:flex;align-items:center;justify-content:center;gap:18px}.depicted-entities.table li>*{flex:1;text-align:center;padding:6px 0}.header{border-bottom:2px solid black}.depicted-entities.table .header div.label{text-align:center;min-width:30%}.depicted-entities.table div.label{text-align:left;min-width:30%}.controls{display:flex;align-items:center;justify-content:right;gap:18px}.controls button{cursor:pointer}.control label{margin-bottom:0}";

chunk_GP3HCHHG.setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/src');
const Depicts = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.prominentToggled = index.createEvent(this, "prominentToggled", 7);
    this.droToggled = index.createEvent(this, "droToggled", 7);
    this.entityRemoved = index.createEvent(this, "entityRemoved", 7);
    this.depicted = [];
    this.format = 'default';
    this.editable = false;
    this.entityData = {};
    this.entityDataInSync = false;
  }
  async connectedCallback() {
    // console.log(`ve-depicts.connectedCallback format=${this.format} depicted=${this.depicted.length}`)
    if (this.manifest) {
      this._manifest = await utils.getManifest(this.manifest);
      this.imageHash = utils.sha256(utils.imageInfo(this._manifest).id);
      this.depicted = await utils.getDepictedEntities(this.imageHash);
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
    this.entityData = await utils.getEntityData(this.depicted.map(entity => entity.id));
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
    return index.h("div", { class: "depicted-entities" }, index.h("ul", null, this.depicted.map((entity) => index.h("li", null, index.h("a", { href: `https://www.wikidata.org/entity/${entity.id}`, innerHTML: this.label(entity.id) })))), this.editable
      ? index.h("ve-depicts-dialog", { depicted: this.depicted, label: utils.label(this._manifest), summary: utils.summary(this._manifest), thumbnail: utils.thumbnail(this._manifest), imageHash: this.imageHash, source: utils.source(this._manifest), sourceId: utils.sourceId(this._manifest) })
      : null);
  }
  tableFormat() {
    return index.h("div", null, index.h("ul", { class: "depicted-entities table" }, index.h("li", { class: "header" }, index.h("div", { class: "label" }, "Entity"), index.h("div", { class: "dro" }, "Digital representation of"), index.h("div", { class: "prominent" }, "Prominent"), index.h("div", { class: "controls" })), this.depicted.map((entity) => index.h("li", null, index.h("div", { class: "label", innerHTML: this.label(entity.id) }), index.h("div", { class: "dro" }, index.h("input", { type: "checkbox", id: "dro", name: "dro", checked: entity.dro, onClick: this.toggleDro.bind(this, entity.id) })), index.h("div", { class: "prominent" }, index.h("input", { type: "checkbox", id: "prominent", name: "prominent", checked: entity.prominent, onClick: this.toggleProminent.bind(this, entity.id) })), index.h("div", { class: "controls" }, index.h("sl-tooltip", { content: "Remove entity" }, index.h("sl-icon-button", { onClick: this.removeEntity.bind(this, entity.id), id: "remove-icon", name: "trash", label: "Remove entity" })))))));
  }
  cardsFormat() {
    return index.h("div", { class: "depicted-entities cards" }, index.h("ul", null, this.depicted.map((entity) => {
      var _a, _b, _c;
      return index.h("li", null, index.h("div", { class: "card" }, index.h("img", { src: (_a = this.entityData[entity.id]) === null || _a === void 0 ? void 0 : _a.thumbnail }), index.h("div", null, index.h("a", { class: "label", href: `https://www.wikidata.org/entity/${entity.id}`, innerHTML: (_b = this.entityData[entity.id]) === null || _b === void 0 ? void 0 : _b.label }), index.h("span", { class: "description", innerHTML: (_c = this.entityData[entity.id]) === null || _c === void 0 ? void 0 : _c.description }))));
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
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "depicted": ["depictedChanged"]
  }; }
};
Depicts.style = veDepictsCss;

exports.ve_depicts = Depicts;
