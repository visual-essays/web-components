import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { parseImageOptions, imageInfo, imageDataUrl } from '../../utils'

@Component({
  tag: 've-header',
  styleUrl: 've-header.css',
  shadow: true
})
export class Header {
  
  @Prop() label: string
  @Prop() subtitle: string
  @Prop() height: number = 300
  @Prop() sticky: boolean

  @State() imageOptions: any
  @State() position: string = 'center' // center, top, bottom

  @Element() host: HTMLElement
  @State() props: any = {}
  @State() imgSrc: string
  @State() region: string

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
        : await imageDataUrl(imageInfo.id, this.imageOptions.region, {width: this.host.clientWidth, height: this.height})
    }
  }
  
  @State() _imgUrl: any
  @Watch('_imgUrl')
  async _imgUrlChanged(imgUrl: any) {
    this.host.style.backgroundImage = `url('${imgUrl}')`
    this.host.style.backgroundPosition = this.position
  }

  _iiifUrl(serviceUrl: string, options: any) {
    let size = `${this.host.clientWidth},${this.height}`
    let url = `${serviceUrl}/${options.region}/!${size}/${options.rotation}/${options.quality}.${options.format}`
    console.log('_iiifUrl', url)
    return url
  }

  connectedCallback() {
    let propsUl = this.host.querySelector('ul')
    if (propsUl) {
      this.props = Object.fromEntries(Array.from(propsUl.children).map(li => {
        let key = li.innerHTML.split(':')[0]
        let value: any = li.innerHTML.slice(key.length+1).trim()
        if (key === 'img') {
          console.log(value)
          let [image, options, position] = value.split(/\s/)
          value = {image, options: parseImageOptions(options), position}
        } else if (key === 'nav') {
          value = Array.from(this.htmlToElem(value).querySelectorAll('li')).map(navItem => 
            navItem.firstChild.nodeName === 'A'
              ? {label: navItem.firstChild.textContent, href: (navItem.firstChild as HTMLLinkElement).href}
              : {label: navItem.firstChild.textContent}
          )
        }
        return [key, value]
      }))
      console.log(this.props)
    }
    this.imgSrc = this.props.img.image
    this.imageOptions = this.props.img.options
    this.position = this.props.img.position

    //this.region = img.attributes.getNamedItem('region')?.value
    //this.position = img.attributes.getNamedItem('position')?.value
    //this.props = Object.fromEntries(Array.from(this.host.querySelectorAll('ul li')).map(li => li.innerHTML.split(': ').map(part => part.trim())))
    //this.props.title = heading ? heading.innerHTML : ''
    while (this.host.firstChild)
      this.host.removeChild(this.host.firstChild)
  }

  componentDidLoad() {  
    if (this.sticky) this.host.classList.add('sticky')  
    this._getManifest(this.imgSrc).then(manifest => this._manifest = manifest)
  }

  async _getManifest(manifestId: string) {
    let manifestUrl = manifestId.indexOf('http') === 0
      ? manifestId
      : `${location.hostname === 'localhost' ? 'http://localhost:8088' : 'https://iiif.visual-essays.net'}/${manifestId}/manifest.json`
    let resp = await fetch(manifestUrl)
    if (resp.ok) return await resp.json() 
  }

  htmlToElem(html: string) {
    return new DOMParser().parseFromString(html, 'text/html').children[0].children[1]
  }

  render() {
    return [
      <section class="ve-header"></section>,
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
          { this.props.nav.map((item:any) => <li><a href={item.href}>{item.label}</a></li>) }
          </ul>
        </div>
      </nav>,
      <div class="title-panel">
        <a href="/"><div class="title">{this.label}</div></a>
        <div class="subtitle">{this.subtitle}</div>
      </div>
    ]
  }
}