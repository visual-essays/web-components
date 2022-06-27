import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { parseImageOptions, imageInfo, getManifest, imageDataUrl } from '../../utils'

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath('https://visual-essays.github.io/web-components/www')
setBasePath('/web-components')

const navIcons = {
  home: 'house-fill',
  about: 'info-circle-fill',
  contact: 'envelope-fill'
}

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
  @Prop() contact: string // Email address for Contact Us

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

  menuItemSelected(item: any) {
    console.log('menuItemSelected', item)
    if (item.label.toLowerCase().indexOf('contact') === 0 && this.contact) {
      let contactDialog = this.el.shadowRoot.querySelector('ve-contact')
      contactDialog.show = !contactDialog.show
    } else if (item.href) {
      location.href = item.href
    }
  }

  navIcon(item: any) {
    let iconName = ''
    let menuLabel = item.label.toLowerCase()
    Object.keys(navIcons).forEach(key => {
      if (menuLabel.indexOf(key) >= 0) iconName = navIcons[key]
    })
    return iconName
  }

  render() {
    return [

      <section class="ve-header">
        <div class="title-panel">
          {/* <span id="info-icon" onClick={this._showInfoPopup.bind(this)} title="Image info">i</span> */}
          { this.navItems.length > 0 && 
            <nav>
              <sl-dropdown>
                <sl-button id="menu-toggle" slot="trigger" variant="default" size="medium" circle>
                  <sl-icon name="three-dots-vertical" label="Navigation Meno"></sl-icon>
                </sl-button>
                <sl-menu>
                  { this.navItems.map((item:any) => 
                    <sl-menu-item 
                      onClick={this.menuItemSelected.bind(this, item)}>
                        <sl-icon slot="prefix" name={this.navIcon(item)} label={item.label}></sl-icon>
                        {item.label}
                    </sl-menu-item>
                  )}
                </sl-menu>
              </sl-dropdown>
            </nav>
          }
          <a href="/"><div class="title">{this.label}</div></a>
          <div class="subtitle">{this.subtitle}</div>
          <div id="image-info-popup"></div>
          <div class = "title-buttons">
            <ve-search cx = '0a5115e988de8e8a9' filters = '16c:16c,17c:17c,18c:18c,19c:19c,20c:20c,21c:21c,austen:Jane Austen,canterbury:Canterbury,churches:Churches,dickens:Dickens' icon tooltip = "Click to search the site"></ve-search>
            <sl-button id = "info-button" onClick={this._showInfoPopup.bind(this)} title = "Image info">
              <sl-icon name = "info"></sl-icon>
            </sl-button>
          </div>
        </div>
      </section>,

      <ve-contact contact={this.contact}></ve-contact>
    ]
  }
}