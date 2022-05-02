import { Component, Element, State, h } from '@stencil/core'

@Component({
  tag: 've-footer',
  styleUrl: 've-footer.css',
  assetsDirs: ['../../assets'],
  shadow: true,
})
export class Footer {

  @Element() el: HTMLElement
  @State() contactDialog: any
  @State() input: HTMLElement

  componentDidLoad() {
    this.contactDialog = this.el.shadowRoot.querySelector('.contact-dialog')
    this.input = this.contactDialog.querySelector('sl-input')
    const closeButton = this.contactDialog.querySelector('sl-button[slot="footer"]')
    closeButton.addEventListener('click', () => this.contactDialog.hide())
  }

  showContactForm() {
    console.log('showContactForm', this.contactDialog)
    this.contactDialog.show()
  }

  render() {
    return [

      <section class="container">
        <a href="https://visual-essays.net" target="_blank">
          <img class="logo" src="https://visual-essays.github.io/content/static/images/favicon.svg"/>
        </a>
        <a href="https://visual-essays.net" target="_blank">visual-essays.net</a>
        <div class="contact push" onClick={this.showContactForm.bind(this)}>
          <sl-tooltip content="Contact us">
            <span>Contact us</span>
            <sl-icon name="envelope" label="Contact us"></sl-icon>
          </sl-tooltip>
        </div>
      </section>,

      <sl-dialog label="Contact Us" class="contact-dialog">
        <sl-input autofocus type="email" label="Email address" Placeholder="Email"></sl-input>
        <sl-input label="Subject"></sl-input>
        <sl-textarea label="Message"></sl-textarea>
        <sl-button slot="footer" variant="primary">Close</sl-button>
      </sl-dialog>
    ]
  }
}
