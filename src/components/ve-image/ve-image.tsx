import { Component, Element, Listen, Prop, State, Watch, h } from '@stencil/core';

import OpenSeadragon from 'openseadragon'
import { sha256 } from 'js-sha256'
import jwt_decode from 'jwt-decode'

import './openseadragon-curtain-sync'

import debounce from 'lodash.debounce'
import { loadManifests, imageDataUrl, parseImageOptions, parseRegionString, imageInfo, isNum } from '../../utils'
import { Annotator } from './annotator'
import { parseInt } from 'lodash';

@Component({
  tag: 've-image',
  styleUrl: 've-image.css',
  // assetsDirs: ['../../assets'],
  shadow: true,
})
export class ImageViewer {
  @Prop() src: string
  @Watch('src')
  srcChanged() {
    this.buildImagesList()
  }

  @Prop() seq: number
  @Prop() options: string
  @Prop() fit: string
  @Prop({ mutable: true, reflect: true }) alt: string
  @Prop() entities: string
  @Prop({ mutable: true, reflect: true }) user: string = null
  @Prop({ mutable: true, reflect: true }) path: string
  @Prop() compare: string
  @Prop() width: string
  @Prop() height: string
  @Prop() align: string // 'left', 'center', 'right'
  @Prop() authToken: string = null
  @Prop() annoBase: string

  @Element() el: HTMLElement;

  @State() _viewer: OpenSeadragon.Viewer
  @State() _viewportBounds: string
  @State() _entities: string[] = []
  @State() _annotator: any
  @State() _showAnnotations: boolean = false
  @State() _showMenu: boolean = false
  @State() _annoTarget: string
  @State() _infoPanelIsOpen = false
  @State() _annotatorWindow: any = null

  @Watch('authToken')
  authTokenChanged() {
    // console.log(`authTokenChanged: isDefined=${this.authToken !== null}`)
    if (this._annotator) this._annotator.setAuthToken(this.authToken)
    console.log(location.hostname)
    this.showAnnotationsToolbar(this.canAnnotate())
    this.showAnnotations(this.canAnnotate())
    this.setAnnoTarget()
  }

  @Watch('annoBase')
  annoBaseChanged() {
    // console.log(`annoBaseChanged: annoBase=${this.annoBase}`)
    this.setAnnoTarget()
  }

  @Watch('_annoTarget')
  _annoTargetChanged() {
    console.log(`_annoTargetChanged: _annoTarget=${this._annoTarget}`)
    if (this._annotator) this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos)
  }

  @Watch('user')
  userChanged() {
    // console.log(`userChanged: user=${this.user}`)
    this.showAnnotations(this.user !== null && this.authToken !== null)
    this.setAnnoTarget()
    if (this._annotator) this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos)
  }

  @State() _images: any[] = []
  @Watch('_images')
  async _imagesChanged() {
    this._selectedIdx = 0
    this._current = this._images.length > 0 ? this._images[0] : null
    if (this._current) {
      this._setHostDimensions(imageInfo(this._current.manifest))
      if (this._viewer) {
        if (!this.compare) this._viewer.open(await this._loadTileSources())
      } else {
        this.compare ? this._compareViewerInit() : this._osdInit()
      }
    }
  }

  @State() _selectedIdx: number = 0
  @Watch('_selectedIdx')
  _selectedIdxChanged(idx: number) {
    this._current = this._images.length > idx ? this._images[idx] : null
  }

  @State() _current: any = null
  @Watch('_current')
  _currentChanged() {
    this.alt = this._value(this._current.manifest.label).toString()
    this.setAnnoTarget()
    if (this._annotator) this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos)
  }

  @State() _annotations: any[] = []
  @Watch('_annotations')
  _annotationsChanged() {
    // console.log(`annotations=${this._annotations.length}`)
  }

  @Listen('closeMenu')
  onCloseMenu() { this._showMenu = false }

  @Listen('iconClicked')
  onIconClicked(event: CustomEvent) { this[event.detail]() }

  @Listen('zoomToRegion')
  onZoomToRegion(event: CustomEvent) { this.setRegion(event.detail) }

  setAnnoTarget() {
    if (this._current) {
      let locationPath = location.pathname.split('/').filter(pe => pe).join('/')
      let sourceHash = sha256(imageInfo(this._current.manifest).id).slice(0,8)
      // console.log(`setAnnoTarget: annoBase=${this.annoBase} sourceHash=${sourceHash} locationPath=${locationPath} authToken=${this.authToken}`)
      this._annoTarget = this.annoBase
        ? `${this.annoBase}/${sourceHash}`
        : this.authToken
          ? [...[sha256((jwt_decode(this.authToken) as any).email).slice(0,7)], ...location.pathname.replace(/\/editor/, '').split('/').filter(elem => elem), ...[sourceHash]].join('/')
          : `${locationPath}/${sourceHash}`
    }
  }

  goHome() {
    this._viewer.viewport.goHome()
  }

  zoomIn() {
    let zoomTo = this._viewer.viewport.getZoom() * 1.5
    this._viewer.viewport.zoomTo(zoomTo)
  }

  zoomOut() {
    let zoomTo = this._viewer.viewport.getZoom() / 1.5
    this._viewer.viewport.zoomTo(zoomTo)
  }

  showInfo() {
    this._showInfoPopup()
  }

  toggleShowAnnotations() {
    this._showAnnotations = !this._showAnnotations
    this.showAnnotations(this._showAnnotations)
  }
  
  setRegion(region: string) {
    this._viewer.viewport.fitBounds(parseRegionString(region, this._viewer), false)
  }

  parseImageStr(str: string) {
    let params = str.split(/\s/)
    let parsed: any = {manifest: params[0]}
    params.slice(1).forEach(param => {
      if (isNum(param)) parsed.seq = parseInt(param)
      else if (param.indexOf(',') > 0) parsed.options = parseImageOptions(param)
      else if (param === 'cover' || param === 'contain') parsed.fit = param
    })
    if (!parsed.options) parsed.options = parseImageOptions('')
    return parsed
  }

  async zoomto(arg: string) {
    let region
    let annoRegex = new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')
    if (annoRegex.test(arg)) {
      let anno = await this._annotator.getAnnotation(arg)
      if (anno) region = anno.target.selector.value.split('=')[1]
    } else {
      region = arg
    }
    // console.log(`zoomto: arg=${arg} region=${region}`)
    if (region) this.setRegion(region)
  }

  buildImagesList() {
    let images: any[] = []
    if (this.src) images.push({manifest: this.src, options: parseImageOptions(this.options)})
    Array.from(this.el.querySelectorAll('li, span'))
      .forEach(li => images.push(this.parseImageStr(li.innerHTML)))

    // If no manifest defined in src attribute or images list, use most recent entity QID, if available 
    if (images.length === 0 && this._entities.length > 0)
      images.push({manifest: `wd:${this._entities[0]}`, options: parseImageOptions('')})
    loadManifests(images.map(item => item.manifest))
    .then(manifests => {
      manifests.forEach((manifest, idx) => {
        images[idx].manifest = manifest
        images[idx].manifestId = (images[idx].manifest.id || images[idx].manifest['@id']).split('/').slice(-2)[0]
      })
      this._images = images
    })
  }

  listenForSlotChanges() {
    let slot = document.querySelector('ve-image > ul, ve-image > span')
    if (slot) {
      const callback = (mutationsList) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            // console.log(`slot change: mutation.type=${mutation.type}`)
            this.buildImagesList()
          }
        }
      }
      const observer = new MutationObserver(callback);
      observer.observe(slot, { childList: true, subtree: true, characterData: true })
    }
  }

  connectedCallback() {
    // console.log(`connectedCallback: annoBase=${this.annoBase}`)
    this._entities = this.entities ? this.entities.split(/\s+/).filter(qid => qid) : []
  }

  async componentWillLoad() {
    this.buildImagesList()
  }
  
  findVeImage(el: HTMLSpanElement) {
    let sib = el.previousSibling
    while (sib) {
      if (sib.nodeName === 'VE-IMAGE') return sib === this.el ? sib : null
      sib = sib.previousSibling
    }
    while (el.parentElement && el.tagName !== 'MAIN') {
      el = el.parentElement
      let veImage = el.querySelector(':scope > ve-image')
      if (veImage) return veImage === this.el ? veImage : null
    }
  }

  componentDidLoad() {
    if (this._images.length > 0) this._setHostDimensions()
    this.listenForSlotChanges()

    Array.from(document.querySelectorAll('mark')).forEach(mark => {
      for (let idx=0; idx < mark.attributes.length; idx++) {
        let attr = mark.attributes.item(idx)
        if (/^\d+,\d+,\d+,\d+$/.test(attr.value)) {
          let veImage = this.findVeImage(mark.parentElement)
          if (veImage) {
            mark.addEventListener('click', () => setTimeout(() => this.zoomto(attr.value), 200))
          }
          break
        }
      }
    })

    Array.from(document.querySelectorAll('mark')).forEach(mark => {
      let value = mark.attributes.getNamedItem('click')?.value
      if (value) {
        let match = value.match(/^\s*([a-z0-9_\-]+)\s*\|\s*([a-z0-9_\-:]+)\s*\|\s*([a-z0-9\-\.,:]+)\s*/i)
        if (match) {
          let elemId = match[2].split(':')[0]
          if (this.el.id === elemId) {
            mark.addEventListener('click', (e) => {
              let value = (e.target as HTMLElement).attributes.getNamedItem('click').value
              let match = value.match(/^\s*([a-z0-9_\-]+)\s*\|\s*([a-z0-9_\-:]+)\s*\|\s*([a-z0-9\-\.,:]+)\s*/i)
              let method = match[1]
              let [elemId, seq] = match[2].split(':')
              let arg = match[3]
              console.log(`click: method=${method} id=${elemId} seq=${seq} arg=${arg}`)
              if (seq) this._viewer.goToPage(parseInt(seq)-1)
              if (method === 'zoomto') setTimeout(() => this.zoomto(arg), 200)
            })
          }
        }
      }
    })
  }

  _setHostDimensions(imageData: any = null) {
    let wrapper = this.el.shadowRoot.getElementById('wrapper')
    console.dir(wrapper)
    let captionEl = this.el.shadowRoot.getElementById('caption')
    let captionHeight = captionEl ? captionEl.clientHeight : 32
    let osd = this.el.shadowRoot.getElementById('osd')

    let elWidth = this.el.clientWidth || this.el.parentElement.clientWidth
    let elHeight = this.el.clientHeight || this.el.parentElement.clientHeight
    let requestedWidth = this.width
      ? this.width.indexOf('px') > 0
        ? parseInt(this.width.slice(0,-2))
        : Math.round(elWidth * (parseFloat(this.width.slice(0,-1))/100))
      : null
    let requestedHeight = this.height
      ? this.height.indexOf('px') > 0
        ? parseInt(this.height.slice(0,-2))
        : Math.round(elHeight * (parseFloat(this.height.slice(0,-1))/100))
      : null
    let imageWidth = imageData ? imageData.width : null
    let imageHeight = imageData ? imageData.height : null
    console.log(`ve-image.setHostDimensions: elWidth=${elWidth} elHeight=${elHeight} requestedWidth=${requestedWidth} requestedHeight=${requestedHeight} imageWidth=${imageWidth} imageHeight=${imageHeight}`)
    
    let width, height
    if (requestedWidth) {
      width = requestedWidth
      height = requestedHeight
        ? requestedHeight
        : imageData
          ? Math.round(imageHeight/imageWidth * requestedWidth) + captionHeight // height scaled to width
          : requestedWidth
    } else if (requestedHeight) {
      height = requestedHeight
      width = Math.min(
        elWidth,
        imageData
          ? Math.round(imageWidth/imageHeight * (requestedHeight - captionHeight)) // width scaled to height
          : requestedWidth
        )
    } else {
      width = elWidth
      height = Math.round(imageHeight/imageWidth * elWidth + captionHeight) // height scaled to width
    }

    console.log(`ve-image.setHostDimensions: width=${width} height=${height} caption=${captionHeight}`)
    // osd.style.width = `${width}px`
    wrapper.style.width = `${width}px`
    wrapper.style.height = `${height}px`
    osd.style.width = '100%'
    osd.style.height = `${height - captionHeight}px`
    //this.el.style.width = `${width}px`
    //this.el.style.height = `${height}px`
    if (this.align) {
      if (this.align === 'center') this.el.style.margin = 'auto'
      else this.el.style.float = this.align
    }
  }

  async _tileSource(imgUrl: any, options: any) {
    if (imgUrl.indexOf('/info.json') > 0) {
      if (this.compare) {
        let url = `${imgUrl.slice(0,-10)}/${options.region}/${options.size}/${options.rotation}/${options.quality}.${options.format}`
        return { url, type: 'image', buildPyramid: true }
      } else {
        return imgUrl
      }
    } else {
      const el = this.el.shadowRoot.querySelector('#osd')
      if (options.region === 'full' || !this.compare) {
        return { url:imgUrl, type: 'image', buildPyramid: true }
      } else {
        let [x, y, width, height] = options.region.replace(/pct:/,'').split(',').map(s => s !== '' ? parseFloat(s) : undefined)
        const region = {x, y, w: width, h: height}
        const dest = {width: el.clientWidth, height: el.clientHeight}
        let url = await imageDataUrl(imgUrl, region, dest)
        return { url, type: 'image', buildPyramid: true }
      }
    }
  }

  async _loadTileSources() {
    let imgUrls: any = this._images.map(item => {
      let _imageInfo = imageInfo(item.manifest, item.seq)
      return _imageInfo.service
        ? `${_imageInfo.service.id}/info.json`
        : _imageInfo.id
    })
    return await Promise.all(imgUrls.map((imgUrl, idx) => this._tileSource(imgUrl, this._images[idx].options )))
  }

  _copyTextToClipboard() {
    if (navigator.clipboard) navigator.clipboard.writeText(this._viewportBounds)
  }

  _getViewportBounds() {
    const viewportBounds = this._viewer.viewport.getBounds()
    const tiledImage = this._viewer.world.getItemAt(0)
    if (tiledImage) {
      const imageBounds = tiledImage.viewportToImageRectangle(viewportBounds)
      return `${Math.ceil(imageBounds.x)},${Math.ceil(imageBounds.y)},${Math.ceil(imageBounds.width)},${Math.ceil(imageBounds.height)}`
    }
  }

  _value(langObj: any, language='en') {
    return typeof langObj === 'object'
      ? langObj[language] || langObj.none || langObj[Object.keys(langObj).sort()[0]]
      : langObj
  }

  annotatorIsParent() {
    return location.hostname.indexOf('editor') >= 0 || location.port === '4444'
  }

  editorIsParent() {
    return location.hostname.indexOf('annotator') >= 0 || location.port === '5555'
  }

  canAnnotate() {
    return this.annotatorIsParent() && this.authToken !== null
  }

  _showInfoPopup() {
    let popup: HTMLElement = this.el.shadowRoot.querySelector('#image-info-popup')
    // let manifestUrl = this._images[this._selectedIdx].manifest.id || this._images[this._selectedIdx].manifest['@id']
    // popup.innerHTML = `<ve-manifest src=${manifestUrl} condensed></ve-manifest>`
    let images = encodeURIComponent(JSON.stringify(this._images))
    popup.innerHTML = `<ve-manifest images="${images}" condensed></ve-manifest>`
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block'
  }

  async _compareViewerInit() {
    let tileSources = await this._loadTileSources()
    let container: HTMLElement = this.el.shadowRoot.querySelector('#osd')
    this._viewer = new (window as any).CurtainSyncViewer({
      mode: this.compare, // 'sync' or 'curtain'
      container,
      images: tileSources.map((tileSource, idx) => ({ key: `item-${idx}`, tileSource, shown: true })),
      osdOptions: { // OpenSeaDragon options
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
        viewportMargins: {left:0, top:0, bottom:0, right:0}
      }
    })
  }

  async _osdInit() {
    let tileSources = await this._loadTileSources()
    // console.log(tileSources)
    let osdElem: HTMLElement = this.el.shadowRoot.querySelector('#osd')
    const osdOptions: OpenSeadragon.Options = {
      element: osdElem,
      tileSources,
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      showNavigationControl: true,
      minZoomImageRatio: 0.2,
      maxZoomPixelRatio: 5,
      homeFillsViewer: this.fit === 'cover',
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
    }

    // console.log(`homeFillsViewer=${osdConfig.homeFillsViewer}`)
    this._viewer = OpenSeadragon(osdOptions)
    
    this._annotator = new Annotator(this._viewer, this.el.shadowRoot.querySelector('#toolbar'), this.authToken)
    if (this._annoTarget) this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos)
    
    this.showAnnotationsToolbar(this.canAnnotate())
    this.showAnnotations(this.canAnnotate())

    this._viewer.addHandler('page', (e) => this._selectedIdx = e.page)
    // this._viewer.world.addHandler('add-item', (e) => {console.log('add-item', e)})

    this._viewer.world.addHandler('add-item', () => {
      if (this._current.options.region !== 'full') {
        setTimeout(() => this.setRegion(this._current.options.region), 100)
      }
      setTimeout(() => this._viewer.viewport.goHome(true), 10)
    })
    this._viewer.addHandler('viewport-change', debounce(() => {
      this._viewportBounds = this._getViewportBounds()
    }, 100))
    this._viewer.addHandler('open-failed', (e) => {
      // If info.json tile source failed, try loading source image as pyramid
      if (e.message === 'Unable to load TileSource' && e.source.indexOf('/info.json') > 0) {
        let imageData = imageInfo(this._current.manifest, this._current.seq)
        console.log(`Error: Unable to load IIIF TileSource, retrying with source image - ${decodeURIComponent(imageData.id)}`)
        this._viewer.open({ url: imageData.id, type: 'image', buildPyramid: true })
      }
    })

  }

  showAnnotationsToolbar(show: boolean) {
    // console.log(`showAnnotationsToolbar=${show}`)
    Array.from(this.el.shadowRoot.querySelectorAll('.a9s-toolbar')).forEach((elem:HTMLElement) => {
      elem.style.display = show ? 'unset' : 'none'
    })
  }

  showAnnotations(show: boolean) {
    this._showAnnotations = show
    Array.from(this.el.shadowRoot.querySelectorAll('.a9s-annotationlayer')).forEach((elem:HTMLElement) => elem.style.display = show ? 'unset' : 'none')
  }

  toggleMenu() {
    let drawer:any = this.el.shadowRoot.querySelector('.drawer-contained')
    if (drawer) {
      this._infoPanelIsOpen = !this._infoPanelIsOpen
      drawer.open = this._infoPanelIsOpen
    }
  }

  toggleAnnotations() {
    this.showAnnotations(!this._showAnnotations)
  }

  openAnnotator() {
    let width, height
    let imgInfo = imageInfo(this._current.manifest)
    let ratio = imgInfo.width / imgInfo.height
    if (ratio < 0) {
      width = 800
      height = width * ratio
    } else {
      height = 800
      width = height * ratio
    }
    let url = location.hostname === 'localhost'? 'http://localhost:4444/' : 'https://annotator.visual-essays.net/'
    url += `?manifest=${this._current.manifest.id || this._current.manifest['@id']}`
    if (this.annoBase) url += `&anno-base=${this.annoBase}`
    url += `&auth-token=${this.authToken}`
    this.openWindow(url, `toolbar=yes,location=yes,left=0,top=0,width=${width},height=${height+200},scrollbars=yes,status=yes`)
  }

  openWindow(url, options) {
    if (this._annotatorWindow) { this._annotatorWindow.close() }
    if (options === undefined) options = 'toolbar=yes,location=yes,left=0,top=0,width=1000,height=1200,scrollbars=yes,status=yes'
    this._annotatorWindow = window.open(url, '_blank', options)
  }

  render() {
    return this._images.length > 0
    ? [<div id="toolbar"></div>,
        <div id="wrapper">
          <div id="osd">
          <sl-drawer label="" contained class="drawer-contained" placement="start" style={{'--size': '40%'}}>
          <ve-manifest images={encodeURIComponent(JSON.stringify(this._images))} condensed></ve-manifest>
          <div class="annotations-heading">
            { this.editorIsParent() || this._annotations.length > 0
              ? <span>Annotations</span>
              : null
            }
            { this.editorIsParent()
              ? <sl-tooltip content="Annotate image">
                  <div class="annotator-link" onClick={this.openAnnotator.bind(this)} >
                    <sl-icon name="pencil-square"></sl-icon>
                  </div>
                </sl-tooltip>
              : null
            }
          </div>
          {this._annotations.length > 0
            ? <div>
                {this._annotations.map((anno) => 
                  <div class="anno-link" onClick={this.setRegion.bind(this, anno.target.selector.value.split('=').pop())}>{anno.body[0].value}</div>
                )}
              </div>
            : null
          }
          </sl-drawer>
        </div>
        {!this.compare && <span id="coords" class="viewport-coords" onClick={this._copyTextToClipboard.bind(this)}>{this._viewportBounds}</span>}
        <div id="caption">
          <sl-tooltip content={`${this._infoPanelIsOpen ? 'Close' : 'Open'} image info panel`}>
            <sl-icon-button onClick={this.toggleMenu.bind(this)} id="menu-icon" name="three-dots-vertical" label="Open image info panel"></sl-icon-button>
          </sl-tooltip>
          {!this.compare && this._annotations.length > 0
            ? <sl-tooltip content={`${this._showAnnotations ? 'Hide' : 'Show'} annotations`}>
                <div class="button-icon-with-badge" onClick={this.toggleAnnotations.bind(this)}>
                  <sl-icon-button id="annotations-icon" name="chat-square-text" label="Show annotations"></sl-icon-button>
                  <sl-badge variant="danger" pill>{this._annotations.length}</sl-badge>
                </div>
              </sl-tooltip>
            : null
          }
          <div>
            {this.compare
              ? 'Compare viewer: move cursor over image to change view'
              : this.alt
            }
          </div>
        </div>
        <div id="image-info-popup"></div>
      </div>]
    : [
        <div id="toolbar"></div>,
        <div id="wrapper">
          <div id="osd"></div>
        </div>
    ]
  }
}
