import { Component, Element, Prop, State, Watch, h } from '@stencil/core';

import OpenSeadragon from 'openseadragon'
import OpenSeadragonViewerInputHook from '@openseadragon-imaging/openseadragon-viewerinputhook';

import { sha256 } from '../../utils'
import jwt_decode from 'jwt-decode'

import './openseadragon-curtain-sync'

import debounce from 'lodash.debounce'
import { loadManifests, imageDataUrl, parseImageOptions, parseRegionString, imageInfo, isNum, fixedHeaderHeight } from '../../utils'
import { Annotator } from './annotator'
import { parseInt } from 'lodash';

import '@shoelace-style/shoelace/dist/components/badge/badge.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/image-comparer/image-comparer.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')
setBasePath('https://visual-essays.github.io/web-components/src')

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
  @Prop() compare: boolean = false
  @Prop({ mutable: true, reflect: true }) mode: string = 'curtain'
  @Prop() width: string
  @Prop() height: string
  @Prop() align: string // 'left', 'center', 'right'
  @Prop() authToken: string = null
  @Prop() annoBase: string
  @Prop() shoelace: boolean = true
  @Prop() sticky: boolean
  @Prop() noScroll: boolean

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

  @Watch('mode')
  compareModeChanged() {
    this._compareViewerInit()
  }

  @Watch('authToken')
  authTokenChanged() {
    // console.log(`authTokenChanged: isDefined=${this.authToken !== null}`)
    if (this._annotator) this._annotator.setAuthToken(this.authToken)
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
    // console.log(`_annoTargetChanged: _annoTarget=${this._annoTarget}`)
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

  serializedManifests() {
    return encodeURIComponent(JSON.stringify(
      this.compare ? this._images : [this._images[this._selectedIdx]]
    ))
  }

  annoTarget(manifest:any) {
    // let locationPath = location.pathname.split('/').filter(pe => pe).join('/')
    let locationPath = this.editorIsParent()
      ? location.hash.length > 1 ? location.hash.slice(1).split('/').filter(pe => pe).join('/') : ''
      : location.pathname.split('/').filter(pe => pe).join('/')
    let sourceHash = sha256(imageInfo(manifest).id).slice(0,8)
    // console.log(`annoTarget: annoBase=${this.annoBase} sourceHash=${sourceHash} locationPath=${locationPath} user=${this.user} authToken=${this.authToken}`)
    return this.annoBase
      ? `${this.annoBase}/${sourceHash}`
      : this.authToken
        ? this.editorIsParent()
          ? [...[locationPath.split('/')[0]], ...[sourceHash]].join('/')
          : [...[sha256((jwt_decode(this.authToken) as any).email.toLowerCase()).slice(0,8)], ...[sourceHash]].join('/')
        : this.user
          ? locationPath ? `${this.user}/${locationPath}/${sourceHash}` : `${this.user}/${sourceHash}`
          : locationPath ? `${locationPath}/${sourceHash}` : sourceHash

  }

  setAnnoTarget() {
    if (this._current) this._annoTarget = this.annoTarget(this._current.manifest)
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
    this._viewer.viewport.fitBounds(parseRegionString(region, this._viewer), immediately)
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
    const found = arg?.match(/^(\d+:|\d+$)?(pct:)?(\d+,\d+,\d+,\d+|[a-f0-9]{8})$/)
    if (!found) return
    let imgIdx = found[1] ? parseInt(found[1].replace(/:$/,''))-1 : 0
    let region
    let annoRegex = new RegExp('[0-9a-f]{8}')
    if (annoRegex.test(found[3])) {
      // let endpoint = location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://api.visual-essays.net'
      let endpoint = 'https://api.visual-essays.net'
      let annoId = `${endpoint}/annotation/${this.annoTarget(this._images[imgIdx].manifest)}/${found[3]}/`
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
    // console.log(`zoomto: imgIdx=${imgIdx} region=${region}`)
    if (imgIdx) this._viewer.goToPage(imgIdx)
    if (region) setTimeout(() => { this.setRegion(region, false) }, 100)
  }

  buildImagesList() {
    let images: any[] = []
    if (this.src) {
      let img: any = {manifest: this.src, options: parseImageOptions(this.options)}
      if (this.fit) img.fit = this.fit
      images.push(img)
    }
    
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
    console.log(`ve-image: sticky=${this.sticky} no-scroll=${this.noScroll}`)
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

  addResizeObserver() {
    const resizeObserver = new ResizeObserver(() => {
      console.log('resizeObserver')
      // this._setHostDimensions()
    })
    resizeObserver.observe(this.el.shadowRoot.getElementById('wrapper'))
  }

  componentDidLoad() {
    this.addResizeObserver()
    this.el.classList.add('ve-component')
    if (this.sticky) {
      this.el.style.position = 'sticky'
      this.el.style.top = `${fixedHeaderHeight()}px`
    }

    // if (this._images.length > 0) this._setHostDimensions()
    this.listenForSlotChanges()

    Array.from(document.querySelectorAll('[enter],[exit]')).forEach((el:HTMLElement) => {
      let veImage = this.findVeImage(el)
      if (veImage) this.addMutationObserver(el)
    })

    Array.from(document.querySelectorAll('mark')).forEach(mark => {
      for (let idx=0; idx < mark.attributes.length; idx++) {
        let attr = mark.attributes.item(idx)
        if (/^(\d+:|\d+$)?(pct:)?(\d+,\d+,\d+,\d+|[a-f0-9]{8})$/.test(attr.value)) {
          let veImage = this.findVeImage(mark.parentElement)
          if (veImage) {
            this._zoomedIn[attr.value] = false
            mark.addEventListener('click', () => setTimeout(() => {
              this._zoomedIn[attr.value] = !this._zoomedIn[attr.value]
              if (this._zoomedIn[attr.value]) this.zoomto(attr.value)
              else this.goHome(false)
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

  _setHostDimensions(imageData: any = null) {
    let wrapper = this.el.shadowRoot.getElementById('wrapper')
    let captionEl = this.el.shadowRoot.getElementById('caption')
    let captionHeight = captionEl ? captionEl.clientHeight : 32
    let osd = this.el.shadowRoot.getElementById('osd')

    let elWidth = this.el.clientWidth || this.el.parentElement.clientWidth
    // let elWidth = this._findWidth()
    // let elWidth = this.el.clientWidth
    // let elHeight = this.el.clientHeight || this.el.parentElement.clientHeight
    let elHeight = this.el.clientHeight
    let parentOffset = this.el.offsetTop - this.el.parentElement.offsetTop


    let requestedWidth = this.width
      ? this.width.indexOf('px') > 0
        ? parseInt(this.width.slice(0,-2))
        : Math.round(elWidth * (parseFloat(this.width.slice(0,-1))/100))
      : null
    let requestedHeight = this.height
      ? this.height.indexOf('px') > 0
        ? parseInt(this.height.slice(0,-2))
        : Math.round((elHeight - parentOffset) * parseFloat(this.height.slice(0,-1))/100)
      : null
    let imageWidth = imageData ? imageData.width : null
    let imageHeight = imageData ? imageData.height : null
    console.log(`ve-image.setHostDimensions: elWidth=${elWidth} elHeight=${elHeight} parentOffset=${parentOffset} requestedWidth=${requestedWidth} requestedHeight=${requestedHeight} imageWidth=${imageWidth} imageHeight=${imageHeight}`)
    
    let width, height
    if (requestedWidth) {
      width = requestedWidth
      height = requestedHeight
        ? requestedHeight
        : imageData
          ? elHeight
            ? Math.min(elHeight, Math.round(imageHeight/imageWidth * requestedWidth)) + captionHeight 
            : Math.round(imageHeight/imageWidth * requestedWidth) + captionHeight // height scaled to width
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
      if (elHeight === null) {
        height = elHeight
        width = Math.min(
          elWidth,
          imageData
            ? Math.round(imageWidth/imageHeight * (requestedHeight - captionHeight)) // width scaled to height
            : requestedWidth || elWidth
          )
      } else {
        console.log('here')
        width = elWidth
        height = Math.round(imageHeight/imageWidth * elWidth + captionHeight) // height scaled to width
      }
    }

    console.log(`ve-image.setHostDimensions: width=${width} height=${height} caption=${captionHeight}`)
    // osd.style.width = `${width}px`
    wrapper.style.width =  `${width}px`
    wrapper.style.height = `${height}px`
    osd.style.width = '100%'
    osd.style.height = `${height - captionHeight}px`
    // this.el.style.width = '100%'
    this.el.style.height = `${height}px`
    if (this.align) {
      if (this.align === 'center') this.el.style.margin = 'auto'
      else this.el.style.float = this.align
    }
  }

  async _tileSource(imgUrl: any, options: any) {
    let tileSource
    if (imgUrl.indexOf('/info.json') > 0) {
      if (this.compare) {
        // let url = `${imgUrl.slice(0,-10)}/${options.region}/${options.size}/${options.rotation}/${options.quality}.${options.format}`
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
    let imgUrls: any = this._images.map(item => {
      let _imageInfo = imageInfo(item.manifest, item.seq)
      return _imageInfo.service
        ? `${(_imageInfo.service[0].id || _imageInfo.service[0]['@id']).replace(/\/info\.json$/,'')}/info.json`
        : _imageInfo.id
    })
    return await Promise.all(imgUrls.map((imgUrl, idx) => this._tileSource(imgUrl, this._images[idx].options )))
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
    return location.hostname.indexOf('editor') >= 0 || location.port === '5555'
  }

  canAnnotate() {
    return this.annotatorIsParent() && this.authToken !== null
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
    /* This is intended to provide touch-based scrolling of OSD images in mobile mode.  Pan/zoom is
    disabled to permit scrolling.  The technique for doing this is as described in this
    OSD Github issue - https://github.com/openseadragon/openseadragon/issues/1791#issuecomment-1000045888
    Unfortunately, this only works with OSD v2.4.2, which is not compatible with the latest version of the
    Annotorious plugin (requires 3.0).  As a result, the current configuration is pinned 
    to OSD 2.4.2 and annotorious 2.6.0
    */
    let instructions = this.el.shadowRoot.getElementById('instructions')
    const canvas: any = this.el.shadowRoot.querySelector('.openseadragon-canvas')
    canvas.style.touchAction = 'pan-y'

    new OpenSeadragonViewerInputHook({ viewer: this._viewer, hooks: [
      {tracker: 'viewer', handler: 'scrollHandler', hookHandler: (event) => {
        if (!this._viewer.isFullPage() && !event.originalEvent.ctrlKey) {
          event.preventDefaultAction = true
          event.stopHandlers = true
          // display meta key warning
          if (instructions.className == 'hidden') {
            instructions.className = 'visible'
            setTimeout(() => instructions.className = 'hidden', 1000)
          }
        } else {
          if (instructions.className == 'visible') instructions.className = 'hidden'
        }
        return true
      }}
    ]})

    /*
    // Inhibits panning using drag
    new OpenSeadragonViewerInputHook({ viewer: this._viewer, hooks: [
      {tracker: 'viewer', handler: 'dragHandler', hookHandler: (event) => {
        // if mobile disable drag event 
        // pinch event handles panning with 2 fingers
        if (!this._viewer.isFullPage() && this.isTouchEnabled()) {
          event.preventDefaultAction = true
          event.stopHandlers = true
          if (instructions.className == 'hidden') {
            instructions.className = 'visible'
            setTimeout(() => instructions.className = 'hidden', 1000)
          }
        } else {
          if (instructions.className == 'visible') instructions.className = 'hidden';
        }
        return true
      }}
    ]})
    */
   
    new OpenSeadragonViewerInputHook({ viewer: this._viewer, hooks: [
      {tracker: 'viewer', handler: 'dragEndHandler', hookHandler: (event) => {
        event.preventDefaultAction = true
        event.stopHandlers = true
      }}
    ]})
  }

  async _compareViewerInit() {
    this._tileSources = await this._loadTileSources()
    // let tileSources = await this._loadTileSources()
    if (!this.shoelace) {
      let osdWrapper = this.el.shadowRoot.querySelector('.osd-wrapper')
      let height = osdWrapper.clientHeight
      let container: HTMLElement = this.el.shadowRoot.getElementById('osd')
      if (container) {
        osdWrapper.removeChild(container)
      }
      container = document.createElement('div')
      container.id = 'osd'
      container.style.height = `${height}px`
      osdWrapper.appendChild(container)
      this._viewer = new (window as any).CurtainSyncViewer({
        mode: this.mode, // 'sync' or 'curtain'
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
          maxZoomPixelRatio: 3,
          viewportMargins: {left:0, top:0, bottom:0, right:0}
        }
      })
    }
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
      showRotationControl: true,
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
    }

    // console.log(`homeFillsViewer=${osdConfig.homeFillsViewer}`)
    // this._viewer = OpenSeadragon(osdOptions);

    this._viewer = OpenSeadragon(osdOptions)
    if (location.hostname.indexOf('iiif') < 0 && this.noScroll) this.configureScrollBehavior()

    this._annotator = new Annotator(this._viewer, this.el.shadowRoot.querySelector('#toolbar'), this.authToken)
    if (this._annoTarget) this._annotator.loadAnnotations(this._annoTarget).then(annos => this._annotations = annos)
    
    this.showAnnotationsToolbar(this.canAnnotate())
    this.showAnnotations(this.canAnnotate())

    this._viewer.addHandler('home', (e) => this.positionImage(e.immediately))
    this._viewer.addHandler('page', (e) => this._selectedIdx = e.page)

    // Reposition image in viewport after transition back from full screen mode
    this._viewer.addHandler('resize', () => setTimeout(() => this._viewer.viewport.goHome(true), 10))

    this._viewer.world.addHandler('add-item', () => this.positionImage(true))
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
    // console.log(`positionImage immediately=${immediately}`, this._current)
    setTimeout(() => {
      if (this._current.options.region !== 'full') {
        this.setRegion(this._current.options.region, immediately)
      } else {
        let imageData = imageInfo(this._current.manifest)
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
    let imgInfo = imageInfo(this._current.manifest)
    let ratio = imgInfo.width / imgInfo.height
    let depictsPanelWidth = 300
    if (ratio < 0) {
      width = 800
      height = width * ratio
    } else {
      height = 800
      width = height * ratio
    }
    let url = location.hostname === 'localhost'? 'http://localhost:4444/' : 'https://annotator.juncture-digital.org/'
    // let url = 'https://annotator.visual-essays.net/'
    url += `?manifest=${this._current.manifest.id || this._current.manifest['@id']}`
    if (this.annoBase) url += `&anno-base=${this.annoBase}`
    url += `&auth-token=${this.authToken}`
    this.openWindow(url, `toolbar=yes,location=yes,left=0,top=0,width=${width+depictsPanelWidth},height=${height+200},scrollbars=yes,status=yes`)
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
          <div class="osd-wrapper">
          {this.compare && this.shoelace
            ? <sl-image-comparer position="0">
              {this._tileSources.map((ts:any, idx:number) =>
                <img
                  slot={idx === 0 ? 'before' : 'after'}
                  src={ts.url}
                  alt={this._value(this._images[idx].manifest.label).toString()}
                />
              )}
              </sl-image-comparer>
            : <div id="osd"></div>
          }
          <div id="instructions" class="hidden">use ctrl + scroll or 2 fingers to zoom image.</div>
          <sl-drawer label="" contained class="drawer-contained" placement="start" style={{'--size': '40%'}}>
          <ve-manifest images={this.serializedManifests()} condensed></ve-manifest>
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
                  <div class="anno">
                    <sl-tooltip content="Copy annotation ID">
                      <sl-icon-button class="anno-copy" onClick={this._copyTextToClipboard.bind(this, anno.id.split('/').pop())} name="clipboard" label="Copy annotation ID"></sl-icon-button>
                    </sl-tooltip>
                    <span class="anno-link" onClick={this.setRegion.bind(this, anno.target.selector.value.split('=').pop(), false)}>{anno.body[0].value}</span>
                  </div>
                )}
              </div>
            : null
          }
          </sl-drawer>
        </div>
        {!this.compare && <span id="coords" class="viewport-coords" onClick={this._copyTextToClipboard.bind(this, this._viewportBounds)}>{this._viewportBounds}</span>}
        <div id="caption">
          <sl-tooltip content={`${this._infoPanelIsOpen ? 'Close' : 'Open'} image info panel`} disabled={this.isTouchEnabled()}>
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
        <div id="image-info-popup"></div>
      </div>]
    : [
        <div id="toolbar"></div>,
        <div id="wrapper">
          <div class="osd-wrapper">
            <div id="osd"></div>
            <div id="instructions" class="hidden">use ctrl + scroll or 2 fingers to zoom image.</div>
          </div>
        </div>
    ]
  }
}
