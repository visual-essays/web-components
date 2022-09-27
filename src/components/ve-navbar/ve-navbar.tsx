import { Component, Element, Prop, State, h } from '@stencil/core';

@Component({
  tag: 've-navbar',
  styleUrls: ['ve-navbar.css'],
  assetsDirs: ['assets'],
  shadow: true
})
export class Header {
  
  @Element() el: HTMLElement

  @Prop() label: string
  @Prop() background: string
  @Prop() logo: string
  @Prop() alpha: number
  @Prop() subtitle: string
  @Prop() contact: string // Email address for Contact Us
  @Prop() sticky: boolean
  @Prop() height: number = 80
  @Prop() offset: number = 0

  @Prop() searchDomain: string // Domain for site search
  
  @State() navItems: any = []

  @State() navEl: HTMLUListElement

  connectedCallback() {
  }

  componentWillLoad() {
    console.log(`ve-navbar: sticky=${this.sticky} height=${this.height}`)
    if (this.background) this.el.style.backgroundColor = this.background
    if (this.alpha) this.el.style.background = `rgba(0, 0, 0, ${this.alpha})`
    this.el.style.height = `${this.height}px`
    if (this.offset) this.el.style.marginTop = `-${this.offset}px`
    if (this.sticky) {
      this.el.classList.add('sticky')
      this.el.style.position = 'sticky'
      this.el.style.top = '0'
    }
  }

  componentDidLoad() {
    if (this.label) {
      let titleEl = document.querySelector('title')
      if (!titleEl) {
        titleEl = document.createElement('title')
        document.head.appendChild(titleEl)
      }
      titleEl.innerText = this.label
    }
    this.navEl = this.el.querySelector('ul') as HTMLUListElement
    this.navItems = Array.from(this.el.querySelectorAll('li')).map(navItem =>
      navItem.firstChild.nodeName === 'A'
        ? {label: navItem.firstChild.textContent, href: (navItem.firstChild as HTMLLinkElement).href}
        : {label: navItem.firstChild.textContent}
    )
    while (this.el.firstChild)
      this.el.removeChild(this.el.firstChild)
  }

  render() {
    return [
      <section class="ve-navbar">
        {this.logo
          ? <img src={this.logo} alt="logo" class="logo"/>
          : null
        }
        <div class="title-panel">
          <div class="title" innerHTML={this.label}></div>
          {this.subtitle && <div class="subtitle" innerHTML={this.subtitle}></div>}
        </div>
        <div class="controls">
          { this.searchDomain && 
            <ve-site-search search-domain={this.searchDomain}></ve-site-search>
          }
          <ve-menu background={this.background} position="right" contact={this.contact}>
            { this.navEl
              ? <ul>
                { Array.from(this.navEl.querySelectorAll('li')).map(li => 
                  <li innerHTML={li.innerHTML}></li>
                ) }
                </ul>
              : null
          }
          </ve-menu>
        </div>
      </section>
    ]
  }

}