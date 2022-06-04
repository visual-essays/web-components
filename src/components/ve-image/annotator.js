import * as Annotorious from '@recogito/annotorious-openseadragon'
import Toolbar from '@recogito/annotorious-toolbar'
import { sha256 } from '../../utils' 

const annotationsEndpoint = location.hostname === 'localhost'
  ? 'http://localhost:8000'
  : 'https://api.visual-essays.net'

export class Annotator {

  constructor(viewer, toolbar, authToken) {
    this._annotorious = Annotorious.default(viewer, {readOnly: !authToken})
    this._token = authToken
    this._path
    this._target

    //if (this._token) {
      if (toolbar) Toolbar(this._annotorious, toolbar)
      this._annotorious.on('createAnnotation', async (anno) => this._createAnnotation(anno))
      this._annotorious.on('updateAnnotation', async (anno) => this._updateAnnotation(anno))
      this._annotorious.on('deleteAnnotation', async (anno) => this._deleteAnnotation(anno))
    /*
    } else {
      this._annotorious.on('mouseEnterAnnotation', async (anno) => this.selectAnnotation(anno))
      this._annotorious.on('mouseLeaveAnnotation', async () => this.selectAnnotation())
    }
    */
  }

  setAuthToken(authToken) {
    // console.log(`setAuthToken=${authToken}`)
    this._token = authToken
  }

  destroy() {
    this._annotorious.destroy()
  }

  selectAnnotation(anno) {
    this._annotorious.selectAnnotation(anno)
  }

  async loadAnnotations(path) {
    this._path = path
    let annotations = []
    let resp = await fetch(`${annotationsEndpoint}/annotations/${this._path}/`, {
      headers: {
        Accept: 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld'
      }
    })
    if (resp.ok) {
      resp = await resp.json()
      this._target = resp.target
      annotations = resp.annotations
      this._annotorious.setAnnotations(resp.annotations)
    }
    // console.log(`loadAnnotations: path=${this._path}`, this.getAnnotations())
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
    anno.id = sha256(anno.id).slice(0,8)
    anno.target.id = this.sourceHash
    // console.log(`createAnnotation: target=${anno.target.id} creator=${anno.creator}`, anno)
    let resp = await fetch(`${annotationsEndpoint}/annotation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',
        Accept: 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',
        Authorization: `Bearer: ${this._token}`
      },
      body: JSON.stringify({annotation: anno, path: this._path})
    })
    if (resp.ok && resp.status === 201) {
      this._annotorious.setAnnotations(this._annotorious.getAnnotations())
    } else {
      console.log(`createAnnotation: unexpected resp_code=${resp.status}`)
    }
  }
  
  async _updateAnnotation(anno) {
    anno.target.id = this._target
    // console.log(`updateAnnotation: target=${anno.target.id}`, anno)
    let resp = await fetch(`${annotationsEndpoint}/annotation/${this._path}/${anno.id.split('/').pop()}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',
        Accept: 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',
        Authorization: `Bearer: ${this._token}`
      },
      body: JSON.stringify(anno)
    })
    if (resp.status !== 202) {
      console.log(`updateAnnotation: unexpected resp_code=${resp.status}`)
    }
  }

  async _deleteAnnotation(anno) {
    // console.log('deleteAnnotation', anno)
    let resp = await fetch(`${annotationsEndpoint}/annotation/${this._path}/${anno.id.split('/').pop()}/`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer: ${this._token}`}
    })
    if (resp.status !== 204) {
      console.log(`deleteAnnotation: unexpected resp_code=${resp.status}`)
    }
  }

}
