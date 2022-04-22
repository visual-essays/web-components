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
    console.log(`open=${this.open}`)
    if (this.open) this.el.shadowRoot.getElementById('drawer').classList.add('open')
    else this.el.shadowRoot.getElementById('drawer').classList.remove('open')
  }

  componentWillLoad() {
  }

  componentDidLoad() {
    console.dir(this.el)
  }


  render() { 
    return <section class="wrapper">
      <section id="drawer">
        <slot/>
      </section>
    </section>
  }
}
