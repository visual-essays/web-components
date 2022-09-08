import { Component, Element, Prop, State, h, Watch } from '@stencil/core';

import { getManifest, imageDataUrl, imageInfo, parseImageOptions } from '../../utils'

import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-hero',
  styleUrl: 've-hero.css',
  shadow: true
})
export class Header {

  
  @Prop() background: string
  @Prop() options: string
  @Prop() position: string = 'center' // center, top, bottom
  @Prop() sticky: boolean
  @Prop() height: number = 300
  @Prop() top: number = 0

  @Element() el: HTMLElement

  @State() imageOptions: any

  @State() _manifest: any
  @Watch('_manifest')
  _manifestChanged(newValue: object, oldValue: object) {
    if (newValue !== oldValue) this._imageInfo = imageInfo(this._manifest)
  }

  @State() _imageInfo: any
  @Watch('_imageInfo')
  async _imageInfoChanged(imageInfo: any, priorValue: any) {
    if (imageInfo !== priorValue) {
      this._imgUrl = imageInfo.service
        ? this._iiifUrl(imageInfo.service[0].id || imageInfo.service[0]['@id'], this.imageOptions)
        : await imageDataUrl(imageInfo.id, this.imageOptions.region, {width: this.el.clientWidth, height: this.height})
    }
  }

  @State() _imgUrl: any
  @Watch('_imgUrl')
  async _imgUrlChanged(imgUrl: any) {
    this.el.style.backgroundImage = `url('${imgUrl}')`
    this.el.style.backgroundPosition = this.position
  }

  _iiifUrl(serviceUrl: string, options: any) {
    let size = `${this.el.clientWidth},`
    let url = `${serviceUrl.replace(/\/info.json$/,'')}/${options.region}/${size}/${options.rotation}/${options.quality}.${options.format}`
    return url
  }

  connectedCallback() {
    console.log(`ve-hero: height=${this.height} background=${this.background}`)
    this.imageOptions = parseImageOptions(this.options)
    getManifest(this.background).then(manifest => this._manifest = manifest)
    this.el.style.height = `${this.height}px`
    if (this.sticky) this.el.style.position = 'sticky'
    if (this.top) this.el.style.top = `-${this.top}px`
  }

  componentWillLoad() {}

  componentDidLoad() {}

  _showInfoPopup() {
    let popup: HTMLElement = this.el.shadowRoot.querySelector('#image-info-popup')
    let images = encodeURIComponent(JSON.stringify([{manifest: this._manifest}]))
    popup.innerHTML = `<ve-manifest images="${images}" condensed></ve-manifest>`
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block'
  }

  render() {
    return [
      <section>
        <sl-tooltip content="Show image info">
          <sl-icon id="info-icon" name="info-circle-fill" onClick={this._showInfoPopup.bind(this)} title="Image info"></sl-icon>
        </sl-tooltip>
        <div id="image-info-popup"></div>
      </section>
    ]
  }


}