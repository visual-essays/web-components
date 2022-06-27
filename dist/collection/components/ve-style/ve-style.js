import { Component, Prop } from '@stencil/core';
export class Style {
  removeLinkTag(href) {
    let link = document.querySelector(`link[href$="${href}"]`);
    if (link)
      link.parentElement.removeChild(link);
  }
  connectedCallback() {
    // let server = location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://visual-essays.net'
    let server = 'https://visual-essays.net';
    // console.log(`layout=${this.layout} theme=${this.theme}`)
    if (this.layout) {
      this.removeLinkTag('/static/css/default-layout.css');
      let link = document.createElement('link');
      link.href = this.layout.indexOf('http') === 0 ? this.layout : `${server}${this.layout}`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (this.theme) {
      this.removeLinkTag('/static/css/default-theme.css');
      let link = document.createElement('link');
      link.href = this.theme.indexOf('http') === 0 ? this.theme : `${server}${this.theme}`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }
  render() { return null; }
  static get is() { return "ve-style"; }
  static get properties() { return {
    "layout": {
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
      "attribute": "layout",
      "reflect": false
    },
    "theme": {
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
      "attribute": "theme",
      "reflect": false
    }
  }; }
}
