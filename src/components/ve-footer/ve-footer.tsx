import { Component, Element, Prop, h, State } from '@stencil/core'

@Component({
  tag: 've-footer',
  styleUrl: 've-footer.css',
  shadow: true,
})
export class Footer {

  @Prop() sticky: boolean

  @Element() el: HTMLElement

  @State() footerElems: HTMLElement[] = []

  componentWillLoad() {
    if (this.sticky) this.setSticky()
    this.footerElems = Array.from(this.el.querySelectorAll('li'))
    this.el.querySelector('ul').style.display = 'none'
    while (this.el.firstChild) this.el.removeChild(this.el.firstChild)
  }

  componentDidUpdate() {
    if (this.sticky) this.setSticky()
  }

  setSticky() {
    this.el.classList.add('sticky')
    let footerHeight = this.el.offsetHeight
    footerHeight += parseInt(window.getComputedStyle(this.el).getPropertyValue('margin-top'))
    footerHeight += parseInt(window.getComputedStyle(this.el).getPropertyValue('margin-bottom'))
    document.querySelector('main').style.paddingBottom = `${footerHeight}px`
    this.el.style.width = `${this.el.parentElement.clientWidth}px`
  }

  styleToObj(s:string) {
    // Converts style value to object
    return s
      ? Object.fromEntries(s.split(';').filter(s => s.trim()).map(s => s.split(':').map(s => s.trim())))
      : {}
  }

  render() {
    return [
      this.footerElems.map(el => <div class={el.className} style={this.styleToObj(el.getAttribute('style'))} innerHTML={el.innerHTML}></div>),
      <ve-content-viewer path="/rsnyder/essays" format="markdown" show={false}></ve-content-viewer>
    ]
  }

}
