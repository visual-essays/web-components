import { Component, Element, Prop, State, h } from '@stencil/core';
import OpenSeadragon from 'openseadragon'
import L from 'leaflet'
import YouTubePlayer from 'youtube-player'

import { getManifest, imageInfo, makeSticky } from '../../utils'
const youtubeDomains = new Set(['youtube.com', 'youtube.co.uk', 'youtu.be'])

@Component({
  tag: 've-component',
  styleUrl: 've-component.css',
  shadow: true,
})
export class VeComponent {

  @Prop() entities: string
  @Prop() cards: boolean = false
  @Prop({ mutable: true, reflect: true }) width: string
  @Prop({ mutable: true, reflect: true }) height: string
  @Prop() sticky: boolean

  @Prop() image: string
  @Prop() map: string
  @Prop() zoom: number = 10
  @Prop() video: string

  @Element() el: HTMLElement;

  @State() position: string
  @State() _entities: string[] = []
  
  youTubeId: string

  imageViewer: OpenSeadragon.Viewer
  mapViewer: L.Map
  videoPlayer: any

  connectedCallback() {
    this.position = this.el.classList.contains('full')
      ? 'full'
      : this.el.classList.contains('left')
        ? 'left'
        : this.el.classList.contains('right') ? 'right' : null
    this.el.classList.add('ve-component')
    this._entities = this.entities ? this.entities.split(/\s+/).filter(qid => qid) : []
    // console.log(`ve-component: entities=${this._entities}`)
  }

  componentWillLoad() {}

  async componentDidLoad() {
    if (this.sticky) makeSticky(this.el)
    if (this.image) {
      this.osdInit()
      let img = await getManifest(this.image).then(manifest => imageInfo(manifest))
      let hwRatio = img.height/img.width
      let orientation = img.height > img.width ? 'portrait' : 'landscape'
      if (!this.position) this.position = orientation === 'landscape' ? 'full' : 'right'
      this.el.classList.add(this.position)
      // console.log(`width=${this.width} height=${this.height} hwRatio=${hwRatio} position=${this.position} orientation=${orientation}`)
      
      if (this.width) {
        this.el.style.width = this.width
        if (!this.height) {
          let width = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
          this.height = `${Math.round(width * hwRatio)}px`
          this.el.style.height = this.height
        }
      } else if (this.height) {
        this.el.style.height = this.height
        if (!this.width) {
          let height = parseInt(window.getComputedStyle(this.el).height.slice(0,-2))
          this.width = `${Math.round(height / hwRatio)}px`
          this.el.style.width = this.width
        }
      } else if (this.position === 'full') {
        let height = parseInt(window.getComputedStyle(this.el).width.slice(0,-2)) * .5
        let width = Math.round(height / hwRatio)
        this.height = this.height || `${height}px`
        this.width = `${width}px`
      } else { // position is 'left' or 'right'
        let width = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
        let height = Math.round(width * hwRatio)
        this.width = `${width}px`
        this.height = this.height || `${height}px`
      }
      let tileSource = img.service
        ? `${(img.service[0].id || img.service[0]['@id']).replace(/\/info\.json$/,'')}/info.json`
        : { url: img.id, type: 'image', buildPyramid: true }
        
      this._setHostDimensions()
      this.imageViewer.open(tileSource)
    } else if (this.map) {
      this._setHostDimensions()
      this.mapInit()
    } else if (this.video) {
      if (this.video.indexOf('http') === 0) {
        let videoUrl = new URL(this.video)
        let domain = videoUrl.hostname.replace(/^www\./, '')
        if (youtubeDomains.has(domain)) {
          this.youTubeId = videoUrl.searchParams.get('v')
          let hwRatio = 360/640 // standard YouTube player size
          let width, height
          if (this.position === 'full') {
            height = this.height
              ? parseInt(this.height.slice(0,-2))
              : parseInt(window.getComputedStyle(this.el).width.slice(0,-2)) * .5
            width = this.width
              ? parseInt(this.width.slice(0,-2))
              : Math.round(height / hwRatio)
          } else {
            width = this.width
              ? parseInt(this.width.slice(0,-2))
              : parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
            height = this.height
              ? parseInt(this.height.slice(0,-2))
              : Math.round(width * hwRatio)
          }
          this.width = `${width}px`
          this.height = `${height}px`
          this.initYouTubePlayer()
          this.videoPlayer.on('ready', () => this._setHostDimensions())
        }
      }
    }
  }
  
  _setHostDimensions() {
    let content: HTMLElement = this.el.shadowRoot.querySelector('.content')
    content.style.width = this.width ? this.width : '100%'
    if (this.height) {
      this.el.style.height = this.height
      content.style.height = '100%'
    } else {
      content.style.height = this.position === 'full'
        ? `${parseInt(window.getComputedStyle(content).width.slice(0,-2)) * .5}px`
        : window.getComputedStyle(content).width // set height equal to width
    }
    let elWidth = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
    let elHeight = parseInt(window.getComputedStyle(content).height.slice(0,-2))
    let type = this.image ? 'image' : this.map ? 'map' : 'video'
    console.log(`ve-content: type=${type} elWidth=${elWidth} elHeight=${elHeight} requestedWidth=${this.width} requestedHeight=${this.height}`)
  }

  osdInit() {
    this.imageViewer = OpenSeadragon({
      element: this.el.shadowRoot.querySelector('#osd'),
      homeFillsViewer: true,
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      minZoomImageRatio: 0.2,
      maxZoomPixelRatio: 5
    })
  }

  mapInit() {
    let [lat, lng] = this.map.split(',').map(val => parseFloat(val.trim()))
    let center = new L.LatLng(lat, lng)
    this.mapViewer = L.map(this.el.shadowRoot.getElementById('map'), {
      center, 
      zoom: this.zoom,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19, attribution: '© OpenStreetMap'
        })
      ]
    })
  }

  initYouTubePlayer() {
    this.videoPlayer = YouTubePlayer(
      this.el.shadowRoot.getElementById('video'), {
        videoId: this.youTubeId,
        playerVars: {
          color: 'white',
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          autoplay: 0,
          start: 0
        }
      }
    )
  }

  render() {
    return <div class="content">
      {this.image && <div id="osd" style={{height:'100%'}}></div>}
      {this.map && <div id="map" style={{width: '100%', height: '100%'}}></div>}
      {this.video && <div id="video" style={{width:this.width, height:this.height}}></div>}
    </div>
  }

}
