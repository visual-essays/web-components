import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { getManifest, imageInfo } from '../../utils'
import * as manifesto from 'manifesto.js'

@Component({
  tag: 've-manifest',
  styleUrl: 've-manifest.css',
  shadow: true,
})
export class ManifestViewer {
  @Prop() src: string
  @Prop({ mutable: true, reflect: true }) images: string
  @Prop({ mutable: true, reflect: true }) depicts: string[]
  @Prop() condensed: boolean = false

  @Element() el: HTMLElement;

  @State() _images: any[] = []

  @Watch('depicts')
  depictsChanged(depicts: string[]) {
    console.log(`depictsChanged: ${depicts}`)
  }
  
  @Watch('src')
  srcChanged(src: object) {
    if (src) getManifest(this.src).then(manifest => this._images = [{manifest}])
  }

  parseManifest(imageRec: any) {
    let manifest = imageRec.manifest
    let parsed: any = {}
    let m = manifesto.parseManifest(manifest)
    parsed.id = this._value(m.getProperty('id'))
    parsed.label = this._value(m.getProperty('label'))

    let summary = m.getProperty('summary')
    let description = m.getProperty('description')
    parsed.summary = summary
      ? this._value(summary)
      : description
        ? description[0]['@value']
        : null

    parsed.rights = m.getProperty('rights') || m.getLicense()

    parsed.thumbnail = m.getThumbnail()?.id
    
    parsed.metadata = m.getMetadata()
      .map(item => item.resource)
      .map(item => ({label: this._value(item.label)[0], value: this._value(item.value)}))
    let sourceUrl = parsed.metadata.find(item => item.label == 'source_url')
    parsed.sourceUrl = sourceUrl ? sourceUrl.value[0] : null

    parsed.provider = (m.getProperty('provider') || [])
      .map(provider => {
        let entry: any = {label: this._value(provider.label), href:provider.id}
        if (provider.logo) entry.logo = {src:provider.logo[0].id}
        return entry
      })

    let logo = m.getProperty('logo')
    if (logo && !Array.isArray(logo)) logo = [logo]
    parsed.logo = (logo || []).map(item => {
      let logoObj: any = { src: typeof item === 'object' ? item.id || item['@id'] : item }
      if (typeof item === 'object') {
        if (item.width) logoObj.width = item.width
        if (item.height) logoObj.height = item.height
      }
      return logoObj
    })

    parsed.imageData = imageInfo(manifest)
    parsed.service = parsed.imageData.service && `${parsed.imageData.service.id}/info.json`

    let rs = m.getRequiredStatement()
    if (rs.value.length > 0) {
      parsed.requiredStatement = rs.label
        ? {label: rs.label[0].value, value: rs.value[0].value}
        : {label: 'attribution', value: rs.value[0].value}
    } else {
      parsed.requiredStatement = null
    }

    parsed.homepage = (manifest.homepage || [])
      .map(homepage => ({label: this._value(homepage.label), href: homepage.id}))

    parsed.seeAlso = (manifest.seeAlso || [])
      .map(seeAlso => ({label: this._value(seeAlso.label || seeAlso['@id']), href: seeAlso.id || seeAlso['@id']}))
    
    parsed.navDate = manifest.navDate
    return parsed
  }

  componentWillLoad() {
    if (this.images) {
      this._images = JSON.parse(decodeURIComponent(this.images))
    } else {
      getManifest(this.src).then(manifest => this._images = [{manifest}])
    }
  }

  _value(langObj: any, language='en') {
    return typeof langObj === 'object' && !Array.isArray(langObj)
      ? langObj[language] || langObj.none || langObj[Object.keys(langObj).sort()[0]]
      : Array.isArray(langObj) ? langObj : [langObj]
  }

  onManifestIconDrag(dragEvent: DragEvent) {
    let manifestUrl = ((dragEvent.target as HTMLElement).parentElement as HTMLAnchorElement).href
    dragEvent.dataTransfer?.setData('text/uri-list', `${manifestUrl}?manifest=${manifestUrl}`)
  }

  licenseBadge(parsedManifest):string {
    let config = {
      cc: {
        badgeWidth: 88,
        badgeHeight: 31,
        badgeTemplate: 'https://licensebuttons.net/l/${this.rightsCode}${this.rightsCode === "publicdomain" ? "" : "/"+this.version}/${this.badgeWidth}x${this.badgeHeight}.png'
      },
      rs: {
        badgeTemplate: 'https://rightsstatements.org/files/buttons/${this.rightsCode}.white.svg',
        backgroundColor: '318ac7'
      }
    }
    const fillTemplate = function(templateString, templateVars) {
      return new Function("return `"+templateString +"`;").call(templateVars);
    }
    let rights = parsedManifest.rights
    let badgeHtml
    let [rightsType, _, rightsCode, version] = rights.split('/').slice(2)
    if (rightsType === 'creativecommons.org') {
      rightsCode = rightsCode === 'zero' ? 'publicdomain' : rightsCode
      badgeHtml = `<img src="${fillTemplate(config.cc.badgeTemplate, {...config.cc, ...{rightsCode, version}})}"/>` 
    } else if (rightsType === 'rightsstatements.org') {
      badgeHtml = `<div style="display:inline-block;height:25px;padding:3px;background-color:#${config.rs.backgroundColor};"><img style="height:100%;" src="${fillTemplate(config.rs.badgeTemplate, {...config.rs, ...{rightsCode}})}"/></div>`
    }
    return badgeHtml
  }

  render_condensed() {
    return this._images.map(item => this.parseManifest(item)).map(parsed =>
    <div class="manifest condensed">
        { parsed.thumbnail ? <img class="thumbnail" src={parsed.thumbnail}/> : null
        }
      <div class="lbl" style={{marginBottom: '12px;'}}>
      { parsed.sourceUrl
        ? <a href={parsed.sourceUrl} innerHTML={parsed.label}></a>
        : parsed.label
      }
      </div>
      {parsed.summary && parsed.summary.length > 0
      ? <div class="summary">
          <span class="value">{parsed.summary}</span>
        </div>
      : null}
      {parsed.requiredStatement 
        ? <div>
            <span class="value" innerHTML={parsed.requiredStatement.value}></span>
          </div>
        : null}
      {parsed.rights 
        ? <div class="rights">
            <a class="value" href={parsed.rights} innerHTML={this.licenseBadge(parsed)}/>
          </div>
        : null}
      {parsed.provider.length > 0
        ? <div class="provider">
          {
            parsed.provider.length == 1
            ? <div style={{display: 'flex', alignItems: 'center'}}>
              
                {
                  parsed.provider[0].logo
                  ? <img class="logo" src={parsed.provider[0].logo.src} height={20}/>
                  : null
                }
                <a class="value" href={parsed.provider[0].href} innerHTML={parsed.provider[0].label}/>
              </div>
            : <ul>
              {parsed.provider.map((provider) =>
                <li>
                  {
                    provider.logo
                    ? <img class="logo" src={provider.logo.src} height={20}/>
                    : null
                  }
                  <a class="value" href={provider.href} innerHTML={provider.label}/>
                </li>
              )}
            </ul>
          }
        </div>
      : null}
      <a draggable={true} onDragStart={this.onManifestIconDrag.bind(this)} href={parsed.id}><img src="https://avatars.githubusercontent.com/u/5812589?v=3&s=24" alt="IIIF Manifest"></img></a>
    </div>
    )
  }

  render_full() {
    return this._images.map(item => this.parseManifest(item)).map(parsed =>
    <div class="manifest">
      <div class="manifest-id">
        <span class="label">id</span>
        <a class="value" href={parsed.id} innerHTML={parsed.id}/>
      </div>
      <div class="manifest-label">
        <span class="label">label</span><span class="value">{parsed.label}</span>
      </div>
      
      {parsed.summary && parsed.summary.length > 0
        ? <div class="summary">
            <span class="label">summary</span>
            <span class="value">{parsed.summary}</span>
          </div>
        : null
      }

      {parsed.metadata.length > 0
        ? <div class="metadata">
          <span class="label">metadata</span>
            <ul>
            {parsed.metadata.map((item) =>
              <li>
                <span class="label">{item.label}</span>
                {item.value.length == 1
                ? <span class="value" innerHTML={item.value[0]}></span>
                :  <ul>
                  {item.value.map((value) =>
                    <li class="value" innerHTML={value}></li>
                  )}
                  </ul>}
              </li>
            )}
            </ul>
          </div>
        : null
      }

      {parsed.navDate
        ? <div class="navDate">
            <span class="label">navDate</span>
            <span class="value">{parsed.navDate}</span>
          </div>
        : null
      }

      {parsed.provider.length > 0
        ? <div class="provider">
            <span class="label">provider</span>
            {
              parsed.provider.length == 1
              ? <div style={{display: 'flex', alignItems: 'center'}}>
                  {
                    parsed.provider[0].logo
                    ? <img class="logo" src={parsed.provider[0].logo.src} height={20}/>
                    : null
                  }
                  <a class="value" href={parsed.provider[0].href} innerHTML={parsed.provider[0].label}/>
                </div>
              : <ul>
                {parsed.provider.map((provider) =>
                  <li>
                    {
                      provider.logo
                      ? <img class="logo" src={provider.logo.src} height={20}/>
                      : null
                    }
                    <a class="value" href={provider.href} innerHTML={provider.label}/>
                  </li>
                )}
              </ul>
            }
          </div>
        : null
      }

      {parsed.homepage.length > 0
        ? <div class="homepage">
            <span class="label">homepage</span>
            <a class="value" href={parsed.homepage[0].href} innerHTML={parsed.homepage[0].label}/>
          </div>
        : null
      }

      {parsed.seeAlso.length > 0
        ? <div class="seeAlso">
            <span class="label">seeAlso</span>
            <a class="value" href={parsed.seeAlso[0].href} innerHTML={parsed.seeAlso[0].label}/>
          </div>
        : null
      }

      {parsed.logo.length > 0
        ? <div class="logo">
            <span class="label">logo</span>
            <a class="value" href={parsed.logo[0].src} innerHTML={parsed.logo[0].src}/>
          </div>
        : null
      }

      {parsed.rights 
        ? <div class="rights">
            <span class="label">rights</span>
            <a class="value" href={parsed.rights} innerHTML={parsed.rights}/>
          </div>
        : null
      }

      {parsed.requiredStatement 
        ? <div class="requiredStatement">
            <span class="label">requiredStatement</span>
            <ul><li>
              <span class="label" innerHTML={parsed.requiredStatement.label}></span>
              <span class="value" innerHTML={parsed.requiredStatement.value}></span>
            </li></ul>
          </div>
        : null
      }
  
      <div class="imageData">
        <div><span class="label">image</span><a class="value" href={parsed.imageData.id} innerHTML={parsed.imageData.id}/></div>
        <div><span class="label">format</span><span class="value" innerHTML={parsed.imageData.format}/></div>
        <div><span class="label">width</span><span class="value" innerHTML={parsed.imageData.width}/></div>
        <div><span class="label">height</span><span class="value" innerHTML={parsed.imageData.height}/></div>
      </div>,
        
      {parsed.thumbnail 
        ? <div class="thumbnail">
            <span class="label">thumbnail</span>
            { /* <img src={parsed.thumbnail}/> */ }
            <a class="value" href={parsed.thumbnail} innerHTML={parsed.thumbnail}/>
          </div>
        : null
      }
      
      {parsed.service 
        ? <div class="service">
            <span class="label">service</span>
            <a class="value" href={parsed.service} innerHTML={parsed.service}/>
          </div>
        : null
      }

    </div>
  )}

  render() {
    return this._images
      ? this.condensed ? this.render_condensed() : this.render_full()
      : null
  }

}
