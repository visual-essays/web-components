import { Component, Element, Prop, Watch, h } from '@stencil/core';

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

  componentWillLoad() {
  }

  componentDidLoad() {
  }


  render() { 
    return <section class="wrapper">
      <section id="drawer">
        <slot/>
      </section>
    </section>
  }
}
