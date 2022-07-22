import { Component, Element, Prop, State, h } from '@stencil/core';

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
  @Prop() sticky: boolean
  @Prop() entities: string

  @Element() el: HTMLElement;

  @State() map: L.Map
  @State() allmapsLayer: L.TileLayer
  @State() opacitySlider: HTMLInputElement
  @State() _entities: string[] = []

  connectedCallback() {
    this._entities = this.entities ? this.entities.split(/\s+/).filter(qid => qid) : []
  }

  componentDidLoad() {
    this.el.classList.add('ve-component')
    if (this.sticky) this.el.classList.add('sticky')
    this.initMap()
  }

  async coordsFromEntity(qid: string) {
    let entity = await getEntity(qid)
    console.log(entity)
    let [lat, lng] = entity.coords.split(',').map(val => parseFloat(val.trim()))
    return new L.LatLng(lat, lng)
  }

  async initMap() {
    let center: L.LatLng
    if (this.center) {
      if (isQID(this.center)) {
        center = await this.coordsFromEntity(this.center)
      } else {
        let [lat, lng] = this.center.split(',').map(val => parseFloat(val.trim()))
        center = new L.LatLng(lat, lng)
      }
    } else if (this.entities) {
      center = await this.coordsFromEntity(this._entities[0])
      this.zoom = 9
    } else {
      center = new L.LatLng(0, 0)
      this.zoom = 6
    }

    console.log(`center=${center} zoom=${this.zoom}`)
    this.map = L.map(this.el.shadowRoot.getElementById('map'), {
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
