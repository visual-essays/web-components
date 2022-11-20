import { Component, Element, Prop, h, State, Watch } from '@stencil/core';

import './mirador.min.js'
import { defaults } from './config.js'

import { md5, makeSticky, parseRegionString } from '../../utils'

const Mirador:any = (window as any).Mirador

@Component({
  tag: 've-media',
  styleUrl: 've-media.css',
  shadow: false,
})
export class VeMirador {

  @Element() el: HTMLElement;

  @Prop() manifest: string
  @Prop({ mutable: true, reflect: true }) seq: number = 1
  @Prop({ mutable: true, reflect: true }) alt: string

  @Prop() options: string
  @Prop() fit: string
  @Prop() zoomOnScroll: boolean = false

  // Positioning props
  @Prop({ mutable: true, reflect: true }) position: string
  @Prop() width: string
  @Prop() height: string
  @Prop() full: boolean = false
  @Prop() left: boolean = false
  @Prop() right: boolean = false
  @Prop() sticky: boolean

  @Prop() entities: string

  // Display multiple images as gallery
  @Prop() grid: boolean = false
  @Prop() cards: boolean = false

  // Display multiple images in compare mode
  @Prop() compare: boolean = false
  @Prop() curtain: boolean = false
  @Prop() sync: boolean = false

  @Prop({ mutable: true, reflect: true }) autostart: boolean = false
  @Prop({ mutable: true, reflect: true }) start: string
  @Prop({ mutable: true, reflect: true }) end: string
  @Prop({ mutable: true, reflect: true }) muted: boolean = true

  @Prop() annoBase: string

  @State() id: string
  @State() osd: OpenSeadragon.Viewer = null
  @State() videoPlayer: HTMLVideoElement = null
  @State() audioPlayer: HTMLAudioElement = null
  @State() osdReady: boolean = false
  @State() sourceDimensions: any = {}

  wrapperEl: HTMLElement = null
  miradorEl: HTMLElement = null
  miradorViewer: any = null

  // video and audio player state
  isMuted: boolean = false
  isPlaying: boolean = false
  startTimes: any = {}
  timeoutId: any = null
  forceMuteOnPlay: boolean = true

  @Watch('manifest')
  manifestChanged() {
    this.id = md5(this.manifest).slice(0,8)
  }

  @State() viewportBounds
  @State() debounce: any = null
  getViewportBounds() {
    if (this.debounce !== null) {
      clearTimeout(this.debounce)
      this.debounce = null
    }
    this.debounce = window.setTimeout(() => {
      const tiledImage = this.osd.world.getItemAt(0)
      if (tiledImage) {
        const imageBounds = tiledImage.viewportToImageRectangle(this.osd.viewport.getBounds())
        this.viewportBounds = `${Math.ceil(imageBounds.x)},${Math.ceil(imageBounds.y)},${Math.ceil(imageBounds.width)},${Math.ceil(imageBounds.height)}`
      }
    }, 500)
  }

  @Watch('osd')
  onOsdFound() {
    this.osd.world.addHandler('add-item', () => {
      this.sourceDimensions = this.osd.world.getItemAt(0).source.dimensions
      setTimeout(() => this.osdReady = true, 2)
    })
    this.osd.addHandler('viewport-change', () => this.getViewportBounds())
  }

  @Watch('videoPlayer')
  onvVdeoPlayerFound() {
    this.videoPlayer.addEventListener('loadeddata', () => {
      this.sourceDimensions = {x: this.videoPlayer.videoWidth, y: this.videoPlayer.videoHeight}
      this.monitor()
      if (this.autostart) this.seekTo(this.start || '0', this.end || `${this.videoPlayer.duration}`)
    })
  }

  @Watch('audioPlayer')
  onAudioPlayerFound() {
    this.audioPlayer.addEventListener('loadedmetadata', () => this.sourceDimensions = {x: this.audioPlayer.clientWidth, y: this.audioPlayer.clientHeight})
  }

  @Watch('sourceDimensions')
  onSourceDimensionsChanged() {
    this.doLayout()
  }

  @Watch('osdReady')
  onOsdReady() {
    // console.log('osdReady')
    this.positionImage(true)
  }

  @Watch('viewportBounds')
  viewportBoundsChanged() {
    // console.log(`viewportBounds=${this.viewportBounds}`)
  }

  connectedCallback() { 
    this.id = `mirador-${md5(this.manifest).slice(0,8)}`
    this.el.classList.add('ve-component')
  }

  // componentWillLoad() { console.log('componentWillLoad') }
  // componentWillRender() { console.log('componentWillRender') }

  componentDidRender() {
    if (!this.miradorEl) this.doOnFirstRender()
  }

  // componentDidLoad() { console.log('componentDidLoad') }
  // componentWillUpdate() { console.log('componenWillUpdate') }
  // componentDidUpdate() { console.log('componenDidUpdate') }

  doOnFirstRender() {
    this.wrapperEl = document.getElementById(`ve-media-${this.id}`)
    this.miradorEl = document.getElementById(`mirador-${this.id}`)
    if (this.sticky) makeSticky(this.el)
    this.doLayout()

    // Watch Mirador element to get viewer references
    const observer = new MutationObserver(() => {
      let videoEl = this.miradorEl.querySelector('video')
      if (videoEl) {
        if (!this.videoPlayer) this.videoPlayer = videoEl
      } else {
        let audioEl = this.miradorEl.querySelector('audio')
        if (audioEl) {
          if (!this.audioPlayer) this.audioPlayer = audioEl
        } else {
          Array.from(document.querySelectorAll('.mirador-osd-container')).forEach(container => {
            let osdContainer = this.miradorEl.querySelector(`#${container.id}`)
            if (osdContainer && !this.osd) this.osd = window['osdInstances'][osdContainer.id.slice(0,-4)]
          })
        }
      }
    })
    observer.observe(this.miradorEl, { childList: true, subtree: true, attributes: true })
    this.initMiradorViewer()

    this.addInteractionHandlers()
  }

  async doLayout() {

    let el = this.wrapperEl
    let requestedWidth = this.width
    let requestedHeight = this.height

    let orientation = this.sourceDimensions.y > this.sourceDimensions.x ? 'portrait' : 'landscape'
    let hwRatio = Number((this.sourceDimensions.x/this.sourceDimensions.y).toFixed(4))

    this.position = this.position ? this.position : this.right ? 'right' : this.left ? 'left' : 'full'
    this.el.classList.add(this.position)

    let mediaType = this.videoPlayer ? 'video' : this.audioPlayer ? 'audio' : 'image'
    // console.log(`ve-mirador.doLayout: type=${mediaType} seq=${this.seq} requestedWidth=${requestedWidth} requestedHeight=${requestedHeight} hwRatio=${hwRatio} position=${this.position} orientation=${orientation} compare=${this.compare} zoomOnScroll=${this.zoomOnScroll} width=${this.sourceDimensions.x} height=${this.sourceDimensions.y} hwRatio=${hwRatio}`)
    
    const miradorHeaderHeight = 50
    
    if (this.position === 'full') { // Full-width layout

      el.style.width = requestedWidth || '100%'      
      let width = parseInt(window.getComputedStyle(el).width.slice(0,-2))   
      el.style.height = requestedHeight || (mediaType === 'audio' ? '200px' : `${Math.round(width / hwRatio) + miradorHeaderHeight}px`)
      let height = parseInt(window.getComputedStyle(el).height.slice(0,-2)) || (orientation === 'portrait' ? Math.round(width * hwRatio) : Math.round(width / hwRatio))  
      
      if (this.sticky) {
        let maxHeight = Math.round(window.innerHeight * .4)
        if (height > maxHeight) {
          el.style.height = `${maxHeight}px`
          el.style.width = `${Math.round(height / hwRatio)}px`
        }
      }

    } else { // Half-width layout (left or right)

      el.style.float = this.position
      el.style.width = requestedWidth || '50%'
      let width = parseInt(window.getComputedStyle(el).width.slice(0,-2))
      el.style.height = requestedHeight || (mediaType === 'audio' ? '200px' :`${Math.round(width / hwRatio + miradorHeaderHeight)}px`)

    }
  }

  positionImage(immediately:boolean=false) {
    if (this.options) this.setRegion(this.options, immediately)
    else this.osd.viewport.goHome(immediately)
  }

  setRegion(region: string, immediately:boolean=false) {
    this.osd.viewport.fitBounds(parseRegionString(region, this.osd), immediately)
  }

  copyTextToClipboard(text: string) {
    if (navigator.clipboard) navigator.clipboard.writeText(text)
  }

  initMiradorViewer() {
    let config = {...defaults, ...{ 
      element: this.miradorEl,
      windows: [ 
        {
          loadedManifest: this.manifest,
          canvasIndex: this.seq-1,
        }
      ],
      thumbnailNavigation: {
        displaySettings: false
      }
    }}
    this.miradorViewer = Mirador.viewer(config)
  }

  addInteractionHandlers() {
    Array.from(document.querySelectorAll('[enter],[exit]')).forEach((el:HTMLElement) => {
      let veMedia = this.findVeMedia(el)
      if (veMedia) this.addMutationObserver(el)
    })

    Array.from(document.querySelectorAll('mark')).forEach(mark => {
      for (let idx=0; idx < mark.attributes.length; idx++) {
        let attr = mark.attributes.item(idx)
        if (/^\d\b|((\d+):)?([\d.]+,[\d.]+,[\d.]+,[\d.]+|pct:[\d.]+,[\d.]+,[\d.]+,[\d.]+|[0-9a-f]{8}?)$/.test(attr.value)) {
          let veMedia = this.findVeMedia(mark.parentElement)
          if (veMedia) {
            // this._zoomedIn[attr.value] = false
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

  findVeMedia(el: HTMLSpanElement) {
    let sib = el.previousSibling
    while (sib) {
      if (sib.nodeName === 'VE-MEDIA') return sib === this.el ? sib : null
      sib = sib.previousSibling
    }
    while (el.parentElement && el.tagName !== 'MAIN') {
      el = el.parentElement
      let veMedia = el.querySelector(':scope > ve-media')
      if (veMedia) return veMedia === this.el ? veMedia : null
    }
  }

  addMutationObserver(el: HTMLElement) {
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

  async zoomto(arg: string) {
    const found = arg?.match(/^\d\b|((\d+):)?([\d.]+,[\d.]+,[\d.]+,[\d.]+|pct:[\d.]+,[\d.]+,[\d.]+,[\d.]+|[0-9a-f]{8}?)$/)
    if (!found) return
    // let seq = found[1] ? parseInt(found[2].replace(/:$/,'')) : 1
    // let imgIdx = seq - 1
    let region
    let annoRegex = new RegExp('[0-9a-f]{8}')
    if (annoRegex.test(found[3])) {
      /*
      let endpoint = location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://api.juncture-digital.org'
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
      */
    } else {
      region = found[2] ? `${found[2]}${found[3]}` : found[3]
    }
    // console.log(`zoomto: region=${region}`)
    this.setRegion(region)

    // if (seq === this._current.seq) this.positionImage(false)
    // else this._viewer.goToPage(imgIdx)
  }

  monitor() {
    setInterval(async () => {
      this.isMuted = this.getIsMuted()
      this.isPlaying = this.getIsPlaying()
      // if (this.isPlaying) console.log(`ve-media: isMuted=${this.isMuted} isPlaying=${this.isPlaying} currentTime=${this.getCurrentTime()}`)
    }, 1000)
  }

  play() {
    this.videoPlayer.play()
  }

  pause() {
    this.videoPlayer.pause()
  }

  getCurrentTime() {
    return Math.round(this.videoPlayer.currentTime)
  }

  getIsPlaying() {
    return !(this.videoPlayer.ended || this.videoPlayer.paused)
  }

  getIsMuted() {
    return this.videoPlayer.muted
  }

  setMuted(mute:boolean) {
    this.videoPlayer.muted = mute
  }

  hmsToSeconds(str:string) {
    var p = str.split(':').slice(0,3).map(pe => parseInt(pe, 10))
    let secs = 0, m = 1
    while (p.length > 0) {
      secs += m * p.pop()
      m *= 60
    }
    return secs
  }

  seekTo(start:string, end:string) {
    let startSecs = this.hmsToSeconds(start)
    let endSecs = this.hmsToSeconds(end)
    // console.log(`seekTo: start=${startSecs} end=${endSecs} isMuted=${this.isMuted} forceMuteOnPlay=${this.forceMuteOnPlay}`)
    
    // clear delayed pause
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }

    let wasMuted = this.isMuted
    if (this.forceMuteOnPlay) this.setMuted(true)

    setTimeout(() => {
      this.play()
      this.videoPlayer.currentTime = startSecs
      if (endSecs >= startSecs) {
        this.timeoutId = setTimeout(() => {
          this.timeoutId = null
          this.videoPlayer.pause()
          if (!wasMuted && this.forceMuteOnPlay) this.setMuted(false)
        }, endSecs === startSecs ? 200 : (endSecs-startSecs)*1000)
      }
    }, 200)
  }

  renderViewportCoords() {
    return <span id="coords" class="viewport-coords" onClick={this.copyTextToClipboard.bind(this, this.viewportBounds)}>{this.viewportBounds}</span>
  }

  render() {
    return <div id={`ve-media-${this.id}`} class="mirador-wrapper">
      <div id={`mirador-${this.id}`} class="ve-mirador"></div>
      { this.viewportBounds && this.renderViewportCoords() }
    </div>
  }

}
