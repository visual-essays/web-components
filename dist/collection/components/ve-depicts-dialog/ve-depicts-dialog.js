import { Component, Element, Event, Listen, Prop, State, h, Watch } from '@stencil/core';
export class DepictsDialog {
  constructor() {
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
      h("sl-dialog", { id: "depicts-dialog", label: "Entities depicted in image", class: "dialog-overview" },
        h("div", { style: { display: 'flex', padding: '12px', border: '1px solid #ccc', marginBottom: '18px' } },
          this.thumbnail
            ? h("img", { style: { maxWidth: '40%', height: '100%' }, src: this.thumbnail, alt: this.label })
            : '',
          h("div", { style: { display: 'flex', flexDirection: 'column', padding: '0px' } },
            h("div", { innerHTML: this.label, style: { padding: '0 12px', fontSize: '1.2em', fontWeight: 'bold' } }),
            this.summary
              ? h("div", { innerHTML: this.summary })
              : null)),
        h("ve-wikidata-search", null),
        h("div", { class: "wrapper" },
          h("div", { class: "ve-depicts" },
            h("ve-depicts", { depicted: this._depicted, format: "table" }))),
        h("sl-button", { slot: "footer", onClick: this.close.bind(this) }, "Cancel"),
        h("sl-button", { slot: "footer", variant: "primary", onClick: this.apply.bind(this) }, "Apply"))
    ];
  }
  static get is() { return "ve-depicts-dialog"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-depicts-dialog.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-depicts-dialog.css"]
  }; }
  static get properties() { return {
    "show": {
      "type": "boolean",
      "mutable": true,
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
      "attribute": "show",
      "reflect": true,
      "defaultValue": "false"
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
    "label": {
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
      "attribute": "label",
      "reflect": false
    },
    "summary": {
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
      "attribute": "summary",
      "reflect": false
    },
    "thumbnail": {
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
      "attribute": "thumbnail",
      "reflect": false
    },
    "imageHash": {
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
      "attribute": "image-hash",
      "reflect": false
    },
    "source": {
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
      "attribute": "source",
      "reflect": false
    },
    "sourceId": {
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
      "attribute": "source-id",
      "reflect": false
    }
  }; }
  static get states() { return {
    "dialog": {},
    "_depicted": {}
  }; }
  static get events() { return [{
      "method": "depictedChanged",
      "name": "depictedChanged",
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
      "propName": "show",
      "methodName": "showChanged"
    }, {
      "propName": "depicted",
      "methodName": "onDepictedChanged"
    }]; }
  static get listeners() { return [{
      "name": "entitySelected",
      "method": "onEntitySelected",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "prominentToggled",
      "method": "onProminentToggled",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "droToggled",
      "method": "onDroToggled",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "entityRemoved",
      "method": "onEntityRemoved",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
