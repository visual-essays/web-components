import { r as registerInstance, h, g as getElement } from './index-82518b18.js';
import { d as loadManifests, t as thumbnail, l as label } from './utils-e37b1a9e.js';
import './openseadragon-2626d5b4.js';

const veImageGridCss = ".ve-image-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(160px, 1fr));grid-gap:12px;align-items:center;justify-items:center;padding:12px 12px 24px 12px;}.ve-image-grid>*{border:1px solid #ccc;box-shadow:2px 2px 6px 0px  rgba(0,0,0,0.3);width:240px;max-width:100%}@media (min-width: 768px){.ve-image-grid{grid-template-columns:repeat(auto-fill, minmax(225px, 1fr))}.ve-image-grid>*{border:1px solid #ccc;box-shadow:2px 2px 6px 0px  rgba(0,0,0,0.3);width:200px;max-width:100%}}";

const ImageGallery = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get host() { return getElement(this); }
};
ImageGallery.style = veImageGridCss;

export { ImageGallery as ve_image_grid };
