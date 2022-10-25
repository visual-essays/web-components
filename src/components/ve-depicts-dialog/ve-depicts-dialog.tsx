import { Component, Element, Event, EventEmitter, Listen, Prop, State, h, Watch } from '@stencil/core';

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'

@Component({
  tag: 've-depicts-dialog',
  styleUrl: 've-depicts-dialog.css',
  shadow: true,
})
export class DepictsDialog {
  @Prop({ mutable: true, reflect: true }) show: boolean = false
  @Prop({ mutable: true, reflect: true }) depicted: any[] = []
  @Prop() label: string
  @Prop() summary: string
  @Prop() thumbnail: string
  @Prop() imageHash: string
  @Prop() source: string
  @Prop() sourceId: string

  @Element() el: HTMLElement;

  @State() dialog: any
  @State() _depicted: any[] = [] // private copy

  @Watch('show')
  showChanged(show: boolean) {
    if (show) {
      this.dialog.show()
    } else {
      this.dialog.hide()
    }
  }

  @Event({ bubbles: true, composed: true }) depictedChanged: EventEmitter<any>

  @Watch('depicted')
  async onDepictedChanged(depicted) {
    this._depicted = [...depicted]
  }

  async connectedCallback() {
    // console.log(`Depicts.Dialog.connectedCallback label=${this.label} summary=${this.summary} thumbnail=${this.thumbnail} imageHash=${this.imageHash} source=${this.source} sourceId=${this.sourceId} depicted=${this.depicted.length}`)
    if (this.depicted) {
      this._depicted = [...this.depicted]
    }
  }

  componentDidLoad() {
    this.dialog = this.el.shadowRoot.getElementById('depicts-dialog')
    this.dialog.addEventListener('sl-hide', () => this.show = false)
    if (this.show) this.dialog.show()
  }

  @Listen('entity-selected')
  async onEntitySelected(event: CustomEvent) {
    this._depicted = [...this._depicted, ...[event.detail]]
  }

  parseStatements(statements: any, type?: string) {
    return Object.fromEntries(Object.entries(statements)
      .map(([pid, values]) => {
        return [
          pid, 
          (values as any[]).map((value:any) => {
            
            let datavalue: any = {type: value.type, value: value.value}
            if (value.type === 'wikibase-entityid') {
              datavalue.value = {
                id: value,
                'entity-type': 'item',
                'numeric-id': parseInt(value.value.slice(1))
              }
            }
            let property: any = {
              mainsnak: {
                snaktype: 'value',
                property: pid,
                datavalue
              }
            }
            if (type) property.type = type
            if (type === 'statement') property.rank = value.rank || 'normal'
            if (value.qualifiers) {
              property.qualifiers = this.parseStatements(value.qualifiers)
              property['qualifiers-order'] = Object.keys(property.qualifiers)
            }
            return property
          })
        ]
      }
    ))
  }
  
  toEntityJSON({id, labels, descriptions, statements}: {id?: string, labels?: any, descriptions?: any, statements?: any}) {
    return {
      id,
      labels: labels
        ? Object.fromEntries(Object.entries(labels).map(([language, value]) => [language, {language, value}]))
        : {},
      descriptions: descriptions
        ? Object.fromEntries(Object.entries(descriptions).map(([language, value]) => [language, {language, value}]))
        : {},
      statements: statements
        ? this.parseStatements(statements, 'statement')
        : {}
    }
  }
  
  @Listen('prominentToggled')
  async onProminentToggled(event: CustomEvent) {
    let qid = event.detail
    this._depicted = this._depicted.map(entity => {entity.prominent = entity.id === qid ? !entity.prominent : entity.prominent; return entity})
  }

  @Listen('droToggled')
  onDroToggled(event: CustomEvent) {
    let qid = event.detail
    this._depicted = this._depicted.map(entity => {entity.dro = entity.id === qid ? !entity.dro : entity.dro; return entity})
  }

  @Listen('entityRemoved')
  onEntityRemoved(event: CustomEvent) {
    let qid = event.detail
    this._depicted = this._depicted.filter(entity => entity.id !== qid)
  }

  close() {
    this.show = false
    this._depicted = [...this.depicted]
  }

  async apply() {
    let statements: any = {
      P180: this._depicted.map(entity => {
        return {
          type: 'wikibase-entityid',
          value: entity.id,
          rank: entity.prominent ? 'preferred' : 'normal'
        }
      })
    }
    if (this.source) {
      statements.P854 = [{ type: 'string', value: this.source}] // reference URL
    }
    let dro = this._depicted.filter(entity => entity.dro)
    if (dro.length > 0) statements.P6243 = dro.map(entity => {
        return {
          type: 'wikibase-entityid',
          value: entity.id,
          rank: entity.prominent ? 'preferred' : 'normal'
        }
    })
    let entity = this.toEntityJSON({id: this.sourceId, statements})

    let endpoint = `https://www.jstor.org/api/labs-search-service/labs/about/_doc/${this.imageHash}/`
    let resp = await fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(entity),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (resp.ok) {
      let depictsElements = Array.from(document.querySelectorAll('ve-depicts'))
      this.depicted = this._depicted
      depictsElements.forEach(el => el.refresh(this.depicted))
    }
    this.show = false
  }

  render() {
    return [
      <sl-dialog id="depicts-dialog" label="Entities depicted in image" class="dialog-overview">
        <div style={{display:'flex', padding:'12px', border:'1px solid #ccc', marginBottom:'18px'}}>
          {this.thumbnail
            ? <img style={{maxWidth:'40%', height:'100%'}} src={this.thumbnail} alt={this.label}/>
            : ''
          }
          <div style={{display: 'flex', flexDirection: 'column', padding: '0px'}}>
            <div innerHTML={this.label} style={{padding: '0 12px', fontSize:'1.2rem', fontWeight:'bold'}}></div>
            { this.summary
              ? <div innerHTML={this.summary} style={{padding: '0 12px', fontSize:'1rem'}}></div>
              : null
            }
          </div>
        </div>
        <ve-wikidata-search></ve-wikidata-search>
        <div class="wrapper">
          <div class="ve-depicts"><ve-depicts depicted={this._depicted} format="table"></ve-depicts></div>
        </div>
        <sl-button slot="footer" onClick={this.close.bind(this)}>Cancel</sl-button>
        <sl-button slot="footer" variant="primary" onClick={this.apply.bind(this)}>Apply</sl-button>
      </sl-dialog>
    ]
  }
}
