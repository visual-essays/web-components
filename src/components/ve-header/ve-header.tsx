import { Component, Element, Prop, State, h } from '@stencil/core';

import { isURL } from '../../utils'

const manifestShorthandRegex = /^\w+:/
const navbarHeight = 80
const heroHeight = 400

@Component({
  tag: 've-header',
  styleUrl: 've-header.css',
  shadow: true
})
export class Header {
  
  @Element() el: HTMLElement

  @Prop() label: string
  @Prop() subtitle: string
  @Prop() logo: string
  @Prop() contact: string // Email address for Contact Us
  @Prop() searchDomain: string // Domain for site search

  @Prop() sticky: boolean

  @Prop() background: string = '#777'
  @Prop() options: string
  @Prop() height: number
  @Prop() position: string = 'center' // center, top, bottom
  
  @State() navItems: any = []
  @State() backgroundIsImage: boolean = false

  @State() navEl: HTMLUListElement

  isManifestShorthand(s:string) {
    return manifestShorthandRegex.test(s) 
  }

  componentWillLoad() {
    console.log(`ve-header: sticky=${this.sticky}`)
    this.backgroundIsImage = isURL(this.background) || this.isManifestShorthand(this.background)
    if (!this.height) this.height = this.backgroundIsImage ? heroHeight : navbarHeight
    this.el.style.height = `${this.height}px`
    this.navEl = this.el.querySelector('ul') as HTMLUListElement
    this.navItems = Array.from(this.el.querySelectorAll('li')).map(navItem =>
      navItem.firstChild.nodeName === 'A'
        ? {label: navItem.firstChild.textContent, href: (navItem.firstChild as HTMLLinkElement).href}
        : {label: navItem.firstChild.textContent}
    )
    // if (this.sticky) this.el.classList.add('sticky')
    while (this.el.firstChild)
      this.el.removeChild(this.el.firstChild)
  }

  render() {
    return [
      this.backgroundIsImage &&
        <ve-hero
          background={this.background} 
          options={this.options}
          position={this.position}
          sticky={this.sticky} 
          height={this.height}
          top={this.sticky ? this.height - navbarHeight : 0}
        ></ve-hero>
      ,
      <ve-navbar
        label={this.label}
        subtitle={this.subtitle}
        logo={this.logo}
        sticky={this.sticky}
        search-domain={this.searchDomain}
        contact={this.contact}
        height={this.backgroundIsImage ? navbarHeight : this.height}
        background={!this.backgroundIsImage && this.background}
        alpha={this.backgroundIsImage ? 0.2 : 0}
        offset={this.backgroundIsImage ? navbarHeight : 0}
      >
        { this.navEl
          ? <ul>
            { Array.from(this.navEl.querySelectorAll('li')).map(li => 
              <li innerHTML={li.innerHTML}></li>
            ) }
            </ul>
          : null
        }
      </ve-navbar>
    ]
  }

}