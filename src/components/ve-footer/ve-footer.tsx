import { Component, h } from '@stencil/core';

@Component({
  tag: 've-footer',
  styleUrl: 've-footer.css',
  shadow: true,
})
export class Footer {

  render() {
    return [
      <section class="ve-footer">Visual Essays Footer</section>
    ]
  }
}
