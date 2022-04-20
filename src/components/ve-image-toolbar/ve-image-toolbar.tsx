import { Component, Prop, h } from '@stencil/core';
import homeIcon from './icons/home-solid.svg'
import searchPlusIcon from './icons/search-plus-solid.svg'
import searchMinusIcon from './icons/search-minus-solid.svg'
import infoCircleIcon from './icons/info-circle-solid.svg'

@Component({
  tag: 've-image-toolbar',
  styleUrl: 've-image-toolbar.css',
  shadow: true,
})
export class Entities {
  @Prop() entities: string

  connectedCallback() {
    console.log('ve-entities.connectedCallback', this.entities)
  }

  render() {
    return [
      <div id="go-home" innerHTML={homeIcon}></div>,
      <div id="zoom-in" innerHTML={searchPlusIcon}></div>,
      <div id="zoom-out" innerHTML={searchMinusIcon}></div>,
      <div id="info-box" innerHTML={infoCircleIcon}></div>
    ]
  }
}
