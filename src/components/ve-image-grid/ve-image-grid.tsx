import { Component, Element, State, h } from '@stencil/core';
import { loadManifests, label, thumbnail, iiifServer } from '../../utils'

@Component({
  tag: 've-image-grid',
  styleUrl: 've-image-grid.css',
  shadow: true,
})
export class ImageGallery {
  @Element() host: HTMLElement
  @State() manifests: any[] = []

  async componentDidLoad() {
    let manifestUrls = Array.from(this.host.querySelectorAll('li')).map(el => {
      let manifestId = el.innerHTML.trim()
      return manifestId.startsWith('http') ? manifestId : `${iiifServer}/${manifestId}/manifest.json`
    })
    while (this.host.firstChild)
      this.host.removeChild(this.host.firstChild)
    this.manifests = await loadManifests(manifestUrls)
  }

  render() {
    return [
      <section class="ve-image-grid">
        { 
          this.manifests.map((manifest) => <img src={thumbnail(manifest)} alt={label(manifest)}/>) 
        }
      </section>
    ]
  }
}
