import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import OpenSeadragon from 'openseadragon';
import OpenSeadragonViewerInputHook from '@openseadragon-imaging/openseadragon-viewerinputhook';
import { sha256 } from '../../utils';
import jwt_decode from 'jwt-decode';
import './openseadragon-curtain-sync';
import debounce from 'lodash.debounce';
import { loadManifests, imageDataUrl, parseImageOptions, parseRegionString, imageInfo, isNum } from '../../utils';
import { Annotator } from './annotator';
import { parseInt } from 'lodash';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/image-comparer/image-comparer.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/dist/collection');
export class ImageViewer {
  constructor() {
    this.user = null;
    this.authToken = null;
    this.shoelace = false;
    this._entities = [];
    this._showAnnotations = false;
    this._showMenu = false;
    this._infoPanelIsOpen = false;
    this._annotatorWindow = null;
    this._zoomedIn = {};
    this._tileSources = [];
    this._images = [];
    this._selectedIdx = 0;
    this._current = null;
    this._annotations = [];
  }
  srcChanged() {
    this.buildImagesList();
  }
  compareModeChanged() {
    this._compareViewerInit();
  }
  authTokenChanged() {
    // console.log(`authTokenChanged: isDefined=${this.authToken !== null}`)
    if (this._annotator)
      this._annotator.setAuthToken(this.authToken);
    this.showAnnotationsToolbar(this.canAnnotate());
    this.showAnnotations(this.canAnnotate());
    this.setAnnoTarget();
  }
  annoBaseChanged() {
    // console.log(`annoBaseChanged: annoBase=${this.annoBase}`)
    this.setAnnoTarget();
  }
  _annoTargetChanged() {
    // console.log(`_annoTargetChanged: _annoTarget=${this._annoTarget}`)
    if (this._annotator)
      this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos);
  }
  userChanged() {
    // console.log(`userChanged: user=${this.user}`)
    this.showAnnotations(this.user !== null && this.authToken !== null);
    this.setAnnoTarget();
    if (this._annotator)
      this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos);
  }
  async _imagesChanged() {
    this._selectedIdx = 0;
    this._current = this._images.length > 0 ? this._images[0] : null;
    if (this._current) {
      this._setHostDimensions(imageInfo(this._current.manifest));
      if (this._viewer) {
        if (!this.compare)
          this._viewer.open(await this._loadTileSources());
      }
      else {
        this.compare ? this._compareViewerInit() : this._osdInit();
      }
    }
  }
  _selectedIdxChanged(idx) {
    this._current = this._images.length > idx ? this._images[idx] : null;
  }
  _currentChanged() {
    this.alt = this._value(this._current.manifest.label).toString();
    this.setAnnoTarget();
    if (this._annotator)
      this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos);
  }
  _annotationsChanged() {
    // console.log(`annotations=${this._annotations.length}`)
  }
  serializedManifests() {
    return encodeURIComponent(JSON.stringify(this.compare ? this._images : [this._images[this._selectedIdx]]));
  }
  annoTarget(manifest) {
    // let locationPath = location.pathname.split('/').filter(pe => pe).join('/')
    let locationPath = this.editorIsParent()
      ? location.hash.length > 1 ? location.hash.slice(1).split('/').filter(pe => pe).join('/') : ''
      : location.pathname.split('/').filter(pe => pe).join('/');
    let sourceHash = sha256(imageInfo(manifest).id).slice(0, 8);
    // console.log(`annoTarget: annoBase=${this.annoBase} sourceHash=${sourceHash} locationPath=${locationPath} user=${this.user} authToken=${this.authToken}`)
    return this.annoBase
      ? `${this.annoBase}/${sourceHash}`
      : this.authToken
        ? this.editorIsParent()
          ? [...[locationPath.split('/')[0]], ...[sourceHash]].join('/')
          : [...[sha256(jwt_decode(this.authToken).email.toLowerCase()).slice(0, 8)], ...[sourceHash]].join('/')
        : this.user
          ? locationPath ? `${this.user}/${locationPath}/${sourceHash}` : `${this.user}/${sourceHash}`
          : locationPath ? `${locationPath}/${sourceHash}` : sourceHash;
  }
  setAnnoTarget() {
    if (this._current)
      this._annoTarget = this.annoTarget(this._current.manifest);
  }
  zoomIn() {
    let zoomTo = this._viewer.viewport.getZoom() * 1.5;
    this._viewer.viewport.zoomTo(zoomTo);
  }
  zoomOut() {
    let zoomTo = this._viewer.viewport.getZoom() / 1.5;
    this._viewer.viewport.zoomTo(zoomTo);
  }
  showInfo() {
    this._showInfoPopup();
  }
  toggleShowAnnotations() {
    this._showAnnotations = !this._showAnnotations;
    this.showAnnotations(this._showAnnotations);
  }
  setRegion(region, immediately = false) {
    this._viewer.viewport.fitBounds(parseRegionString(region, this._viewer), immediately);
  }
  parseImageStr(str) {
    let params = str.split(/\s/);
    let parsed = { manifest: params[0] };
    params.slice(1).forEach(param => {
      if (isNum(param))
        parsed.seq = parseInt(param);
      else if (param.indexOf(',') > 0)
        parsed.options = parseImageOptions(param);
      else if (param === 'cover' || param === 'contain')
        parsed.fit = param;
    });
    if (!parsed.options)
      parsed.options = parseImageOptions('');
    return parsed;
  }
  async zoomto(arg) {
    const found = arg === null || arg === void 0 ? void 0 : arg.match(/^(\d+:|\d+$)?(pct:)?(\d+,\d+,\d+,\d+|[a-f0-9]{8})$/);
    if (!found)
      return;
    let imgIdx = found[1] ? parseInt(found[1].replace(/:$/, '')) - 1 : 0;
    let region;
    let annoRegex = new RegExp('[0-9a-f]{8}');
    if (annoRegex.test(found[3])) {
      // let endpoint = location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://api.visual-essays.net'
      let endpoint = 'https://api.visual-essays.net';
      let annoId = `${endpoint}/annotation/${this.annoTarget(this._images[imgIdx].manifest)}/${found[3]}/`;
      let resp = await fetch(annoId);
      if (resp.ok) {
        let anno = await resp.json();
        if (anno) {
          if (anno)
            region = anno.target.selector.value.split('=')[1];
        }
      }
      // let anno = this._annotations.find(item => item.id.split('/').pop() === found[2])
      // if (anno) region = anno.target.selector.value.split('=')[1]
    }
    else {
      region = found[2] ? `${found[2]}${found[3]}` : found[3];
    }
    // console.log(`zoomto: imgIdx=${imgIdx} region=${region}`)
    if (imgIdx)
      this._viewer.goToPage(imgIdx);
    if (region)
      setTimeout(() => { this.setRegion(region, false); }, 100);
  }
  buildImagesList() {
    let images = [];
    if (this.src) {
      let img = { manifest: this.src, options: parseImageOptions(this.options) };
      if (this.fit)
        img.fit = this.fit;
      images.push(img);
    }
    Array.from(this.el.querySelectorAll('li, span'))
      .forEach(li => images.push(this.parseImageStr(li.innerHTML)));
    // If no manifest defined in src attribute or images list, use most recent entity QID, if available 
    if (images.length === 0 && this._entities.length > 0)
      images.push({ manifest: `wd:${this._entities[0]}`, options: parseImageOptions('') });
    loadManifests(images.map(item => item.manifest))
      .then(manifests => {
      manifests.forEach((manifest, idx) => {
        images[idx].manifest = manifest;
        images[idx].manifestId = (images[idx].manifest.id || images[idx].manifest['@id']).split('/').slice(-2)[0];
      });
      this._images = images;
    });
  }
  listenForSlotChanges() {
    let slot = document.querySelector('ve-image > ul, ve-image > span');
    if (slot) {
      const callback = (mutationsList) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            // console.log(`slot change: mutation.type=${mutation.type}`)
            this.buildImagesList();
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(slot, { childList: true, subtree: true, characterData: true });
    }
  }
  connectedCallback() {
    // console.log(`connectedCallback: annoBase=${this.annoBase}`)
    this._entities = this.entities ? this.entities.split(/\s+/).filter(qid => qid) : [];
  }
  async componentWillLoad() {
    this.buildImagesList();
  }
  findVeImage(el) {
    let sib = el.previousSibling;
    while (sib) {
      if (sib.nodeName === 'VE-IMAGE')
        return sib === this.el ? sib : null;
      sib = sib.previousSibling;
    }
    while (el.parentElement && el.tagName !== 'MAIN') {
      el = el.parentElement;
      let veImage = el.querySelector(':scope > ve-image');
      if (veImage)
        return veImage === this.el ? veImage : null;
    }
  }
  addMutationObserver(el) {
    // console.log('addMutationObserver', el.attributes.getNamedItem('active').value)
    let prevClassState = el.classList.contains('active');
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        var _a, _b;
        if (mutation.attributeName == 'class') {
          let currentClassState = mutation.target.classList.contains('active');
          if (prevClassState !== currentClassState) {
            prevClassState = currentClassState;
            if (currentClassState)
              this.zoomto((_a = el.attributes.getNamedItem('enter')) === null || _a === void 0 ? void 0 : _a.value);
            else
              this.zoomto((_b = el.attributes.getNamedItem('exit')) === null || _b === void 0 ? void 0 : _b.value);
          }
        }
      });
    });
    observer.observe(el, { attributes: true });
  }
  componentDidLoad() {
    if (this.sticky) {
      this.el.classList.add('sticky');
    }
    if (this._images.length > 0)
      this._setHostDimensions();
    this.listenForSlotChanges();
    Array.from(document.querySelectorAll('[enter],[exit]')).forEach((el) => {
      let veImage = this.findVeImage(el);
      if (veImage)
        this.addMutationObserver(el);
    });
    Array.from(document.querySelectorAll('mark')).forEach(mark => {
      for (let idx = 0; idx < mark.attributes.length; idx++) {
        let attr = mark.attributes.item(idx);
        if (/^(\d+:|\d+$)?(pct:)?(\d+,\d+,\d+,\d+|[a-f0-9]{8})$/.test(attr.value)) {
          let veImage = this.findVeImage(mark.parentElement);
          if (veImage) {
            this._zoomedIn[attr.value] = false;
            mark.addEventListener('click', () => setTimeout(() => {
              this._zoomedIn[attr.value] = !this._zoomedIn[attr.value];
              if (this._zoomedIn[attr.value])
                this.zoomto(attr.value);
              else
                this.goHome(false);
            }, 200));
          }
          break;
        }
      }
    });
  }
  _setHostDimensions(imageData = null) {
    console.dir(this.el);
    let wrapper = this.el.shadowRoot.getElementById('wrapper');
    let captionEl = this.el.shadowRoot.getElementById('caption');
    let captionHeight = captionEl ? captionEl.clientHeight : 32;
    let osd = this.el.shadowRoot.getElementById('osd');
    let elWidth = this.el.clientWidth || this.el.parentElement.clientWidth;
    // let elWidth = this.el.clientWidth
    // let elHeight = this.el.clientHeight || this.el.parentElement.clientHeight
    let elHeight = this.el.clientHeight;
    let parentOffset = this.el.offsetTop - this.el.parentElement.offsetTop;
    let requestedWidth = this.width
      ? this.width.indexOf('px') > 0
        ? parseInt(this.width.slice(0, -2))
        : Math.round(elWidth * (parseFloat(this.width.slice(0, -1)) / 100))
      : null;
    let requestedHeight = this.height
      ? this.height.indexOf('px') > 0
        ? parseInt(this.height.slice(0, -2))
        : Math.round((elHeight - parentOffset) * parseFloat(this.height.slice(0, -1)) / 100)
      : null;
    let imageWidth = imageData ? imageData.width : null;
    let imageHeight = imageData ? imageData.height : null;
    console.log(`ve-image.setHostDimensions: elWidth=${elWidth} elHeight=${elHeight} parentOffset=${parentOffset} requestedWidth=${requestedWidth} requestedHeight=${requestedHeight} imageWidth=${imageWidth} imageHeight=${imageHeight}`);
    let width, height;
    if (requestedWidth) {
      width = requestedWidth;
      height = requestedHeight
        ? requestedHeight
        : imageData
          ? Math.round(imageHeight / imageWidth * requestedWidth) + captionHeight // height scaled to width
          : requestedWidth;
    }
    else if (requestedHeight) {
      height = requestedHeight;
      width = Math.min(elWidth, imageData
        ? Math.round(imageWidth / imageHeight * (requestedHeight - captionHeight)) // width scaled to height
        : requestedWidth);
    }
    else {
      if (elHeight) {
        height = elHeight;
        width = Math.min(elWidth, imageData
          ? Math.round(imageWidth / imageHeight * (requestedHeight - captionHeight)) // width scaled to height
          : requestedWidth);
      }
      else {
        width = elWidth;
        height = Math.round(imageHeight / imageWidth * elWidth + captionHeight); // height scaled to width
      }
    }
    console.log(`ve-image.setHostDimensions: width=${width} height=${height} caption=${captionHeight}`);
    // osd.style.width = `${width}px`
    wrapper.style.width = this.compare ? '100%' : `${width}px`;
    wrapper.style.height = this.compare ? '100%' : `${height}px`;
    osd.style.width = '100%';
    osd.style.height = `${height - captionHeight}px`;
    //this.el.style.width = `${width}px`
    //this.el.style.height = `${height}px`
    if (this.align) {
      if (this.align === 'center')
        this.el.style.margin = 'auto';
      else
        this.el.style.float = this.align;
    }
  }
  async _tileSource(imgUrl, options) {
    if (imgUrl.indexOf('/info.json') > 0) {
      if (this.compare) {
        let url = `${imgUrl.slice(0, -10)}/${options.region}/${options.size}/${options.rotation}/${options.quality}.${options.format}`;
        return { url, type: 'image', buildPyramid: true };
      }
      else {
        console.log(imgUrl);
        return imgUrl;
      }
    }
    else {
      const el = this.el.shadowRoot.querySelector('#osd');
      if (options.region === 'full' || !this.compare) {
        return { url: imgUrl, type: 'image', buildPyramid: true };
      }
      else {
        let [x, y, width, height] = options.region.replace(/pct:/, '').split(',').map(s => s !== '' ? parseFloat(s) : undefined);
        const region = { x, y, w: width, h: height };
        const dest = { width: el.clientWidth, height: el.clientHeight };
        let url = await imageDataUrl(imgUrl, region, dest);
        return { url, type: 'image', buildPyramid: true };
      }
    }
  }
  async _loadTileSources() {
    let imgUrls = this._images.map(item => {
      let _imageInfo = imageInfo(item.manifest, item.seq);
      return _imageInfo.service
        ? `${(_imageInfo.service[0].id || _imageInfo.service[0]['@id']).replace(/\/info\.json$/, '')}/info.json`
        : _imageInfo.id;
    });
    return await Promise.all(imgUrls.map((imgUrl, idx) => this._tileSource(imgUrl, this._images[idx].options)));
  }
  _copyTextToClipboard(text) {
    if (navigator.clipboard)
      navigator.clipboard.writeText(text);
  }
  _getViewportBounds() {
    const viewportBounds = this._viewer.viewport.getBounds();
    const tiledImage = this._viewer.world.getItemAt(0);
    if (tiledImage) {
      const imageBounds = tiledImage.viewportToImageRectangle(viewportBounds);
      return `${Math.ceil(imageBounds.x)},${Math.ceil(imageBounds.y)},${Math.ceil(imageBounds.width)},${Math.ceil(imageBounds.height)}`;
    }
  }
  _value(langObj, language = 'en') {
    return typeof langObj === 'object'
      ? langObj[language] || langObj.none || langObj[Object.keys(langObj).sort()[0]]
      : langObj;
  }
  annotatorIsParent() {
    return location.hostname.indexOf('annotator') >= 0 || location.port === '4444';
  }
  editorIsParent() {
    return location.hostname.indexOf('editor') >= 0 || location.port === '5555';
  }
  canAnnotate() {
    return this.annotatorIsParent() && this.authToken !== null;
  }
  isTouchEnabled() {
    return ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      ((navigator.msMaxTouchPoints || 0) > 0);
  }
  _showInfoPopup() {
    let popup = this.el.shadowRoot.querySelector('#image-info-popup');
    popup.innerHTML = `<ve-manifest images="${this.serializedManifests()}" condensed></ve-manifest>`;
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  }
  configureScrollBehavior() {
    /* This is intended to provide touch-based scrolling of OSD images in mobile mode.  Pan/zoom is
    disabled to permit scrolling.  The technique for doing this is as described in this
    OSD Github issue - https://github.com/openseadragon/openseadragon/issues/1791#issuecomment-1000045888
    Unfortunately, this only works with OSD v2.4.2, which is not compatible with the latest version of the
    Annotorious plugin (requires 3.0).  As a result, the current configuration is pinned
    to OSD 2.4.2 and annotorious 2.6.0
    */
    let instructions = this.el.shadowRoot.getElementById('instructions');
    const canvas = this.el.shadowRoot.querySelector('.openseadragon-canvas');
    canvas.style.touchAction = 'pan-y';
    new OpenSeadragonViewerInputHook({ viewer: this._viewer, hooks: [
        { tracker: 'viewer', handler: 'scrollHandler', hookHandler: (event) => {
            if (!this._viewer.isFullPage() && !event.originalEvent.ctrlKey) {
              event.preventDefaultAction = true;
              event.stopHandlers = true;
              // display meta key warning
              if (instructions.className == 'hidden') {
                instructions.className = 'visible';
                setTimeout(() => instructions.className = 'hidden', 1000);
              }
            }
            else {
              if (instructions.className == 'visible')
                instructions.className = 'hidden';
            }
            return true;
          } }
      ] });
    new OpenSeadragonViewerInputHook({ viewer: this._viewer, hooks: [
        { tracker: 'viewer', handler: 'dragHandler', hookHandler: (event) => {
            // if mobile disable drag event 
            // pinch event handles panning with 2 fingers
            if (!this._viewer.isFullPage() && this.isTouchEnabled()) {
              event.preventDefaultAction = true;
              event.stopHandlers = true;
              if (instructions.className == 'hidden') {
                instructions.className = 'visible';
                setTimeout(() => instructions.className = 'hidden', 1000);
              }
            }
            else {
              if (instructions.className == 'visible')
                instructions.className = 'hidden';
            }
            return true;
          } }
      ] });
    new OpenSeadragonViewerInputHook({ viewer: this._viewer, hooks: [
        { tracker: 'viewer', handler: 'dragEndHandler', hookHandler: (event) => {
            event.preventDefaultAction = true;
            event.stopHandlers = true;
          } }
      ] });
  }
  async _compareViewerInit() {
    this._tileSources = await this._loadTileSources();
    // let tileSources = await this._loadTileSources()
    if (!this.shoelace) {
      let osdWrapper = this.el.shadowRoot.querySelector('.osd-wrapper');
      let height = osdWrapper.clientHeight;
      let container = this.el.shadowRoot.getElementById('osd');
      if (container) {
        osdWrapper.removeChild(container);
      }
      container = document.createElement('div');
      container.id = 'osd';
      container.style.height = `${height}px`;
      osdWrapper.appendChild(container);
      this._viewer = new window.CurtainSyncViewer({
        mode: this.compare,
        container,
        images: this._tileSources.map((tileSource, idx) => ({ key: `item-${idx}`, tileSource, shown: true })),
        osdOptions: {
          autoHideControls: false,
          showHomeControl: true,
          showZoomControl: true,
          homeFillsViewer: true,
          prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
          zoomPerClick: 2,
          visibilityRatio: 1,
          wrapHorizontal: false,
          constrainDuringPan: true,
          minZoomImageRatio: 1.35,
          // maxZoomPixelRatio: Infinity,
          maxZoomPixelRatio: 3,
          viewportMargins: { left: 0, top: 0, bottom: 0, right: 0 }
        }
      });
    }
  }
  async _osdInit() {
    let tileSources = await this._loadTileSources();
    // console.log(tileSources)
    let osdElem = this.el.shadowRoot.querySelector('#osd');
    const osdOptions = {
      element: osdElem,
      tileSources,
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      showNavigationControl: true,
      minZoomImageRatio: 0.2,
      maxZoomPixelRatio: 5,
      // homeFillsViewer: this.fit === 'cover',
      //animationTime: 100,
      showHomeControl: true,
      showZoomControl: true,
      showFullPageControl: true,
      showNavigator: false,
      sequenceMode: true,
      showReferenceStrip: true,
      //visibilityRatio: 1.0,
      //animationTime: 2,
      springStiffness: 2,
      //constrainDuringPan: true
    };
    // console.log(`homeFillsViewer=${osdConfig.homeFillsViewer}`)
    // this._viewer = OpenSeadragon(osdOptions);
    this._viewer = OpenSeadragon(osdOptions);
    if (location.hostname.indexOf('iiif') < 0)
      this.configureScrollBehavior();
    this._annotator = new Annotator(this._viewer, this.el.shadowRoot.querySelector('#toolbar'), this.authToken);
    if (this._annoTarget)
      this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos);
    this.showAnnotationsToolbar(this.canAnnotate());
    this.showAnnotations(this.canAnnotate());
    this._viewer.addHandler('home', (e) => this.positionImage(e.immediately));
    this._viewer.addHandler('page', (e) => this._selectedIdx = e.page);
    // Reposition image in viewport after transition back from full screen mode
    this._viewer.addHandler('resize', () => setTimeout(() => this._viewer.viewport.goHome(true), 10));
    this._viewer.world.addHandler('add-item', () => this.positionImage(true));
    this._viewer.addHandler('viewport-change', debounce(() => {
      this._viewportBounds = this._getViewportBounds();
    }, 100));
    this._viewer.addHandler('open-failed', (e) => {
      // If info.json tile source failed, try loading source image as pyramid
      if (e.message === 'Unable to load TileSource' && e.source.indexOf('/info.json') > 0) {
        let imageData = imageInfo(this._current.manifest, this._current.seq);
        console.log(`Error: Unable to load IIIF TileSource, retrying with source image - ${decodeURIComponent(imageData.id)}`);
        this._viewer.open({ url: imageData.id, type: 'image', buildPyramid: true });
      }
    });
  }
  positionImage(immediately = false) {
    // console.log(`positionImage immediately=${immediately}`, this._current)
    setTimeout(() => {
      if (this._current.options.region !== 'full') {
        this.setRegion(this._current.options.region, immediately);
      }
      else {
        let imageData = imageInfo(this._current.manifest);
        let osdElem = this.el.shadowRoot.getElementById('osd');
        const scaleX = osdElem.clientHeight / imageData.height;
        const scaleY = osdElem.clientWidth / imageData.width;
        const fit = this._current.fit === 'cover'
          ? scaleY / scaleX > 1 ? 'horizontal' : 'vertical'
          : scaleY / scaleX > 1 ? 'vertical' : 'horizontal';
        if (fit === 'horizontal') {
          this._viewer.viewport.fitHorizontally(immediately);
        }
        else {
          this._viewer.viewport.fitVertically(immediately);
        }
      }
    }, 1);
  }
  goHome(immediately = false) {
    // if (this._viewer) this.positionImage(immediately)
    if (this._viewer)
      this._viewer.viewport.goHome(immediately);
  }
  showAnnotationsToolbar(show) {
    Array.from(this.el.shadowRoot.querySelectorAll('.a9s-toolbar')).forEach((elem) => {
      elem.style.display = show ? 'unset' : 'none';
    });
  }
  showAnnotations(show) {
    this._showAnnotations = show;
    Array.from(this.el.shadowRoot.querySelectorAll('.a9s-annotationlayer')).forEach((elem) => elem.style.display = show ? 'unset' : 'none');
  }
  toggleMenu() {
    let drawer = this.el.shadowRoot.querySelector('.drawer-contained');
    if (drawer) {
      this._infoPanelIsOpen = !this._infoPanelIsOpen;
      drawer.open = this._infoPanelIsOpen;
    }
  }
  toggleAnnotations() {
    this.showAnnotations(!this._showAnnotations);
  }
  openAnnotator() {
    let width, height;
    let imgInfo = imageInfo(this._current.manifest);
    let ratio = imgInfo.width / imgInfo.height;
    let depictsPanelWidth = 300;
    if (ratio < 0) {
      width = 800;
      height = width * ratio;
    }
    else {
      height = 800;
      width = height * ratio;
    }
    // let url = location.hostname === 'localhost'? 'http://localhost:4444/' : 'https://annotator.visual-essays.net/'
    let url = 'https://annotator.visual-essays.net/';
    url += `?manifest=${this._current.manifest.id || this._current.manifest['@id']}`;
    if (this.annoBase)
      url += `&anno-base=${this.annoBase}`;
    url += `&auth-token=${this.authToken}`;
    this.openWindow(url, `toolbar=yes,location=yes,left=0,top=0,width=${width + depictsPanelWidth},height=${height + 200},scrollbars=yes,status=yes`);
  }
  openWindow(url, options) {
    if (this._annotatorWindow) {
      this._annotatorWindow.close();
    }
    if (options === undefined)
      options = 'toolbar=yes,location=yes,left=0,top=0,width=1000,height=1200,scrollbars=yes,status=yes';
    this._annotatorWindow = window.open(url, '_blank', options);
  }
  render() {
    return this._images.length > 0
      ? [h("div", { id: "toolbar" }), h("div", { id: "wrapper" },
          h("div", { class: "osd-wrapper" },
            this.compare && this.shoelace
              ? h("sl-image-comparer", { position: "0" }, this._tileSources.map((ts, idx) => h("img", { slot: idx === 0 ? 'before' : 'after', src: ts.url, alt: this._value(this._images[idx].manifest.label).toString() })))
              : h("div", { id: "osd" }),
            h("div", { id: "instructions", class: "hidden" }, "use ctrl + scroll or 2 fingers to zoom image."),
            h("sl-drawer", { label: "", contained: true, class: "drawer-contained", placement: "start", style: { '--size': '40%' } },
              h("ve-manifest", { images: this.serializedManifests(), condensed: true }),
              h("div", { class: "annotations-heading" },
                this.editorIsParent() || this._annotations.length > 0
                  ? h("span", null, "Annotations")
                  : null,
                this.editorIsParent()
                  ? h("sl-tooltip", { content: "Annotate image" },
                    h("div", { class: "annotator-link", onClick: this.openAnnotator.bind(this) },
                      h("sl-icon", { name: "pencil-square" })))
                  : null),
              this._annotations.length > 0
                ? h("div", null, this._annotations.map((anno) => h("div", { class: "anno" },
                  h("sl-tooltip", { content: "Copy annotation ID" },
                    h("sl-icon-button", { class: "anno-copy", onClick: this._copyTextToClipboard.bind(this, anno.id.split('/').pop()), name: "clipboard", label: "Copy annotation ID" })),
                  h("span", { class: "anno-link", onClick: this.setRegion.bind(this, anno.target.selector.value.split('=').pop(), false) }, anno.body[0].value))))
                : null)),
          !this.compare && h("span", { id: "coords", class: "viewport-coords", onClick: this._copyTextToClipboard.bind(this, this._viewportBounds) }, this._viewportBounds),
          h("div", { id: "caption" },
            h("sl-tooltip", { content: `${this._infoPanelIsOpen ? 'Close' : 'Open'} image info panel`, disabled: this.isTouchEnabled() },
              h("sl-icon-button", { onClick: this.toggleMenu.bind(this), id: "menu-icon", name: "three-dots-vertical", label: "Open image info panel" })),
            !this.compare && this._annotations.length > 0
              ? h("sl-tooltip", { content: `${this._showAnnotations ? 'Hide' : 'Show'} annotations`, disabled: this.isTouchEnabled() },
                h("div", { class: "button-icon-with-badge", onClick: this.toggleAnnotations.bind(this) },
                  h("sl-icon-button", { id: "annotations-icon", name: "chat-square-text", label: "Show annotations" }),
                  h("sl-badge", { variant: "danger", pill: true }, this._annotations.length)))
              : null,
            h("div", null, this.compare
              ? 'Compare viewer: move cursor over image to change view'
              : this.alt)),
          h("div", { id: "image-info-popup" }))]
      : [
        h("div", { id: "toolbar" }),
        h("div", { id: "wrapper" },
          h("div", { class: "osd-wrapper" },
            h("div", { id: "osd" }),
            h("div", { id: "instructions", class: "hidden" }, "use ctrl + scroll or 2 fingers to zoom image.")))
      ];
  }
  static get is() { return "ve-image"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ve-image.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ve-image.css"]
  }; }
  static get properties() { return {
    "src": {
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
      "attribute": "src",
      "reflect": false
    },
    "seq": {
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
      "attribute": "seq",
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
    "fit": {
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
      "attribute": "fit",
      "reflect": false
    },
    "alt": {
      "type": "string",
      "mutable": true,
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
      "attribute": "alt",
      "reflect": true
    },
    "entities": {
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
      "attribute": "entities",
      "reflect": false
    },
    "user": {
      "type": "string",
      "mutable": true,
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
      "attribute": "user",
      "reflect": true,
      "defaultValue": "null"
    },
    "path": {
      "type": "string",
      "mutable": true,
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
      "attribute": "path",
      "reflect": true
    },
    "compare": {
      "type": "string",
      "mutable": true,
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
      "attribute": "compare",
      "reflect": true
    },
    "width": {
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
      "attribute": "width",
      "reflect": false
    },
    "height": {
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
      "attribute": "height",
      "reflect": false
    },
    "align": {
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
      "attribute": "align",
      "reflect": false
    },
    "authToken": {
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
      "attribute": "auth-token",
      "reflect": false,
      "defaultValue": "null"
    },
    "annoBase": {
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
      "attribute": "anno-base",
      "reflect": false
    },
    "shoelace": {
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
      "attribute": "shoelace",
      "reflect": false,
      "defaultValue": "false"
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
    }
  }; }
  static get states() { return {
    "_viewer": {},
    "_viewportBounds": {},
    "_entities": {},
    "_annotator": {},
    "_showAnnotations": {},
    "_showMenu": {},
    "_annoTarget": {},
    "_infoPanelIsOpen": {},
    "_annotatorWindow": {},
    "_zoomedIn": {},
    "_tileSources": {},
    "_images": {},
    "_selectedIdx": {},
    "_current": {},
    "_annotations": {}
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "src",
      "methodName": "srcChanged"
    }, {
      "propName": "compare",
      "methodName": "compareModeChanged"
    }, {
      "propName": "authToken",
      "methodName": "authTokenChanged"
    }, {
      "propName": "annoBase",
      "methodName": "annoBaseChanged"
    }, {
      "propName": "_annoTarget",
      "methodName": "_annoTargetChanged"
    }, {
      "propName": "user",
      "methodName": "userChanged"
    }, {
      "propName": "_images",
      "methodName": "_imagesChanged"
    }, {
      "propName": "_selectedIdx",
      "methodName": "_selectedIdxChanged"
    }, {
      "propName": "_current",
      "methodName": "_currentChanged"
    }, {
      "propName": "_annotations",
      "methodName": "_annotationsChanged"
    }]; }
}
