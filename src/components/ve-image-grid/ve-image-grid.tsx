import { Component, Element, Listen, Prop, State, Watch, h } from '@stencil/core';
import { loadManifests, imageInfo, label, metadata, thumbnail, iiifServer } from '../../utils'

import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-image-grid',
  styleUrl: 've-image-grid.css',
  shadow: true,
})
export class ImageGallery {
  @Element() host: HTMLElement

  @Prop() asCards: boolean = false

  @State() manifestUrls: any[] = []
  @Watch('manifestUrls')
  async manifestUrlsChanged() {
    if (!this.asCards)
    this.manifests = await loadManifests(this.manifestUrls)
  }

  @State() manifests: any[] = []

  @State() selected: any
  @Watch('selected')
  async selectedChanged() {
    if (this.selected) this.metadata = this.getMetadata()
  }

  @State() metadata: any[] = []
  @Watch('metadata')
  async metadataChanged() {
    this.location = this.getMetadataValue('location')
    this.zoom = parseFloat(this.getMetadataValue('zoom') || '18')
    this.overlay = this.getMetadataValue('allmapsId')
  }

  @State() dialogType: string
  @State() location: string
  @State() zoom: number
  @State() overlay: string

  @State() observer: MutationObserver

  connectedCallback() {
    this.listenForSlotChanges()
    this.buildManifestsList()
  }

  buildManifestsList() {

    this.manifestUrls = Array.from(this.host.querySelectorAll('li'))
    .filter(el => el.innerHTML.trim())
    .map(el => {
      let manifestId = el.innerHTML.trim()
      return manifestId.startsWith('http') ? manifestId : `${iiifServer}/${manifestId}/manifest.json`
  })
  console.log(`buildManifestsList: manifests=${this.manifestUrls.length}`)
  //while (this.host.firstChild) this.host.removeChild(this.host.firstChild)
  }

  listenForSlotChanges() {
    let slot = document.querySelector('ve-image-grid ul')
    if (!this.observer && slot) {
      const callback = (mutationsList) => {
        let match = mutationsList.find(mutation => mutation.type === 'childList') !== undefined
        if (match) this.buildManifestsList()
      }
      this.observer = new MutationObserver(callback)
      this.observer.observe(slot, { childList: true, subtree: true, characterData: true })
    }
  }

  getMetadata() {
    let dateFields = new Set(['created', 'updated'])
    let exclude = new Set(['image_url', 'size'])
    let _metadata = metadata(this.selected).filter(item => !exclude.has(item.label))
    if (this.selected.navDate) _metadata.push({label:'navDate', value:this.selected.navDate})
    _metadata.push({label:'dimensions', value:this.imageDimensions()})
    _metadata = _metadata
    .map(md => dateFields.has(md.label) ? {label:md.label, value:[md.value[0].split('T')[0]]} : md)
    .map(md => {
      if (md.label === 'source_url') {
        let fileName = md.value[0].split('/').pop()
        md = {label:'source', value:[`<a href="${md.value[0]}" target="_blank">${fileName}</a>`]}
      }
      return md
    })
    .map(md => ({label:md.label, value:Array.isArray(md.value) ? md.value : [md.value]}))
    return _metadata.sort()
  }

  getMetadataValue(label): string {
    let found = (this.metadata || []).find(md => md.label === label)
    return found ? (Object.values(found.value).flat()[0] as string) : ''
  }

  imageDimensions() {
    let _imageInfo = imageInfo(this.selected)
    return `${_imageInfo.width.toLocaleString()} x ${_imageInfo.height.toLocaleString()}`
  }

  @Listen('imageSelectedEvent')
  async onimageSelectedEvent(event: CustomEvent) {
    this.dialogType = event.detail.dialogType
    this.selected = event.detail.manifest
    let dialog = this.host.shadowRoot.querySelector('sl-dialog')
    dialog.show()
  }

  renderThumbnails() {
    return [
      <section class="ve-image-grid">
        { 
          this.manifests.map((manifest) => <img src={thumbnail(manifest)} alt={label(manifest)}/>) 
        }
      </section>
    ]
  }

  renderAsCards() {
    return [
      <section class="cards">
        {
          this.manifestUrls.map((manifest) => 
            <ve-image-card manifest={manifest}></ve-image-card>
          )
        }
      </section>,
      <sl-dialog no-header>
        { this.dialogType === 'map' &&
          <ve-map center={this.location} marker={this.location} zoom={this.zoom} overlay={this.overlay}></ve-map>
        }
        { this.dialogType === 'image' &&
          <ve-image src={this.selected?.id} width="100%"></ve-image>
        }
        </sl-dialog>
    ]
  }

  render() {
    return this.asCards
      ? this.renderAsCards()
      : this.renderThumbnails()
  }

}
