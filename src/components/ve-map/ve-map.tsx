import { Component, Element, Prop, State, Watch, h } from '@stencil/core';

import L from 'leaflet'
import 'leaflet.control.opacity'

import { isQID, getEntity } from '../../utils'

@Component({
  tag: 've-map',
  styleUrl: 've-map.css',
  shadow: true,
})
export class MapViewer {
  @Prop() overlay: string
  @Prop({ mutable: true, reflect: true }) zoom: number
  @Prop({ mutable: true, reflect: true }) center: string
  @Prop({ mutable: true, reflect: true }) marker: string
  @Prop() sticky: boolean
  @Prop() entities: string
  @Prop() cards: string

  @Element() el: HTMLElement;

  @State() map: L.Map
  @State() allmapsLayer: L.TileLayer
  @State() opacitySlider: HTMLInputElement
  @State() _entities: string[] = []

  @State() _markers: any[] = []

  @Watch('center')
  async centerChanged() {
    console.log('map.centerChanged', this.center)
  }

  connectedCallback() {
    console.log('connectedCallback')
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
  }

  componentDidLoad() {
    console.log('componentDidLoad')
    this.el.classList.add('ve-component')
    if (this.sticky) this.el.classList.add('sticky')
    const resizeObserver = new ResizeObserver(() => {
      console.log('Size changed')
      this.initMap()

    })
    resizeObserver.observe(this.el.shadowRoot.getElementById('map'))
  }

  async coordsFromEntity(qid: string) {
    let entity = await getEntity(qid)
    console.log(entity)
    let [lat, lng] = entity.coords.split(',').map(val => parseFloat(val.trim()))
    return new L.LatLng(lat, lng)
  }

  async initMap() {
    console.log('initMap', this.el.parentElement.clientHeight)
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

    console.log(`center=${center} zoom=${this.zoom}`)
    if (this.map) {
      this.map.off()
      this.map.remove()
    }
    this.map = L.map(this.el.shadowRoot.getElementById('map'), {
      preferCanvas: true,
      zoomSnap: 0.1,
      center, 
      zoom: this.zoom,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19, attribution: '© OpenStreetMap'
        })
      ]
    })
    
    if (this.overlay) {
      this.opacitySlider = this.el.shadowRoot.getElementById('opacity-slider') as HTMLInputElement
      this.allmapsLayer = L.tileLayer(`https://allmaps.xyz/maps/${this.overlay}/{z}/{x}/{y}.png`, {
        maxZoom: 19, attribution: 'Allmaps'
      }).addTo(this.map)
    }

    const myIcon = L.icon({iconUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png'})
    
    if (this.marker) {
      L.marker(await this.latLng(this.marker), {icon: myIcon}).addTo(this.map)
    }

    this._markers.forEach(marker => {
      let m = L.marker(marker.coords, {icon: myIcon}).addTo(this.map)
      m.bindPopup(`<div class="card">${marker.card}</div>`)
    })
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

  render() {
      return [
        <div class="wrapper">
          <div id="map"></div>
        </div>,
        this.overlay
          ? <input id="opacity-slider" type="range" min="0" max="1" step="0.02" value="1" onInput={this.updateOpacity.bind(this)}></input>
          : null
      ]
    }
}
