import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { k as loadManifests, t as thumbnail, l as label } from './utils.js';

const veImageGridCss = ".ve-image-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(160px, 1fr));grid-gap:12px;align-items:center;justify-items:center;padding:12px 12px 24px 12px;}.ve-image-grid>*{border:1px solid #ccc;box-shadow:2px 2px 6px 0px  rgba(0,0,0,0.3);width:240px;max-width:100%}@media (min-width: 768px){.ve-image-grid{grid-template-columns:repeat(auto-fill, minmax(225px, 1fr))}.ve-image-grid>*{border:1px solid #ccc;box-shadow:2px 2px 6px 0px  rgba(0,0,0,0.3);width:200px;max-width:100%}}";

const ImageGallery = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.manifests = [];
  }
  async componentDidLoad() {
    let manifestUrls = Array.from(this.host.querySelectorAll('li')).map(el => {
      let manifestId = el.innerHTML.trim();
      return manifestId.startsWith('http') ? manifestId : `https://iiif.visual-essays.net/${manifestId}/manifest.json`;
    });
    while (this.host.firstChild)
      this.host.removeChild(this.host.firstChild);
    this.manifests = await loadManifests(manifestUrls);
  }
  render() {
    return [
      h("section", { class: "ve-image-grid" }, this.manifests.map((manifest) => h("img", { src: thumbnail(manifest), alt: label(manifest) })))
    ];
  }
  get host() { return this; }
  static get style() { return veImageGridCss; }
}, [1, "ve-image-grid", {
    "manifests": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-image-grid"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-image-grid":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ImageGallery);
      }
      break;
  } });
}

const VeImageGrid = ImageGallery;
const defineCustomElement = defineCustomElement$1;

export { VeImageGrid, defineCustomElement };
