import { Component, Element, Prop, State, h } from '@stencil/core';

import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')

const clientIds = {
  'beta.juncture-digital.org': 'f30ce4168a0bb95ecaa3',
  'editor.juncture-digital.org': '6b08f8fc8a36dad96d2b'
}

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
    let code = (new URL(window.location.href)).searchParams.get('code')
    console.log(`ve-menu: hostname=${window.location.hostname} code=${code}`)
    if (code) {
      window.history.replaceState({}, '', window.location.pathname)
      let isDev = window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168.') === 0
      let url = isDev
        ? `http://${window.location.hostname}:8000/gh-token?code=${code}&hostname=${window.location.hostname}`
        : `https://api.juncture-digital.org/gh-token?code=${code}&hostname=${window.location.hostname}`
      fetch(url).then(resp => resp.text())
        .then(authToken => {
          if (authToken) {
            localStorage.setItem('gh-auth-token', authToken)
            window.dispatchEvent(new Event("storage"))
          }
      })
    }
    this.el.classList.add(this.position)
  }

  componentWillLoad() {
  }

  getNavItems() {
    this.navItems = Array.from(this.el.querySelectorAll('li')).map(navItem => {
      if (navItem.firstChild.nodeName === 'A') {
        return {label: navItem.firstChild.textContent, href: (navItem.firstChild as HTMLLinkElement).href}
      } else {
        let text = navItem.firstChild.textContent
        if (text.toLowerCase() === 'auth') {
          let isLoggedIn = this.isLoggedIn()
          return {label: isLoggedIn ? 'Logout' : 'Login', href: isLoggedIn ? 'logout' : 'login'}
        } else {
          return {label: text}
        }
      }
    })
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
    } else if (action === 'login') {
      this.login()
    } else if (action === 'logout') {
      this.logout()
    } else if (action === 'help') {
      this.showHelpDialog()
    } else if (action === 'markdown') {
      this.showMarkdownDialog()
    } else if (item.href) {
      location.href = item.href
    }
    (this.el.shadowRoot.getElementById('menu-btn') as HTMLInputElement).checked = false
  }

  ghAuthToken() {
    return localStorage.getItem('gh-auth-token')
  }

  isLoggedIn() {
    return this.ghAuthToken() !== null
  }

  login() {
    console.log(window.location)
    let hostname = (new URL(window.location.href)).hostname
    let isDev = hostname === 'localhost' || hostname.indexOf('192.168.') === 0
    let href = isDev
      ? `${window.location.origin}${window.location.pathname}?code=testing`
      : clientIds[location.hostname] !== undefined
        ? `https://github.com/login/oauth/authorize?client_id=${clientIds[location.hostname]}&scope=repo&state=juncture&redirect_uri=${location.href}`
        : null
    console.log(`login: hostname=${hostname} href=${href}`)
    if (href) window.location.href = href

    // 
    localStorage.setItem('gh-auth-token', localStorage.getItem('gh-auth-token-sav'))
    window.dispatchEvent(new Event("storage"))
    this.navItems = this.navItems.map(item => item.href === 'login' ? {label: 'Logout', href: 'logout'} : item)
  }

  logout() {
    localStorage.setItem('gh-auth-token-sav', localStorage.getItem('gh-auth-token'))
    localStorage.removeItem('gh-auth-token')
    window.dispatchEvent(new Event("storage"))
    this.navItems = this.navItems.map(item => item.href === 'logout' ? {label: 'Login', href: 'login'} : item)
  }

  navIcon(item: any) {
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