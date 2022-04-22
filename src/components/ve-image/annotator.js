import * as Annotorious from '@recogito/annotorious-openseadragon'
import Toolbar from '@recogito/annotorious-toolbar'

const annotationsEndpoint = location.hostname === 'localhost'
  ? 'http://localhost:8000'
  : 'https://api.visual-essays.net'

export class Annotator {

  constructor(viewer, toolbar) {
    this._path
    this._user
    this._target

    console.log(`annotator.constructor`)
    this._annotorious = Annotorious.default(viewer, {readOnly: true})
    console.log(this._annotorious)
    if (toolbar) {
      Toolbar(this._annotorious, toolbar)
      this._annotorious.on('createAnnotation', async (anno) => this._createAnnotation(anno))
      this._annotorious.on('updateAnnotation', async (anno) => this._updateAnnotation(anno))
      this._annotorious.on('deleteAnnotation', async (anno) => this._deleteAnnotation(anno))
      this._annotorious.on('mouseEnterAnnotation', async (anno) => this.selectAnnotation(anno))
      this._annotorious.on('mouseLeaveAnnotation', async () => this.selectAnnotation())
    }
  }

  selectAnnotation(anno) {
    this._annotorious.selectAnnotation(anno)
  }

  async loadAnnotations(path) {
    this._path = path
    let annotations = []
    console.log('loadAnnotations')
    let resp = await fetch(`${annotationsEndpoint}/annotations/${this._path}/`, {
      headers: {
        Accept: 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld'
      }
    })
    if (resp.ok) {
      resp = await resp.json()
      console.log(resp)
      this._user = resp.user
      this._target = resp.target
      annotations = resp.annotations
      this._annotorious.setAnnotations(resp.annotations)
    }
    console.log(`loadAnnotations: path=${this._path}`, this.getAnnotations())
    return annotations
  }

  getAnnotations() {
    return this._annotorious ? this._annotorious.getAnnotations() : []
  }

  async getAnnotation(annoId) {
    let resp = await fetch(`${annotationsEndpoint}/annotation/${this._path}/${annoId}/`)
    if (resp.ok) return await resp.json() 
  }

  async _createAnnotation(anno) {
    anno.id = anno.id.slice(1)
    anno.target.id = this._target
    anno.creator = this._user
    console.log(`createAnnotation: target=${anno.target.id} creator=${anno.creator}`, anno)
    let resp = await fetch(`${annotationsEndpoint}/annotation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',
        Accept: 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld'
      },
      body: JSON.stringify(anno)
    })
    if (resp.ok && resp.status === 201) {
      this._annotorious.setAnnotations(this._annotorious.getAnnotations())
    } else {
      console.log(`createAnnotation: unexpected resp_code=${resp.status}`)
    }
  }
  
  async _updateAnnotation(anno) {
    anno.target.id = this._target
    console.log(`updateAnnotation: target=${anno.target.id}`, anno)
    let resp = await fetch(`${annotationsEndpoint}/annotation/${this._path}/${anno.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',
        Accept: 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld'
      },
      body: JSON.stringify(anno)
    })
    if (resp.status !== 202) {
      console.log(`updateAnnotation: unexpected resp_code=${resp.status}`)
    }
  }

  async _deleteAnnotation(anno) {
    console.log('deleteAnnotation', anno)
    let resp = await fetch(`${annotationsEndpoint}/annotation/${this._path}/${anno.id}/`, { method: 'DELETE' })
    if (resp.status !== 204) {
      console.log(`deleteAnnotation: unexpected resp_code=${resp.status}`)
    }
  }

}
