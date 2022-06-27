import { r as registerInstance, h, g as getElement } from './index-82518b18.js';
import { g as getManifest, i as imageInfo } from './utils-e37b1a9e.js';
import './openseadragon-2626d5b4.js';

const veManifestCss = ".manifest{font-family:Roboto, sans-serif;padding:6px;z-index:100}.manifest.condensed{border:1px solid #ccc;font-size:0.9rem;color:#444}.manifest.condensed:not(:first-of-type){margin-top:1.5em}.manifest.condensed .thumbnail{max-height:60px;max-width:60px;position:relative;float:left;margin:0 9px 6px 0}.manifest>div{margin-bottom:12px}.lbl,.lbl a,.summary{font-weight:bold;line-height:1.2em;color:#444}.summary,.rights{clear:both}.summary .value{line-height:1.1em}ul{list-style:none;margin:0}.label,.value{display:inline-flex}.value{display:inline;line-height:1.2rem;overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto;color:#444}.manifest>div .label{font-weight:bold;min-width:80px;margin-right:6px}.label::after{content:\":\"}.logo{padding-right:6px}.manifest-id,.manifest-label,.summary,.provider,.rights,.service,.imageData div,.thumbnail{display:flex;align-items:center}.metadata>ul,.requiredStatement ul{padding-left:24px}.metadata ul li,.requiredStatement ul li{display:flex}.metadata ul ul{padding-left:0}a:link,a:visited{color:#0000EE}";

const ManifestViewer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.condensed = false;
    this._images = [];
  }
  srcChanged(src) {
    if (src)
      getManifest(this.src).then(manifest => this._images = [{ manifest }]);
  }
  imagesChanged() {
    this._images = JSON.parse(decodeURIComponent(this.images));
  }
  parseManifest(imageRec) {
    let manifest = imageRec.manifest;
    // console.log(manifest)
    let parsed = {};
    parsed.id = this._value(manifest.id);
    parsed.label = this._value(manifest.label);
    if (manifest.summary)
      parsed.summary = this._value(manifest.summary);
    if (manifest.rights)
      parsed.rights = manifest.rights;
    if (manifest.thumbnail)
      parsed.thumbnail = manifest.thumbnail[0].id;
    if (manifest.metadata) {
      parsed.metadata = manifest.metadata.map(item => ({ label: this._value(item.label)[0], value: this._value(item.value) }));
      let sourceUrl = parsed.metadata.find(item => item.label == 'source_url');
      parsed.sourceUrl = sourceUrl ? sourceUrl.value[0] : null;
      let depicts = parsed.metadata.find(md => md.label === 'depicts');
      if (depicts)
        parsed.depicts = depicts.value;
    }
    if (manifest.provider) {
      parsed.provider = manifest.provider.map(provider => {
        let entry = { label: this._value(provider.label), href: provider.id };
        if (provider.logo)
          entry.logo = { src: provider.logo[0].id };
        return entry;
      });
    }
    if (manifest.logo) {
      parsed.logo = manifest.logo.map(item => {
        let logoObj = { src: typeof item === 'object' ? item.id || item['@id'] : item };
        if (typeof item === 'object') {
          if (item.width)
            logoObj.width = item.width;
          if (item.height)
            logoObj.height = item.height;
        }
        return logoObj;
      });
    }
    parsed.imageData = imageInfo(manifest);
    parsed.service = parsed.imageData.service && `${(parsed.imageData.service[0].id || parsed.imageData.service[0]['@id'])
      .replace(/\/info\.json$/, '')}/info.json`;
    if (manifest.requiredStatement) {
      let rs = manifest.requiredStatement;
      parsed.requiredStatement = { label: this._value(rs.label), value: this._value(rs.value) };
    }
    if (manifest.homepage) {
      parsed.homepage = { label: manifest.homepage.label ? this._value(manifest.homepage.label) : manifest.homepage.id, href: manifest.homepage.id };
    }
    if (manifest.seeAlso) {
      parsed.seeAlso = manifest.seeAlso.map(seeAlso => ({ label: seeAlso.label ? this._value(seeAlso.label) : seeAlso.id, href: seeAlso.id }));
    }
    // console.log(parsed)
    return parsed;
  }
  componentWillLoad() {
    if (this.images) {
      this._images = JSON.parse(decodeURIComponent(this.images));
    }
    else if (this.src) {
      getManifest(this.src).then(manifest => this._images = [{ manifest }]);
    }
  }
  _value(langObj, language = 'en') {
    return typeof langObj === 'object' && !Array.isArray(langObj)
      ? langObj[language] || langObj.none || langObj[Object.keys(langObj).sort()[0]]
      : langObj;
  }
  onManifestIconDrag(dragEvent) {
    var _a;
    let manifestUrl = dragEvent.target.parentElement.href;
    (_a = dragEvent.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/uri-list', `${manifestUrl}?manifest=${manifestUrl}`);
  }
  licenseBadge(parsedManifest) {
    let config = {
      cc: {
        badgeWidth: 88,
        badgeHeight: 31,
        badgeTemplate: 'https://licensebuttons.net/l/${this.rightsCode}${this.rightsCode === "publicdomain" ? "" : "/"+this.version}/${this.badgeWidth}x${this.badgeHeight}.png'
      },
      rs: {
        badgeTemplate: 'https://rightsstatements.org/files/buttons/${this.rightsCode}.white.svg',
        backgroundColor: '318ac7'
      }
    };
    const fillTemplate = function (templateString, templateVars) {
      return new Function("return `" + templateString + "`;").call(templateVars);
    };
    let rights = parsedManifest.rights;
    let badgeHtml;
    let [rightsType, _, rightsCode, version] = rights.split('/').slice(2);
    if (rightsType === 'creativecommons.org') {
      rightsCode = rightsCode === 'zero' ? 'publicdomain' : rightsCode;
      badgeHtml = `<img src="${fillTemplate(config.cc.badgeTemplate, Object.assign(Object.assign({}, config.cc), { rightsCode, version }))}"/>`;
    }
    else if (rightsType === 'rightsstatements.org') {
      badgeHtml = `<div style="display:inline-block;height:25px;padding:3px;background-color:#${config.rs.backgroundColor};"><img style="height:100%;" src="${fillTemplate(config.rs.badgeTemplate, Object.assign(Object.assign({}, config.rs), { rightsCode }))}"/></div>`;
    }
    return badgeHtml;
  }
  render_condensed() {
    return this._images.map(item => this.parseManifest(item)).map(parsed => h("div", { class: "manifest condensed" }, parsed.thumbnail ? h("img", { class: "thumbnail", src: parsed.thumbnail }) : null, h("div", { class: "lbl", style: { marginBottom: '12px;' } }, parsed.sourceUrl
      ? h("a", { href: parsed.sourceUrl, innerHTML: parsed.label })
      : parsed.label), parsed.summary
      ? h("div", { class: "summary" }, h("span", { class: "value" }, parsed.summary))
      : null, parsed.requiredStatement
      ? h("div", null, h("span", { class: "value", innerHTML: parsed.requiredStatement.value }))
      : null, parsed.rights
      ? h("div", { class: "rights" }, h("a", { class: "value", href: parsed.rights, innerHTML: this.licenseBadge(parsed) }))
      : null, parsed.provider
      ? h("div", { class: "provider" }, parsed.provider.length == 1
        ? h("div", { style: { display: 'flex', alignItems: 'center' } }, parsed.provider[0].logo
          ? h("img", { class: "logo", src: parsed.provider[0].logo.src, height: 20 })
          : null, h("a", { class: "value", href: parsed.provider[0].href, innerHTML: parsed.provider[0].label }))
        : h("ul", null, parsed.provider.map((provider) => h("li", null, provider.logo
          ? h("img", { class: "logo", src: provider.logo.src, height: 20 })
          : null, h("a", { class: "value", href: provider.href, innerHTML: provider.label })))))
      : null, parsed.imageData.width
      ? h("div", null, h("span", { class: "label" }, "Dimensions"), " ", h("span", { innerHTML: parsed.imageData.width.toLocaleString() }), " x ", h("span", { innerHTML: parsed.imageData.height.toLocaleString() }))
      : null, parsed.depicts
      ? h("div", null, h("span", { class: "label" }, "Depicts"), h("ul", null, parsed.depicts.map(depicts => h("li", { innerHTML: depicts }))))
      : null, h("a", { draggable: true, onDragStart: this.onManifestIconDrag.bind(this), href: parsed.id }, h("img", { src: "https://avatars.githubusercontent.com/u/5812589?v=3&s=24", alt: "IIIF Manifest" }))));
  }
  render_full() {
    return this._images.map(item => this.parseManifest(item)).map(parsed => h("div", { class: "manifest" }, h("div", { class: "manifest-id" }, h("span", { class: "label" }, "id"), h("a", { class: "value", href: parsed.id, innerHTML: parsed.id })), h("div", { class: "manifest-label" }, h("span", { class: "label" }, "label"), h("span", { class: "value" }, parsed.label)), parsed.summary
      ? h("div", { class: "summary" }, h("span", { class: "label" }, "summary"), h("span", { class: "value" }, parsed.summary))
      : null, parsed.metadata
      ? h("div", { class: "metadata" }, h("span", { class: "label" }, "metadata"), h("ul", null, parsed.metadata.map((item) => h("li", null, h("span", { class: "label" }, item.label), item.value.length == 1
        ? h("span", { class: "value", innerHTML: item.value[0] })
        : h("ul", null, item.value.map((value) => h("li", { class: "value", innerHTML: value })))))))
      : null, parsed.navDate
      ? h("div", { class: "navDate" }, h("span", { class: "label" }, "navDate"), h("span", { class: "value" }, parsed.navDate))
      : null, parsed.provider
      ? h("div", { class: "provider" }, h("span", { class: "label" }, "provider"), parsed.provider.length == 1
        ? h("div", { style: { display: 'flex', alignItems: 'center' } }, parsed.provider[0].logo
          ? h("img", { class: "logo", src: parsed.provider[0].logo.src, height: 20 })
          : null, h("a", { class: "value", href: parsed.provider[0].href, innerHTML: parsed.provider[0].label }))
        : h("ul", null, parsed.provider.map((provider) => h("li", null, provider.logo
          ? h("img", { class: "logo", src: provider.logo.src, height: 20 })
          : null, h("a", { class: "value", href: provider.href, innerHTML: provider.label })))))
      : null, parsed.homepage
      ? h("div", { class: "homepage" }, h("span", { class: "label" }, "homepage"), h("a", { class: "value", href: parsed.homepage.href, innerHTML: parsed.homepage.label }))
      : null, parsed.seeAlso
      ? h("div", { class: "seeAlso" }, h("span", { class: "label" }, "seeAlso"), h("a", { class: "value", href: parsed.seeAlso[0].href, innerHTML: parsed.seeAlso[0].label }))
      : null, parsed.logo
      ? h("div", { class: "logo" }, h("span", { class: "label" }, "logo"), h("a", { class: "value", href: parsed.logo[0].src, innerHTML: parsed.logo[0].src }))
      : null, parsed.rights
      ? h("div", { class: "rights" }, h("span", { class: "label" }, "rights"), h("a", { class: "value", href: parsed.rights, innerHTML: parsed.rights }))
      : null, parsed.requiredStatement
      ? h("div", { class: "requiredStatement" }, h("span", { class: "label" }, "requiredStatement"), h("ul", null, h("li", null, parsed.requiredStatement.label && parsed.requiredStatement.label[0]
        ? h("span", { class: "label", innerHTML: parsed.requiredStatement.label })
        : null, h("span", { class: "value", innerHTML: parsed.requiredStatement.value }))))
      : null, h("div", { class: "imageData" }, h("div", null, h("span", { class: "label" }, "image"), h("a", { class: "value", href: parsed.imageData.id, innerHTML: parsed.imageData.id })), h("div", null, h("span", { class: "label" }, "format"), h("span", { class: "value", innerHTML: parsed.imageData.format })), h("div", null, h("span", { class: "label" }, "width"), h("span", { class: "value", innerHTML: parsed.imageData.width })), h("div", null, h("span", { class: "label" }, "height"), h("span", { class: "value", innerHTML: parsed.imageData.height }))), ",", parsed.thumbnail
      ? h("div", { class: "thumbnail" }, h("span", { class: "label" }, "thumbnail"), h("a", { class: "value", href: parsed.thumbnail, innerHTML: parsed.thumbnail }))
      : null, parsed.service
      ? h("div", { class: "service" }, h("span", { class: "label" }, "service"), h("a", { class: "value", href: parsed.service, innerHTML: parsed.service }))
      : null));
  }
  render() {
    return this._images
      ? this.condensed ? this.render_condensed() : this.render_full()
      : null;
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "src": ["srcChanged"],
    "images": ["imagesChanged"]
  }; }
};
ManifestViewer.style = veManifestCss;

export { ManifestViewer as ve_manifest };
