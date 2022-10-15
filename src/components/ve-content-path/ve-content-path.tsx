import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
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
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-content-path',
  styleUrl: 've-content-path.css',
  shadow: true,
})
export class ContentPath {
  @Prop({ mutable: true, reflect: true }) contentPath: string
  
  @State() _contentPath: string
  @Watch('_contentPath')
  _contentPathChanged(path) {
    this.contentPath = path
    console.log(`contentPath=${this.contentPath}`)
    this.contentPathChanged.emit(this.contentPath)
  }

  @Prop() sticky: boolean
  @Prop() mode: string = 'media'

  @Element() el: HTMLElement

  @Event({ bubbles: true, composed: true }) contentPathChanged: EventEmitter<any>

  @State() authToken: string
  @State() userCanUpdateRepo: boolean = false

  @State() fileToDelete: string
  @Watch('fileToDelete')
  fileToDeleteChanged() {
    if (this.fileToDelete) this.showDeleteFileDialog()
  }

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
    this.acct = this.acct || (this.accts.length > 0 ? this.accts[0].login : null)
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
    if (!this.repo && this.repos.length > 0) {
      if (this.repos.length === 1) this.repo = this.repos[0].name
      else {
        let defaultForMode = this.mode === 'media' ? 'media' : 'essays'
        this.repo = this.repos.find(repo => repo.name === defaultForMode) ? defaultForMode : this.repos[0].name
      }
    }
  }

  @State() repo: string
  @Watch('repo')
  repoChanged() {
    this.path = []
    this.ref = ''
    if (this.repo) {
      if (this.isLoggedIn()) {
        this.githubClient.user().then(userData => userData.login)
        .then(username => this.githubClient.isCollaborator(this.acct, this.repo, username))
        .then(isCollaborator => this.userCanUpdateRepo = isCollaborator)
      }
      this.getBranches().then(branches => this.branches = branches)
    }
  }

  @State() branches: any[] = []
  @State() defaultBranch: string
  @Watch('branches')
  async brancheshanged() {
    this.defaultBranch = await this.githubClient.defaultBranch(this.acct, this.repo)
    this.ref = this.defaultBranch
  }

  @State() ref: string
  @Watch('ref')
  refChanged() {
    if (this.ref && this.path) {
      this.updateDirList().then(_ => this.setContentPath())
    }
  }

  @State() path: string[]
  @Watch('path')
  pathChanged() {
    if (this.ref) {
      this.updateDirList().then(_ => this.setContentPath())
    }
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
      let qargs = args ? Object.fromEntries(args.split('&').map(arg => arg.split('='))) : {}
      let pathElems = path.split('/').filter(pe => pe)
      if (pathElems.length > 0) this.acct = pathElems[0]
      if (pathElems.length > 1) this.repo = pathElems[1]
      if (pathElems.length > 2) this.path = pathElems.slice(2)
      if (qargs.ref) this.ref = qargs.ref
      // console.log(`contentPath: acct=${this.acct} repo=${this.repo} ref=${this.ref} path=${this.path}`)
    }
  }

  setContentPath() {
    if (this.mode === 'essays' && this.dirList.length === 1 && this.dirList[0].name.split('.').pop() === 'md') {
      // this.path = [...this.path, this.dirList[0].name]
    }
    if (this.acct && this.repo) {
      let contentPath = `gh:${this.acct}/${this.repo}`
      if (this.path.length > 0) contentPath += `/${this.path.join('/')}`
      if (this.ref && this.ref !== this.defaultBranch) contentPath += `?ref=${this.ref}`
      this._contentPath = contentPath
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

  @Method()
  async updateDirList() {
    let dirList = await this.githubClient.dirlist(this.acct, this.repo, this.path.join('/'), this.ref)
    let dirs = dirList.filter(item => item.type === 'dir')
    let files = dirList.filter(item => item.type === 'file')
    this.dirList = [...dirs, ...files]
  }

  @Method()
  async getDirList() {
    return this.dirList
  }

  @Method()
  async repositoryIsWriteable() {
    return this.userCanUpdateRepo
  }

  @Method()
  async getFile(path:string) {
    return this.githubClient.getFile(this.acct, this.repo, path, this.ref)
  }

  @Method()
  async putFile(content:string) {
    return this.githubClient.putFile(this.acct, this.repo, this.path.join('/'), content, this.ref)
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

  appendPath(item: any) {
    this.path = [...this.path, item.name]
  }

  prunePath(idx: number) {
    console.log('prunePath')
    this.path = idx === 0 ? [] : this.path.slice(0,idx)
  }

  showAddFileDialog() {
    let form = (this.el.shadowRoot.getElementById('add-file-form') as HTMLFormElement)
    if (!form.onclick) {
      form.onclick = function () { }
      form.addEventListener('submit', async (evt) => {
        evt.preventDefault()
        let inputEl = (this.el.shadowRoot.getElementById('add-file-input') as HTMLInputElement)
        let newFilePathElems = [...this.path, ...inputEl.value.split('/').filter(pe => pe)]
        let path = newFilePathElems.join('/')
        console.log(`addFile: path=${path}`)
        await this.githubClient.putFile(this.acct, this.repo, path, `# ${path.split('/').pop()}`, this.ref)
        this.path = newFilePathElems
        this.hideAddFileDialog()
      })
    }
    (this.el.shadowRoot.getElementById('add-file-dialog') as any).show();
  }

  hideAddFileDialog() {
    (this.el.shadowRoot.getElementById('add-file-input') as HTMLInputElement).value = '';
    (this.el.shadowRoot.getElementById('add-file-dialog') as any).hide();

  }

  showDeleteFileDialog() {
    (this.el.shadowRoot.getElementById('delete-file-dialog') as any).show()
  }

  hideDeleteFileDialog() {
    (this.el.shadowRoot.getElementById('delete-file-dialog') as any).hide()
  }

  async deleteFile() {
    let toDelete = this.path.join('/')
    console.log('deleteFile', this.path.join('/'))
    await this.githubClient.deleteFile(this.acct, this.repo, toDelete, this.ref)
    await this.updateDirList()
    this.prunePath(this.path.length-(this.dirList.length === 0 ? 2 : 1))
    this.fileToDelete = null
    this.hideDeleteFileDialog()
  }

  summary() {
    return <sl-breadcrumb>
      
      <sl-breadcrumb-item>
        {this.acct}
        <sl-dropdown slot="suffix" skidding="-50">
          <sl-icon-button slot="trigger" name="caret-down" label="Select account"></sl-icon-button>
          <sl-menu> {
            this.accts.map(acct => 
              <sl-menu-item checked={acct.login === this.acct} onClick={this.accountSelected.bind(this, acct)} innerHTML={acct.login}></sl-menu-item>
            )}
          </sl-menu>
        </sl-dropdown>
      </sl-breadcrumb-item>
      
      <sl-breadcrumb-item>
        {this.repo}
        <sl-dropdown slot="suffix" skidding="-50">
          <sl-icon-button slot="trigger" name="caret-down" label="Select repository"></sl-icon-button>
          <sl-menu> {
            this.repos.map(repo => 
              <sl-menu-item checked={repo.name === this.repo} onClick={this.repoSelected.bind(this, repo)} innerHTML={repo.name}></sl-menu-item>
            )}
          </sl-menu>
        </sl-dropdown>
      </sl-breadcrumb-item>
      
      <sl-breadcrumb-item>
        {this.ref}
        { this.branches.length > 1 && 
          <sl-dropdown slot="suffix" skidding="-50">
            <sl-icon-button slot="trigger" name="caret-down" label="Select branch"></sl-icon-button>
            <sl-menu> {
              this.branches.map(branch => 
                <sl-menu-item checked={branch.name === this.ref} onClick={this.branchSelected.bind(this, branch)} innerHTML={branch.name}></sl-menu-item>
              )}
            </sl-menu>
          </sl-dropdown>
        }
      </sl-breadcrumb-item>

      { this.path.length > 0 && this.path.map((pathElem, idx) => 
        <sl-breadcrumb-item><span innerHTML={pathElem} onClick={this.prunePath.bind(this, idx)}></span>
        { idx === (this.path.length-1) && pathElem.split('.').pop() === 'md' &&
          <sl-dropdown slot="suffix" skidding="-50">
            <sl-icon-button slot="trigger" name="caret-down" label="File actions"></sl-icon-button>
            <sl-menu>
              <sl-menu-item onClick={() => this.fileToDelete = pathElem}>Delete file<sl-icon slot="prefix" name="trash"></sl-icon></sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        }
        </sl-breadcrumb-item> 
      )}

    </sl-breadcrumb>
  }

  clicakbleChildren() {
    return <div class="dirs">
      {this.dirList.filter(item => item.type === 'dir' || item.name.split('.').pop() === 'md').map(item => 
        <sl-button innerHTML={item.name} onClick={this.appendPath.bind(this, item)} pill size="small" class={item.type}>
          <sl-icon slot="prefix" name={item.type === 'dir' ? 'folder2' : 'file-earmark'}></sl-icon>
        </sl-button>
      )}
      { (this.path.length === 0 || (this.path[this.path.length-1].split('.').pop() !== 'md')) &&
        <sl-tooltip content="Add File">
          <sl-button variant="default" size="small" class="add-file" name="Add file" circle onClick={this.showAddFileDialog.bind(this)}>
            <sl-icon name="plus-lg" label="Add file"></sl-icon>
          </sl-button>
        </sl-tooltip>
      }
    </div>
  }
  

  render() {
    return [
      <section class="content-path">
        {this.summary()}
        {this.clicakbleChildren()}
      </section>,
      <sl-dialog id="add-file-dialog" label="Add File">
        <form id="add-file-form" class="input-validation-pattern">
          <sl-input autofocus autocomplete="off" required id="add-file-input" placeholder="Enter file path" pattern="^\/?([A-z0-9-_+]+\/)*([A-z0-9\-]+\.(md|json))$"></sl-input>
          <br />
          <sl-button onClick={this.hideAddFileDialog.bind(this)}>Cancel</sl-button>
          <sl-button type="reset" variant="default">Reset</sl-button>
          <sl-button type="submit" variant="primary">Submit</sl-button>
        </form>
      </sl-dialog>,
      <sl-dialog id="delete-file-dialog" label="Confirm file delete">
        <div>Delete file <span innerHTML={this.fileToDelete}></span>?</div>
        <sl-button slot="footer" onClick={this.hideDeleteFileDialog.bind(this)}>Cancel</sl-button>
        <sl-button slot="footer" variant="primary" onClick={this.deleteFile.bind(this)}>Confirm</sl-button>
      </sl-dialog>
    ]
  }
  
}
