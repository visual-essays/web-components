import { Component, Element, h } from '@stencil/core'
import '@shoelace-style/shoelace/dist/components/button/button'
import '@shoelace-style/shoelace/dist/components/icon/icon'
import '@shoelace-style/shoelace/dist/components/drawer/drawer'

@Component({
  tag: 've-footer',
  styleUrl: 've-footer.css',
  assetsDirs: ['../../assets'],
  shadow: true,
})
export class Footer {

  @Element() el: HTMLElement

  toggleDrawerOpen() {
    let drawer:any = this.el.shadowRoot.querySelector('.drawer-contained')
    drawer.open = !drawer.open
  }

  render() {
    return [
      <section class="ve-footer">
        <sl-button variant="primary" onClick={this.toggleDrawerOpen.bind(this)}>Button</sl-button>
        Visual Essays Footer
        <sl-icon name="award"></sl-icon>
        <div style={{position:'relative', height:'400px', width:'400px', border:'1px solid black'}}>
          <sl-drawer label="Drawer" contained class="drawer-contained" placement="start" style={{'--size': '50%'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <sl-button slot="footer" variant="primary" onClick={this.toggleDrawerOpen.bind(this)}>Close</sl-button>
          </sl-drawer>
        </div>
      </section>
    ]
  }
}
