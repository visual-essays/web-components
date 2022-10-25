import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { getManifest, imageInfo, label, summary, thumbnail, metadata } from '../../utils'

import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-image-card',
  styleUrl: 've-image-card.css',
  shadow: true,
})
export class ImageCard {
  @Element() host: HTMLElement

  @Prop() manifest: string

  @State() _manifest: any
  @Watch('_manifest')
  _manifestChanged() {
    if (this._manifest) this.metadata = this.getMetadata()
  }

  @State() metadata: any[] = []
  @Watch('metadata')
  async metadataChanged() {
    this.location = this.getMetadataValue('location')
  }

  @State() location: string


  async connectedCallback() {
    this._manifest = await getManifest(this.manifest)
  }

  async componentDidUpdate() {
    if (decodeURIComponent(this.manifest) !== this._manifest.id) {
      this._manifest = await getManifest(this.manifest)
    }
  }

  getMetadataValue(label): string {
    let found = (this.metadata || []).find(md => md.label === label)
    return found ? (Object.values(found.value).flat()[0] as string) : ''
  }

  imageDimensions() {
    let _imageInfo = imageInfo(this._manifest)
    return `${_imageInfo.width.toLocaleString()} x ${_imageInfo.height.toLocaleString()}`
  }

  getMetadata() {
    let dateFields = new Set(['created', 'updated'])
    let exclude = new Set(['image_url', 'size'])
    let _metadata = metadata(this._manifest).filter(item => !exclude.has(item.label))
    if (this._manifest.navDate) _metadata.push({label:'navDate', value:this._manifest.navDate})
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

  @Event({ bubbles: true, composed: true }) imageSelectedEvent: EventEmitter<any>

  imageSelected(dialogType: string, evt: PointerEvent) {
    evt.stopPropagation()
    this.imageSelectedEvent.emit({manifest: this._manifest, dialogType})
  }

  onCardDrag(manifest:any, dragEvent: DragEvent) {
    dragEvent.dataTransfer?.setData('text/uri-list', `${manifest.id}?manifest=${manifest.id}`)
  }

  copyTextToClipboard(text:string, evt:PointerEvent) {
    evt.stopPropagation()
    console.log('copyTextToClipboard', text, evt)
    if (navigator.clipboard) navigator.clipboard.writeText(text)
  }

  render() {
    return [
      this._manifest
        ? <div class="card" draggable={true} onDragStart={this.onCardDrag.bind(this, this._manifest)} onClick={this.imageSelected.bind(this, 'image')}>
          <div class="card-title" innerHTML={label(this._manifest)}></div>
          <div class="card-image" 
            style={{
              backgroundImage: `url(${thumbnail(this._manifest)})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center'
            }}
          ></div>
          { this.metadata && 
            <div class="card-metadata">
              <ul> { this.metadata.map(md => 
                <li>
                  <span class="md-label" innerHTML={md.label}></span>
                  { md.value.length === 1
                    ? <span class="md-value" innerHTML={md.value[0]}></span>
                    : <ul>
                      {md.value.map(val =>
                        <li><span class="md-value" innerHTML={val}></span></li>
                      )}
                      </ul>
                  }
                </li> )}
              </ul>
            </div>
          }
          <div class="card-links">
            <sl-tooltip content="Copy IIIF Manifest URL">
              <img onClick={this.copyTextToClipboard.bind(this, this._manifest.id)} src="https://visual-essays.github.io/web-app/static/iiif.png" alt="IIIF manifest icon"/>
            </sl-tooltip>
            {this.location && <sl-tooltip content="Show location on map">
              <sl-icon name="map-fill" style={{cursor: 'pointer'}} onClick={this.imageSelected.bind(this, 'map')}></sl-icon>
            </sl-tooltip>}
          </div>
          { false && this._manifest.summary && <div class="card-abstract" innerHTML={summary(this._manifest)}></div> }
        </div>
      : null
    ]
  }

}
