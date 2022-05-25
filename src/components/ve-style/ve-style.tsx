import { Component, Prop } from '@stencil/core';

@Component({
  tag: 've-style'
})
export class Style {
  @Prop() href: string

  removeLinkTag(href: string) {
    let link: HTMLLinkElement = document.querySelector(`link[href$="${href}"]`)
    if (link) link.parentElement.removeChild(link)
  }

  connectedCallback() {
    this.removeLinkTag('/static/css/default-theme.css')
    if (this.href) {
      let link = document.createElement('link')
      link.href = this.href
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }

  render() { return null }

}
