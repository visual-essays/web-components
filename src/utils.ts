import OpenSeadragon from 'openseadragon'

const iiifServer = location.hostname === 'localhost' ? 'http://localhost:8088' : 'https://iiif.visual-essays.net'
// const iiifServer = 'https://iiif.visual-essays.net'

export async function getManifest(manifestId: string) {
  let manifestUrl = manifestId.indexOf('http') === 0
    ? manifestId
    : `${iiifServer}/${manifestId}/manifest.json`
  let manifests = await loadManifests([manifestUrl])
  return manifests[0]
}

export function findItem(toMatch: object, current: object, seq: number = 1): any {
  const found = _findItems(toMatch, current)
  return found.length >= seq ? found[seq-1] : null
}

function _findItems(toMatch: object, current: object, found: object[] = []) {
  found = found || []
  for (const fld of ['items', 'sequences', 'canvases', 'images']) {
    if (current[fld]) {
      let items = current[fld]
      for (let i = 0; i < items.length; i++ ) {
        let item = items[i]
        let isMatch = !Object.entries(toMatch).find(([attr, val]) => item[attr] && item[attr] !== val)
        if (isMatch) found.push(item)
        else _findItems(toMatch, item, found)
      }
      break
    }
  }
  return found
}

export function imageInfo(manifest:any, seq=1) {
  let _isApiVersion3 = parseFloat(manifest['@context'].split('/').slice(-2,-1).pop()) >= 3.0
  let _imageInfo = _isApiVersion3
    ? findItem({type:'Annotation', motivation:'painting'}, manifest, seq).body
    : findItem({'@type':'oa:Annotation', motivation:'sc:painting'}, manifest, seq).resource
  _imageInfo.id = _imageInfo.id || _imageInfo['@id']
  _imageInfo.type = _imageInfo.type || _imageInfo['@type']
  if (_imageInfo['@id']) delete _imageInfo['@id']
  if (_imageInfo['@type']) delete _imageInfo['@type']
  if (_imageInfo.service) {
    if (Array.isArray(_imageInfo.service)) _imageInfo.service = _imageInfo.service[0]
    _imageInfo.service.id = _imageInfo.service.id || _imageInfo.service['@id']
    if (_imageInfo.service.id.slice(-1) === '/') _imageInfo.service.id = _imageInfo.service.id.slice(0,-1)
    if (_imageInfo.service['@id']) delete _imageInfo.service['@id']
  }
  return _imageInfo
}

export function thumbnail(manifest: any) {
  if (manifest.thumbnail) {
    return Array.isArray(manifest.thumbnail)
      ? manifest.thumbnail[0].id || manifest.thumbnail[0]['@id']
      : manifest.thumbnail.id || manifest.thumbnail['@id']
  } else {
    let _imageInfo = imageInfo(manifest)
    return _imageInfo.service
      ? `${_imageInfo.service.id}/full/240,/0/default.jpg`
      : _imageInfo.id
  }
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
  return await Promise.all(responses.map((resp:any) => resp.json()))
}

export async function imgUrlFromManifest(manifestUrl: string, forceImage = false) {
  let resp = await fetch(manifestUrl)
  if (resp.ok) {
    let manifest = await resp.json()
    let _imageInfo = imageInfo(manifest)
    return _imageInfo.service && !forceImage
      ? `${_imageInfo.service.id}/info.json`
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
  return !isNaN(<any>s)
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