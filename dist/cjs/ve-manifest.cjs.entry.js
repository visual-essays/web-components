'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f005592.js');
const utils = require('./utils-37a145e2.js');
require('./openseadragon-d6a5fb09.js');

const veManifestCss = ".manifest{font-family:Roboto, sans-serif;padding:6px;z-index:100}.manifest.condensed{border:1px solid #ccc;font-size:0.9rem;color:#444}.manifest.condensed:not(:first-of-type){margin-top:1.5em}.manifest.condensed .thumbnail{max-height:60px;max-width:60px;position:relative;float:left;margin:0 9px 6px 0}.manifest>div{margin-bottom:12px}.lbl,.lbl a,.summary{font-weight:bold;line-height:1.2em;color:#444}.summary,.rights{clear:both}.summary .value{line-height:1.1em}ul{list-style:none;margin:0}.label,.value{display:inline-flex}.value{display:inline;line-height:1.2rem;overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto;color:#444}.manifest>div .label{font-weight:bold;min-width:80px;margin-right:6px}.label::after{content:\":\"}.logo{padding-right:6px}.manifest-id,.manifest-label,.summary,.provider,.rights,.service,.imageData div,.thumbnail{display:flex;align-items:center}.metadata>ul,.requiredStatement ul{padding-left:24px}.metadata ul li,.requiredStatement ul li{display:flex}.metadata ul ul{padding-left:0}a:link,a:visited{color:#0000EE}";

const ManifestViewer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.condensed = false;
    this._images = [];
  }
  srcChanged(src) {
    if (src)
      utils.getManifest(this.src).then(manifest => this._images = [{ manifest }]);
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
    parsed.imageData = utils.imageInfo(manifest);
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
      utils.getManifest(this.src).then(manifest => this._images = [{ manifest }]);
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
    return this._images.map(item => this.parseManifest(item)).map(parsed => index.h("div", { class: "manifest condensed" }, parsed.thumbnail ? index.h("img", { class: "thumbnail", src: parsed.thumbnail }) : null, index.h("div", { class: "lbl", style: { marginBottom: '12px;' } }, parsed.sourceUrl
      ? index.h("a", { href: parsed.sourceUrl, innerHTML: parsed.label })
      : parsed.label), parsed.summary
      ? index.h("div", { class: "summary" }, index.h("span", { class: "value" }, parsed.summary))
      : null, parsed.requiredStatement
      ? index.h("div", null, index.h("span", { class: "value", innerHTML: parsed.requiredStatement.value }))
      : null, parsed.rights
      ? index.h("div", { class: "rights" }, index.h("a", { class: "value", href: parsed.rights, innerHTML: this.licenseBadge(parsed) }))
      : null, parsed.provider
      ? index.h("div", { class: "provider" }, parsed.provider.length == 1
        ? index.h("div", { style: { display: 'flex', alignItems: 'center' } }, parsed.provider[0].logo
          ? index.h("img", { class: "logo", src: parsed.provider[0].logo.src, height: 20 })
          : null, index.h("a", { class: "value", href: parsed.provider[0].href, innerHTML: parsed.provider[0].label }))
        : index.h("ul", null, parsed.provider.map((provider) => index.h("li", null, provider.logo
          ? index.h("img", { class: "logo", src: provider.logo.src, height: 20 })
          : null, index.h("a", { class: "value", href: provider.href, innerHTML: provider.label })))))
      : null, parsed.imageData.width
      ? index.h("div", null, index.h("span", { class: "label" }, "Dimensions"), " ", index.h("span", { innerHTML: parsed.imageData.width.toLocaleString() }), " x ", index.h("span", { innerHTML: parsed.imageData.height.toLocaleString() }))
      : null, parsed.depicts
      ? index.h("div", null, index.h("span", { class: "label" }, "Depicts"), index.h("ul", null, parsed.depicts.map(depicts => index.h("li", { innerHTML: depicts }))))
      : null, index.h("a", { draggable: true, onDragStart: this.onManifestIconDrag.bind(this), href: parsed.id }, index.h("img", { src: "https://avatars.githubusercontent.com/u/5812589?v=3&s=24", alt: "IIIF Manifest" }))));
  }
  render_full() {
    return this._images.map(item => this.parseManifest(item)).map(parsed => index.h("div", { class: "manifest" }, index.h("div", { class: "manifest-id" }, index.h("span", { class: "label" }, "id"), index.h("a", { class: "value", href: parsed.id, innerHTML: parsed.id })), index.h("div", { class: "manifest-label" }, index.h("span", { class: "label" }, "label"), index.h("span", { class: "value" }, parsed.label)), parsed.summary
      ? index.h("div", { class: "summary" }, index.h("span", { class: "label" }, "summary"), index.h("span", { class: "value" }, parsed.summary))
      : null, parsed.metadata
      ? index.h("div", { class: "metadata" }, index.h("span", { class: "label" }, "metadata"), index.h("ul", null, parsed.metadata.map((item) => index.h("li", null, index.h("span", { class: "label" }, item.label), item.value.length == 1
        ? index.h("span", { class: "value", innerHTML: item.value[0] })
        : index.h("ul", null, item.value.map((value) => index.h("li", { class: "value", innerHTML: value })))))))
      : null, parsed.navDate
      ? index.h("div", { class: "navDate" }, index.h("span", { class: "label" }, "navDate"), index.h("span", { class: "value" }, parsed.navDate))
      : null, parsed.provider
      ? index.h("div", { class: "provider" }, index.h("span", { class: "label" }, "provider"), parsed.provider.length == 1
        ? index.h("div", { style: { display: 'flex', alignItems: 'center' } }, parsed.provider[0].logo
          ? index.h("img", { class: "logo", src: parsed.provider[0].logo.src, height: 20 })
          : null, index.h("a", { class: "value", href: parsed.provider[0].href, innerHTML: parsed.provider[0].label }))
        : index.h("ul", null, parsed.provider.map((provider) => index.h("li", null, provider.logo
          ? index.h("img", { class: "logo", src: provider.logo.src, height: 20 })
          : null, index.h("a", { class: "value", href: provider.href, innerHTML: provider.label })))))
      : null, parsed.homepage
      ? index.h("div", { class: "homepage" }, index.h("span", { class: "label" }, "homepage"), index.h("a", { class: "value", href: parsed.homepage.href, innerHTML: parsed.homepage.label }))
      : null, parsed.seeAlso
      ? index.h("div", { class: "seeAlso" }, index.h("span", { class: "label" }, "seeAlso"), index.h("a", { class: "value", href: parsed.seeAlso[0].href, innerHTML: parsed.seeAlso[0].label }))
      : null, parsed.logo
      ? index.h("div", { class: "logo" }, index.h("span", { class: "label" }, "logo"), index.h("a", { class: "value", href: parsed.logo[0].src, innerHTML: parsed.logo[0].src }))
      : null, parsed.rights
      ? index.h("div", { class: "rights" }, index.h("span", { class: "label" }, "rights"), index.h("a", { class: "value", href: parsed.rights, innerHTML: parsed.rights }))
      : null, parsed.requiredStatement
      ? index.h("div", { class: "requiredStatement" }, index.h("span", { class: "label" }, "requiredStatement"), index.h("ul", null, index.h("li", null, parsed.requiredStatement.label && parsed.requiredStatement.label[0]
        ? index.h("span", { class: "label", innerHTML: parsed.requiredStatement.label })
        : null, index.h("span", { class: "value", innerHTML: parsed.requiredStatement.value }))))
      : null, index.h("div", { class: "imageData" }, index.h("div", null, index.h("span", { class: "label" }, "image"), index.h("a", { class: "value", href: parsed.imageData.id, innerHTML: parsed.imageData.id })), index.h("div", null, index.h("span", { class: "label" }, "format"), index.h("span", { class: "value", innerHTML: parsed.imageData.format })), index.h("div", null, index.h("span", { class: "label" }, "width"), index.h("span", { class: "value", innerHTML: parsed.imageData.width })), index.h("div", null, index.h("span", { class: "label" }, "height"), index.h("span", { class: "value", innerHTML: parsed.imageData.height }))), ",", parsed.thumbnail
      ? index.h("div", { class: "thumbnail" }, index.h("span", { class: "label" }, "thumbnail"), index.h("a", { class: "value", href: parsed.thumbnail, innerHTML: parsed.thumbnail }))
      : null, parsed.service
      ? index.h("div", { class: "service" }, index.h("span", { class: "label" }, "service"), index.h("a", { class: "value", href: parsed.service, innerHTML: parsed.service }))
      : null));
  }
  render() {
    return this._images
      ? this.condensed ? this.render_condensed() : this.render_full()
      : null;
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "src": ["srcChanged"],
    "images": ["imagesChanged"]
  }; }
};
ManifestViewer.style = veManifestCss;

exports.ve_manifest = ManifestViewer;
