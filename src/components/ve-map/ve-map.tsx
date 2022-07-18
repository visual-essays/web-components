import { Component, Element, Prop, State, h } from '@stencil/core';

import L from 'leaflet'
import 'leaflet.control.opacity'

@Component({
  tag: 've-map',
  styleUrl: 've-map.css',
  shadow: true,
})
export class MapViewer {
  @Prop() overlay: string
  @Prop() zoom: number = 10
  @Prop() center: string = '0,0'
  @Prop() sticky: boolean

  @Element() el: HTMLElement;

  @State() map: L.Map
  @State() allmapsLayer: L.TileLayer
  @State() opacitySlider: HTMLInputElement
  
  componentDidLoad() {
    this.el.classList.add('ve-component')
    if (this.sticky) this.el.classList.add('sticky')
    this.initMap()
  }

  initMap() {
    let [lat, lng] = this.center.split(',').map(val => parseFloat(val.trim()))
    let center = new L.LatLng(lat, lng)
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
