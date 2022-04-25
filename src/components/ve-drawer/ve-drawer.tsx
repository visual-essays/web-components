import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import timesCircleIcon from '../../icons/times-circle-regular.svg'

@Component({
  tag: 've-drawer',
  styleUrl: 've-drawer.css',
  shadow: true,
})

export class Drawer {

  @Element() el: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open: boolean = false
  @Watch('open')
  openChanged() {
    if (this.open) {
      this.el.shadowRoot.getElementById('drawer').classList.add('open')
      this.el.shadowRoot.querySelector('.wrapper').classList.add('open')
    } else {
      this.el.shadowRoot.getElementById('drawer').classList.remove('open')
      setTimeout(() => this.el.shadowRoot.querySelector('.wrapper').classList.remove('open'), 500)
    }
  }

  @Event({ bubbles: true, composed: true }) closeMenu: EventEmitter

  componentWillLoad() {}

  componentDidLoad() {}

  close() { this.closeMenu.emit() }

  render() { 
    return <section class="wrapper">
      <section id="drawer">
        <div id="close-icon" onClick={this.close.bind(this)} innerHTML={timesCircleIcon} title="Close"></div>
        <slot/>
      </section>
    </section>
  }
}
