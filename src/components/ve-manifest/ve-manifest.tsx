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
  @State() thumbnail: string
  @State() navDate: string
  @State() format: string
  @State() language: string
  @State() width: number
  @State() height: number
  @State() homepage: any[] = []
  @State() logo: any[] = []
  @State() seeAlso: any[] = []
  @State() service: string

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
    console.log(manifest)
    let m = manifesto.parseManifest(manifest)
    console.log(m.getLabel())
    console.log(m.getProperty('label'))
    console.log(m.getProperty('summary'))
    console.log(m.getMetadata())

    /*
    let version = parseInt(manifest['@context'].split('/')[5])
    console.log(`version=${version}`)

    this.imageData = imageInfo(manifest)
  
    this.id = manifest.id || manifest['@id']
    this.label = this._value(manifest.label)
    this.summary = manifest.summary
      ? this._value(manifest.summary)
      : manifest.description
        ? this._value(manifest.description)
        : null

    this.rights = manifest.rights || manifest.license
    this.thumbnail = manifest.thumbnail ? manifest.thumbnail[0].id : null
    this.metadata = (manifest.metadata || [])
      .map(item => ({label: this._value(item.label), value: this._value(item.value)}))
    console.log(this.metadata)

    this.logo = manifest.logo
      ? version === 3
        ? (manifest.logo || [])
          .map(logo => {
            let resp: any = {src: logo.id}
            if (logo.width) resp.width = logo.width
            if (logo.height) resp.height = logo.height
            return resp
          })
        : {id: manifest.logo}
      : null

    this.provider = (manifest.provider || [])
      .map(provider => {
        let entry: any = {label: this._value(provider.label), href:provider.id}
        if (provider.logo) entry.logo = {src:provider.logo[0].id}
        return entry
      })

    this.homepage = (manifest.homepage || [])
      .map(homepage => ({label: this._value(homepage.label), href: homepage.id}))

    this.seeAlso = (manifest.seeAlso || [])
      .map(seeAlso => ({label: this._value(seeAlso.label), href: seeAlso.id}))

    this.requiredStatement =
      manifest.requiredStatement
        ? {label: this._value(manifest.requiredStatement.label)[0], 
          value: this._value(manifest.requiredStatement.value)[0]}
        : manifest.attribution
          ? {label: 'attribution', value: manifest.attribution}
          : null

    this.service = this.imageData.service && `${this.imageData.service.id}/info.json`
    */
    
  }

  componentDidLoad() {
    console.log(`componentDidLoad: condensed=${this.condensed}`)
    if (this.src) getManifest(this.src).then(manifest => this.manifest = manifest)
  }

  _value(langObj: any, language='en') {
    return typeof langObj === 'object'
      ? langObj[language] || langObj.none || langObj[Object.keys(langObj).sort()[0]]
      : [langObj]
  }

  _imageAttributionStatement() {
    return this.manifest.attribution
      ? this.manifest.attribution
      : this.manifest.requiredStatement
        ? this._value(this.manifest.requiredStatement.value).join(' ')
        : this.manifest.label
  }

  render_condensed() {
    return [
      this.requiredStatement 
      ? <div>
          <span class="value" innerHTML={this.requiredStatement.value}></span>
        </div>
      : null,
      this.provider.length > 0
      ? <div class="provider">
          <span class="label">provider</span>
          {
            this.provider.length == 1
            ? <span>
                {
                  this.provider[0].logo
                  ? <img class="logo" src={this.provider[0].logo.src} height={20}/>
                  : null
                }
                <a class="value" href={this.provider[0].href} innerHTML={this.provider[0].label}/>
              </span>
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
      
      this.summary
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

      this.provider.length > 0
      ? <div class="provider">
          <span class="label">provider</span>
          {
            this.provider.length == 1
            ? <span>
                {
                  this.provider[0].logo
                  ? <img class="logo" src={this.provider[0].logo.src} height={20}/>
                  : null
                }
                <a class="value" href={this.provider[0].href} innerHTML={this.provider[0].label}/>
              </span>
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
