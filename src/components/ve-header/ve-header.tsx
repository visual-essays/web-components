import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { parseImageOptions, imageInfo, getManifest, imageDataUrl } from '../../utils'

@Component({
  tag: 've-header',
  styleUrl: 've-header.css',
  shadow: true
})
export class Header {
  
  @Element() el: HTMLElement

  @Prop() label: string
  @Prop() background: string
  @Prop() subtitle: string
  @Prop() options: string
  @Prop() height: number = 300
  @Prop() sticky: boolean
  @Prop() position: string = 'center' // center, top, bottom

  @State() imageOptions: any
  @State() navItems: any = []

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
    //let size = `${this.el.clientWidth > 1000 ? 1000 : this.el.clientWidth},${this.height > 1000 ? 1000 : this.height}`
    //let url = `${serviceUrl}/${options.region}/!${size}/${options.rotation}/${options.quality}.${options.format}`
    let url = `${serviceUrl.replace(/\/info.json$/,'')}/${options.region}/${options.size}/${options.rotation}/${options.quality}.${options.format}`
    // console.log('_iiifUrl', url)
    return url
  }

  connectedCallback() {
    if (this.label) {
      let titleEl = document.querySelector('title')
      if (!titleEl) {
        titleEl = document.createElement('title')
        titleEl.innerText = this.label
        document.head.appendChild(titleEl)
      }
    }
    this.imageOptions = parseImageOptions(this.options)
    this.navItems = Array.from(this.el.querySelectorAll('li')).map(navItem =>
      navItem.firstChild.nodeName === 'A'
        ? {label: navItem.firstChild.textContent, href: (navItem.firstChild as HTMLLinkElement).href}
        : {label: navItem.firstChild.textContent}
    )
    // console.log(this.navItems)
    while (this.el.firstChild)
      this.el.removeChild(this.el.firstChild)
  }

  componentDidLoad() {  
    this.el.style.height = `${this.height}px`
    if (this.sticky) {
      this.el.classList.add('sticky')
      document.querySelector('main').classList.add('sticky-header')
    } 
    getManifest(this.background).then(manifest => this._manifest = manifest)
  }

  htmlToElem(html: string) {
    return new DOMParser().parseFromString(html, 'text/html').children[0].children[1]
  }

  _showInfoPopup() {
    let popup: HTMLElement = this.el.shadowRoot.querySelector('#image-info-popup')
    let images = encodeURIComponent(JSON.stringify([{manifest: this._manifest}]))
    popup.innerHTML = `<ve-manifest images="${images}" condensed></ve-manifest>`
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block'
  }

  newPage(href: string) {
    location.href = href
  }

  render() {
    return [
      <section class="ve-header">
        <div class="title-panel">
          <span id="info-icon" onClick={this._showInfoPopup.bind(this)} title="Image info">i</span>
          { this.navItems.length > 0 && 
            <nav>
              <sl-dropdown>
                <sl-button id="menu-toggle" slot="trigger" variant="default" size="medium" circle>
                  <sl-icon name="three-dots-vertical" label="Navigation Meno"></sl-icon>
                </sl-button>
                <sl-menu>
                  { this.navItems.map((item:any) => <sl-menu-item onClick={this.newPage.bind(this, item.href)}>{item.label}</sl-menu-item>) }
                </sl-menu>
              </sl-dropdown>
            </nav>
          }
          <a href="/"><div class="title">{this.label}</div></a>
          {this.subtitle && <div class="subtitle">{this.subtitle}</div>}
          <div id="image-info-popup"></div>
        </div>
      </section>
    ]
  }
}