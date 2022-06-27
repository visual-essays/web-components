import { r as registerInstance } from './index-d76dec7f.js';

const Meta = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  addMetaTag(name, content) {
    let metaEl = document.createElement('meta');
    metaEl.setAttribute('name', name);
    metaEl.setAttribute('content', content);
    document.head.appendChild(metaEl);
  }
  addTitle(title) {
    let titleEl = document.querySelector(`title`);
    if (titleEl) {
      titleEl.title = title;
    }
    else {
      titleEl = document.createElement('title');
      titleEl.title = title;
      document.head.appendChild(titleEl);
    }
  }
  connectedCallback() {
    if (this.title)
      this.addTitle(this.title);
    if (this.description)
      this.addMetaTag('description', this.description);
  }
  render() { return null; }
};

export { Meta as ve_meta };
