'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f005592.js');
const utils = require('./utils-37a145e2.js');
require('./openseadragon-d6a5fb09.js');

const veImageGridCss = ".ve-image-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(160px, 1fr));grid-gap:12px;align-items:center;justify-items:center;padding:12px 12px 24px 12px;}.ve-image-grid>*{border:1px solid #ccc;box-shadow:2px 2px 6px 0px  rgba(0,0,0,0.3);width:240px;max-width:100%}@media (min-width: 768px){.ve-image-grid{grid-template-columns:repeat(auto-fill, minmax(225px, 1fr))}.ve-image-grid>*{border:1px solid #ccc;box-shadow:2px 2px 6px 0px  rgba(0,0,0,0.3);width:200px;max-width:100%}}";

const ImageGallery = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.manifests = [];
  }
  async componentDidLoad() {
    let manifestUrls = Array.from(this.host.querySelectorAll('li')).map(el => {
      let manifestId = el.innerHTML.trim();
      return manifestId.startsWith('http') ? manifestId : `https://iiif.visual-essays.net/${manifestId}/manifest.json`;
    });
    while (this.host.firstChild)
      this.host.removeChild(this.host.firstChild);
    this.manifests = await utils.loadManifests(manifestUrls);
  }
  render() {
    return [
      index.h("section", { class: "ve-image-grid" }, this.manifests.map((manifest) => index.h("img", { src: utils.thumbnail(manifest), alt: utils.label(manifest) })))
    ];
  }
  get host() { return index.getElement(this); }
};
ImageGallery.style = veImageGridCss;

exports.ve_image_grid = ImageGallery;
