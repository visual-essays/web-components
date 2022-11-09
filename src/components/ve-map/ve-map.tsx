import { Component, Element, Prop, State, Watch, h } from '@stencil/core';

import L from 'leaflet'
import 'leaflet.control.opacity'
// import { indexOf } from 'lodash';

import { isQID, getEntity, makeSticky } from '../../utils'

@Component({
  tag: 've-map',
  styleUrl: 've-map.css',
  shadow: true,
})
export class MapViewer {
  @Prop() overlay: string
  @Prop({ mutable: true, reflect: true }) zoom: number = 10
  @Prop({ mutable: true, reflect: true }) center: string
  @Prop({ mutable: true, reflect: true }) marker: string
  @Prop({ mutable: true, reflect: true }) caption: string
  @Prop() width: string
  @Prop() height: string
  @Prop() sticky: boolean
  @Prop() full: boolean
  @Prop() left: boolean
  @Prop() right: boolean
  @Prop() entities: string
  @Prop() cards: string

  @Element() el: HTMLElement;

  position: string

  @State() map: L.Map
  @State() allmapsLayer: L.TileLayer
  @State() opacitySlider: HTMLInputElement
  @State() _entities: string[] = []

  @State() _markers: any[] = []
  @State() _layerObjs: any[] = []
  @State() _layers: L.TileLayer[] = []

  @Watch('center')
  async centerChanged() {
    console.log('map.centerChanged', this.center)
  }

  @Watch('_layerObjs')
  async _layerObjsChanged() {
    // console.log('map._layerObjs', this._layerObjs)
    this._layers = this._layerObjs.map(ls => {
      if (ls.allmaps) {
        this.allmapsLayer = L.tileLayer(`https://allmaps.xyz/maps/${ls.allmaps}/{z}/{x}/{y}.png`, { maxZoom: 19, attribution: 'Allmaps' })
        return this.allmapsLayer
      } else {
        this._markers.push()
      }
    })
  }

  @Watch('_layers')
  async _layersChanged() {
    if (this.map) this._layers.forEach(layer => layer.addTo(this.map))
   }

  @Watch('map')
   async mapChanged() {
     this._layers.forEach(layer => layer.addTo(this.map))
     if (this.allmapsLayer) this.opacitySlider = this.el.shadowRoot.getElementById('opacity-slider') as HTMLInputElement
  }
 
  doLayout() {
    let position = this.right ? 'right' : this.left ? 'left' : this.full ? 'full' : null
    if (!position) {
      position = 'full'
      this.full = true
    }

    console.log(`width=${this.width} height=${this.height} position=${position} sticky=${this.sticky}`)
    
    const floatMargin = 12

    let width, height
    if (this.full) { // Full-width layout
      this.el.classList.add('full')
      this.el.style.width = this.width || '100%'
      let elWidth = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
      // console.log(`elWidth=${elWidth}`)
      if (this.sticky) {
        let maxHeight = Math.round(window.innerHeight * .4)
        // console.log(`maxHeight=${maxHeight}`)
        width = elWidth
        height = width > maxHeight ? maxHeight : width
      } else {
        width = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
        height = width
      }     
      this.el.style.width = '100%'

    } else { // Half-width layout
      this.el.style.float = this.right ? 'right' : 'left'
      this.el.classList.add(this.right ? 'right' : 'left')
      this.el.style.width = this.width || '50%'
      width = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
      height = width
    }
    this.el.style.height = `${height + 12}px`

    if (this.sticky) this.el.style.paddingTop = '6px'
    
    let content: HTMLElement = this.el.shadowRoot.querySelector('.content')
    if (this.left) content.style.marginRight = `${floatMargin}px`
    else if (this.right) content.style.marginLeft = `${floatMargin}px`
    content.style.width = `${width}px`
    content.style.height = `${height}px`
  }

  connectedCallback() {
    this.el.classList.add('ve-component')
    this._entities = this.entities ? this.entities.split(/\s+/).filter(qid => qid) : []
    if (this.cards) {
      let cardsEl = document.getElementById(this.cards)
      if (cardsEl) {
        cardsEl.querySelectorAll('.card').forEach(card => {
          let coords = Array.from(card.querySelectorAll('li'))
            .filter(li => li.innerHTML.trim().indexOf('coords:') === 0)
            .map(coordsEl => coordsEl.innerHTML.split(':')[1].trim())
            .map(coordsStr => coordsStr.split(',').map(s => parseFloat(s.trim())))
            .pop()
          if (coords) this._markers.push({coords, card: card.innerHTML})
        })
      }
    }
    this.getLayerStrings()
    this.listenForSlotChanges()
  }

  componentDidLoad() {
    this.doLayout()
    if (this.sticky) makeSticky(this.el)
    const resizeObserver = new ResizeObserver(() => {
      this.initMap()
    })
    resizeObserver.observe(this.el.shadowRoot.getElementById('map'))
    this.initMap()
  }

  _toObj(s:string) {
    let tokens = []
    s.match(/[^\s"']+|"([^"]*)"/gmi).forEach(token => {
      if (tokens.length > 0 && tokens[tokens.length-1].indexOf('=') === tokens[tokens.length-1].length-1) tokens[tokens.length-1] = `${tokens[tokens.length-1]}${token}`
      else tokens.push(token)
    })
    // console.log(tokens)
    return Object.fromEntries(tokens.map(token => token.indexOf('=') > 0 ? token : `${token}=true`).map(kvp => kvp.split('=')))
  }

  getLayerStrings() {
    this._layerObjs = Array.from(this.el.querySelectorAll('li')).map(item => this._toObj(item.firstChild.textContent))
  }

  listenForSlotChanges() {
    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && Array.from(mutation.target.classList).indexOf('hydrated') >= 0) {
          this.getLayerStrings ()       
        }
      }
    }
    const observer = new MutationObserver(callback);
    observer.observe(this.el, { childList: true, subtree: true, characterData: true })
  }

  async coordsFromEntity(qid: string) {
    let entity = await getEntity(qid)
    let [lat, lng] = entity.coords.split(',').map(val => parseFloat(val.trim()))
    return new L.LatLng(lat, lng)
  }

  async initMap() {
    // console.log('initMap', this.el.parentElement.clientHeight)
    let center: L.LatLng
    if (this.center) {
      center = await this.latLng(this.center)
    } else if (this.entities) {
      center = await this.coordsFromEntity(this._entities[0])
      this.zoom = 9
    } else {
      center = new L.LatLng(0, 0)
      this.zoom = 6
    }

    // console.log(`center=${center} zoom=${this.zoom}`)
    if (this.map) {
      this.map.off()
      this.map.remove()
    }
    this.map = L.map(this.el.shadowRoot.getElementById('map'), {
      preferCanvas: true,
      zoomSnap: 0.1,
      center, 
      zoom: this.zoom,
      scrollWheelZoom: false,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19, attribution: '© OpenStreetMap'
        })
      ]
    })
    
    this.map.on('zoomend', (e) => this.getLatLngZoom(e))
    this.map.on('moveend', (e) => this.getLatLngZoom(e))

    /*
    if (this.overlay) {
      this.opacitySlider = this.el.shadowRoot.getElementById('opacity-slider') as HTMLInputElement
      this.allmapsLayer = L.tileLayer(`https://allmaps.xyz/maps/${this.overlay}/{z}/{x}/{y}.png`, {
        maxZoom: 19, attribution: 'Allmaps'
      }).addTo(this.map)
    }
    */

    const myIcon = L.icon({iconUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png'})
    
    if (this.marker) {
      L.marker(await this.latLng(this.marker), {icon: myIcon}).addTo(this.map)
    }

    this._markers.forEach(marker => {
      let m = L.marker(marker.coords, {icon: myIcon}).addTo(this.map)
      m.bindPopup(`<div class="card">${marker.card}</div>`)
    })
  }

  getLatLngZoom(e) {
    let center = e.target.getCenter()
    let zoom = e.target.getZoom()
    let resp = [center.lat, center.lng, zoom]
    return resp
  }

  async latLng(pos:string) {
    if (isQID(pos)) {
      return await this.coordsFromEntity(this.center)
    } else {
      let [lat, lng] = this.center.split(',').map(val => parseFloat(val.trim()))
      return new L.LatLng(lat, lng)
    }
  }

  updateOpacity() {
    this.allmapsLayer.setOpacity(parseFloat(this.opacitySlider.value))
  }

  renderMap() {
    return <div id="map" style={{width: '100%', height: '100%'}}></div>
  }

  renderCaption() {
    return <div id="caption" innerHTML={this.caption}></div>
  }

  render() {
      return [
        <div class="content">
          {this.renderMap()}
          {this.caption && this.renderCaption()}
        </div>,
        this.allmapsLayer && <input id="opacity-slider" type="range" min="0" max="1" step="0.02" value="1" onInput={this.updateOpacity.bind(this)}></input>
      ]
    }
}
