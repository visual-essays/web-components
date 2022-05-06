import { Component, Element, Prop, State, h } from '@stencil/core'

const emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  tag: 've-footer',
  styleUrl: 've-footer.css',
  shadow: true,
})
export class Footer {

  @Prop() sticky: boolean

  @Element() el: HTMLElement
  @State() contactDialog: any
  @State() from: HTMLInputElement
  @State() emailAlert: any
  @State() message: HTMLTextAreaElement
  @State() noMessageAlert: any

  componentDidLoad() {
    this.contactDialog = this.el.shadowRoot.querySelector('.contact-dialog')
    this.from = this.el.shadowRoot.getElementById('from') as HTMLInputElement
    this.message = this.el.shadowRoot.getElementById('message') as HTMLTextAreaElement
    this.emailAlert = this.el.shadowRoot.getElementById('bad-email-alert') as any
    this.noMessageAlert = this.el.shadowRoot.getElementById('no-message-alert') as any
    if (this.sticky) {
      this.el.style.position = 'fixed'
      this.el.style.bottom = '0'
      this.el.style.left = '0'
    }
  }

  hideContactForm() {
    this.contactDialog.hide()
    this.from.value = ''
    this.message.value = ''
    this.emailAlert.hide()
    this.noMessageAlert.hide()
  }

  showContactForm() {
    this.contactDialog.show()
  }

  async sendmail() {
    let emailIsValid = emailAddressRegex.test(this.from.value)
    if (emailIsValid) this.emailAlert.hide()
    else this.emailAlert.show()
    
    let messageIsValid = this.message.value.trim().length > 0
    if (messageIsValid) this.noMessageAlert.hide()
    else this.noMessageAlert.show()

    if (emailIsValid && messageIsValid) { 
      let body = {
        to: 'Ron Snyder <ron@snyderjr.com>',
        from: this.from.value,
        subject: 'Visual Essays Contact',
        message: this.message.value
      }
      this.hideContactForm()
      let resp: any = await fetch('https://api.visual-essays.net/sendmail/', {
        method: 'POST', body: JSON.stringify(body)
      })
      if (resp.ok) console.log(await resp.json())
    }
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
            <sl-icon name="envelope" label="Contact us"></sl-icon>
          </sl-tooltip>
        </div>
      </section>,

      <sl-dialog label="Contact Us" class="contact-dialog">
        <sl-input id="from" autofocus type="email" label="Email address"></sl-input>
        <sl-alert id="bad-email-alert" variant="danger">
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>Invalid email address</strong><br />Please fix and resubmit
        </sl-alert>
        <sl-textarea id="message" label="Message"></sl-textarea>
        <sl-alert id="no-message-alert" variant="danger">
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>No message entered</strong><br />
        </sl-alert>
        <sl-button id="cancel" slot="footer" onClick={this.hideContactForm.bind(this)}>Cancel</sl-button>
        <sl-button slot="footer" variant="primary" onClick={this.sendmail.bind(this)}>Submit</sl-button>
      </sl-dialog>
    ]
  }
}
