import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { getEntity, getSummaryText } from '../../utils'

@Component({
  tag: 've-entity-card',
  styleUrl: 've-entity-card.css',
  shadow: true,
})
export class EntityCard {

  @Element() el: HTMLElement

  @Prop({ mutable: true, reflect: true }) qid: string

  @Watch('qid')
  async qidChanged() {
    this.getEntity()
  }

  @State() entity: any
  @State() thumbnailWidth: string

  async getEntity() {
    if (!this.entity || this.entity.id !== this.qid) {
      let entity = await getEntity(this.qid)
      let summaryText = await getSummaryText(this.qid)
      if (summaryText) entity = {...entity, summaryText}  
      this.entity = entity
    }
  }

  encodeUrl(url) {
    let parts = url.split('/')
    let encoded = `${parts.slice(0,-1).join('/')}/${encodeURIComponent(parts[parts.length-1])}`
    return encoded
  }

  unwrap(html:string) {
    let inner = new DOMParser().parseFromString(html, 'text/html')
    return inner.children[0].children[1].children[0].innerHTML
  }

  componentWillRender() {
    this.el.parentElement.style.width = `${this.el.clientWidth}px`
    this.thumbnailWidth = `${this.el.clientWidth * .33}px`
    this.getEntity()
  }

  render() {
    return <div id="card" class="card">
      <div class="label" innerHTML={this.entity?.label}></div>
      <div class="description" innerHTML={this.entity?.description}></div>
      {this.entity?.thumbnail && <div class="image" style={{backgroundImage:`url('${this.encodeUrl(this.entity?.thumbnail)}')`, width: this.thumbnailWidth}}></div>}
      <div class="links">
        {this.entity?.wikipedia && <span class="logo" title="Wikipedia">
          <a target="_blank" href={this.entity.wikipedia}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Wikipedia_svg_logo.svg"/>
          </a>
        </span> }
        <span class="logo" title="Wikidata">
          <a target="_blank" href={`https://www.wikidata.org/entity/${this.entity?.id}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg"/>
          </a>
        </span>
      </div>
      {this.entity?.summaryText && <p class="summary" innerHTML={this.unwrap(this.entity.summaryText)}></p>}
    </div>
  }

}
