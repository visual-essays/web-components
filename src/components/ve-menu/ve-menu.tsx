import { Component, Element, Method, Prop, State, Watch, h } from '@stencil/core';

import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')

const clientIds = {
  'beta.juncture-digital.org': 'f30ce4168a0bb95ecaa3',
  'tools.juncture-digital.org': '0b40086fe912d97c03e6'
}

const nav = {
  home: {icon: 'house-fill'},
  about: {icon: 'info-circle-fill'},
  contact: {icon: 'envelope-fill'},
  documentation: {icon: 'book'},
  docs: {icon: 'book'},
  help: {icon: 'question-circle'},
  link: {icon: 'link-45deg'},
  login: {icon: 'person-circle'},
  logout: {icon: 'person-circle'},
  markdown: {icon: 'markdown'},
  tools: {icon: 'tools', loginRequired: true},
  essays: {icon: 'pencil'},
  editor: {icon: 'pencil', loginRequired: true},
  media: {icon: 'images', loginRequired: true},
  'how to': {icon: 'book-fill'}
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

  @State() isLoggedIn: boolean = false
  @State() originalNavItems: any = []
  @State() navItems: any = []

  @Watch('originalNavItems')
  originalNavItemsChanged() {
    this.navItems = this.originalNavItems
      .filter(item => {
        let action = item.href ? item.href.split('/').filter(pe => pe).pop().toLowerCase() : 'link'
        return !nav[action] || !nav[action]?.loginRequired || this.isLoggedIn
      })
      .map(item =>
        item.label === 'Login' || item.label === 'Logout'
          ?{ label:  this.isLoggedIn ? 'Logout' : 'Login', href:  this.isLoggedIn ? 'logout' : 'login'}
          : item
      )
  }

  @Watch('isLoggedIn')
  isLoggedInChanged() {
    this.navItems = this.originalNavItems
      .filter(item => {
        let action = item.href ? item.href.split('/').filter(pe => pe).pop().toLowerCase() : 'link'
        return !nav[action] || !nav[action]?.loginRequired || this.isLoggedIn
      })
      .map(item =>
        item.label === 'Login' || item.label === 'Logout'
          ?{ label:  this.isLoggedIn ? 'Logout' : 'Login', href:  this.isLoggedIn ? 'logout' : 'login'}
          : item
      )
  }

  @State() contentPath: string = '/visual-essays/content'

  connectedCallback() {
    this.getNavItems()

    this.isLoggedIn = this.ghAuthToken() !== null
    // console.log(`ve-menu: background=${this.background} position=${this.position}`)
    let code = (new URL(window.location.href)).searchParams.get('code')
    if (code) {
      window.history.replaceState({}, '', window.location.pathname)
      let isDev = window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168.') === 0
      let url = isDev
        ? `http://${window.location.hostname}:8000/gh-token?code=${code}&hostname=${window.location.hostname}`
        : `https://api.juncture-digital.org/gh-token?code=${code}&hostname=${window.location.hostname}`
      fetch(url)
        .then(resp => resp.text())
        .then(authToken => {
          if (authToken) {
            this.isLoggedIn = true
            localStorage.setItem('gh-auth-token', authToken)
            window.dispatchEvent(new Event('storage'))
          }
        })
        .catch(err => console.log('err', err))
    }
    this.el.classList.add(this.position)
  }

  componentWillLoad() {
  }

  getNavItems() {
    this.originalNavItems = Array.from(this.el.querySelectorAll('li')).map(navItem => {
      if (navItem.firstChild.nodeName === 'A') {
        let linkEl = navItem.firstChild as HTMLLinkElement
        return {label: linkEl.textContent, href:linkEl.href, newWindow: linkEl.getAttribute('target') === '_blank' }
      } else {
        let text = navItem.firstChild.textContent
        if (text.toLowerCase() === 'auth') {
          return {label:  this.isLoggedIn ? 'Logout' : 'Login', href:  this.isLoggedIn ? 'logout' : 'login'}
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

  @State() helpWindow: any
  @Method()
  async showHelpWindow() {
    if (this.helpWindow) { this.helpWindow.close() }
    let isDev = window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168.') === 0
    let url = isDev
      ? `http://${window.location.hostname}:8080/help`
      : 'https://beta.juncture-digital.org/help'

    let options = 'toolbar=yes,location=yes,left=0,top=0,width=1040,height=1200,scrollbars=yes,status=yes'
    this.helpWindow = window.open(url, '_blank', options)
  }

  showMarkdownDialog() {
    let markdownDialog = this.el.shadowRoot.getElementById('markdown') as any
    markdownDialog.show = !markdownDialog.show
  }

  @State() externalWindow: any
  menuItemSelected(item: any) {
    let action = item.href ? item.href.split('/').pop().toLowerCase() : null
    if ((action === 'contact') || item.label.toLowerCase().indexOf('contact') === 0 && this.contact) {
      this.showContactForm()
    } else if (action === 'login') {
      this.login()
    } else if (action === 'logout') {
      this.logout()
    } else if (action === 'help') {
      // this.showHelpDialog()
      this.showHelpWindow()
    } else if (action === 'markdown') {
      this.showMarkdownDialog()
    } else if (item.href) {
      if (item.newWindow) {
        if (this.externalWindow) { this.externalWindow.close() }
        this.externalWindow = window.open(item.href, '_blank', 'toolbar=yes,location=yes,left=0,top=0,width=1000,height=1200,scrollbars=yes,status=yes')
      } else {
        location.href = item.href
      }
    }
    (this.el.shadowRoot.getElementById('menu-btn') as HTMLInputElement).checked = false
  }

  ghAuthToken() {
    return localStorage.getItem('gh-auth-token')
  }

  login() {
    let hostname = (new URL(window.location.href)).hostname
    let isDev = hostname === 'localhost' || hostname.indexOf('192.168.') === 0
    let href = isDev
      ? `${window.location.origin}${window.location.pathname}?code=testing`
      : clientIds[location.hostname] !== undefined
        ? `https://github.com/login/oauth/authorize?client_id=${clientIds[location.hostname]}&scope=repo&state=juncture&redirect_uri=${location.href}`
        : null
    if (href) window.location.href = href
  }

  logout() {
    console.log('logout')
    Object.keys(localStorage).forEach(key => localStorage.removeItem(key))
    window.dispatchEvent(new Event("storage"))
    this.isLoggedIn = false
  }

  navIcon(item: any) {
    let iconName = ''
    let menuLabel = item.label.toLowerCase()
    Object.keys(nav).forEach(key => {
      if (menuLabel.indexOf(key) >= 0) iconName = nav[key].icon
    })
    return iconName ? iconName : 'link'
  }

  render() {
    return [
      <div class="nav" style={{backgroundColor: this.background}}>
      { this.navItems.length > 0 && [
        <input class="menu-btn" type="checkbox" id="menu-btn"/>,
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
      ]}
      </div>,
      <ve-contact contact={this.contact}></ve-contact>,
      <ve-content-viewer id="help" path="/visual-essays/content/help" format="html"></ve-content-viewer>,
      <ve-content-viewer id="markdown" path={this.contentPath} format="markdown"></ve-content-viewer>
    ]
  }

}