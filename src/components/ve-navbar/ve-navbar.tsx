import { Component, Element, Prop, h } from '@stencil/core';

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
  @Prop() url: string
  @Prop() alpha: number
  @Prop() subtitle: string
  @Prop() contact: string // Email address for Contact Us
  @Prop() sticky: boolean
  @Prop() height: number = 80
  @Prop() offset: number = 0

  @Prop() searchDomain: string // Domain for site search

  componentWillLoad() {
    // console.log(`ve-navbar: sticky=${this.sticky} height=${this.height}`)
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

    // while (this.el.firstChild) this.el.removeChild(this.el.firstChild)
  }

  render() {
    let navEl = this.el.querySelector('ul') as HTMLUListElement
    return [
      <section class="ve-navbar">
        {this.logo
          ? this.url
            ? <a href={this.url}><img src={this.logo} alt="logo" class="logo"/></a>
            : <img src={this.logo} alt="logo" class="logo"/>
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
            { navEl
              ? <ul>
                { Array.from(navEl.querySelectorAll('li')).map(li => 
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