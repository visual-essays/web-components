import * as Annotorious from '@recogito/annotorious-openseadragon'
import Toolbar from '@recogito/annotorious-toolbar'

const annotationsEndpoint = 'https://api.visual-essays.net'
// const annotationsEndpoint = 'http://localhost:8000'

let _annotorious
let _user
let _target

export function initAnnotator(viewer, user, toolbar) {
  console.log(`initAnnotator: user=${user}`)
  if (!_annotorious) {
    _user = user
    _annotorious = Annotorious.default(viewer, {})
    if (toolbar) {
      Toolbar(_annotorious, toolbar)
      _annotorious.on('createAnnotation', async (anno) => _createAnnotation(anno))
      _annotorious.on('updateAnnotation', async (anno) => _updateAnnotation(anno))
      _annotorious.on('deleteAnnotation', async (anno) => _deleteAnnotation(anno))
    }
  }
  if (_target) _loadAnnotations()
}

export function setAnnotationTarget(target) {
  console.log(`setAnnotationTarget: target=${target} creator=${_user}`)
  _target = target
  if (_user) _loadAnnotations()
}

export async function getAnnotations() {
  return _annotorious ? _annotorious.getAnnotations() : []
}

export async function getAnnotation(annoId) {
  let resp = await fetch(`${annotationsEndpoint}/annotation/${_user}/${annoId}/`)
  if (resp.ok) return await resp.json() 
}

async function _loadAnnotations() {
  let resp = await fetch(`${annotationsEndpoint}/annotations/${_user}/${_target}/`, {
    headers: {
      Accept: 'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld'
    }
  })
  if (resp.ok) {
    _annotorious.setAnnotations(await resp.json())
  }
// }

async function _createAnnotation(anno) {
  anno.id = anno.id.slice(1)
  anno.target.id = _target
  anno.creator = _user
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
    _annotorious.setAnnotations(_annotorious.getAnnotations())
  } else {
    console.log(`createAnnotation: unexpected resp_code=${resp.status}`)
  }
}

async function _updateAnnotation(anno) {
  anno.target.id = _target
  console.log(`updateAnnotation: target=${anno.target.id}`, anno)
  let resp = await fetch(`${annotationsEndpoint}/annotation/${_user}/${_target}/${anno.id}/`, {
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

async function _deleteAnnotation(anno) {
  console.log('deleteAnnotation', anno)
  let resp = await fetch(`${annotationsEndpoint}/annotation/${_user}/${_target}/${anno.id}/`, { method: 'DELETE' })
  if (resp.status !== 204) {
    console.log(`deleteAnnotation: unexpected resp_code=${resp.status}`)
  }
}
