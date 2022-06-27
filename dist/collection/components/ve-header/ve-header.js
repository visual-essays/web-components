import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { parseImageOptions, imageInfo, getManifest, imageDataUrl } from '../../utils';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
// import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath('https://visual-essays.github.io/web-components/www')
const navIcons = {
  home: 'house-fill',
  about: 'info-circle-fill',
  contact: 'envelope-fill'
};
export class Header {
  constructor() {
    this.height = 300;
    this.position = 'center'; // center, top, bottom
    this.navItems = [];
  }
  _manifestChanged(newValue, oldValue) {
    if (newValue !== oldValue)
      this._imageInfo = imageInfo(this._manifest);
  }
  async _imageInfoChanged(imageInfo, priorValue) {
    if (imageInfo !== priorValue) {
      this._imgUrl = imageInfo.service
        ? this._iiifUrl(imageInfo.service[0].id || imageInfo.service[0]['@id'], this.imageOptions)
        : await imageDataUrl(imageInfo.id, this.imageOptions.region, { width: this.el.clientWidth, height: this.height });
    }
  }
  async _imgUrlChanged(imgUrl) {
    this.el.style.backgroundImage = `url('${imgUrl}')`;
    this.el.style.backgroundPosition = this.position;
  }
  _iiifUrl(serviceUrl, options) {
    //let size = `${this.el.clientWidth > 1000 ? 1000 : this.el.clientWidth},${this.height > 1000 ? 1000 : this.height}`
    //let url = `${serviceUrl}/${options.region}/!${size}/${options.rotation}/${options.quality}.${options.format}`
    let url = `${serviceUrl.replace(/\/info.json$/, '')}/${options.region}/${options.size}/${options.rotation}/${options.quality}.${options.format}`;
    // console.log('_iiifUrl', url)
    return url;
  }
  connectedCallback() {
    if (this.label) {
      let titleEl = document.querySelector('title');
      if (!titleEl) {
        titleEl = document.createElement('title');
        titleEl.innerText = this.label;
        document.head.appendChild(titleEl);
      }
    }
    this.imageOptions = parseImageOptions(this.options);
    this.navItems = Array.from(this.el.querySelectorAll('li')).map(navItem => navItem.firstChild.nodeName === 'A'
      ? { label: navItem.firstChild.textContent, href: navItem.firstChild.href }
      : { label: navItem.firstChild.textContent });
    // console.log(this.navItems)
    while (this.el.firstChild)
      this.el.removeChild(this.el.firstChild);
  }
  componentDidLoad() {
    this.el.style.height = `${this.height}px`;
    if (this.sticky) {
      this.el.classList.add('sticky');
      document.querySelector('main').classList.add('sticky-header');
    }
    getManifest(this.background).then(manifest => this._manifest = manifest);
  }
  htmlToElem(html) {
    return new DOMParser().parseFromString(html, 'text/html').children[0].children[1];
  }
  _showInfoPopup() {
    let popup = this.el.shadowRoot.querySelector('#image-info-popup');
    let images = encodeURIComponent(JSON.stringify([{ manifest: this._manifest }]));
    popup.innerHTML = `<ve-manifest images="${images}" condensed></ve-manifest>`;
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  }
  menuItemSelected(item) {
    console.log('menuItemSelected', item);
    if (item.label.toLowerCase().indexOf('contact') === 0 && this.contact) {
      let contactDialog = this.el.shadowRoot.querySelector('ve-contact');
      contactDialog.show = !contactDialog.show;
    }
    else if (item.href) {
      location.href = item.href;
    }
  }
  navIcon(item) {
    let iconName = '';
    let menuLabel = item.label.toLowerCase();
    Object.keys(navIcons).forEach(key => {
      if (menuLabel.indexOf(key) >= 0)
        iconName = navIcons[key];
    });
    return iconName;
  }
  render() {
    return [
      h("section", { class: "ve-header" },
        h("div", { class: "title-panel" },
          this.navItems.length > 0 &&
            h("nav", null,
              h("sl-dropdown", null,
                h("sl-button", { id: "menu-toggle", slot: "trigger", variant: "default", size: "medium", circle: true },
                  h("sl-icon", { name: "three-dots-vertical", label: "Navigation Meno" })),
                h("sl-menu", null, this.navItems.map((item) => h("sl-menu-item", { onClick: this.menuItemSelected.bind(this, item) },
                  h("sl-icon", { slot: "prefix", name: this.navIcon(item), label: item.label }),
                  item.label))))),
          h("a", { href: "/" },
            h("div", { class: "title" }, this.label)),
          h("div", { class: "subtitle" }, this.subtitle),
          h("div", { id: "image-info-popup" }),
          h("div", { class: "title-buttons" },
            h("ve-search", { cx: '0a5115e988de8e8a9', filters: '16c:16c,17c:17c,18c:18c,19c:19c,20c:20c,21c:21c,austen:Jane Austen,canterbury:Canterbury,churches:Churches,dickens:Dickens', icon: true, tooltip: "Click to search the site" }),
            h("sl-button", { id: "info-button", onClick: this._showInfoPopup.bind(this), title: "Image info" },
              h("sl-icon", { name: "info" }))))),
      h("ve-contact", { contact: this.contact })
    ];
  }
  static get is() { return "ve-header"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-header.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-header.css"]
  }; }
  static get properties() { return {
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
    "background": {
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
      "attribute": "background",
      "reflect": false
    },
    "subtitle": {
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
      "attribute": "subtitle",
      "reflect": false
    },
    "options": {
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
      "attribute": "options",
      "reflect": false
    },
    "height": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "height",
      "reflect": false,
      "defaultValue": "300"
    },
    "sticky": {
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
      "attribute": "sticky",
      "reflect": false
    },
    "position": {
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
      "attribute": "position",
      "reflect": false,
      "defaultValue": "'center'"
    },
    "contact": {
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
      "attribute": "contact",
      "reflect": false
    }
  }; }
  static get states() { return {
    "imageOptions": {},
    "navItems": {},
    "_manifest": {},
    "_imageInfo": {},
    "_imgUrl": {}
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "_manifest",
      "methodName": "_manifestChanged"
    }, {
      "propName": "_imageInfo",
      "methodName": "_imageInfoChanged"
    }, {
      "propName": "_imgUrl",
      "methodName": "_imgUrlChanged"
    }]; }
}
