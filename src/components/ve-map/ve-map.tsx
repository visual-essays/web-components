import { Component, Element, Prop, State, Watch, h } from '@stencil/core';

import L from 'leaflet'
import 'leaflet.control.opacity'
// import { indexOf } from 'lodash';

import { isQID, getEntity } from '../../utils'

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
  @Prop({ mutable: true, reflect: true }) width: string
  @Prop({ mutable: true, reflect: true }) height: string
  @Prop() sticky: boolean
  @Prop() entities: string
  @Prop() cards: string

  @Element() el: HTMLElement;

  @State() position: string

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
 
  connectedCallback() {
    this.position = this.el.classList.contains('full')
      ? 'full'
      : this.el.classList.contains('left')
        ? 'left'
        : this.el.classList.contains('right') ? 'right' : 'full'
    this.el.classList.add(this.position)
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
    if (this.sticky) this.el.classList.add('sticky')
    const resizeObserver = new ResizeObserver(() => {
      this._setHostDimensions()
      this.initMap()
    })
    resizeObserver.observe(this.el.shadowRoot.getElementById('map'))
    this._setHostDimensions()
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

  _setHostDimensions() {
    let content: HTMLElement = this.el.shadowRoot.querySelector('.content')
    content.style.width = this.width ? this.width : '100%'
    if (this.height) {
      this.el.style.height = this.height
      content.style.height = '100%'
    } else {
      content.style.height = this.position === 'full'
        ? `${parseInt(window.getComputedStyle(this.el).width.slice(0,-2)) * .5}px`
        : window.getComputedStyle(content).width // set height equal to width
    }
    let elWidth = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
    let elHeight = parseInt(window.getComputedStyle(content).height.slice(0,-2))
    console.log(`ve-map: position=${this.position} elWidth=${elWidth} elHeight=${elHeight} requestedWidth=${this.width} requestedHeight=${this.height}`)
  }

  render() {
      return [
        <div class="content">
          <div id="map" style={{width: '100%', height: '100%'}}></div>
        </div>,
        this.allmapsLayer && <input id="opacity-slider" type="range" min="0" max="1" step="0.02" value="1" onInput={this.updateOpacity.bind(this)}></input>
      ]
    }
}
