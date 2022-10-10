import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import '@shoelace-style/shoelace/dist/components/tag/tag.js'

import { getEntityData, makeSticky } from '../../utils'

@Component({
  tag: 've-entities',
  styleUrl: 've-entities.css',
  shadow: true,
})
export class Entities {
  @Prop() language: string
  @Prop() sticky: boolean

  @Element() el: HTMLElement

  @State() activeElem: HTMLElement = null
  @Watch('activeElem')
  activeElemChanged(activeElem) {
    this.qids = (activeElem.getAttribute('entities') || '').replace(/\s/g,',').split(',').filter(pe => pe)
  }

  @State() entities: any[] = []
  /*
  @Watch('entities')
  entitiesChanged(entities) {
    console.log('entitiesChanged', entities)
  }
  */

  @State() qids: string[] = []
  @Watch('qids')
  async qidsChanged(qids) {
    let _entities = await getEntityData(qids, this.language || 'en')
    this.entities = Object.values(_entities)
  }

  componentDidLoad() {
    this.el.classList.add('ve-component')
    if (this.sticky) makeSticky(this.el)
    this.watchActive()
  }

  watchActive() {
    this.activeElem = document.querySelector('.active')
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          let target = mutation.target as HTMLElement
          if (Array.from(target.classList).indexOf('active') >= 0) this.activeElem = target
        }
      })
    })
    observer.observe(document, { subtree: true, attributes: true })
  }

  render() {
    return [
      <section>
        { this.entities.map((entity:any) => <sl-tag size="large" pill innerHTML={entity.label}></sl-tag> )}
      </section>
    ]
  }
  
}
