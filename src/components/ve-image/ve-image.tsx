import { Component, Element, Prop, State, Watch, h } from '@stencil/core';

import OpenSeadragon from 'openseadragon'
import OpenSeadragonViewerInputHook from '@openseadragon-imaging/openseadragon-viewerinputhook';

import './openseadragon-curtain-sync'

import debounce from 'lodash.debounce'
import { imageDataUrl, label, loadManifests, parseImageOptions, parseRegionString, imageInfo, makeSticky, sha256, thumbnail } from '../../utils'

import { Annotator } from './annotator'
import { parseInt } from 'lodash';

import '@shoelace-style/shoelace/dist/components/badge/badge.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/image-comparer/image-comparer.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

import SLDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-image',
  styleUrl: 've-image.css',
  shadow: true,
})
export class ImageViewer {
  @Prop() src: string
  @Watch('src')
  srcChanged() {
    this.buildImagesList()
  }

  @Prop() seq: number = 1
  @Prop() options: string
  @Prop() fit: string
  @Prop({ mutable: true, reflect: true }) alt: string
  @Prop({ mutable: true, reflect: true }) position: string
  @Prop() entities: string
  @Prop() cards: boolean = false
  @Prop() compare: boolean = false
  @Prop() curtain: boolean = false
  @Prop() grid: boolean = false
  @Prop() sync: boolean = false
  @Prop() width: string
  @Prop() height: string
  @Prop() align: string // 'left', 'center', 'right'
  @Prop() annoBase: string
  @Prop() sticky: boolean
  @Prop() zoomOnScroll: boolean = false
  @Prop() caption: string
  @Prop() right: boolean = false
  @Prop() left: boolean = false
  @Prop() full: boolean = false

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
  @State() _zoomedIn: any = {}
  @State() _tileSources: any[] = []
  @State() _ready: boolean = false
  @State() _selected: any
  @State() _dialogWidth: string
  @State() _dialogHeight: string

  _width: number
  _height: number
  _resizeObserver: any

  _debounce: any = null
  resizeHandler() {
    if (this._debounce !== null) {
      clearTimeout(this._debounce)
      this._debounce = null
    }
    this._debounce = window.setTimeout(() => {
      this._debounce = null
      // this.doLayout()
    }, 500)
  }

  @Watch('annoBase')
  annoBaseChanged() {
    this.setAnnoTarget()
  }

  @Watch('_annoTarget')
  _annoTargetChanged() {
    // console.log(`_annoTargetChanged=${this._annoTarget}`)
    if (this._annotator) this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos)
  }

  @State() _images: any[] = []
  @Watch('_images')
  async _imagesChanged() {
    // console.log('_imagesChanged', this._images)
    this._current = this._images.length > 0 ? this._images[0] : null
    this._selectedIdx = this._current ? this._current.seq - 1 : 0
    if (this._current) {
      
      if (this._viewer) {
        if (!this.compare) {
          // console.log(`loadTileSources: idx=${this._current.seq}`)
          this._viewer.open(await this._loadTileSources(), this._current.seq)
        }
      } else {
        if (!this.grid) this.compare ? this._compareViewerInit() : this._osdInit()
      }
      this.doLayout()
    }
  }

  async doLayout() {
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this.resizeHandler())
      this._resizeObserver.observe(document.body)
    }

    let img = await imageInfo(this._current.manifest, this._current.seq)
    let hwRatio = Number((img.height/img.width).toFixed(4))
    let orientation = img.height > img.width ? 'portrait' : 'landscape'

    this.position = this.position
      ? this.position
      : this.right ? 'right' : this.left ? 'left' : this.full ? 'full' : 'default'

    console.log(`ve-image.doLayout: width=${this.width} height=${this.height} hwRatio=${hwRatio} position=${this.position} orientation=${orientation} compare=${this.compare} zoomOnScroll=${this.zoomOnScroll} img.width=${img.width} img.height=${img.height} hwRatio=${hwRatio}`)
    
    const floatSideMargin = 12
    const captionHeight = this.grid ? 0 : 32
    const marginBottom = 6
    const stickyPaddingTop = 6
    
    if (this.grid) { // Multi-image grid layout

      this.el.style.width = this.width || '100%'
      this._width = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
      this.el.style.height = this.height || '100%'
      this._height = parseInt(window.getComputedStyle(this.el).height.slice(0,-2)) || (orientation === 'portrait' ? Math.round(this._width * hwRatio) : Math.round(this._width / hwRatio))

    } else if (this.position === 'full' || this.position === 'default') { // Single-image full-width layout

      this.el.classList.add('full')
      this.el.style.width = this.width || '100%'
      this._width = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
      
      if (this.position === 'full') { // use full width
        
        this.el.style.height = this.height || `${Math.round(this._width * hwRatio)}px`
        this._height = parseInt(window.getComputedStyle(this.el).height.slice(0,-2)) || (orientation === 'portrait' ? Math.round(this._width * hwRatio) : Math.round(this._width / hwRatio))  
      
      } else { 
        
        if (this.height) {
          this.el.style.height = this.height
          this._height = parseInt(window.getComputedStyle(this.el).height.slice(0,-2)) || (orientation === 'portrait' ? Math.round(this._width * hwRatio) : Math.round(this._width / hwRatio))  

        } else {
          if (this.width) {
          this._height = this._width * hwRatio
          this.el.style.height = `${this._height}px`

          } else { // default, calculate and restrict max height to 40% of window
            this._height = this._width * hwRatio
            let maxHeight = Math.round(window.innerHeight * .4)
            if (this._height > maxHeight) {
              this._height = maxHeight
              this._width = this._height / hwRatio
            }
          }
        }

      }     
      this.el.style.width = '100%'

    } else { // Single-image half-width layout
      if (this.position === 'right' || this.position === 'left') {
        this.el.classList.add(this.position)
        this.el.style.float = this.position
      }
      this.el.style.width = this.width || '50%'
      this._width = parseInt(window.getComputedStyle(this.el).width.slice(0,-2)) - floatSideMargin
      this.el.style.height = this.height || `${Math.round(this._width * hwRatio)}px`
      this._height = parseInt(window.getComputedStyle(this.el).height.slice(0,-2)) || (orientation === 'portrait' ? Math.round(this._width * hwRatio) : Math.round(this._width / hwRatio))
    }

    // console.log(`width=${this._width} height=${this._height} hwRatio=${ Number((this._height/this._width).toFixed(4))}`)
    if (!this.grid) this.el.style.height = `${this._height + captionHeight + marginBottom}px`

    if (this.sticky) this.el.style.paddingTop = `${stickyPaddingTop}px`
    if (!this.fit && (this.width || this.height)) this._current.fit = 'cover'
    
    let content: HTMLElement = this.el.shadowRoot.querySelector('.content')
    if (content) {
      if (this.position === 'left') content.style.marginRight = `${floatSideMargin}px`
      else if (this.position === 'right') content.style.marginLeft = `${floatSideMargin}px`
      content.style.width = `${this._width}px`
      content.style.height = `${this._height + captionHeight}px`
    }
    this._ready = true
  }

  @State() _selectedIdx: number = 0
  @Watch('_selectedIdx')
  _selectedIdxChanged(idx: number) {
    // console.log(`_selectedIdxChanged: ${idx}`)
    if (this._images.length > idx) this._current = this._images[idx]
    if (this._images.length === 1) this._current.seq = idx+1
    this.setAnnoTarget()
  }
  
  @State() _current: any = null
  @Watch('_current')
  _currentChanged() {
    this.alt = this._value(this._current.manifest.label).toString()
    this.setAnnoTarget()
    // if (this._annotator) this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos)
  }

  @State() _annotations: any[] = []
  @Watch('_annotations')
  _annotationsChanged() {
    // console.log(`annotations=${this._annotations.length}`)
  }

  serializedManifests() {
    return encodeURIComponent(JSON.stringify(
      this.compare ? this._images : [this._images[this._images.length > this._selectedIdx ? this._selectedIdx : 0]]
    ))
  }

  annoTarget(manifest:any, seq:number) {
    let _imageInfo = imageInfo(manifest, seq)
    let sourceHash = sha256(_imageInfo.id).slice(0,8)
    return `${this.annoBase}/${sourceHash}`
  }

  setAnnoTarget() {
    if (this._current) this._annoTarget = this.annoTarget(this._current.manifest, this._current.seq)
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
  
  setRegion(region: string, immediately:boolean=false) {
    setTimeout(() => this._viewer.viewport.fitBounds(parseRegionString(region, this._viewer), immediately) ,200)
  }

  _isIiifArgs(str:string) {
    return /^\d+,\d+,\d+,\d+\b|^pct:[0-9.]+,[0-9.]+,[0-9.]+,[0-9.]+$/.test(str)
  }

  _isInt(str:string) {
    return /^[0-9]+$/.test(str)
  }

  _toObj(s:string) {
    let tokens = []
    s = s.replace(/“/,'"').replace(/”/,'"').replace(/’/,"'")
    s.match(/[^\s"]+|"([^"]*)"/gmi).forEach(token => {
      if (tokens.length > 0 && tokens[tokens.length-1].indexOf('=') === tokens[tokens.length-1].length-1) tokens[tokens.length-1] = `${tokens[tokens.length-1]}${token}`
      else tokens.push(token)
    })
    let obj:any = {seq: 1, options: parseImageOptions('')}
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i]
      if (i === 0) {
        obj.manifest = decodeURIComponent(token)
      } else if (token.indexOf('=') > 0) {
        let split = token.split('=')
        obj[split[0]] = split[1]
      } else if (this._isInt(token)) {
        obj.seq = parseInt(token)
      } else if (this._isIiifArgs(token)) {
        obj.options = parseImageOptions(token)
      } else if (token === 'cover' || token === 'contain') {
        obj.fit = token
      } else {
        obj.caption = token[0] === '"' && token[token.length-1] === '"' ? token.slice(1,-1) : token
      }
    }
    return obj
  }

  parseImageStr(str: string) {
    let parsed = this._toObj(str)
    return parsed
  }

  async zoomto(arg: string) {
    const found = arg?.match(/^(\d+)?(:|:pct:|pct:)?([0-9.]+,[0-9.]+,[0-9.]+,\d+|[a-f0-9.]{8})?$/)
    if (!found) return
    let seq = found[1] ? parseInt(found[1].replace(/:$/,'')) : 1
    let imgIdx = seq - 1
    let region
    let annoRegex = new RegExp('[0-9a-f]{8}')
    if (annoRegex.test(found[3])) {
      // let endpoint = location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://api.visual-essays.net'
      let endpoint = 'https://api.visual-essays.net'
      let annoId = `${endpoint}/annotation/${this.annoTarget(this._images[imgIdx].manifest, this._images[imgIdx].seq)}/${found[3]}/`
      let resp = await fetch(annoId)
      if (resp.ok) {
        let anno = await resp.json()
        if (anno) {
          if (anno) region = anno.target.selector.value.split('=')[1]
        }
      }
      // let anno = this._annotations.find(item => item.id.split('/').pop() === found[2])
      // if (anno) region = anno.target.selector.value.split('=')[1]
    } else {
      region = found[2] ? `${found[2]}${found[3]}` : found[3]
    }
    // console.log(`zoomto: seq=${seq} current=${this._current.seq} region=${region}`)
    if (region) this._current.options.region = region
    this._viewer.goToPage(imgIdx)
    this.positionImage(false)

    // if (seq === this._current.seq) this.positionImage(false)
    // else this._viewer.goToPage(imgIdx)
  }

  buildImagesList() {
    let images: any[] = []
    if (this.src) {
      let img: any = {manifest: this.src, seq: this.seq, options: parseImageOptions(this.options)}
      img.fit = (this.fit === 'cover' || this.fit === 'contain') ? this.fit : this.fit ? 'custom' : 'contain'
      if (img.fit === 'custom') img.options = parseImageOptions(this.fit)
      images.push(img)
    }
    
    Array.from(this.el.querySelectorAll('li, span'))
      .forEach(li => images.push(this.parseImageStr(li.innerHTML)))
    // If no manifest defined in src attribute or images list, use most recent entity QID, if available 
    if (images.length === 0 && this._entities.length > 0)
      images.push({manifest: `wd:${this._entities[0]}`, seq: this.seq, options: parseImageOptions('')})
    
    if (images.length > 0) loadManifests(images.map(item => item.manifest))
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
            this.buildImagesList()
          }
        }
      }
      const observer = new MutationObserver(callback);
      observer.observe(slot, { childList: true, subtree: true, characterData: true })
    }
  }

  connectedCallback() {
    let parent: HTMLElement = this.el.parentElement
    if (parent.tagName === 'SECTION' && parent.classList.contains('sticky')) {
      this.position = 'full'
      this.width = '100%'
    }
    this.el.classList.add('ve-component')
    this._entities = this.entities ? this.entities.split(/\s+/).filter(qid => qid) : []
  }

  componentWillLoad() {
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

  addMutationObserver(el: HTMLElement) {
    // console.log('addMutationObserver', el.attributes.getNamedItem('active').value)
    let prevClassState = el.classList.contains('active')
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName == 'class') {
          let currentClassState = (mutation.target as HTMLElement).classList.contains('active')
          if (prevClassState !== currentClassState) {
            prevClassState = currentClassState
            if (currentClassState) this.zoomto(el.attributes.getNamedItem('enter')?.value)
            else this.zoomto(el.attributes.getNamedItem('exit')?.value)
          }
        }
      })
    })
    observer.observe(el, {attributes: true})
  }

  componentDidLoad() {
    if (this.sticky) makeSticky(this.el)
    this.listenForSlotChanges()
    this.addInteractionHandlers()
  }

  addInteractionHandlers() {
    Array.from(document.querySelectorAll('[enter],[exit]')).forEach((el:HTMLElement) => {
      let veImage = this.findVeImage(el)
      if (veImage) this.addMutationObserver(el)
    })

    Array.from(document.querySelectorAll('mark')).forEach(mark => {
      for (let idx=0; idx < mark.attributes.length; idx++) {
        let attr = mark.attributes.item(idx)
        if (/^(\d+)?(:|:pct:|pct:)?([0-9.]+,[0-9.]+,[0-9.]+,\d+|[a-f0-9.]{8})?$/.test(attr.value)) {
          let veImage = this.findVeImage(mark.parentElement)
          if (veImage) {
            this._zoomedIn[attr.value] = false
            mark.classList.add('zoom')
            mark.addEventListener('click', () => setTimeout(() => {
              // this._zoomedIn[attr.value] = !this._zoomedIn[attr.value]
              // if (this._zoomedIn[attr.value]) this.zoomto(attr.value)
              // else this.goHome(false)
              this.zoomto(attr.value)
            }, 200))
          }
          break
        }
      }
    })
  }

  _findWidth() {
    let el = this.el
    while (!el.clientWidth && el.parentElement) {
      el = el.parentElement
    }
    return el.clientWidth * .45
  }

  async _tileSource(imgUrl: any, options: any) {
    let tileSource
    if (imgUrl.indexOf('/info.json') > 0) {
      if (this.compare) {
        let url = `${imgUrl.slice(0,-10)}/${options.region}/1000,/${options.rotation}/${options.quality}.${options.format}`
        tileSource = { url, type: 'image', buildPyramid: true }
      } else {
        tileSource = imgUrl
      }
    } else {
      const el = this.el.shadowRoot.querySelector('#osd')
      if (options.region === 'full' || !this.compare) {
        tileSource = { url:imgUrl, type: 'image', buildPyramid: true }
      } else {
        let [x, y, width, height] = options.region.replace(/pct:/,'').split(',').map(s => s !== '' ? parseFloat(s) : undefined)
        const region = {x, y, w: width, h: height}
        const dest = {width: el.clientWidth, height: el.clientHeight}
        let url = await imageDataUrl(imgUrl, region, dest)
        tileSource = { url, type: 'image', buildPyramid: true }
      }
    }
    return tileSource
  }

  async _loadTileSources() {
    let imgUrls: any
    if (this._images.length === 1) {
      let manifest = this._images[0].manifest
      imgUrls = []
      for (let i = 0; i < manifest.items.length; i++) {
        let _imageInfo = imageInfo(manifest, i+1)
        imgUrls.push(_imageInfo.service
        ? `${(_imageInfo.service[0].id || _imageInfo.service[0]['@id']).replace(/\/info\.json$/,'')}/info.json`
        : _imageInfo.id)
      }
    } else {
      imgUrls = this._images.map(item => {
        let _imageInfo = imageInfo(item.manifest, item.seq)
        return _imageInfo.service
          ? `${(_imageInfo.service[0].id || _imageInfo.service[0]['@id']).replace(/\/info\.json$/,'')}/info.json`
          : _imageInfo.id
      })
    }
    return await Promise.all(imgUrls.map((imgUrl, idx) => this._tileSource(imgUrl, this._images[idx]?.options )))
  }

  _copyTextToClipboard(text: string) {
    if (navigator.clipboard) navigator.clipboard.writeText(text)
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
    return location.hostname.indexOf('annotator') >= 0 || location.port === '4444'
  }

  editorIsParent() {
    return location.hostname.indexOf('editor') >= 0 || location.pathname.indexOf('/editor') === 0 || location.port === '5555'
  }

  canAnnotate() {
    return this.annotatorIsParent() && window.localStorage.getItem('gh-auth-token') !== null
  }

  isTouchEnabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( ((navigator as any).msMaxTouchPoints || 0) > 0 )
}

  _showInfoPopup() {
    let popup: HTMLElement = this.el.shadowRoot.querySelector('#image-info-popup')
    popup.innerHTML = `<ve-manifest images="${this.serializedManifests()}" condensed></ve-manifest>`
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block'
  }

  configureScrollBehavior() {
    // console.log(`configureScrollBehavior: isMobile=${isMobile()} isTouchEnabled=${this.isTouchEnabled()} zoomOnScroll=${this.zoomOnScroll} isFullPage=${this._viewer.isFullPage()}`)
    /* This is intended to provide touch-based scrolling of OSD images in mobile mode.  Pan/zoom is
    disabled to permit scrolling.  The technique for doing this is as described in this
    OSD Github issue - https://github.com/openseadragon/openseadragon/issues/1791#issuecomment-1000045888
    Unfortunately, this only works with OSD v2.4.2, which is not compatible with the latest version of the
    Annotorious plugin (requires 3.0).  As a result, the current configuration is pinned 
    to OSD 2.4.2 and annotorious 2.6.0
    */
    //const canvas: any = this.el.shadowRoot.querySelector('.openseadragon-canvas')
    //canvas.style.touchAction = 'pan-y'

    if (!this.zoomOnScroll) {

      new OpenSeadragonViewerInputHook({ viewer: this._viewer, hooks: [
        {tracker: 'viewer', handler: 'scrollHandler', hookHandler: (event) => {
          if (!this._viewer.isFullPage() && !event.originalEvent.ctrlKey) {
            event.preventDefaultAction = true
            event.stopHandlers = true
          }
          return true
        }}
      ]})
    }
  }

  async _compareViewerInit() {
    this._tileSources = await this._loadTileSources()
    // let tileSources = await this._loadTileSources()
    if (this.sync || this.curtain) {
      let osdWrapper = this.el.shadowRoot.querySelector('.viewer')
      let container: HTMLElement = this.el.shadowRoot.getElementById('osd')
      if (container) {
        osdWrapper.removeChild(container)
      }
      container = document.createElement('div')
      container.id = 'osd'
      container.style.height = '100%'
      osdWrapper.appendChild(container)
      this._viewer = new (window as any).CurtainSyncViewer({
        mode: this.sync ? 'sync' : 'curtain',
        container,
        images: this._tileSources.map((tileSource, idx) => ({ key: `item-${idx}`, tileSource, shown: true })),
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
          maxZoomPixelRatio: 10,
          viewportMargins: {left:0, top:0, bottom:0, right:0}
        }
      })
    }
  }

  async _osdInit() {
    let tileSources = await this._loadTileSources()
    let osdElem: HTMLElement = this.el.shadowRoot.querySelector('#osd')
    const osdOptions: OpenSeadragon.Options = {
      element: osdElem,
      tileSources,
      initialPage: this._selectedIdx,
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      // homeFillsViewer: true,
      showNavigationControl: true,
      minZoomImageRatio: 1,
      maxZoomPixelRatio: 10,
      showRotationControl: true,
      showHomeControl: true,
      showZoomControl: true,
      showFullPageControl: true,
      showNavigator: false,
      sequenceMode: true,
      showReferenceStrip: true,
      
      animationTime: 0.5,
      springStiffness: 10,
      
      visibilityRatio: 1.0,
      constrainDuringPan: true
      
    }

    // console.log(`homeFillsViewer=${osdConfig.homeFillsViewer}`)
    // this._viewer = OpenSeadragon(osdOptions);

    this._viewer = OpenSeadragon(osdOptions)
    this.configureScrollBehavior()

    this._annotator = new Annotator(this._viewer, this.el.shadowRoot.querySelector('#toolbar'))
    if (this._annoTarget) this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos)
    
    this.showAnnotationsToolbar(this.canAnnotate())
    this.showAnnotations(this.canAnnotate())

    // this._viewer.addHandler('home', (e) => this.positionImage(e.immediately))
    this._viewer.addHandler('page', (e) => this._selectedIdx = e.page)

    // Reposition image in viewport after transition back from full screen mode
    this._viewer.addHandler('resize', () => setTimeout(() => this._viewer.viewport.goHome(true), 10))

    this._viewer.world.addHandler('add-item', () => {
      //if (this._current.seq - 1 !== this._selectedIdx) setTimeout(() => {this._viewer.goToPage(this._current.seq - 1); this.positionImage(true)}, 10)
        this.positionImage(true)
    })
    this._viewer.addHandler('viewport-change', debounce(() => {
      this._viewportBounds = this._getViewportBounds()
    }, 100))
  
    this._viewer.addHandler('open-failed', (e) => {
      // If info.json tile source failed, try loading source image as pyramid
      if (e.message === 'Unable to load TileSource' && (e.source as any).indexOf('/info.json') > 0) {
        let imageData = imageInfo(this._current.manifest, this._current.seq)
        console.log(`Error: Unable to load IIIF TileSource, retrying with source image - ${decodeURIComponent(imageData.id)}`)
        this._viewer.open({ url: imageData.id, type: 'image', buildPyramid: true })
      }
    })

  }
  positionImage (immediately: boolean=false) {
    // console.log(`positionImage: immediately=${immediately} fit=${this._current.fit} region=${this._current.options.region}`)
    setTimeout(() => {
      if (this._current.options.region !== 'full') {
        let region = this._current.options.region
        this._current.options.region = 'full'
        this.setRegion(region, immediately)
      } else {
        let imageData = imageInfo(this._current.manifest, this._current.seq )
        let osdElem = this.el.shadowRoot.getElementById('osd')
        const scaleX = osdElem.clientHeight/imageData.height
        const scaleY = osdElem.clientWidth/imageData.width
        const fit = this._current.fit === 'cover'
          ? scaleY/scaleX > 1 ? 'horizontal' : 'vertical'
          : scaleY/scaleX > 1 ? 'vertical' : 'horizontal'
        if (fit === 'horizontal') {
          this._viewer.viewport.fitHorizontally(immediately)
        } else {
          this._viewer.viewport.fitVertically(immediately)
        }
      }
    }, 1)
  }

  goHome(immediately:boolean = false) {
    // if (this._viewer) this.positionImage(immediately)
    if (this._viewer) this._viewer.viewport.goHome(immediately)
  }

  showAnnotationsToolbar(show: boolean) {
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
    let imgInfo = imageInfo(this._current.manifest, this._current.seq)
    let ratio = Number((imgInfo.width / imgInfo.height).toFixed(4))
    // let depictsPanelWidth = 300
    if (ratio < 0) {
      width = 800
      height = width * ratio
    } else {
      height = 800
      width = height * ratio
    }
    let url = location.hostname === 'localhost'? 'http://localhost:8080/annotator/' : 'https://beta.juncture-digital.org/annotator'
    url += `?manifest=${this._current.manifest.id || this._current.manifest['@id']}`
    url += `&seq=${this._current.seq}`
    if (this.annoBase) url += `&anno-base=${this.annoBase}`
    // this.openWindow(url, `toolbar=yes,location=yes,left=0,top=0,width=${width+depictsPanelWidth},height=${height+200},scrollbars=yes,status=yes`)
    this.openWindow(url, `toolbar=yes,location=yes,left=0,top=0,width=1200,height=1000,scrollbars=yes,status=yes`)
  }

  openWindow(url, options) {
    if (this._annotatorWindow) { this._annotatorWindow.close() }
    if (options === undefined) options = 'toolbar=yes,location=yes,left=0,top=0,width=1000,height=1200,scrollbars=yes,status=yes'
    this._annotatorWindow = window.open(url, '_blank', options)
  }

  showImageDialog(manifest) {
    const landscapeWidth = window.innerWidth >= 768 ? window.innerWidth *.7 : window.innerWidth
    const portraitWidth = window.innerWidth >= 768 ? window.innerWidth *.5 : window.innerWidth
    this._selected = manifest
    let _imageInfo = imageInfo(manifest)
    let hwRatio = _imageInfo.height/_imageInfo.width
    let orientation = hwRatio < 1 ? 'landscape' : 'portrait'
    this._dialogWidth = orientation === 'landscape' ? `${landscapeWidth}px` : `${portraitWidth}px`
    
    this._dialogHeight = orientation === 'landscape'
      ? `${Math.round(landscapeWidth * hwRatio + 32)}px`
      : `${Math.round(portraitWidth * hwRatio + 32)}px`
    let dialog = this.el.shadowRoot.getElementById('image-dialog') as SLDialog
    dialog.style.height = this._dialogHeight
    dialog.panel.style.height = this._dialogHeight
    
    if (!dialog.onclick) {
      dialog.onclick = function () { }
      dialog.addEventListener('sl-show', () => {
        dialog.panel.style.width = this._dialogWidth
        dialog.panel.style.height = this._dialogHeight
      })
      dialog.addEventListener('sl-hide', () => {
        this.el.style.zIndex = '3'
      })

    }
    this.el.style.zIndex = '4'
    setTimeout(() => dialog.show(), 200)
  }

  renderAnnotations() {
    return  <div>
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
      { this._annotations.length > 0 &&
      <div>
        {this._annotations.map((anno) =>
          <div class="anno">
            <sl-tooltip content="Copy annotation ID">
              <sl-icon-button class="anno-copy" onClick={this._copyTextToClipboard.bind(this, anno.id.split('/').pop())} name="clipboard" label="Copy annotation ID"></sl-icon-button>
            </sl-tooltip>
            <span class="anno-link" onClick={this.setRegion.bind(this, anno.target.selector.value.split('=').pop(), false)}>{anno.body[0].value}</span>
          </div>
        )}
      </div>
      }
    </div>
  }

  renderCurtainViewer() {
    return <sl-image-comparer position="50">
      {this._tileSources.map((ts:any, idx:number) =>
        <img style={{}}
          slot={idx === 0 ? 'before' : 'after'}
          src={ts.url}
          alt={this._value(this._images[idx].manifest.label).toString()}
        />
      )}
    </sl-image-comparer>
  }

  renderOsdViewer() {
    return [
      <div id="osd" style={{height:'100%'}}></div>,
    ]
  }

  renderViewer() {
    return <div class="viewer" style={{position:'relative', height:'calc(100% - 32px)'}}>
      {this.compare && !this.sync && !this.curtain
        ? this.renderCurtainViewer()
        : this.renderOsdViewer()
      }
      { this._images.length > 0 &&
        <sl-drawer label="" contained class="drawer-contained" placement="start" style={{'--size': '40%'}}>
          <ve-manifest images={this.serializedManifests()} condensed></ve-manifest>
          { this.renderAnnotations() }
        </sl-drawer>
      }
    </div>
  }

  renderCaption() {
    return <div id="caption">
      <sl-tooltip content={`${this._infoPanelIsOpen ? 'Close' : 'Open'} image info panel`} placement="top-start" disabled={this.isTouchEnabled()}>
        <sl-icon-button onClick={this.toggleMenu.bind(this)} id="menu-icon" name="three-dots-vertical" label="Open image info panel"></sl-icon-button>
      </sl-tooltip>
      {!this.compare && this._annotations.length > 0
        ? <sl-tooltip content={`${this._showAnnotations ? 'Hide' : 'Show'} annotations`} disabled={this.isTouchEnabled()}>
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
  }

  renderViewportCoords() {
    return <span id="coords" class="viewport-coords" onClick={this._copyTextToClipboard.bind(this, this._viewportBounds)}>{this._viewportBounds}</span>
  }

  renderThumbnails() {
    return [
      <section class="ve-image-grid">
        <div class={`images ${Array.from(this.el.classList).find(cls => cls.indexOf('col') === 0) || ''}`}>
          { this._images.map(item => 
            <sl-tooltip content={item.caption || label(item.manifest)} disabled={this.isTouchEnabled()}>
              <div class="thumbnail">
                <img src={thumbnail(item.manifest)} alt={label(item.manifest)} onClick={this.showImageDialog.bind(this, item.manifest)}/>
                { item.caption && <div innerHTML={item.caption}></div> }
              </div>
            </sl-tooltip>
          )}
        </div>
        {this.caption && <div class="caption" innerHTML={this.caption}></div>}
      </section>,
      <sl-dialog id="image-dialog" no-header>
        <ve-image src={this._selected?.id} full zoom-on-scroll width={this._dialogWidth} fit="cover"></ve-image>
      </sl-dialog>
    ]
  }

  renderAsCards() {
    return [
      <section class="cards">
        { this._images.map(item => item.manifest.id).map(manifest => <ve-image-card manifest={manifest}></ve-image-card>) }
      </section>
    ]
  }

  renderAsViewer() {
    return <div class="content">
      { this.renderViewer() }
      { !this.compare && this.renderViewportCoords()}
      { this._ready && this.renderCaption() }
      <div id="image-info-popup"></div>
    </div>
  }

  render() {
    return this.grid
      ? this.cards
        ? this.renderAsCards()
        : this.renderThumbnails()
      : this.renderAsViewer()
  }

}