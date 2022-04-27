import * as Annotorious from '@recogito/annotorious-openseadragon'
import Toolbar from '@recogito/annotorious-toolbar'
// import jwt_decode from 'jwt-decode'
import { sha256 } from 'js-sha256'

const annotationsEndpoint = location.hostname === 'localhost'
  ? 'http://localhost:8000'
  : 'https://api.visual-essays.net'

export class Annotator {

  constructor(viewer, toolbar, user, authToken) {
    this._annotorious = Annotorious.default(viewer, {readOnly: !authToken})
    this._user = user
    this._token = authToken
    this._path
    this._target
    // this.validateToken(this._token)

    // console.log(`annotator.constructor: user=${this._user} toolbar=${toolbar}`)

    if (this._user && this._token) {
      if (toolbar) Toolbar(this._annotorious, toolbar)
      this._annotorious.on('createAnnotation', async (anno) => this._createAnnotation(anno))
      this._annotorious.on('updateAnnotation', async (anno) => this._updateAnnotation(anno))
      this._annotorious.on('deleteAnnotation', async (anno) => this._deleteAnnotation(anno))
    } else {
      this._annotorious.on('mouseEnterAnnotation', async (anno) => this.selectAnnotation(anno))
      this._annotorious.on('mouseLeaveAnnotation', async () => this.selectAnnotation())
    }
  }

  /*
  validateToken(token) {
    let isValid = false
    let user = null
    if (token) {
      let _token = jwt_decode(token)
      let now = Math.round(Date.now()/1000)
      let timeRemaining = _token.exp - now
      // console.log(`now=${now} exp=${_token.exp} timeRemaining=${timeRemaining}`)
      isValid = timeRemaining > 0
      if (isValid) user = sha256(_token.email).slice(0,7)
    }
    this._user = user
    this._annotorious.readOnly = this._user === null
    console.log(`Annotator.validateToken: isValid=${isValid} user=${this._user}`)
  }
  */

  setAuthToken(authToken) {
    console.log('Annotator.setAuthToken')
    this._token = authToken
    // this.validateToken(authToken)
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
      // this._user = resp.user
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
    // anno.id = `${this._target}/${sha256(anno.id).slice(0,7)}`
    anno.id = `https://api.visual-essays.net/annotation/${this._path}/${sha256(anno.id).slice(0,7)}`
    anno.target.id = this._path
    anno.creator = this._user
    console.log(`createAnnotation: target=${anno.target.id} creator=${anno.creator}`, anno)
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
      console.log(this._annotorious.getAnnotations())
      this._annotorious.setAnnotations(this._annotorious.getAnnotations())
    } else {
      console.log(`createAnnotation: unexpected resp_code=${resp.status}`)
    }
  }
  
  async _updateAnnotation(anno) {
    anno.target.id = this._target
    console.log(`updateAnnotation: target=${anno.target.id}`, anno)
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
    console.log('deleteAnnotation', anno)
    let resp = await fetch(`${annotationsEndpoint}/annotation/${this._path}/${anno.id.split('/').pop()}/`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer: ${this._token}`}
    })
    if (resp.status !== 204) {
      console.log(`deleteAnnotation: unexpected resp_code=${resp.status}`)
    }
  }

}
