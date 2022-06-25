import { Component, Element, Prop, h } from '@stencil/core'

@Component({
  tag: 've-footer',
  styleUrl: 've-footer.css',
  shadow: true,
})
export class Footer {

  @Prop() sticky: boolean
  @Prop() contact: string // Email address for Contact Us

  @Element() el: HTMLElement

  componentWillLoad() {
    if (this.sticky) {
      this.el.style.position = 'fixed'
      this.el.style.bottom = '0'
      this.el.style.left = '0'
    }
  }

  showContactForm() {
    let contactDialog = this.el.shadowRoot.querySelector('ve-contact')
    contactDialog.show = !contactDialog.show
  }

  render() {
    return [

      <section class="container">
        <a href="https://visual-essays.net" target="_blank">
          <img class="logo" src="https://visual-essays.github.io/content/static/images/favicon.svg" alt="Logo"/>
        </a>
        <a href="https://visual-essays.net" target="_blank">visual-essays.net</a>
        <div class="contact push" onClick={this.showContactForm.bind(this)}>
          <sl-tooltip content="Contact us">
            <sl-icon name="envelope" label="Contact us"></sl-icon>
          </sl-tooltip>
        </div>
      </section>,

      <ve-contact contact={this.contact}></ve-contact>

    ]
  }
}
