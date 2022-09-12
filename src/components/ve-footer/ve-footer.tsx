import { Component, Element, Prop, h, State } from '@stencil/core'

import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-footer',
  styleUrl: 've-footer.css',
  shadow: true,
})
export class Footer {

  @Prop() sticky: boolean
  @Prop() contact: string // Email address for Contact Us

  @Element() el: HTMLElement

  @State() footerElems: HTMLElement[] = []

  componentWillLoad() {
    if (this.sticky) {
      this.el.style.position = 'fixed'
      this.el.style.bottom = '0'
      this.el.style.width = `${this.el.parentElement.clientWidth}px`
    }
  }

  componentDidLoad() {
    if (this.sticky) {
      document.querySelector('main').style.paddingBottom = `${this.el.clientHeight}px`
    }
    this.footerElems = Array.from(this.el.querySelectorAll('li'))
  }


  showContactForm() {
    let contactDialog = this.el.querySelector('ve-contact')
    contactDialog.show = !contactDialog.show
  }

  renderStatic() {
    return <section class="footer">
      <a class="logo" href="https://visual-essays.net" target="_blank">
        <img src="https://visual-essays.github.io/content/static/images/favicon.svg" alt="Logo"/>
      </a>
      <a href="https://visual-essays.net" target="_blank">juncture-digital.org</a>
      <div class="contact push" onClick={this.showContactForm.bind(this)}>
        <sl-tooltip content="Contact us">
          <sl-icon name="envelope" label="Contact us"></sl-icon>
        </sl-tooltip>
      </div>
    </section>
  }

  renderDynamic() {
    return [
      <section class="footer">
        {this.footerElems.map(el =>
          <div innerHTML={el.innerHTML}></div>
        )}
      </section>,

      <ve-contact contact={this.contact}></ve-contact>

    ]
  }

  render() {
    return this.renderDynamic()
  }
}
