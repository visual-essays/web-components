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
  @Prop({ mutable: true, reflect: true }) depicts: string[]
  @Prop() condensed: boolean = false

  @Element() el: HTMLElement;

  @State() manifest: any = null
  @State() imageData: any = {}

  @State() id: string
  @State() label: string
  @State() summary: string
  @State() metadata: any[] = []
  @State() provider: any[] = []
  @State() rights: string
  @State() requiredStatement: any
  @State() thumbnail: any
  @State() navDate: string
  @State() format: string
  @State() language: string
  @State() width: number
  @State() height: number
  @State() homepage: any = {}
  @State() logo: any[] = []
  @State() seeAlso: any[] = []
  @State() service: string
  @State() sourceUrl: string

  @Watch('depicts')
  depictsChanged(depicts: string[]) {
    console.log(`depictsChanged: ${depicts}`)
  }
  
  @Watch('src')
  srcChanged(src: object) {
    if (src) getManifest(this.src).then(manifest => this.manifest = manifest)
  }

  @Watch('manifest')
  manifestChanged(manifest: any) {
    // console.log(manifest)
    let m = manifesto.parseManifest(manifest)
    this.id = this._value(m.getProperty('id'))
    this.label = this._value(m.getProperty('label'))

    let summary = m.getProperty('summary')
    let description = m.getProperty('description')
    this.summary = summary
      ? this._value(summary)
      : description
        ? description[0]['@value']
        : null

    this.rights = m.getProperty('rights') || m.getLicense()

    this.thumbnail = m.getThumbnail()?.id
    
    this.metadata = m.getMetadata()
      .map(item => item.resource)
      .map(item => ({label: this._value(item.label)[0], value: this._value(item.value)}))
    console.log(this.metadata)
    let sourceUrl = this.metadata.find(item => item.label == 'source_url')
    this.sourceUrl = sourceUrl ? sourceUrl.value[0] : null

    this.provider = (m.getProperty('provider') || [])
      .map(provider => {
        let entry: any = {label: this._value(provider.label), href:provider.id}
        if (provider.logo) entry.logo = {src:provider.logo[0].id}
        return entry
      })

    let logo = m.getProperty('logo')
    if (logo && !Array.isArray(logo)) logo = [logo]
    this.logo = (logo || []).map(item => {
      let logoObj: any = { src: typeof item === 'object' ? item.id || item['@id'] : item }
      if (typeof item === 'object') {
        if (item.width) logoObj.width = item.width
        if (item.height) logoObj.height = item.height
      }
      return logoObj
    })

    this.imageData = imageInfo(manifest)
    this.service = this.imageData.service && `${this.imageData.service.id}/info.json`

    let rs = m.getRequiredStatement()
    if (rs) {
      this.requiredStatement = rs.label
        ? {label: rs.label[0].value, value: rs.value[0].value}
        : {label: 'attribution', value: rs.value[0].value}
    } else {
      this.requiredStatement = null
    }

    this.homepage = (manifest.homepage || [])
      .map(homepage => ({label: this._value(homepage.label), href: homepage.id}))

    this.seeAlso = (manifest.seeAlso || [])
      .map(seeAlso => ({label: this._value(seeAlso.label || seeAlso['@id']), href: seeAlso.id || seeAlso['@id']}))
    
    this.navDate = manifest.navDate
  }

  componentDidLoad() {
    console.log(`componentDidLoad: condensed=${this.condensed}`)
    if (this.src) getManifest(this.src).then(manifest => this.manifest = manifest)
  }

  _value(langObj: any, language='en') {
    return typeof langObj === 'object' && !Array.isArray(langObj)
      ? langObj[language] || langObj.none || langObj[Object.keys(langObj).sort()[0]]
      : Array.isArray(langObj) ? langObj : [langObj]
  }

  _imageAttributionStatement() {
    return this.manifest.attribution
      ? this.manifest.attribution
      : this.manifest.requiredStatement
        ? this._value(this.manifest.requiredStatement.value).join(' ')
        : this.manifest.label
  }

  onManifestIconDrag(dragEvent: DragEvent) {
    dragEvent.dataTransfer?.setData('text/uri-list', `${this.src}?manifest=${this.src}`)
  }

  licenseBadge():string {
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
      console.log(templateVars)
      return new Function("return `"+templateString +"`;").call(templateVars);
    }
    console.log(this.rights)
    let rights = this.rights
    //rights = 'http://creativecommons.org/licenses/by-sa/4.0'
    //rights = 'http://rightsstatements.org/vocab/InC/1.0/'
    let badgeHtml
    let [rightsType, cat, rightsCode, version] = rights.split('/').slice(2)
    console.log(rightsType, cat, rightsCode, version)
    if (rightsType === 'creativecommons.org') {
      rightsCode = rightsCode === 'zero' ? 'publicdomain' : rightsCode
      badgeHtml = `<img src="${fillTemplate(config.cc.badgeTemplate, {...config.cc, ...{rightsCode, version}})}"/>` 
    } else if (rightsType === 'rightsstatements.org') {
      badgeHtml = `<div style="display:inline-block;height:25px;padding:3px;background-color:#${config.rs.backgroundColor};"><img style="height:100%;" src="${fillTemplate(config.rs.badgeTemplate, {...config.rs, ...{rightsCode}})}"/></div>`
    }
    console.log(badgeHtml)
    return badgeHtml
  }

  render_condensed() {
    return [
      <div style={{marginBottom: '12px;'}}>
      { this.sourceUrl
        ? <a href={this.sourceUrl} innerHTML={this.label}></a>
        : this.label
      }
      </div>,
      this.summary && this.summary.length > 0
      ? <div class="summary">
          <span class="value">{this.summary}</span>
        </div>
      : null,
      this.rights 
        ? <div class="rights">
            <a class="value" href={this.rights} innerHTML={this.licenseBadge()}/>
          </div>
        : null,
        this.requiredStatement 
        ? <div>
            <span class="value" innerHTML={this.requiredStatement.value}></span>
          </div>
        : null,
      this.provider.length > 0
      ? <div class="provider">
          {
            this.provider.length == 1
            ? <div style={{display: 'flex', alignItems: 'center'}}>
              
                {
                  this.provider[0].logo
                  ? <img class="logo" src={this.provider[0].logo.src} height={20}/>
                  : null
                }
                <a class="value" href={this.provider[0].href} innerHTML={this.provider[0].label}/>
              </div>
            : <ul>
              {this.provider.map((provider) =>
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
      : null,
      <a draggable={true} onDragStart={this.onManifestIconDrag.bind(this)} href={this.src}><img src="https://avatars.githubusercontent.com/u/5812589?v=3&s=24" alt="IIIF Manifest"></img></a>
    ]
  }

  render_full() {
    return [
      <div class="manifest-id">
        <span class="label">id</span>
        <a class="value" href={this.id} innerHTML={this.id}/>
      </div>,
      <div class="manifest-label">
        <span class="label">label</span><span class="value">{this.label}</span>
      </div>,
      
      this.summary && this.summary.length > 0
        ? <div class="summary">
            <span class="label">summary</span>
            <span class="value">{this.summary}</span>
          </div>
        : null,
      
      this.metadata.length > 0
      ? <div class="metadata">
        <span class="label">metadata</span>
          <ul>
          {this.metadata.map((item) =>
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
      : null,

      this.navDate
      ? <div class="navDate">
          <span class="label">navDate</span>
          <span class="value">{this.navDate}</span>
        </div>
      : null,

      this.provider.length > 0
      ? <div class="provider">
          <span class="label">provider</span>
          {
            this.provider.length == 1
            ? <div style={{display: 'flex', alignItems: 'center'}}>
                {
                  this.provider[0].logo
                  ? <img class="logo" src={this.provider[0].logo.src} height={20}/>
                  : null
                }
                <a class="value" href={this.provider[0].href} innerHTML={this.provider[0].label}/>
              </div>
            : <ul>
              {this.provider.map((provider) =>
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
      : null,

      this.homepage.length > 0
      ? <div class="homepage">
          <span class="label">homepage</span>
          <a class="value" href={this.homepage[0].href} innerHTML={this.homepage[0].label}/>
        </div>
      : null,

      this.seeAlso.length > 0
      ? <div class="seeAlso">
          <span class="label">seeAlso</span>
          <a class="value" href={this.seeAlso[0].href} innerHTML={this.seeAlso[0].label}/>
        </div>
      : null,

      this.logo.length > 0
      ? <div class="logo">
          <span class="label">logo</span>
          <a class="value" href={this.logo[0].src} innerHTML={this.logo[0].src}/>
        </div>
      : null,

      this.rights 
        ? <div class="rights">
            <span class="label">rights</span>
            <a class="value" href={this.rights} innerHTML={this.rights}/>
          </div>
        : null,

      this.requiredStatement 
        ? <div class="requiredStatement">
            <span class="label">requiredStatement</span>
            <ul><li>
              <span class="label" innerHTML={this.requiredStatement.label}></span>
              <span class="value" innerHTML={this.requiredStatement.value}></span>
            </li></ul>
          </div>
        : null,
  
      <div class="imageData">
        <div><span class="label">image</span><a class="value" href={this.imageData.id} innerHTML={this.imageData.id}/></div>
        <div><span class="label">format</span><span class="value" innerHTML={this.imageData.format}/></div>
        <div><span class="label">width</span><span class="value" innerHTML={this.imageData.width}/></div>
        <div><span class="label">height</span><span class="value" innerHTML={this.imageData.height}/></div>
      </div>,
        
        this.thumbnail 
        ? <div class="thumbnail">
            <span class="label">thumbnail</span>
            { /* <img src={this.thumbnail}/> */ }
            <a class="value" href={this.thumbnail} innerHTML={this.thumbnail}/>
          </div>
        : null,
      
      this.service 
        ? <div class="service">
            <span class="label">service</span>
            <a class="value" href={this.service} innerHTML={this.service}/>
          </div>
        : null,    
    ]
  }

  render() {
    return this.manifest
      ? this.condensed ? this.render_condensed() : this.render_full()
      : null
  }

}
