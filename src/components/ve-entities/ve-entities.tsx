import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 've-entities',
  styleUrl: 've-entities.css',
  shadow: true,
})
export class Entities {
  @Prop() entities: string

  connectedCallback() {
    console.log('ve-entities.connectedCallback', this.entities)
  }

  render() {
    return [
      <section class="ve-entities">{this.entities}</section>
    ]
  }
}
