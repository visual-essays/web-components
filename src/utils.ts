import OpenSeadragon from 'openseadragon'
import { sha256 as _sha256 } from 'js-sha256'
import md5 from 'blueimp-md5'

const iiifServer = location.hostname === 'localhost' ? 'http://localhost:8088' : 'https://iiif.visual-essays.net'

export function sha256(str: string) {
  return _sha256(str)
}

export async function getManifest(manifestId: string) {
  let manifestUrl = manifestId.indexOf('http') === 0
    ? manifestId
    : `${iiifServer}/${manifestId}/manifest.json`
  let manifests = await loadManifests([manifestUrl])
  return manifests[0]
}

export async function prezi2to3(manifest: any) {
  /* Converts IIIF v2 manifest to v3 */
  let resp = await fetch('https://api.visual-essays.net/prezi2to3/', {
    method: 'POST', 
    body: JSON.stringify(manifest)
  })
  if (resp.ok) return (await resp).json()
}

export function findItem(toMatch: object, current: object, seq: number = 1): any {
  const found = _findItems(toMatch, current)
  return found.length >= seq ? found[seq-1] : null
}

function _findItems(toMatch: object, current: any, found: object[] = []) {
  found = found || []
  if (current.items) {
    for (let i = 0; i < current.items.length; i++ ) {
      let item = current.items[i]
      let isMatch = !Object.entries(toMatch).find(([attr, val]) => item[attr] && item[attr] !== val)
      if (isMatch) found.push(item)
      else _findItems(toMatch, item, found)
    }
  }
  return found
}

export function imageInfo(manifest:any, seq=1) {
  return findItem({type:'Annotation', motivation:'painting'}, manifest, seq).body
}

export async function loadManifests(manifestUrls: string[]) {
  let requests: any = manifestUrls
    .map(manifestId =>
      manifestId.indexOf('http') === 0
        ? manifestId
        : `${iiifServer}/${manifestId}/manifest.json`
    )
    .map(manifestUrl => {
      return fetch(manifestUrl,
        ['localhost', 'iiif.visual-essays.net'].includes(new URL(manifestUrl).hostname)
          ? {headers: {'X-Requested-From': window.location.href}}
          : {}
    )})
  let responses = await Promise.all(requests)
  let manifests = await Promise.all(responses.map((resp:any) => resp.json()))
  requests = manifests
    .filter(manifest => !Array.isArray(manifest['@context']) && parseFloat(manifest['@context'].split('/').slice(-2,-1).pop()) < 3)
    .map(manifest => fetch('https://api.visual-essays.net/prezi2to3/', {
      method: 'POST', 
      body: JSON.stringify(manifest)
    }))
  if (requests.length > 0) {
    responses = await Promise.all(requests)
    let convertedManifests = await Promise.all(responses.map((resp:any) => resp.json()))
    for (let i = 0; i < manifests.length; i++) {
      let found = convertedManifests.find(manifest => manifest['@id'] === manifests[i].id)
      if (found) manifests[i] = found
    }
  }
  return manifests
}

export async function imgUrlFromManifest(manifestUrl: string, forceImage = false) {
  let resp = await fetch(manifestUrl)
  if (resp.ok) {
    let manifest = await resp.json()
    let _imageInfo = imageInfo(manifest)
    return _imageInfo.service && !forceImage
      ? `${_imageInfo.service[0].id || _imageInfo.service[0]['@id']}/info.json`
      : _imageInfo.id
  }
}

// For cropping regular images
export async function imageDataUrl(url: string, region: any, dest: any): Promise<string> {
  return new Promise((resolve) => {
    let {x, y, w, h} = region
    let {width, height} = dest
    let image = new Image()
    image.crossOrigin = 'anonymous'
    x = x ? x/100 : 0
    y = y ? y/100 : 0
    w = w ? w/100 : 0
    h = h ? h/100 : 0
    image.onload = () => {
      let sw = image.width
      let sh = image.height
      let swScaled = w > 0 ? sw * w : sw - (sw * x)
      let shScaled =  h > 0 ? sh * h : sh - (sh * y)
      let ratio = swScaled/shScaled
      if (ratio > 1) height = width/ratio
      else width = height * ratio
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height
      x = x*sw
      y = y*sh
      // console.log(`x=${x} y=${y} sw=${sw} sh=${sh} swScaled=${swScaled} shScaled=${shScaled} width=${width} height=${height} ratio=${ratio}`)
      ctx.drawImage(image, x, y, swScaled, shScaled, 0, 0, width, height)
      let dataUrl = canvas.toDataURL()
      resolve(dataUrl)
    }
    image.src = url
  })
}

export function isNum(s:string) {
  return s && !isNaN(<any>s)
}

export function parseImageOptions(str: string) {
  let elems = str?.split('/') || []
  // let seq = 1
  let region = 'full'
  let size = 'full'
  let rotation = '0'
  let quality = 'default'
  let format = 'jpg'
  let offset = 0
  /*
  if (isNum(elems[0])) {
    seq = +elems[0]
    offset = 1
  }
  */
  let options = {
    // seq,
    region: elems.length > offset && elems[offset] ? elems[offset] : region,
    size: elems.length > offset+1 && elems[offset+1] ? elems[offset+1] : size,
    rotation: elems.length > offset+2 && elems[offset+2] ? elems[offset+2] : rotation,
    quality: elems.length > offset+3 && elems[offset+3] ? elems[offset+3] : quality,
    format: elems.length > offset+4 && elems[offset+4] ? elems[offset+4] : format
  }
  return options
}

export function parseRegionString(region: string, viewer: OpenSeadragon.Viewer) {
  const s1 = region.split(':')
  let ints = s1[s1.length-1].split(',').map(v => parseInt(v))
  if (ints.length === 4) {
    if (s1.length === 1 || (s1.length === 2 && (s1[0] === 'px' || s1[0] === 'pixel'))) {
      return viewer.viewport.imageToViewportRectangle(new OpenSeadragon.Rect(...ints))
    } else if (s1.length === 2 && (s1[0] === 'pct' || s1[0] === 'percent')) {
      const size = viewer.world.getItemAt(0).getContentSize()
      if (size.x > 0 && size.y > 0) {
        return viewer.viewport.imageToViewportRectangle(
          Math.round(size.x * ints[0]/100),
          Math.round(size.y * ints[1]/100),
          Math.round(size.x * ints[2]/100), 
          Math.round(size.y * ints[3]/100)
        )
      }
    }
  }
}

let entityData = {}
export async function getEntityData(qids: string[] = [], language: string = 'en') {
  let values = qids.filter(qid => !entityData[qid]).map(qid => `(<http://www.wikidata.org/entity/${qid}>)`)
  // console.log(`getEntityData: qids=${qids.length} toGet=${values.length}`)
  if (values.length > 0) {
    let query = `
      SELECT ?item ?label ?description ?alias ?image ?coords ?wikipedia WHERE {
        VALUES (?item) { ${values.join(' ')} }
        ?item rdfs:label ?label . 
        FILTER (LANG(?label) = "${language}" || LANG(?label) = "en")
        OPTIONAL { ?item schema:description ?description . FILTER (LANG(?description) = "${language}" || LANG(?description) = "en")}
        OPTIONAL { ?item skos:altLabel ?alias . FILTER (LANG(?alias) = "${language}" || LANG(?alias) = "en")}
        OPTIONAL { ?item wdt:P625 ?coords . }
        OPTIONAL { ?item wdt:P18 ?image . }
        OPTIONAL { ?wikipedia schema:about ?item; schema:isPartOf <https://${language}.wikipedia.org/> . }
    }`
    let resp = await fetch('https://query.wikidata.org/sparql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json'
      },
      body: `query=${encodeURIComponent(query)}`
    })
    if (resp.ok) {
      let sparqlResp = await resp.json()
      sparqlResp.results.bindings.forEach((rec: any) => {
        let qid = rec.item.value.split('/').pop()
        if (!entityData[qid]) {
          entityData[qid] = {id: qid, label: rec.label.value}
          if (rec.description) entityData[qid].description = rec.description.value
          if (rec.alias) entityData[qid].aliases = [rec.alias.value]
          if (rec.coords) entityData[qid].coords = rec.coords.value.slice(6,-1).split(' ').reverse().join(',')
          if (rec.wikipedia) entityData[qid].wikipedia = rec.wikipedia.value
          if (rec.image) {
            entityData[qid].image = rec.image.value
            entityData[qid].thumbnail = mwImage(rec.image.value, 120)
          }
        } else {
          if (rec.alias) entityData[qid].aliases.push(rec.alias.value)
        }
      })
      return entityData
    }
  }
  return entityData
}

export async function getDepictedEntities(hash: string) {
  let depicted: any[] = []
  let payload = {query: { query_string: { query: `_id:${hash}`}}, size: 1}
  // console.log(`getDepictedEntities: hash=${hash}`, payload)
  let resp: any = await fetch('https://www.jstor.org/api/labs-search-service/labs/about/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify(payload)
  })
  if (resp.ok) {
    resp = await resp.json()
    if (resp.hits && resp.hits.hits && resp.hits.hits.length === 1) {
      let entity = resp.hits.hits[0]._source
      depicted = (entity.statements.P180 || [])
        .map((depicted: any) => ({
          id: depicted.mainsnak.datavalue.value.id.value,
          prominent: depicted.rank === 'preferred'
          //dro: entity.digitalRepresentationOf
        }))
    }
  }
  return depicted
}

export function isMobile() {
  console.log(`isMobile: ontouchstart=${'ontouchstart' in document.documentElement} mobi=${/mobi/i.test(navigator.userAgent)}`)
  return ('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent) )
}

export function mwImage(mwImg, width) {
  // Converts Wikimedia commons image URL to a thumbnail link
  mwImg = (Array.isArray(mwImg) ? mwImg[0] : mwImg).replace(/Special:FilePath\//, 'File:').split('File:').pop()
  mwImg = decodeURIComponent(mwImg).replace(/ /g,'_')
  const _md5 = md5(mwImg)
  const extension = mwImg.split('.').pop()
  let url = `https://upload.wikimedia.org/wikipedia/commons${width ? '/thumb' : ''}`
  url += `/${_md5.slice(0,1)}/${_md5.slice(0,2)}/${mwImg}`
  if (width) {
    url += `/${width}px-${mwImg}`
    if (extension === 'svg') {
      url += '.png'
    } else if (extension === 'tif' || extension === 'tiff') {
      url += '.jpg'
    }
  }
  return url
}

function _value(langObj: any, language='en') {
  return typeof langObj === 'object'
    ? langObj[language] || langObj.none || langObj[Object.keys(langObj).sort()[0]]
    : langObj
}

export function label(manifest:any, language:string = 'en') {
  return manifest ? _value(manifest.label, language) : null
}

export function summary(manifest:any, language:string = 'en') {
  return manifest ? _value(manifest.summary, language) : null
}

export function source(manifest:any) {
  if (!manifest) return null
  let parsed = new URL(manifest.id)
  if (parsed.origin === iiifServer) {
    let path = parsed.pathname.slice(1,-14)
    let source = path.split(':')[0]
    let sourceId = path.split(':').pop()
    return source === 'gh' ? sourceId.split('/')[0] : source
  }
}

export function sourceId(manifest:any) {
  if (!manifest) return null
  let parsed = new URL(manifest.id)
  if (parsed.origin === iiifServer) {
    let path = parsed.pathname.slice(1,-14)
    let source = path.split(':')[0]
    let sourceId = path.split(':').pop()
    return source === 'gh' ? sourceId.split('/').slice(1).join('/') : source
  }
}

export function thumbnail(manifest: any) {
  if (!manifest) return null
  if (manifest.thumbnail) {
    return manifest.thumbnail[0].id
  } else {
    let _imageInfo = imageInfo(manifest)
    return _imageInfo.service
      ? `${_imageInfo.service.id}/full/240,/0/default.jpg`
      : _imageInfo.id
  }
}