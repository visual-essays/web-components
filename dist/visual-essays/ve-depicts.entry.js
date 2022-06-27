import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d76dec7f.js';
import { g as getManifest, s as sha256, i as imageInfo, e as getDepictedEntities, f as getEntityData, l as label, h as summary, t as thumbnail, j as source, k as sourceId } from './utils-7ad1d5d5.js';
import './openseadragon-211ea09d.js';

const veDepictsCss = ":host{font-family:Roboto, sans-serif}*{box-sizing:border-box}.depicted-entities ul{margin:12px 0 0 0}.cards ul{padding:12px;list-style:none}.cards li{padding:6px}.card{display:flex;align-items:center;gap:12px}.card img{max-width:80px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)}.card div{display:flex;flex-direction:column;align-self:flex-start;gap:6px}.card div{display:flex;flex-direction:column;align-self:flex-start;gap:6px}.card .label{text-decoration:none;font-size:1.1em;font-weight:bold;color:black}.card .label:hover{text-decoration:underline}ul.depicted-entities.table{padding:0;list-style:none;overflow-y:scroll}.depicted-entities.table li{display:flex;align-items:center;justify-content:center;gap:18px}.depicted-entities.table li>*{flex:1;text-align:center;padding:6px 0}.header{border-bottom:2px solid black}.depicted-entities.table .header div.label{text-align:center;min-width:30%}.depicted-entities.table div.label{text-align:left;min-width:30%}.controls{display:flex;align-items:center;justify-content:right;gap:18px}.controls button{cursor:pointer}.control label{margin-bottom:0}";

const Depicts = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "depicted": ["depictedChanged"]
  }; }
};
Depicts.style = veDepictsCss;

export { Depicts as ve_depicts };
