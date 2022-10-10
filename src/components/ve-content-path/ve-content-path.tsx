import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import '@shoelace-style/shoelace/dist/components/tag/tag.js'

import { makeSticky } from '../../utils'
import { GithubClient } from '../../gh-utils'

import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js'
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/details/details.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-content-path',
  styleUrl: 've-content-path.css',
  shadow: true,
})
export class ContentPath {
  @Prop({ mutable: true, reflect: true }) contentPath: string
  @Watch('contentPath')
  _contentPathChanged() {
    console.log(`contentPath=${this.contentPath}`)
    this.contentPathChanged.emit(this.contentPath)
  }

  @Prop() sticky: boolean
  @Prop() mode: string = 'media'

  @Element() el: HTMLElement

  @Event({ bubbles: true, composed: true }) contentPathChanged: EventEmitter<any>

  @State() authToken: string

  @Watch('authToken')
  authTokenChanged() {
    this.githubClient = new GithubClient(this.authToken)
  }

  @State() githubClient: GithubClient
  @Watch('githubClient')
  githubClientChanged() {
    this.parseContentPath()
    if (this.isLoggedIn()) this.getAccounts().then(accts => this.accts = accts)
  }

  @State() accts: any[] = []
  @Watch('accts')
  acctsChanged() {
    this.acct = this.acct || (this.accts.length > 0 ? this.accts[0] : null)
  }

  @State() acct: string
  @Watch('acct')
  acctChanged() {
    this.repo = ''
    this.getRepositories().then(repos => this.repos = repos)
  }

  @State() repos: any[] = []
  @Watch('repos')
  reposChanged() {
    this.repo = this.repo || (this.repos.length > 0 ? this.repos[0].name : null)
  }

  @State() repo: string
  @Watch('repo')
  repoChanged() {
    this.path = []
    this.ref = ''
    if (this.acct && this.repo) {
      this.getBranches().then(branches => this.branches = branches)
    }
  }

  @State() branches: any[] = []
  @Watch('branches')
  async brancheshanged() {
    this.ref = await this.githubClient.defaultBranch(this.acct, this.repo)
  }

  @State() ref: string
  @Watch('ref')
  refChanged() {
    // this.dirList = []
    if (this.ref && this.path) this.getDirList()
    // this.setContentPath()
  }

  @State() path: string[]
  @Watch('path')
  pathChanged(path) {
    console.log('pathChanged', path)
    this.setContentPath()
    if (this.ref) this.getDirList()
  }

  @State() dirList: any[] = []

  async connectedCallback() {
    this.getAuthToken()
    window.addEventListener('storage', (evt) => { 
      console.log('storage updated', evt)
    })
  }

  componentWillLoad() {
    if (this.sticky) makeSticky(this.el)
  }

  parseContentPath() {
    if (this.contentPath) {
      let [path, args] = this.contentPath.split(':').pop().split('?')
      let qargs = Object.fromEntries(args.split('&').map(arg => arg.split('=')))
      let pathElems = path.split('/').filter(pe => pe)
      if (pathElems.length > 0) this.acct = pathElems[0]
      if (pathElems.length > 1) this.repo = pathElems[1]
      if (pathElems.length > 2) this.path = pathElems.slice(2)
      if (qargs.ref) this.ref = qargs.ref
      // console.log(`contentPath: acct=${this.acct} repo=${this.repo} ref=${this.ref} path=${this.path}`)
    }
  }

  setContentPath() {
    if (this.acct && this.repo) {
      let contentPath = `gh:${this.acct}/${this.repo}`
      if (this.path.length > 0) contentPath += `/${this.path.join('/')}`
      if (this.ref) contentPath += `?ref=${this.ref}`
      this.contentPath = contentPath
    }
  }

  async getUnscopedToken() {
    let unscopedToken = await fetch(`https://api.juncture-digital.org/gh-token`).then(resp => resp.text())
    window.localStorage.setItem('gh-unscoped-token', unscopedToken)
  }

  isLoggedIn() {
    return window.localStorage.getItem('gh-auth-token') !== null
  }

  async getAuthToken() {
    if (!window.localStorage.getItem('gh-unscoped-token')) await this.getUnscopedToken()
    this.authToken = window.localStorage.getItem('gh-auth-token') || window.localStorage.getItem('gh-unscoped-token')
  }

  async getAccounts(): Promise<string[]> {
    return await Promise.all([this.githubClient.user(), this.githubClient.organizations()])
    .then(responses => responses.flat())
  }

  async getRepositories(): Promise<string[]> {
    return this.githubClient.repos(this.acct)
  }

  async getBranches(): Promise<string[]> {
    return this.githubClient.branches(this.acct, this.repo)
  }

  async getDirList() {
    this.dirList = await (await this.githubClient.dirlist(this.acct, this.repo, this.path.join('/'), this.ref))
      .filter(item => this.mode === 'essay' || item.type !== 'file')
    console.log(this.dirList)
  }

  accountSelected(acct:any) {
    this.acct = acct.login
  }

  repoSelected(repo:any) {
    this.repo = repo.name
  }

  branchSelected(branch:any) {
    this.ref = branch.name
  }

  pathSelected(item:any) {
    this.path = item.name
  }

  showDialog() {
    (this.el.shadowRoot.getElementById('path-select-dialog') as any).show()
  }

  hideDialog() {
    (this.el.shadowRoot.getElementById('path-select-dialog') as any).hide()
  }

  showControlsDialog() {
    // (this.el.shadowRoot.getElementById('controls-dialog') as any).show()
  }

  appendPath(item: any) {
    console.log('appendPath', item)
    this.path = [...this.path, item.name]
  }

  prunePath(idx: number) {
    console.log('prunePath', idx)
    this.path = idx === 0 ? [] : this.path.slice(0,idx)
  }

  summary() {
    return <sl-breadcrumb>
      <sl-breadcrumb-item innerHTML={this.acct}></sl-breadcrumb-item>
      <sl-breadcrumb-item innerHTML={this.repo}></sl-breadcrumb-item>
      { this.path.map((pathElem, idx) => 
        <sl-breadcrumb-item innerHTML={pathElem} onClick={this.prunePath.bind(this, idx)}></sl-breadcrumb-item> 
      )}
    </sl-breadcrumb>
  }

  clicakbleDirs() {
    return <div class="dirs">
      {this.dirList.map(item => 
        <sl-button innerHTML={item.name} onClick={this.appendPath.bind(this, item)}></sl-button>
      )}
    </div>
  }

  controls() {
    return <div class="values">
          
    <div>
      <div class="label">Acct</div>
      <div class="value">
        {this.acct}
        { this.accts.length > 1 &&
        <sl-dropdown slot="suffix">
          <sl-icon-button slot="trigger" name="caret-down" label="Select account"></sl-icon-button>
          <sl-menu>
            {
              this.accts.map(acct => 
                <sl-menu-item 
                  checked={acct.login === this.acct}
                  onClick={this.accountSelected.bind(this, acct)}
                >
                  {acct.login}
                </sl-menu-item>
              )
            }
          </sl-menu>
        </sl-dropdown>
      }
      </div>
    </div>

    <div>
      <div class="label">Repo</div>
      <div class="value">
        {this.repo}
        { this.repos.length > 1 &&
        <sl-dropdown slot="suffix">
          <sl-icon-button slot="trigger" name="caret-down" label="Select repository"></sl-icon-button>
          <sl-menu>
            {
              this.repos.map(repo => 
                <sl-menu-item 
                  checked={repo.name === this.repo}
                  onClick={this.repoSelected.bind(this, repo)}
                >
                  {repo.name}
                </sl-menu-item>
              )
            }
          </sl-menu>
        </sl-dropdown>
      }
      </div>
    </div>

    <div>
      <div class="label">Ref</div>
      <div class="value">
        {this.ref}
        { this.branches.length > 1 &&
        <sl-dropdown slot="suffix">
          <sl-icon-button slot="trigger" name="caret-down" label="Select branch"></sl-icon-button>
          <sl-menu>
            {
              this.branches.map(branch => 
                <sl-menu-item 
                  checked={branch.name === this.ref}
                  onClick={this.branchSelected.bind(this, branch)}
                >
                  {branch.name}
                </sl-menu-item>
              )
            }
          </sl-menu>
        </sl-dropdown>
      }
      </div>
    </div>

    <div>
      <div class="label">Path</div>
      <div class="value">
        {`/${this.path.join('/')}`}
        <sl-icon-button name="caret-down" label="Select path" onClick={this.showDialog.bind(this)}></sl-icon-button>
      </div>
    </div>

  </div>
  }

  render() {
    return [
      <section class="summary">
        <sl-icon-button name="github" label="Select content source" onClick={this.showControlsDialog.bind(this)}></sl-icon-button>
        {this.summary()}
        {this.mode === 'media' && this.clicakbleDirs()}
      </section>,

      <sl-dialog id="controls-dialog" label="Select Content" class="dialog-overview" style={{'--width': '500px'}}>
        <div style={{minHeight: '500px'}}>
          {this.controls()}
        </div>
        <sl-button slot="footer" onClick={this.hideDialog.bind(this)}>Done</sl-button>
      </sl-dialog>,
    
      <sl-dialog id="path-select-dialog" label="Select Content" class="dialog-overview">
        <div class="path">
        <sl-breadcrumb>
          { ['root', ...this.path].map((pathElem, idx) => 
            <sl-breadcrumb-item onClick={this.prunePath.bind(this, idx)} innerHTML={pathElem}></sl-breadcrumb-item>
          )}
        </sl-breadcrumb>
          
        </div>
        <div class="dir-items">
          <ul>
            { this.dirList.map(item => 
              <li>
                <span onClick={this.appendPath.bind(this, item)} innerHTML={item.name}></span>
                { item.type === 'dir' && '/' }
              </li>
            )}
          </ul>
        </div>
        <sl-button slot="footer" onClick={this.hideDialog.bind(this)}>Done</sl-button>
      </sl-dialog>
    ]
  }
  
}
