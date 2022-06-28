import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { i as imageInfo, f as imageDataUrl, p as parseImageOptions, g as getManifest } from './utils.js';
import './chunk.Q6VLS7NX.js';
import { a as setBasePath } from './chunk.GP3HCHHG.js';
import './chunk.H262HIXG.js';
import { d as defineCustomElement$2 } from './ve-search2.js';
import './chunk.COG46KYT.js';
import { d as defineCustomElement$3 } from './ve-contact2.js';

const veHeaderCss = ":host{font-family:Roboto, sans-serif;display:block;font-size:1rem;width:100%;background-repeat:no-repeat;background-size:cover;background-position:center;position:relative;margin:0;z-index:3;margin-top:-1rem;color:#444;max-height:220px}:host ul{display:none}:host(.sticky){position:sticky;position:-webkit-sticky;top:-114px}.title-panel{display:flex;flex-direction:column;justify-content:center;gap:4px;font-family:Roboto, sans-serif;position:absolute;height:90px;background:rgba(0, 0, 0, 0.3);border-radius:3px;box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;color:white;padding:.5rem 3.2rem .5rem .5rem;font-weight:bold;left:0;bottom:0;right:0}.title-buttons{display:flex;flex-direction:row;position:absolute;right:20px}#info-button::part(base){background-color:white}#info-button{margin-left:10px}#info-button:hover{box-shadow:0 0 10px rgb(146, 209, 248)}#ve-search-search-button::part(base){background-color:white}.title,.subtitle{line-height:3rem}.title-panel a{text-decoration:none}.title,.subtitle{color:white}.title{font-size:1.6rem;line-height:1.8rem;padding-top:0}.subtitle{font-size:1.4rem;line-height:1.4rem}.ve-header{position:relative;height:100%}nav{display:inline-block;position:absolute;top:20px;right:12px;z-index:1;-webkit-user-select:none;user-select:none}sl-button::part(base){background-color:rgba(0, 0, 0, 0.2)}nav sl-icon{color:white;font-size:24px;font-weight:bold;cursor:pointer;padding-top:7px}nav sl-menu-item sl-icon{color:inherit;padding:0 6px 0 0;font-size:20px}nav sl-menu-item:hover sl-icon{color:inherit}#info-icon,#search-icon{position:absolute;z-index:1;color:white;text-align:center;line-height:1.4em;letter-spacing:-1px;font-weight:bold;cursor:pointer;border:2px solid rgba(255, 255, 255, 0.5)}#info-icon{bottom:12px;right:19px;width:22px;height:22px;border-radius:50%;color:white;border:2px solid rgba(255, 255, 255, 0.5)}#search-box{display:flex;align-items:center;position:absolute;bottom:68px;right:80px}ve-search{padding-right:36px;visibility:hidden}#search-icon{position:absolute;right:0;width:30px;height:30px;border:none}#image-info-popup{position:absolute;display:none;width:75%;max-width:300px;height:auto;max-height:500px;background:#fff;right:72px;top:8px;padding:6px;border:1px solid #444;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius:3px;overflow-y:scroll;z-index:10}:host #info-icon{visibility:hidden}:host(:hover) #info-icon{visibility:visible}@media (min-width: 481px){:host{max-height:300px}:host(.sticky){top:-158px}.title-panel{height:132px}.title-panel{height:120px;padding:1rem 5rem .5rem 2rem}nav{top:36px;right:24px}#info-icon{bottom:20px;right:31px}.title{font-size:2.5rem;line-height:2.6rem}.subtitle{font-size:2rem;line-height:2rem;min-height:1em}#menuToggle{top:28px}}";

setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/src');
const navIcons = {
  home: 'house-fill',
  about: 'info-circle-fill',
  contact: 'envelope-fill'
};
const Header = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    let size = `${this.el.clientWidth > 1000 ? 1000 : this.el.clientWidth},${this.height > 1000 ? 1000 : this.height}`;
    let url = `${serviceUrl.replace(/\/info.json$/, '')}/${options.region}/!${size}/${options.rotation}/${options.quality}.${options.format}`;
    // let url = `${serviceUrl.replace(/\/info.json$/,'')}/${options.region}/${options.size}/${options.rotation}/${options.quality}.${options.format}`
    console.log('_iiifUrl', url);
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
  _toggleSearchBox() {
    let searchBox = this.el.shadowRoot.querySelector('ve-search');
    searchBox.style.visibility = searchBox.style.visibility === 'visible' ? 'hidden' : 'visible';
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
      h("section", { class: "ve-header" }, h("div", { class: "title-panel" }, h("sl-icon", { id: "info-icon", name: "info-circle-fill", onClick: this._showInfoPopup.bind(this), title: "Image info" }), this.searchDomain
        ? h("div", { id: "search-box" }, h("ve-search", { filters: this.searchFilters, icon: true }), h("sl-tooltip", { content: "Click to search the site" }, h("sl-icon", { id: "search-icon", name: "search", onClick: this._toggleSearchBox.bind(this) })))
        : null, this.navItems.length > 0 &&
        h("nav", null, h("sl-dropdown", null, h("sl-button", { id: "menu-toggle", slot: "trigger", variant: "default", size: "medium", circle: true }, h("sl-icon", { name: "three-dots-vertical", label: "Navigation Menu" })), h("sl-menu", null, this.navItems.map((item) => h("sl-menu-item", { onClick: this.menuItemSelected.bind(this, item) }, h("sl-icon", { slot: "prefix", name: this.navIcon(item), label: item.label }), item.label))))), h("a", { href: "/" }, h("div", { class: "title" }, this.label)), h("div", { class: "subtitle" }, this.subtitle), h("div", { id: "image-info-popup" }))),
      h("ve-contact", { contact: this.contact })
    ];
  }
  get el() { return this; }
  static get watchers() { return {
    "_manifest": ["_manifestChanged"],
    "_imageInfo": ["_imageInfoChanged"],
    "_imgUrl": ["_imgUrlChanged"]
  }; }
  static get style() { return veHeaderCss; }
}, [1, "ve-header", {
    "label": [1],
    "background": [1],
    "subtitle": [1],
    "options": [1],
    "height": [2],
    "sticky": [4],
    "position": [1],
    "contact": [1],
    "searchDomain": [1, "search-domain"],
    "searchFilters": [1, "search-filters"],
    "imageOptions": [32],
    "navItems": [32],
    "_manifest": [32],
    "_imageInfo": [32],
    "_imgUrl": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-header", "ve-contact", "ve-search"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Header);
      }
      break;
    case "ve-contact":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ve-search":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const VeHeader = Header;
const defineCustomElement = defineCustomElement$1;

export { VeHeader, defineCustomElement };
