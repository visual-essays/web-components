import { Component, Element, Prop, State, h } from '@stencil/core';
import { getManifest, label, thumbnail } from '../../utils'

import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/dist/collection')

@Component({
  tag: 've-card',
  styleUrl: 've-card.css',
  shadow: true,
})
export class Card {
  @Prop() entities: string
  @Prop() manifest: string
  @Prop() label: string

  @Element() el: HTMLElement;

  @State() _manifest: any
  @State() description: string

  async connectedCallback() {
    this.description = this.el.innerHTML.trim()
    this._manifest = await getManifest(this.manifest)
  }

  render() {
    return [
      <sl-card class="card-overview">
        <img slot="image" src={thumbnail(this._manifest)} alt={label(this._manifest)}/>
        <div class="label" innerHTML={this.label}></div>
        <sl-icon name="envelope"></sl-icon>
        {this.description && <div class="description" innerHTML={this.description}></div>}
      </sl-card>
    ]
  }
}
