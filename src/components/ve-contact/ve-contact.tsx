import { Component, Element, Prop, State, Watch, h } from '@stencil/core';

import '@shoelace-style/shoelace/dist/components/alert/alert.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/dist/collection')

const emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  tag: 've-contact',
  styleUrls: ['ve-contact.css','../global/global.css'],
  shadow: true
})
export class Header {
  
  @Element() el: HTMLElement

  @Prop() contact: string // Email address for Contact Us email
  @Prop({ mutable: true, reflect: true }) show: boolean = false
  @Watch('show')
  showChanged() {
    console.log(`show=${this.show}`)
    if (this.show) this.showContactForm()
    else this.hideContactForm()
  }

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
    this.contactDialog.addEventListener('sl-hide', () => this.show = false)
    if (this.show) this.showContactForm()
  }

  hideContactForm() {
    this.contactDialog.hide()
    this.from.value = ''
    this.message.value = ''
    this.emailAlert.hide()
    this.noMessageAlert.hide()
  }

  showContactForm() {
    console.log('showContactForm')
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
        to: this.contact,
        from: this.from.value,
        subject: 'Contact Us',
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