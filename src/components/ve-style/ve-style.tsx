import { Component, Prop } from '@stencil/core';

@Component({
  tag: 've-style'
})
export class Style {
  @Prop() layout: string
  @Prop() theme: string

  removeLinkTag(href: string) {
    let link: HTMLLinkElement = document.querySelector(`link[href$="${href}"]`)
    if (link) link.parentElement.removeChild(link)
  }

  connectedCallback() {
    let server = location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://visual-essays.net'
    // console.log(`layout=${this.layout} theme=${this.theme}`)
    if (this.layout) {
      this.removeLinkTag('/static/css/default-layout.css')
      let link = document.createElement('link')
      link.href = this.layout.indexOf('http') === 0 ? this.layout : `${server}${this.layout}`
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    if (this.theme) {
      this.removeLinkTag('/static/css/default-theme.css')
      let link = document.createElement('link')
      link.href = this.theme.indexOf('http') === 0 ? this.theme : `${server}${this.theme}`
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }

  render() { return null }

}
