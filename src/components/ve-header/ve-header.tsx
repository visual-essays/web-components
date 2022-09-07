import { Component, Element, Prop, State, h, Watch } from '@stencil/core';

import { getManifest, imageDataUrl, imageInfo, isURL, parseImageOptions, titlePanelHeight } from '../../utils'

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')
setBasePath('https://visual-essays.github.io/web-components/src')

const navIcons = {
  home: 'house-fill',
  about: 'info-circle-fill',
  contact: 'envelope-fill',
  'how to': 'book-fill'
}

const manifestShorthandRegex = /^\w+:/

@Component({
  tag: 've-header',
  styleUrls: ['ve-header.css'],
  assetsDirs: ['assets'],
  shadow: true
})
export class Header {
  
  @Element() el: HTMLElement

  @Prop({ mutable: true, reflect: true }) label: string
  @Prop({ mutable: true, reflect: true }) background: string
  @Prop() logo: string
  @Prop() subtitle: string
  @Prop() options: string
  @Prop() sticky: boolean
  @Prop() height: string
  @Prop() position: string = 'center' // center, top, bottom
  @Prop() contact: string // Email address for Contact Us
  @Prop() entities: string

  @Prop() searchDomain: string // Domain for site search
  @Prop() searchFilters: string
  
  @State() _entities: string[] = []
  @State() imageOptions: any
  @State() navItems: any = []
  @State() backgroundIsImage: boolean = false

  @State() navEl: HTMLUListElement

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
    // let size = `${this.el.clientWidth},`
    let size = `,${this.el.clientHeight}`
    let url = `${serviceUrl.replace(/\/info.json$/,'')}/${options.region}/${size}/${options.rotation}/${options.quality}.${options.format}`
    return url
  }

  connectedCallback() {
    console.log(`ve-header.connectedCallback: sticky=${this.sticky} height=${this.height} background=${this.background}`)
  }

  isManifestShorthand(s:string) {
    return manifestShorthandRegex.test(s) 
  }

  componentWillLoad() {
    this.backgroundIsImage = isURL(this.background) || this.isManifestShorthand(this.background)
    if (!this.height) this.height = this.backgroundIsImage ? '300px' : '80px' 
    this.el.classList.add(this.backgroundIsImage ? 'background' : 'simple')
    
    console.log(`ve-header.componentWillLoad: sticky=${this.sticky} height=${this.height} background=${this.background} backgroundIsImage=${this.backgroundIsImage} logo=${this.logo}`)

    if (this.background) {
      if (this.backgroundIsImage) 
        getManifest(this.background).then(manifest => this._manifest = manifest)
      else
        this.el.style.backgroundColor = this.background
    }
    if (this.sticky) {
      if (this.backgroundIsImage) {
        this.el.style.position = 'sticky'
        this.el.style.top = `-${parseInt(this.height.slice(0,-2)) - titlePanelHeight}px`
      } else {
        this.el.style.position = 'fixed'
        this.el.style.top = '0';
        (this.el.nextElementSibling as HTMLElement).style.marginTop = this.height
      }
      this.el.style.width = `${this.el.parentElement.clientWidth}px`
    }
    this.el.style.height = this.height
    if (this.background) getManifest(this.background).then(manifest => this._manifest = manifest)

  }

  componentDidLoad() {
    console.log('header.componentDidLoad')
    this.setDefaults()
    if (this.label) {
      let titleEl = document.querySelector('title')
      if (!titleEl) {
        titleEl = document.createElement('title')
        document.head.appendChild(titleEl)
      }
      titleEl.innerText = this.label
    }
    this.imageOptions = parseImageOptions(this.options)
    this.navEl = this.el.querySelector('ul') as HTMLUListElement
    this.navItems = Array.from(this.el.querySelectorAll('li')).map(navItem =>
      navItem.firstChild.nodeName === 'A'
        ? {label: navItem.firstChild.textContent, href: (navItem.firstChild as HTMLLinkElement).href}
        : {label: navItem.firstChild.textContent}
    )
    while (this.el.firstChild)
      this.el.removeChild(this.el.firstChild)
  }

  async setDefaults() {
    let backgroundIsImage = this.background ? isURL(this.background) : false
    if (!this.height) this.height = backgroundIsImage ? '300px' : '100px' 
    /*
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
    */
  }

  _showInfoPopup() {
    let popup: HTMLElement = this.el.shadowRoot.querySelector('#image-info-popup')
    let images = encodeURIComponent(JSON.stringify([{manifest: this._manifest}]))
    popup.innerHTML = `<ve-manifest images="${images}" condensed></ve-manifest>`
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block'
  }

  menuItemSelected(item: any) {
    if (item.label.toLowerCase().indexOf('contact') === 0 && this.contact) {
      this.showContactForm()
    } else if (item.href) {
      location.href = item.href
    }
  }

  showContactForm() {
    let contactDialog = this.el.shadowRoot.querySelector('ve-contact')
    contactDialog.show = !contactDialog.show
  }

  navIcon(item: any) {
    let iconName = ''
    let menuLabel = item.label.toLowerCase()
    Object.keys(navIcons).forEach(key => {
      if (menuLabel.indexOf(key) >= 0) iconName = navIcons[key]
    })
    return iconName
  }

  renderSimple() {
    return [
      <section class="ve-header simple" style={{height: this.height}}>
    
        {this.logo
          ? <img src={this.logo} alt="logo" class="logo"/>
          : null
        }
        {this.label ? this.label : null}
        <div class="controls">
          { this.searchDomain && 
            <ve-site-search search-domain="localhost:8080"></ve-site-search>
          }
          <ve-nav background={this.background} position="right" contact={this.contact}>
            { this.navEl
              ? <ul>
                { Array.from(this.navEl.querySelectorAll('li')).map(li => 
                  <li innerHTML={li.innerHTML}></li>
                ) }
                </ul>
              : null
          }
          </ve-nav>
        </div>
      </section>,
      <ve-contact contact={this.contact}></ve-contact>
    ]
  }

  renderWithBackground() {
    return [
      <section class="ve-header">
        <div class="title-panel">
          <sl-icon id="info-icon" name="info-circle-fill" onClick={this._showInfoPopup.bind(this)} title="Image info"></sl-icon>
          { this.searchDomain && 
            <div id="search-box">
              <ve-search search-domain={this.searchDomain} search-filters={this.searchFilters} tooltip="Click to search the site" animationLength="1" icon></ve-search>
            </div>
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

  render() {
    return this.backgroundIsImage
      ? this.renderWithBackground()
      : this.renderSimple()
  }


}