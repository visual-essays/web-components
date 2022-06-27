import { Component, Element, State, h } from '@stencil/core';
import { loadManifests, label, thumbnail } from '../../utils';
export class ImageGallery {
  constructor() {
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
  static get is() { return "ve-image-grid"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-image-grid.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-image-grid.css"]
  }; }
  static get states() { return {
    "manifests": {}
  }; }
  static get elementRef() { return "host"; }
}
