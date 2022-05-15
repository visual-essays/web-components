import { Component, Element, h } from '@stencil/core';
import OpenSeadragon from 'openseadragon'
import * as Annotorious from '@recogito/annotorious-openseadragon'

@Component({
  tag: 've-anno',
  styleUrl: 've-anno.css',
  shadow: true,
})
export class Anno {

  @Element() el: HTMLElement;

  connectedCallback() {
    console.log('ve-anno.connectedCallback')
  }

  componentDidLoad() {
    let viewer = OpenSeadragon({
      element: this.el.shadowRoot.getElementById('osd'),
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
    })
    // let annotorious = Annotorious(viewer, {})
    let annotorious = Annotorious.default(viewer, { widgets: ['COMMENT'] })
    // Array.from(this.el.shadowRoot.querySelectorAll('.a9s-annotationlayer')).forEach((elem:HTMLElement) => elem.style.display = 'unset')
    console.log(annotorious)
    annotorious.on('selectAnnotation', async (anno) => {
      console.log('selectAnnotation', anno)
    })
    annotorious.on('createAnnotation', async (anno) => {
      console.log('createAnnotation', anno)
    })
    annotorious.on('updateAnnotation', async (anno) => {
      console.log('updateAnnotation', anno)
    })
    annotorious.on('deleteAnnotation', async (anno) => {
      console.log('deleteAnnotation', anno)
    })

    viewer.open({
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Georgia_Jvari_monastery_IMG_9345_2070.jpg',
      type: 'image',
      buildPyramid: true 
    })
  }

  render() {
    return [
      <div id="toolbar"></div>,
      <div id="osd" style={{width: '800px', height: '600px'}}></div>
    ]
  }
}
