import { Component, Element, Event, Prop, State, h, Watch, Method } from '@stencil/core';
import { getManifest, imageInfo, getDepictedEntities, getEntityData, sha256, label, summary, thumbnail, source, sourceId } from '../../utils';
export class Depicts {
  constructor() {
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
    return h("div", { class: "depicted-entities" },
      h("ul", null, this.depicted.map((entity) => h("li", null,
        h("a", { href: `https://www.wikidata.org/entity/${entity.id}`, innerHTML: this.label(entity.id) })))),
      this.editable
        ? h("ve-depicts-dialog", { depicted: this.depicted, label: label(this._manifest), summary: summary(this._manifest), thumbnail: thumbnail(this._manifest), imageHash: this.imageHash, source: source(this._manifest), sourceId: sourceId(this._manifest) })
        : null);
  }
  tableFormat() {
    return h("div", null,
      h("ul", { class: "depicted-entities table" },
        h("li", { class: "header" },
          h("div", { class: "label" }, "Entity"),
          h("div", { class: "dro" }, "Digital representation of"),
          h("div", { class: "prominent" }, "Prominent"),
          h("div", { class: "controls" })),
        this.depicted.map((entity) => h("li", null,
          h("div", { class: "label", innerHTML: this.label(entity.id) }),
          h("div", { class: "dro" },
            h("input", { type: "checkbox", id: "dro", name: "dro", checked: entity.dro, onClick: this.toggleDro.bind(this, entity.id) })),
          h("div", { class: "prominent" },
            h("input", { type: "checkbox", id: "prominent", name: "prominent", checked: entity.prominent, onClick: this.toggleProminent.bind(this, entity.id) })),
          h("div", { class: "controls" },
            h("sl-tooltip", { content: "Remove entity" },
              h("sl-icon-button", { onClick: this.removeEntity.bind(this, entity.id), id: "remove-icon", name: "trash", label: "Remove entity" })))))));
  }
  cardsFormat() {
    return h("div", { class: "depicted-entities cards" },
      h("ul", null, this.depicted.map((entity) => {
        var _a, _b, _c;
        return h("li", null,
          h("div", { class: "card" },
            h("img", { src: (_a = this.entityData[entity.id]) === null || _a === void 0 ? void 0 : _a.thumbnail }),
            h("div", null,
              h("a", { class: "label", href: `https://www.wikidata.org/entity/${entity.id}`, innerHTML: (_b = this.entityData[entity.id]) === null || _b === void 0 ? void 0 : _b.label }),
              h("span", { class: "description", innerHTML: (_c = this.entityData[entity.id]) === null || _c === void 0 ? void 0 : _c.description }))));
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
  static get is() { return "ve-depicts"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-depicts.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-depicts.css"]
  }; }
  static get properties() { return {
    "manifest": {
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
      "attribute": "manifest",
      "reflect": false
    },
    "depicted": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "any[]",
        "resolved": "any[]",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "[]"
    },
    "format": {
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
      "attribute": "format",
      "reflect": false,
      "defaultValue": "'default'"
    },
    "editable": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "editable",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "_manifest": {},
    "entityData": {},
    "entityDataInSync": {},
    "imageHash": {}
  }; }
  static get events() { return [{
      "method": "prominentToggled",
      "name": "prominentToggled",
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
    }, {
      "method": "droToggled",
      "name": "droToggled",
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
    }, {
      "method": "entityRemoved",
      "name": "entityRemoved",
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
  static get methods() { return {
    "refresh": {
      "complexType": {
        "signature": "(depicted: any[]) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "edit": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "depicted",
      "methodName": "depictedChanged"
    }]; }
}
