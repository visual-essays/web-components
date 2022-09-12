import { Component, Element, Prop, State, h, Watch } from '@stencil/core';

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'

import hljs from 'highlight.js'

@Component({
  tag: 've-content-viewer',
  styleUrl: 've-content-viewer.css',
  shadow: true,
})
export class ContentViewer {
  @Prop() path: string
  @Prop() format: string = 'html'

  @Prop({ mutable: true, reflect: true }) show: boolean = false
  @Watch('show')
  showChanged() {
    if (this.show) this.showDialog()
    else this.hideDialog()
  }

  @Element() el: HTMLElement;

  @State() dialog: any
  @State() html: string
  @State() contentEl: HTMLElement
  
  connectedCallback() {
  }

  componentWillLoad() {
  }

  componentDidLoad() {
    this.dialog = this.el.shadowRoot.getElementById('dialog')
    this.dialog.addEventListener('sl-hide', () => this.show = false)
    this.addContentObserver()
  }

  addContentObserver() {
    this.contentEl = this.el.shadowRoot.getElementById('content')
    const observer = new MutationObserver(() => {
      this.contentEl.querySelectorAll('a').forEach(link => {
        let href = new URL(link.href)
        if (href.pathname === '/' && href.hash) {
          link.setAttribute('data-target', href.hash)
          link.removeAttribute('href')
          link.addEventListener('click', (evt:PointerEvent) => {
            let targetId = ((evt as any).path[0] as HTMLElement).dataset.target
            this.contentEl.querySelector(targetId).scrollIntoView()
          })
        }
      })
    })
    observer.observe(this.contentEl, { childList: true, subtree: true })
  }

  getHtml() {
    let url = `https://api.juncture-digital.org/html${this.path}`
    fetch(url).then(resp => resp.text()).then(html => this.html = html)
  }

  getMarkdown() {
    let url = `https://api.juncture-digital.org/markdown${this.path}`
    fetch(url).then(resp => resp.text()).then(markdown => {
      // this.html = hljs.highlight(markdown, {language: 'markdown'}).value
      let blocks = `\n${markdown}\n`.match(/^\n((?:\n|.)*?)\n$/gm).map(block => block.trim()).filter(block => block)
      this.html = blocks.map((block:string) => {
        let language = 'markdown' // default language
        if (block[0] === '<') language = 'html'
        // else if (block.indexOf('.ve-') === 0) language = 'juncture' // TODO: create a language module for this
        else if (block.indexOf('.ve-') === 0) language = 'markdown'
        return hljs.highlight(language, block).value
      }).join('\n\n')
    })
  }

  getContent() {
    if (this.format === 'html') this.getHtml()
    else if (this.format === 'markdown') this.getMarkdown()
  }

  showDialog() {
    if (!this.html) this.getContent()
    this.dialog.show()
  }

  hideDialog() {
    this.dialog.hide()
  }

  close() {
    this.show = false
  }

  render() { return [
      <sl-dialog id="dialog" label="Content" class="dialog-overview">
        <div id="content" class={this.format} innerHTML={this.html}></div>
        <sl-button slot="footer" onClick={this.close.bind(this)}>Close</sl-button>
      </sl-dialog>
    ]
  }

}
