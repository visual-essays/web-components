import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';
import homeIcon from '../../icons/home-solid.svg'
import searchPlusIcon from '../../icons/search-plus-regular.svg'
import searchMinusIcon from '../../icons/search-minus-regular.svg'
import infoCircleIcon from '../../icons/info-circle-solid.svg'
import commentDotsIcon from '../../icons/comment-dots-regular.svg'
import browseAnnotationsIcon from '../../icons/browse-annotations.svg'
import editAnnotationsIcon from '../../icons/edit-annotations.svg'

@Component({
  tag: 've-image-toolbar',
  styleUrl: 've-image-toolbar.css',
  shadow: true,
})
export class Entities {
  @Prop() hasAnnotations: boolean = false
  @Prop() canEdit: boolean = false

  @Element() el: HTMLElement;

  @Event({ bubbles: true, composed: true }) iconClicked: EventEmitter<string>

  onClick(action: string) {
    this.cancelTip()
    this.iconClicked.emit(action)
  }

  createTip(e: MouseEvent) {
    let el = (e.composedPath()[0] as HTMLElement)
    if (el.title !== '') {
      el.setAttribute('tooltip', el.title)
      el.title = ''
    }
    let tooltip = this.el.shadowRoot.getElementById('tooltip')
    tooltip.innerHTML = el.getAttribute('tooltip')
    tooltip.setAttribute('style', `visibility:visible; top:${el.offsetTop-10}px; right:${40}px;`)
  }

  cancelTip() {
    this.el.shadowRoot.getElementById('tooltip').setAttribute('style', `visibility:hidden;`)
  }

  componentDidLoad() {
    Array.from(this.el.shadowRoot.querySelectorAll('div'))
      .forEach((div:HTMLElement) => {
        if (div.title !== '') {
          div.addEventListener('mouseenter', (e) => this.createTip(e))
          div.addEventListener('mouseleave', () => this.cancelTip())
        }
      })
  }
  render() {
    return [
      <div onClick={this.onClick.bind(this, 'goHome')} innerHTML={homeIcon} title="Go Home"></div>,
      <div onClick={this.onClick.bind(this, 'zoomIn')} innerHTML={searchPlusIcon} title="Zoom In"></div>,
      <div onClick={this.onClick.bind(this, 'zoomOut')} innerHTML={searchMinusIcon} title="Zoom Out"></div>,
      <div onClick={this.onClick.bind(this, 'showInfo')} innerHTML={infoCircleIcon} title="Show Image Info"></div>,
      <div style={{display: this.hasAnnotations ? 'block' : 'none'}} onClick={this.onClick.bind(this, 'toggleShowAnnotations')} innerHTML={commentDotsIcon} title="Show Annotations"></div>,
      <div style={{display: this.hasAnnotations ? 'block' : 'none'}} onClick={this.onClick.bind(this, 'toggleShowAnnotationsBrowser')} innerHTML={browseAnnotationsIcon} title="Browse Annotations"></div>,
      <div style={{display: (this.hasAnnotations && this.canEdit) ? 'block' : 'none'}} onClick={this.onClick.bind(this, 'editAnnotations')} innerHTML={editAnnotationsIcon} title="Edit Annotations"></div>,
      <div id="tooltip">Tooltip</div>
    ]
  }
}
