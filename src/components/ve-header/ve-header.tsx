import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { parseImageOptions, imageInfo, getManifest, imageDataUrl, getEntity } from '../../utils'

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/src')

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

  @Prop({ mutable: true, reflect: true }) label: string
  @Prop({ mutable: true, reflect: true }) background: string
  @Prop() subtitle: string
  @Prop() options: string
  @Prop() height: number = 300
  @Prop() sticky: boolean
  @Prop() position: string = 'center' // center, top, bottom
  @Prop() contact: string // Email address for Contact Us
  @Prop() entities: string

  @Prop() searchDomain: string // Domain for site search
  @Prop() searchFilters: string
  @Prop() searchCx: string

  @State() _entities: string[] = []
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
    // let size = `${this.el.clientWidth > 1000 ? 1000 : this.el.clientWidth},${this.height > 1000 ? 1000 : this.height}`
    // let url = `${serviceUrl.replace(/\/info.json$/,'')}/${options.region}/!${size}/${options.rotation}/${options.quality}.${options.format}`
    let url = `${serviceUrl.replace(/\/info.json$/,'')}/${options.region}/${options.size}/${options.rotation}/${options.quality}.${options.format}`
    console.log('_iiifUrl', url)
    return url
  }

  async setDefaults() {
    this._entities = this.entities ? this.entities.split(/\s+/).filter(qid => qid) : []
    if ((!this.label || !this.background) && this._entities.length > 0) {
      if (this.sticky === undefined) this.sticky = true
      let entity = await getEntity(this._entities[0])
      if (!this.label) this.label = entity.label
      if (!this.background) {
        if (entity.pageBanner) this.background = `wc:${entity.pageBanner.split('/Special:FilePath/')[1]}`
        else if (entity.image) this.background = `wc:${entity.image.split('/Special:FilePath/')[1]}`
      }
    }
  }

  async componentDidLoad() {  
    console.log('componentDidLoad')
    await this.setDefaults()
    if (this.label) {
      let titleEl = document.querySelector('title')
      if (!titleEl) {
        titleEl = document.createElement('title')
        document.head.appendChild(titleEl)
      }
      titleEl.innerText = this.label
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

  _toggleSearchBox() {
    let searchBox = this.el.shadowRoot.querySelector('ve-search')
    searchBox.style.visibility = searchBox.style.visibility === 'visible' ? 'hidden' : 'visible'
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
          <sl-icon id="info-icon" name="info-circle-fill" onClick={this._showInfoPopup.bind(this)} title="Image info"></sl-icon>
          { this.searchDomain
            ? <div id="search-box">
                <ve-search search-domain={this.searchDomain} search-filters={this.searchFilters} tooltip="Click to search the site" animationLength="1" icon></ve-search>
                  {/* <sl-icon id="search-icon" name="search" onClick={this._toggleSearchBox.bind(this)}></sl-icon> */}
              </div>
            : null
          }
          { this.navItems.length > 0 && 
            <nav>
              <sl-dropdown>
                <sl-button id="menu-toggle" slot="trigger" variant="default" size="medium" circle>
                  <sl-icon name="three-dots-vertical" label="Navigation Menu"></sl-icon>
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
        </div>
      </section>,

      <ve-contact contact={this.contact}></ve-contact>
    ]
  }
}