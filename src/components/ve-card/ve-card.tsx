import { Component, Element, Prop, State, h } from '@stencil/core';
import { getManifest, label, thumbnail } from '../../utils'

import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-card',
  styleUrl: 've-card.css',
  shadow: true,
})
export class Card {
  @Prop() entities: string
  @Prop() label: string
  @Prop() image: string
  @Prop() href: string
  @Prop({ mutable: true, reflect: true }) description: string

  @Element() el: HTMLElement;

  @State() manifest: any

  async connectedCallback() {
    this.description = this.el.innerHTML.trim() || this.description
    this.manifest = await getManifest(this.image)
  }

  render() {
    return [
      <sl-card class="card-overview">
        <img slot="image" src={thumbnail(this.manifest)} alt={label(this.manifest)}/>
        { this.href 
          ? <div class="label"><a href={this.href} innerHTML={this.label}></a></div>
          : <div class="label" innerHTML={this.label}></div>
        }
        <sl-icon name="envelope"></sl-icon>
        {this.description && <div class="description" innerHTML={this.description}></div>}
      </sl-card>
    ]
  }
}
