import { Component, Element, Event, EventEmitter, Prop, State, h, Watch, Method } from '@stencil/core';
import { getManifest, imageInfo, getDepictedEntities, getEntityData, sha256, label, summary, thumbnail, source, sourceId } from '../../utils'

import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
// setBasePath(location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://visual-essays.github.io/web-components/src')
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-depicts',
  styleUrl: 've-depicts.css',
  shadow: true,
})
export class Depicts {
  @Prop() manifest: string
  @Prop({ mutable: true, reflect: true }) depicted: any[] = []
  @Prop() format: string = 'default'
  @Prop() editable: boolean = false

  @Element() el: HTMLElement;

  @State() _manifest: any
  @State() entityData: any = {}
  @State() entityDataInSync: boolean = false
  @State() imageHash: string

  async connectedCallback() {
    // console.log(`ve-depicts.connectedCallback format=${this.format} depicted=${this.depicted.length}`)
    if (this.manifest) {
      this._manifest = await getManifest(this.manifest)
      this.imageHash = sha256(imageInfo(this._manifest).id)
      this.depicted = await getDepictedEntities(this.imageHash)
    } else if (this.depicted) {
      this.getEntityData()
    }
  }

  @Watch('depicted')
  async depictedChanged() {
    this.getEntityData()
  }

  @Event({ bubbles: true, composed: true }) prominentToggled: EventEmitter<any>
  @Event({ bubbles: true, composed: true }) droToggled: EventEmitter<any>
  @Event({ bubbles: true, composed: true }) entityRemoved: EventEmitter<any>

  async getEntityData() {
    this.entityDataInSync = false
    this.entityData = await getEntityData(this.depicted.map(entity => entity.id))
    this.entityDataInSync = true
  }

  @Method()
  async refresh(depicted: any[]) {
    this.depicted = depicted
    this.getEntityData()
  }
    
  toggleDro(qid: string) {
    this.droToggled.emit(qid)
  }

  toggleProminent(qid: string) {
    this.prominentToggled.emit(qid)
  }

  removeEntity(qid: any) {
    this.entityRemoved.emit(qid)
  }

  @Method()
  async edit() {
    let dialog: any = this.el.shadowRoot.querySelector('ve-depicts-dialog')
    dialog.show = !dialog.show
  }

  label(qid:string) {
    return this.entityData[qid]?.label
  }

  defaultFormat() {
    return <div class="depicted-entities">
      <ul>
      { this.depicted.map((entity) =>
        <li>
          <a href={`https://www.wikidata.org/entity/${entity.id}`} innerHTML={this.label(entity.id)}></a>
        </li>
      )}
      </ul>
      {this.editable
        ? <ve-depicts-dialog
          depicted={this.depicted}
          label={label(this._manifest)}
          summary={summary(this._manifest)}
          thumbnail={thumbnail(this._manifest)}
          imageHash={this.imageHash}
          source={source(this._manifest)}
          sourceId={sourceId(this._manifest)}
          ></ve-depicts-dialog>
        : null
      }
    </div>
  }

  tableFormat() {
    return <div>
      <ul class="depicted-entities table">
        <li class="header">
          <div class="label">Entity</div>
          <div class="dro">Digital representation of</div>
          <div class="prominent">Prominent</div>
          <div class="controls"></div>
        </li>
        {this.depicted.map((entity) =>
          <li>
            <div class="label" innerHTML={this.label(entity.id)}></div>
            <div class="dro">
              <input type="checkbox" id="dro" name="dro" checked={entity.dro} onClick={this.toggleDro.bind(this, entity.id)}/>
            </div>
            <div class="prominent">
              <input type="checkbox" id="prominent" name="prominent" checked={entity.prominent} onClick={this.toggleProminent.bind(this, entity.id)}/>
            </div>
            <div class="controls">
              <sl-tooltip content="Remove entity">
                <sl-icon-button onClick={this.removeEntity.bind(this, entity.id)} id="remove-icon" name="trash" label="Remove entity"></sl-icon-button>
              </sl-tooltip>
            </div>
          </li>
        )}
      </ul>
    </div>
  }

  cardsFormat() {
    return <div class="depicted-entities cards">
      <ul>
      { this.depicted.map((entity) =>
        <li>
          <div class="card">
            <img src={this.entityData[entity.id]?.thumbnail}/>
            <div>
              <a class="label" href={`https://www.wikidata.org/entity/${entity.id}`} innerHTML={this.entityData[entity.id]?.label}></a>
              <span class="description" innerHTML={this.entityData[entity.id]?.description}></span>
            </div>
          </div>
        </li>
      )}
      </ul>
    </div>
  }

  render() {
    return this.entityDataInSync
      ? this.format === 'table'
        ? this.tableFormat()
        : this.format === 'cards'
          ? this.cardsFormat()
          : this.defaultFormat()
      : null
  }
}
