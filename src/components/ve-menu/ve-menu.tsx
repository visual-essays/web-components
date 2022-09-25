import { Component, Element, Prop, State, h } from '@stencil/core';

import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')

const navIcons = {
  home: 'house-fill',
  about: 'info-circle-fill',
  contact: 'envelope-fill',
  documentation: 'book',
  docs: 'book',
  help: 'question-circle',
  link: 'link-45deg',
  login: 'person-circle',
  logout: 'person-circle',
  markdown: 'markdown',
  tools: 'tools',
  essays: 'pencil',
  editor: 'pencil',
  media: 'images',
  'how to': 'book-fill'
}

@Component({
  tag: 've-menu',
  styleUrl: 've-menu.css',
  assetsDirs: ['assets'],
  shadow: true
})
export class VeNav {
  
  @Prop() background: string
  @Prop() position: string = 'left'
  @Prop() contact: string // Email address for Contact Us

  @Element() el: HTMLElement

  @State() navItems: any = []

  @State() contentPath: string = '/visual-essays/content'

  connectedCallback() {
    // console.log(`ve-menu: background=${this.background} position=${this.position}`)
    this.el.classList.add(this.position)
  }

  componentWillLoad() {
  }

  getNavItems() {
    this.navItems = Array.from(this.el.querySelectorAll('li')).map(navItem =>
      navItem.firstChild.nodeName === 'A'
        ? {label: navItem.firstChild.textContent, href: (navItem.firstChild as HTMLLinkElement).href}
        : {label: navItem.firstChild.textContent}
    )
  }

  listenForSlotChanges() {
    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && Array.from(mutation.target.classList).indexOf('hydrated') >= 0) {
          this.getNavItems()
        }
      }
    }
    const observer = new MutationObserver(callback);
    observer.observe(this.el, { childList: true, subtree: true, characterData: true })
  }

  componentDidLoad() {    
    this.listenForSlotChanges()
  }

  showContactForm() {
    let contactDialog = this.el.shadowRoot.querySelector('ve-contact')
    contactDialog.show = !contactDialog.show
  }

  showHelpDialog() {
    let helpDialog = this.el.shadowRoot.getElementById('help') as any
    helpDialog.show = !helpDialog.show
  }

  showMarkdownDialog() {
    let markdownDialog = this.el.shadowRoot.getElementById('markdown') as any
    markdownDialog.show = !markdownDialog.show
  }

  menuItemSelected(item: any) {
    // console.log('menuItemSelected', item)
    let action = item.href ? item.href.split('/').pop() : null
    if ((action === 'contact') || item.label.toLowerCase().indexOf('contact') === 0 && this.contact) {
      this.showContactForm()
    } else if (action === 'help') {
      this.showHelpDialog()
    } else if (action === 'markdown') {
      this.showMarkdownDialog()
    } else if (item.href) {
      location.href = item.href
    }
    (this.el.shadowRoot.getElementById('menu-btn') as HTMLInputElement).checked = false
  }

  navIcon(item: any) {
    console.log(item)
    let iconName = ''
    let menuLabel = item.label.toLowerCase()
    Object.keys(navIcons).forEach(key => {
      if (menuLabel.indexOf(key) >= 0) iconName = navIcons[key]
    })
    return iconName ? iconName : 'link'
  }


  render() {
    return [
      <div class="nav" style={{backgroundColor: this.background}}>
        <input class="menu-btn" type="checkbox" id="menu-btn"/>
        <div class="wrapper">
          <label class="menu-icon" htmlFor="menu-btn"><span class="navicon"></span></label>
          <ul class="menu" style={{backgroundColor: this.background || '#444'}}>
          { this.navItems.map((item:any) =>
            <li onClick={this.menuItemSelected.bind(this, item)}>
              <sl-icon slot="prefix" name={this.navIcon(item)} label={item.label}></sl-icon>
              {item.label}
            </li>
          )}
          </ul>
        </div>
      </div>,
      <ve-contact contact={this.contact}></ve-contact>,
      <ve-content-viewer id="help" path="/visual-essays/content/help" format="html"></ve-content-viewer>,
      <ve-content-viewer id="markdown" path={this.contentPath} format="markdown"></ve-content-viewer>
    ]
  }

}