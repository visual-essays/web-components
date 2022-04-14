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
        ? this._iiifUrl(imageInfo.service.id, this.imageOptions)
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
    let size = `${this.el.clientWidth > 1000 ? 1000 : this.el.clientWidth},${this.height > 1000 ? 1000 : this.height}`
    let url = `${serviceUrl}/${options.region}/!${size}/${options.rotation}/${options.quality}.${options.format}`
    // console.log('_iiifUrl', url)
    return url
  }

  connectedCallback() {
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
    if (this.sticky) this.el.classList.add('sticky')  
    getManifest(this.background).then(manifest => this._manifest = manifest)
  }

  htmlToElem(html: string) {
    return new DOMParser().parseFromString(html, 'text/html').children[0].children[1]
  }

  render() {
    return [
      <section class="ve-header"></section>,
      this.navItems.length > 0 && 
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
          { this.navItems.map((item:any) => <li><a href={item.href}>{item.label}</a></li>) }
          </ul>
        </div>
      </nav>,
      <div class="title-panel">
        <a href="/"><div class="title">{this.label}</div></a>
        {this.subtitle && <div class="subtitle">{this.subtitle}</div>}
      </div>
    ]
  }
}