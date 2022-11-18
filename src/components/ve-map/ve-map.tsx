import { Component, Element, Prop, State, Watch, h } from '@stencil/core';

import L, { LatLng } from 'leaflet'
import 'leaflet.control.opacity'
// import { indexOf } from 'lodash';

import { isQID, getEntity, makeSticky } from '../../utils'

const markerIconTemplate = {
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  shadowSize:  [41, 41]
}

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
  @State() opacitySlider: HTMLInputElement
  @State() _entities: string[] = []


  @State() _layerObjs: any[] = []
  @State() _layers: any = {tileLayers:[], geoJsonLayers:[]}

  @Watch('center')
  async centerChanged() {
    console.log('map.centerChanged', this.center)
  }

  @Watch('_layerObjs')
  async _layerObjsChanged() {
    let _layerObjs = await Promise.all(this._layerObjs)
    
    let layers: any = {}

    let locations = _layerObjs.filter(item => item.coords || item.qid)
    let _geoJsonLayers = []
    if (locations.length > 0) _geoJsonLayers.push(this.toGeoJSON(locations))
    layers.geoJsonLayers = _geoJsonLayers
    
    layers.tileLayers = _layerObjs.map(ls => {
      if (ls.allmaps) {
        return L.tileLayer(`https://allmaps.xyz/maps/${ls.allmaps}/{z}/{x}/{y}.png`, { maxZoom: 19, attribution: 'Allmaps' })
      }
    }).filter(layer => layer)

    this._layers = layers

  }

  @Watch('_layers')
  _layersChanged() {
    this.updateMap()
  }

  @Watch('map')
   mapChanged() {
      this.updateMap()
  }

  updateMap() {
    if (this.map) {
      this._layers.tileLayers.forEach(layer => layer.addTo(this.map))
      this._layers.geoJsonLayers.forEach(layer => layer.addTo(this.map))
      this.opacitySlider = this._layers.tileLayers.length > 0 ? this.el.shadowRoot.getElementById('opacity-slider') as HTMLInputElement : null
    }
  }
 
  doLayout() {
    let position = this.right ? 'right' : this.left ? 'left' : this.full ? 'full' : null
    if (!position)  position = 'full'

    console.log(`ve-map: width=${this.width} height=${this.height} position=${position} sticky=${this.sticky}`)
    
    const floatMargin = 12

    let width, height
    if (position === 'full') { // Full-width layout
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
      this.el.style.float = position
      this.el.classList.add(position)
      this.el.style.width = this.width || '50%'
      width = parseInt(window.getComputedStyle(this.el).width.slice(0,-2))
      height = width
    }
    this.el.style.height = `${height + 12}px`

    if (this.sticky) this.el.style.paddingTop = '6px'
    
    let content: HTMLElement = this.el.shadowRoot.querySelector('.content')
    if (position === 'left') content.style.marginRight = `${floatMargin}px`
    else if (position === 'right') content.style.marginLeft = `${floatMargin}px`
    content.style.width = `${width}px`
    content.style.height = `${height}px`
  }

  componentWillLoad() {
    this.el.classList.add('ve-component')
    this._entities = this.entities ? this.entities.split(/\s+/).filter(qid => qid) : []
    if (this.cards) {
      let locations: any[] = []
      let cardsEl = document.getElementById(this.cards)
      if (cardsEl) {
        cardsEl.querySelectorAll('.card').forEach(async card => {
          let coords:string = Array.from(card.querySelectorAll('li'))
            .filter(li => li.innerHTML.trim().indexOf('coords:') === 0)
            .map(coordsEl => coordsEl.innerHTML.split(':')[1].trim())
            .pop()
          if (coords) {
            let metadataUl = card.querySelector('ul.card-metadata')
            if (metadataUl) metadataUl.parentElement.removeChild(metadataUl)
            locations.push({coords: this.latLng(coords), caption: card.innerHTML})
          }
        })
      }
      this._layerObjs = locations
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

  _isCoords(str:string) {
    return /^[+-]?\d+(.\d*|\d*),{1}[+-]?\d+(.\d*|\d*)$/.test(str)
  }

  _isZoom(str:string) {
    return /^\d{1,2}(\.\d{1})?$/.test(str)
  }

  _isInt(str:string) {
    return /^[0-9]+$/.test(str)
  }

  async _toObj(s:string) {
    let tokens = []
    s = s.replace(/“/,'"').replace(/”/,'"').replace(/’/,"'")
    s.match(/[^\s"]+|"([^"]*)"/gmi).forEach(token => {
      if (tokens.length > 0 && tokens[tokens.length-1].indexOf('=') === tokens[tokens.length-1].length-1) tokens[tokens.length-1] = `${tokens[tokens.length-1]}${token}`
      else tokens.push(token)
    })
    let obj:any = {}
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i]
      if (token.indexOf('=') > 0) {
        let split = token.split('=')
        obj[split[0]] = split[1]
      } else if (this._isZoom(token)) {
        obj.zoom = parseInt(token)
      } else if (this._isCoords(token)) {
        obj.coords = this.latLng(token)
      } else if (isQID(token)) {
        obj.qid = token
        let entity = await getEntity(token)
        obj.coords = this.latLng(entity.coords)
        obj.caption = entity.label
      } else {
        obj.caption = token[0] === '"' && token[token.length-1] === '"' ? token.slice(1,-1) : token
      }
    }
    return obj
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

  async initMap() {
    let center: L.LatLng
    if (this.center) {
      if (isQID(this.center)) {
        let entity = await getEntity(this.center)
        center = this.latLng(entity.coords)
      } else {
        center = this.latLng(this.center)
      }
    } else if (this.entities) {
      let entity = await getEntity(this._entities[0])
      center = this.latLng(entity.coords)
      this.zoom = 9
    } else {
      center = new L.LatLng(0, 0)
      this.zoom = 6
    }

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

  }

  getLatLngZoom(e) {
    let center = e.target.getCenter()
    let zoom = e.target.getZoom()
    let resp = [center.lat, center.lng, zoom]
    return resp
  }

  latLng(coordsStr:string) {
    let [lat, lng] = coordsStr.split(',').map(val => parseFloat(val.trim()))
    return new LatLng(lat, lng)
  }

  toGeoJSON(locations:any[]): L.GeoJSON {
    const data: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: [] }
    locations.filter(location => location.coords)
      .forEach(location => {
        data.features.push({
          type: 'Feature',
          properties: location,
          geometry: { type: 'Point', coordinates: [location.coords.lng, location.coords.lat] }
        })
      })

  
    const geoJSON = L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        let iconOptions:any = {...markerIconTemplate}
        if (feature.properties.icon) iconOptions.iconUrl = feature.properties.icon
        if (feature.properties.shadowUrl)  iconOptions.shadowUrl = feature.properties.shadowUrl
        if (feature.properties.iconRetinaUrl)  iconOptions.iconRetinaUrl = feature.properties.iconRetinaUrl
        return L.marker(latlng, { icon: new L.Icon(iconOptions) })
      },
      onEachFeature: (feature, layer) => layer.bindPopup(feature.properties.caption)
    })
    
    return geoJSON
  }

  updateOpacity() {
    this._layers.tileLayers[0].setOpacity(parseFloat(this.opacitySlider.value))
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
        <input id="opacity-slider" type="range" min="0" max="1" step="0.02" value="1" onInput={this.updateOpacity.bind(this)}></input>
      ]
    }
}
