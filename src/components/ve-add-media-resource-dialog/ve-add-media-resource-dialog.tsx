import { Component, Element, Listen, Prop, State, h, Watch } from '@stencil/core';

import exifr from 'exifr'
import { GithubClient } from '../../gh-utils'
import yaml from 'js-yaml'

import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js'
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

@Component({
  tag: 've-add-media-resource-dialog',
  styleUrl: 've-add-media-resource-dialog.css',
  shadow: true,
})
export class AddMediaResourceDialog {
  @Prop({ mutable: true, reflect: true }) show: boolean = false
  @Prop({ mutable: true, reflect: true }) contentPath: string

  @Element() el: HTMLElement


  @State() authToken: string
  @State() githubClient: any
  @State() acct: string
  @State() repo: string
  @State() ref: string
  @State() pathElems: string[] = []
  @State() dialog: any
  @State() file: File
  @State() fileName: string
  @State() fileExtension: string
  @State() form: HTMLFormElement
  @State() folder: SlInput
  @State() name: SlInput
  @State() summary: SlInput
  @State() image: HTMLImageElement
  @State() filePicker: HTMLInputElement
  @State() exifData: any = {}
  @State() depicted: any[] = []

  @Watch('authToken')
  authTokenChanged() {
    console.log('authTokenChanged')
    // this.isLoggedIn = window.localStorage.getItem('gh-auth-token') !== null
    this.githubClient = new GithubClient(this.authToken)
  }

  @Watch('show')
  showChanged(show: boolean) {
    if (show) this.showDialog()
    else this.hideDialog()
  }

  connectedCallback() {
    this.authToken = window.localStorage.getItem('gh-auth-token') || window.localStorage.getItem('gh-unscoped-token')
  }

  @Watch('contentPath')
  parseContentPath() {
    let [path, args] = this.contentPath.split(':').pop().split('?')
    let qargs = args ? Object.fromEntries(args.split('&').map(arg => arg.split('='))) : {}
    let pathElems = path.split('/').filter(pe => pe)
    if (pathElems.length > 0) this.acct = pathElems[0]
    if (pathElems.length > 1) this.repo = pathElems[1]
    if (pathElems.length > 2) this.pathElems = pathElems.slice(2)
    if (qargs.ref) this.ref = qargs.ref || 'main'
  }

  componentDidLoad() {
    this.parseContentPath()
    this.dialog = this.el.shadowRoot.getElementById('add-media-resource-dialog') as SlDialog
    this.form = this.el.shadowRoot.getElementById('add-media-resource-form') as HTMLFormElement
    this.folder = this.el.shadowRoot.getElementById('resource-folder') as SlInput;
    this.folder.value = this.pathElems.join('/')
    this.name = this.el.shadowRoot.getElementById('resource-name') as SlInput;
    this.summary = this.el.shadowRoot.getElementById('resource-summary') as SlInput;
    this.image = this.el.shadowRoot.getElementById('img') as HTMLImageElement
    this.filePicker = this.el.shadowRoot.getElementById('filePicker') as HTMLInputElement
    this.dialog.addEventListener('sl-hide', () => this.show = false)
    if (this.show) this.dialog.show()
  }

  close() {
    this.show = false
  }

  hideDialog() {
    this.folder.value = '';
    this.name.value = '';
    this.folder.value = '';
    this.file = null
    this.filePicker.value = ''
    this.dialog.hide()
  }

  async showDialog() {
    if (!this.form.onclick) {
      this.form.onclick = function () { }
      this.form.addEventListener('submit', async (evt) => {
        evt.preventDefault()
        console.log(`Add resource: folder="${this.folder.value}" name="${this.name.value}" summary="${this.summary.value}"`)
        let metadata = await this.getMetadata()
        const reader = new FileReader()
        reader.onloadend = async () => {
          const binaryString = reader.result 
          let fileName = this.name.value.trim().replace(/ /g, '_')
          let path = [...this.folder.value.split('/').filter(pe => pe), ...[fileName]].join('/')
          await this.githubClient.putFile(this.acct, this.repo, `${path}.${this.fileExtension}`, binaryString, this.ref, true)
          if (Object.keys(metadata).length > 0)
            await this.githubClient.putFile(this.acct, this.repo, `${path}.yaml`, yaml.dump(metadata), this.ref);
          this.show = false
        }
        reader.readAsBinaryString(this.file)
      })
    }
    this.dialog.show()
  }

  async getMetadata() {
    let metadata: any = {}
    if (this.summary.value) metadata.summary = this.summary.value.trim()
    let depicted = (Array.from(this.el.shadowRoot.querySelectorAll('.depicted [data-entity]')) as HTMLElement[])
      .map(el => el.dataset.entity)
    if (depicted.length > 0) metadata.depicts = depicted
    let exifTags: any = await this.getExifTags()
    if (exifTags) metadata = {...metadata, ...exifTags}
    return metadata
  }

  async getExifTags() {
    let orientation = await exifr.orientation(this.image.src)
    let {latitude, longitude} = await exifr.gps(this.image.src)
    let tags = await exifr.parse(this.image.src, true)
    let data:any = {}
    if (latitude) data.location = `${latitude},${longitude}`
    if (orientation) data.orientation = orientation
    if (tags.CreateDate) data.created = tags.CreateDate.toISOString()
    return data
  }

  fileSelected() {
    if (this.filePicker.files && this.filePicker.files.length > 0) {
      this.file = this.filePicker.files[0]
      let parts: string[] = this.file.name.split('.')
      this.fileExtension = parts.slice(-1)[0].toLowerCase()
      let urlCreator = window.URL || window.webkitURL
      this.image.onload = () => this.getExifTags().then(data => {this.exifData = data})
      this.image.src = urlCreator.createObjectURL(this.file)
    }
  }

  @Listen('entity-selected')
  async onEntitySelected(event: CustomEvent) {
    this.depicted = [...this.depicted, ...[event.detail]]
  }

  removeEntity(entityId) {
    this.depicted = this.depicted.filter(entity => entity.id !== entityId)
  }

  render() {
    return [
      <sl-dialog id="add-media-resource-dialog" label="Add Media Resource">

        <form style={{display: this.file?.name ? 'grid' : 'none'}} id="add-media-resource-form" class="input-validation-pattern">
          
          <div style={{height: `${this.file?.name ? 120 : 0}px`}}>
            <img id="img" style={{paddingLeft: '16px', height: '100%'}}/>
          </div>

          <div class="fields">
            <sl-input autocomplete="off" id="resource-folder" placeholder="Folder" pattern="^[A-z0-9\-_]+$"></sl-input>
            <sl-input autofocus autocomplete="off" required id="resource-name" placeholder="Name" pattern="^[A-z0-9\-_ ]+$"></sl-input>
            <sl-input autocomplete="off" id="resource-summary" placeholder="Summary"></sl-input>
          </div>

          <div class="metadata">

            <div class="exif-data">
              <ul>
                {Object.entries(this.exifData).map(item =>
                  <li>
                    <span class="label" innerHTML={item[0]}></span>
                    <span class="value" innerHTML={item[1] as string}></span>
                  </li>
                )}
              </ul>
            </div>

            <div class="depicted">
              <div class="search">
                <div>Entities:</div>
                <ve-wikidata-search></ve-wikidata-search></div>
              <ul>
                {this.depicted.map(entity => 
                  <li data-entity={entity.id}>
                    <span class="entity-label" innerHTML={entity.label}></span>
                    <span class="entity-description" innerHTML={entity.description || ''}></span>
                    <sl-icon-button class="remove-entity" onClick={this.removeEntity.bind(this, entity.id)} id="remove-icon" name="trash" label="Remove entity"></sl-icon-button>
                  </li>
                )}
              </ul>
            </div>

          </div>

          <div class="buttons">
            <sl-button onClick={this.close.bind(this)}>Cancel</sl-button>
            <sl-button type="submit" variant="primary">Add</sl-button>
          </div>

        </form>
        <input style={{display: this.file?.name ? 'none' : 'block'}} id="filePicker" type="file" accept="image/x-png,image/jpeg,image/gif" onChange={this.fileSelected.bind(this)}/>
        
      </sl-dialog>
    ]
  }
}
