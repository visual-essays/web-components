import { Component, Element, Prop, State, h } from '@stencil/core';
import { getManifest, label, thumbnail } from '../../utils'

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
        {this.description && <div class="description" innerHTML={this.description}></div>}
      </sl-card>
    ]
  }
}
