import { Component, Element, Prop, State, h } from '@stencil/core';

@Component({
  tag: 've-nav',
  styleUrl: 've-nav.css',
  shadow: true
})
export class Nav {
  
  @Prop() background: string
  @Prop() position: string = 'left'

  @Element() el: HTMLElement

  @State() navItems: any = []

  connectedCallback() {
    console.log(`ve-nav: background=${this.background} position=${this.position}`)
    this.el.classList.add(this.position)
  }

  componentWillLoad() {
  }

  listenForSlotChanges() {
    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          this.navItems = Array.from(this.el.querySelectorAll('li')).map(navItem =>
            navItem.firstChild.nodeName === 'A'
              ? {label: navItem.firstChild.textContent, href: (navItem.firstChild as HTMLLinkElement).href}
              : {label: navItem.firstChild.textContent}
          )
        }
      }
    }
    const observer = new MutationObserver(callback);
    observer.observe(this.el, { childList: true, subtree: true, characterData: true })
  }

  componentDidLoad() {    
    this.listenForSlotChanges()
  }

  menuItemSelected(item:any) {
    console.log('menuItemSelected', item)
  }

  navIcon(item:any) {
    return ''
  }

  render() {
    return <div class="nav" style={{backgroundColor: this.background}}>
      <input class="menu-btn" type="checkbox" id="menu-btn"/>
      <label class="menu-icon" htmlFor="menu-btn"><span class="navicon"></span></label>
      <ul class="menu">
      { this.navItems.map((item:any) => 
        <li onClick={this.menuItemSelected.bind(this, item)}>{item.label}</li>
      )}
      </ul>
    </div>
  }

}