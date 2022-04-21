import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';
import homeIcon from '../../icons/home-solid.svg'
import searchPlusIcon from '../../icons/search-plus-regular.svg'
import searchMinusIcon from '../../icons/search-minus-regular.svg'
import infoCircleIcon from '../../icons/info-circle-solid.svg'
import commentDotsIcon from '../../icons/comment-dots-regular.svg'
import navigateAnnotationsIcon from '../../icons/navigate-annotations.svg'
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

  onClick(action: string) { this.iconClicked.emit(action) }

  createTip(el: HTMLElement) {
    if (el.title !== '') {
      el.setAttribute('tooltip', el.title)
      el.title = ''
    }
    let tooltip = this.el.shadowRoot.getElementById('tooltip')
    tooltip.innerHTML = el.getAttribute('tooltip')
    let padding = 5
    let linkProps = el.getBoundingClientRect()
    let tooltipProps = tooltip.getBoundingClientRect()
    let topPos = linkProps.top - (tooltipProps.height + padding)
    tooltip.setAttribute('style', `visibility:visible; top:${topPos+5}px; right:${40}px;`)
  }

  cancelTip() {
    this.el.shadowRoot.getElementById('tooltip').setAttribute('style', `visibility:hidden;`)
  }

  componentDidLoad() {
    Array.from(this.el.shadowRoot.querySelectorAll('div'))
      .forEach((div:HTMLElement) => {
        if (div.title !== '') {
          div.addEventListener('mouseover', () => this.createTip(div))
          div.addEventListener('mouseout', () => this.cancelTip())
        }
      })
  }
  render() {
    return [
      <div onClick={this.onClick.bind(this, 'goHome')} innerHTML={homeIcon} title="Go Home"></div>,
      <div onClick={this.onClick.bind(this, 'zoomIn')} innerHTML={searchPlusIcon} title="Zoom In"></div>,
      <div onClick={this.onClick.bind(this, 'zoomOut')} innerHTML={searchMinusIcon} title="Zoom Out"></div>,
      <div onClick={this.onClick.bind(this, 'showInfo')} innerHTML={infoCircleIcon} title="Show Image Info"></div>,
      this.hasAnnotations && <div onClick={this.onClick.bind(this, 'toggleShowAnnotations')} innerHTML={commentDotsIcon} title="Show Annotations"></div>,
      this.hasAnnotations && <div onClick={this.onClick.bind(this, 'navigateAnnotations')} innerHTML={navigateAnnotationsIcon} title="Navigate Annotations"></div>,
      this.hasAnnotations && this.canEdit && <div onClick={this.onClick.bind(this, 'editAnnotations')} innerHTML={editAnnotationsIcon} title="Edit Annotations"></div>,
      <div id="tooltip">Tooltip</div>
    ]
  }
}
