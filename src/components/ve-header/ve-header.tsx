import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { parseImageOptions, imageInfo, getManifest, imageDataUrl } from '../../utils'

const emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

  @State() contactDialog: any
  @State() from: HTMLInputElement
  @State() emailAlert: any
  @State() message: HTMLTextAreaElement
  @State() noMessageAlert: any

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
    this.contactDialog = this.el.shadowRoot.querySelector('.contact-dialog')
    this.from = this.el.shadowRoot.getElementById('from') as HTMLInputElement
    this.message = this.el.shadowRoot.getElementById('message') as HTMLTextAreaElement
    this.emailAlert = this.el.shadowRoot.getElementById('bad-email-alert') as any
    this.noMessageAlert = this.el.shadowRoot.getElementById('no-message-alert') as any
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
      this.showContactForm()
    } else if (item.href) {
      location.href = item.href
    }
  }

  hideContactForm() {
    this.contactDialog.hide()
    this.from.value = ''
    this.message.value = ''
    this.emailAlert.hide()
    this.noMessageAlert.hide()
  }

  showContactForm() {
    this.contactDialog.show()
  }

  async sendmail() {
    let emailIsValid = emailAddressRegex.test(this.from.value)
    if (emailIsValid) this.emailAlert.hide()
    else this.emailAlert.show()
    
    let messageIsValid = this.message.value.trim().length > 0
    if (messageIsValid) this.noMessageAlert.hide()
    else this.noMessageAlert.show()

    if (emailIsValid && messageIsValid) { 
      let body = {
        to: this.contact,
        from: this.from.value,
        subject: 'Contact Us',
        message: this.message.value
      }
      this.hideContactForm()
      let resp: any = await fetch('https://api.visual-essays.net/sendmail/', {
        method: 'POST', body: JSON.stringify(body)
      })
      if (resp.ok) console.log(await resp.json())
    }
  }

  navIcon(item: any) {
    let iconName = ''
    let menuLabel = item.label.toLowerCase()
    Object.keys(navIcons).forEach(key => {
      console.log(menuLabel, key)
      if (menuLabel.indexOf(key) >= 0) iconName = navIcons[key]
    })
    console.log(`iconName=${iconName}`)
    return iconName
  }

  render() {
    return [

      <section class="ve-header">
        <div class="title-panel">
          <span id="info-icon" onClick={this._showInfoPopup.bind(this)} title="Image info">i</span>          { this.navItems.length > 0 && 
            <nav>
              <sl-dropdown>
                <sl-button id="menu-toggle" slot="trigger" variant="default" size="medium" circle>
                  <sl-icon name="three-dots-vertical" label="Navigation Meno"></sl-icon>
                </sl-button>
                <sl-button id = "search-toggle" slot = "prefix" varient = "default" size = "medium" circle>
                  <sl-icon name = "search" label = "Site Searchs"></sl-icon>
                  <p>Hi</p>
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

      <sl-dialog label="Contact Us" class="contact-dialog">
      <sl-input id="from" autofocus type="email" label="Email address"></sl-input>
      <sl-alert id="bad-email-alert" variant="danger">
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>Invalid email address</strong><br />Please fix and resubmit
      </sl-alert>
      <sl-textarea id="message" label="Message"></sl-textarea>
      <sl-alert id="no-message-alert" variant="danger">
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>No message entered</strong><br />
      </sl-alert>
      <sl-button id="cancel" slot="footer" onClick={this.hideContactForm.bind(this)}>Cancel</sl-button>
      <sl-button slot="footer" variant="primary" onClick={this.sendmail.bind(this)}>Submit</sl-button>
      </sl-dialog>
    ]
  }
}