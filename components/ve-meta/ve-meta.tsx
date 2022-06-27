import { Component, Prop } from '@stencil/core';

@Component({
  tag: 've-meta'
})
export class Meta {
  @Prop() title: string
  @Prop() description: string

  addMetaTag(name:string, content:string) {
    let metaEl: HTMLMetaElement = document.createElement('meta')
    metaEl.setAttribute('name', name)
    metaEl.setAttribute('content', content)
    document.head.appendChild(metaEl)
  }

  addTitle(title:string) {
    let titleEl: HTMLTitleElement = document.querySelector(`title`)
    if (titleEl) {
      titleEl.title = title
    } else {
      titleEl = document.createElement('title')
      titleEl.title = title
      document.head.appendChild(titleEl)
    }
  }

  connectedCallback() {
    if (this.title) this.addTitle(this.title)
    if (this.description) this.addMetaTag('description', this.description)
  }

  render() { return null }

}
