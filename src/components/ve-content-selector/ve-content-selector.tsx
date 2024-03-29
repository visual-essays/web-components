import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import '@shoelace-style/shoelace/dist/components/tag/tag.js'

import { makeSticky } from '../../utils'
import { GithubClient } from '../../gh-utils'

import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js'
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/details/details.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js'
import '@shoelace-style/shoelace/dist/components/divider/divider.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'
import SLDrawer from '@shoelace-style/shoelace/dist/components/drawer/drawer.js';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath('https://visual-essays.github.io/web-components/src')

@Component({
  tag: 've-content-selector',
  styleUrl: 've-content-selector.css',
  shadow: true,
})
export class ContentSelector {
  @Prop({ mutable: true, reflect: true }) contentPath: string
  
  @State() _contentPath: string
  @Watch('_contentPath')
  _contentPathChanged(path) {
    this.contentPath = path
    if (this.el.getAttribute('content-path')) {
      // console.log(`ve-content-selector.contentPath=${path}`)
      this.contentPathChanged.emit(path)
    }
  }

  @Prop() sticky: boolean
  @Prop() mode: string = 'media'

  @Element() el: HTMLElement

  @Event({ bubbles: true, composed: true }) contentPathChanged: EventEmitter<any>
  @Event({ bubbles: true, composed: true }) addMediaResource: EventEmitter<any>

  drawer: SLDrawer

  @State() username: string = ''
  @State() authToken: string
  @State() isLoggedIn: boolean = false
  @State() userCanUpdateRepo: boolean = false
  useReadme: boolean = true

  @State() fileToDelete: string
  @Watch('fileToDelete')
  fileToDeleteChanged() {
    if (this.fileToDelete) this.showDeleteFileDialog()
  }

  @Watch('authToken')
  authTokenChanged() {
    this.isLoggedIn = window.localStorage.getItem('gh-auth-token') !== null
    this.githubClient = new GithubClient(this.authToken)
  }

  @Watch('isLoggedIn')
  async isLoggedInChanged() {
    if (!this.isLoggedIn) {
      this.username = ''
      this.userCanUpdateRepo = false
    }
  }

  @State() githubClient: GithubClient
  @Watch('githubClient')
  async githubClientChanged() {
    this.parseContentPath()
    if (this.isLoggedIn) {
      this.accts = await this.getAccounts()
      this.username = await this.githubClient.user().then(userData => userData.login)
      await this.githubClient.repos(this.username).then(repos => {
        if (!repos.find(repo => repo.name === 'essays')) this.githubClient.createRepository({name:'essays', description:'Juncture visual essays'})
        if (!repos.find(repo => repo.name === 'media')) this.githubClient.createRepository({name:'media', description:'Juncture media'})
      })
      if (this.acct && this.repo && this.username) {
        this.githubClient.isCollaborator(this.acct, this.repo, this.username).then(isCollaborator => this.userCanUpdateRepo = isCollaborator)
      }
    }
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
    this.ref = null
    if (this.repo) {
      if (this.isLoggedIn) {
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

  @State() ref: string = null
  @Watch('ref')
  refChanged() {
    if (this.ref && this.path) {
      if (this.pathIsDirectory) this.updateDirList().then(_ => this.setContentPath())
    }
  }

  @State() path: string[] = []
  @Watch('path')
  pathChanged() {
    // console.log('pathChanged', this.path)
    if (this.ref) this.updateDirList().then(_ => this.setContentPath())
  }

  @State() pathIsDirectory: boolean = true

  @State() dirList: any[] = []
  @Watch('dirList')
  dirListChanged() {
    this.pathIsDirectory = this.path.length === 0 || this.dirList.length > 0 
  }

  pathIsMarkdownFile() {
    return this.path.length > 0 && /\.md$/.test(this.path[this.path.length -1])
  }

  async connectedCallback() {
    this.getAuthToken()
    window.addEventListener('storage', () =>  this.getAuthToken() )
  }

  componentWillLoad() {
    if (this.sticky) makeSticky(this.el)
  }

  // componentWillRender() { console.log('componentWillRender') }
  // componentDidRender() {}

  componentDidLoad() {
    this.drawer = this.el.shadowRoot.querySelector('.workspace-selector')
  }

  // componentWillUpdate() { console.log('componenWillUpdate') }
  // componentDidUpdate() { console.log('componenDidUpdate') }

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
    if (this.acct && this.repo) {
      let contentPath = `gh:${this.acct}/${this.repo}`
      if (this.path.length > 0) contentPath += `/${this.path.join('/')}`
      if (this.ref && this.ref !== this.defaultBranch) contentPath += `?ref=${this.ref}`
      this._contentPath = contentPath
    }
  }

  async getUnscopedToken() {
    let url = `https://api.juncture-digital.org/gh-token`
    let resp = await fetch(url)
    if (resp.ok) {
      let unscopedToken = await resp.text()
      window.localStorage.setItem('gh-unscoped-token', unscopedToken)
    }
  }

  async getAuthToken() {
    if (!window.localStorage.getItem('gh-unscoped-token')) await this.getUnscopedToken()
    this.authToken = window.localStorage.getItem('gh-auth-token') || window.localStorage.getItem('gh-unscoped-token')
    this.isLoggedIn = window.localStorage.getItem('gh-auth-token') !== null
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
    this.dirList = []
    // console.log('updateDirList', this.path)
    let dirList = await this.githubClient.dirlist(this.acct, this.repo, this.path.join('/'), this.ref)
    //if (dirList.length === 0 && this.path.length > 0) dirList = await this.githubClient.dirlist(this.acct, this.repo, this.path.slice(0,-1).join('/'), this.ref)
    let dirs = dirList.filter(item => item.type === 'dir')
    let files = dirList.filter(item => item.type === 'file')

    if (this.useReadme && files.find(file => file.name === 'README.md') && dirs.length === 0) {
      this.path = [...this.path, `README.md`]
    } else {
      this.dirList = [...dirs, ...files]
    }

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
  async putFile(contentPath:string, content:string) {
    let [path, args] = contentPath.split(':').pop().split('?')
    let qargs = args ? Object.fromEntries(args.split('&').map(arg => arg.split('='))) : {}
    let pathElems = path.split('/').filter(pe => pe)
    let [acct, repo] = pathElems.slice(0,2)
    path = pathElems.slice(2).filter(pe => pe).join('/')
    let ref = qargs.ref || this.ref
    return this.githubClient.putFile(acct, repo, path, content, ref)
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
    this.drawer.hide()
    this.useReadme = true
    let newPath = [...this.path]
    if (!this.pathIsDirectory) newPath = newPath.slice(0,-1)
    if (newPath.length === 0 || newPath[newPath.length-1] !== item.name) newPath = [...newPath, item.name]
    // console.log('appendPath', this.path, this.pathIsDirectory, newPath)
    this.path = newPath
  }

  prunePath(idx: number) {
    this.drawer.hide()
    // this.useReadme = idx === this.path.length - 2
    this.useReadme = false
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
        if (newFilePathElems[newFilePathElems.length-1].indexOf('.') > 0) newFilePathElems[newFilePathElems.length-1] = newFilePathElems[newFilePathElems.length-1].replace(/readme\.md/,'README.md')
        else newFilePathElems.push('README.md')
        let path = newFilePathElems.join('/')
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

  async showAddRepoDialog() {
    let form = (this.el.shadowRoot.getElementById('add-repo-form') as HTMLFormElement)
    if (!form.onclick) {
      form.onclick = function () { }
      form.addEventListener('submit', async (evt) => {
        evt.preventDefault()
        let inputEl = (this.el.shadowRoot.getElementById('add-repo-input') as HTMLInputElement)
        let name = inputEl.value
        let resp = await this.githubClient.createRepository({name, org: this.username === this.acct ? null : this.acct })
        if (resp.status === 201) {
          this.getRepositories().then(repos => this.repos = repos)
          this.repo = name
        }
        this.hideAddRepoDialog()
      })
    }
    (this.el.shadowRoot.getElementById('add-repo-dialog') as any).show();
  }

  hideAddRepoDialog() {
    (this.el.shadowRoot.getElementById('add-repo-input') as HTMLInputElement).value = '';
    (this.el.shadowRoot.getElementById('add-repo-dialog') as any).hide();
  }

  async deleteFile() {
    let toDelete = this.path.join('/')
    await this.githubClient.deleteFile(this.acct, this.repo, toDelete, this.ref)
    await this.updateDirList()
    this.prunePath(this.path.length-(this.dirList.length === 0 ? 2 : 1))
    this.fileToDelete = null
    this.hideDeleteFileDialog()
  }

  dirItems() {
    return this.dirList.filter(item => item.type === 'dir' || (item.name.split('.').pop() === 'md' && this.mode === 'essays'))
  }

  emitAddEvent(evt) {
    // console.log('addMediaResource')
    this.addMediaResource.emit(evt)
  }

  toggleDrawer() {
    if (this.drawer.open) this.drawer.hide()
    else this.drawer.show()
  }

  addItem() {
    return <sl-tooltip content={`Add ${this.mode === 'media' ? 'resource' : 'file'}`} placement="bottom">
      <sl-button 
        variant="default" 
        size={ this.mode === 'media' ? 'medium' : 'small' }
        class="add-item" 
        name={`Add ${this.mode === 'media' ? 'resource' : 'file'}`} 
        circle 
        onClick={this.mode === 'essays' ? this.showAddFileDialog.bind(this) : this.emitAddEvent.bind(this)}
      >
      <sl-icon name="plus-lg" label="Add file"></sl-icon>
      </sl-button>
    </sl-tooltip>
  }

  clicakbleChildren() {
    return <div class="dirs">
      {this.dirList.map(item => 
        <sl-button innerHTML={item.name} onClick={this.appendPath.bind(this, item)} pill size="small" class={item.type}>
          <sl-icon slot="prefix" name={item.type === 'dir' ? 'folder2' : 'file-earmark'}></sl-icon>
        </sl-button>
      )}
      { this.path && (this.path.length === 0 || (this.path[this.path.length-1].split('.').pop() !== 'md')) && this.mode === 'essays' && this.addItem() }
    </div>
  }
  
  acctSelector() {
    return this.accts?.length > 1
      ? <sl-dropdown>
          <sl-button slot="trigger" pill size="medium" class="folder">
              {this.acct}
              <sl-icon slot="prefix" name="github" style={{fontSize: '24px'}}></sl-icon>
            </sl-button>
          <sl-menu> {
            this.accts.map(acct => 
              <sl-menu-item checked={acct.login === this.acct} onClick={this.accountSelected.bind(this, acct)} innerHTML={acct.login}></sl-menu-item>
            )}
          </sl-menu>
        </sl-dropdown>

      : <sl-button slot="trigger" pill size="medium" class="folder">
          {this.acct}
          <sl-icon slot="prefix" name="github" style={{fontSize: '24px'}}></sl-icon>
        </sl-button>
  }

  repoSelector() {
    return this.repos?.length > 1
      ? <sl-dropdown>
          <sl-button slot="trigger" pill size="medium">
              {this.repo}
              <sl-icon slot="prefix" name="archive" style={{fontSize: '24px'}}></sl-icon>
            </sl-button>
            <sl-menu> {
              this.repos.map(repo => 
                <sl-menu-item checked={repo.name === this.repo} onClick={this.repoSelected.bind(this, repo)} innerHTML={repo.name}></sl-menu-item>
              )}
              <sl-divider></sl-divider>
              <sl-menu-item class="add-repo" onClick={this.showAddRepoDialog.bind(this)}>
                <sl-icon slot="prefix" name="plus-lg"></sl-icon>
                New repository
              </sl-menu-item>
            </sl-menu>
          </sl-dropdown>
      : <sl-button slot="trigger" pill size="medium">
          {this.repo}
          <sl-icon slot="prefix" name="archive" style={{fontSize: '24px'}}></sl-icon>
        </sl-button>
  }

  branchSelector() {
    return this.branches?.length > 1
    ? <sl-dropdown>
        <sl-button slot="trigger" pill size="medium">
          {this.ref}
          <sl-icon slot="prefix" name="share" style={{fontSize: '24px'}}></sl-icon>
        </sl-button>
        <sl-menu> {
          this.branches.map(branch => 
            <sl-menu-item checked={branch.name === this.ref} onClick={this.branchSelected.bind(this, branch)} innerHTML={branch.name}></sl-menu-item>
          )}
        </sl-menu>
      </sl-dropdown>
    : <sl-button pill size="medium">
        {this.ref}
        <sl-icon slot="prefix" name="share" style={{fontSize: '24px'}}></sl-icon>
      </sl-button>
  }

  pathSelector() {
    return <div class="breadcrumbs">
      <sl-breadcrumb>
        <sl-breadcrumb-item>
          <sl-button pill size="medium" onClick={this.prunePath.bind(this, 0)}>/
            <sl-icon slot="prefix" name="folder2" style={{fontSize: '24px'}}></sl-icon>
          </sl-button>          
        </sl-breadcrumb-item>

      { this.path?.length > 0 && this.path.map((pathElem, idx) => 
        <sl-breadcrumb-item>
        
          { idx === (this.path.length-1) && pathElem.split('.').pop() === 'md'
            ? [
                <sl-button pill size="medium" onClick={this.prunePath.bind(this, idx+1)}>
                  {pathElem}
                  <sl-icon slot="prefix" name="filetype-md" style={{fontSize: '24px'}}></sl-icon>
                </sl-button>,
                <sl-dropdown slot="suffix">
                  <sl-icon-button slot="trigger" name="caret-down" label="File actions"></sl-icon-button>
                  <sl-menu>
                    <sl-menu-item onClick={() => this.fileToDelete = pathElem}>Delete file<sl-icon slot="prefix" name="trash"></sl-icon></sl-menu-item>
                  </sl-menu>
                </sl-dropdown>
              ]
            : <sl-button pill size="medium" onClick={this.prunePath.bind(this, idx+1)}>
                {pathElem}
                <sl-icon slot="prefix" name="folder2" style={{fontSize: '24px'}}></sl-icon>
              </sl-button>
          }

        </sl-breadcrumb-item>

      )}

    </sl-breadcrumb>
    { this.mode === 'media' && this.addItem() }
    </div>
  }

  rootFolder() {
    return    
  }

  workspace() {
    return <div class="workspace">
      <sl-tooltip content={`${this.acct}: ${this.repo} (${this.ref})`} placement="bottom">
        <sl-button pill size="medium"  onCLick={this.toggleDrawer.bind(this)}>
          <sl-icon slot="prefix" name="github" style={{fontSize: '24px'}}></sl-icon>
        </sl-button>
      </sl-tooltip>
      <div class="ws-path">   
        { this.pathSelector() }
        <sl-drawer noHeader label="Workspace" placement="bottom" contained class="workspace-selector" style={{'--size': '100%'}}>
            <div class="github-select">Select GitHub Repository</div><sl-icon name="chevron-double-right" style={{fontSize: '24px'}}></sl-icon>
          <div class="selectors">
            { this.acctSelector() }
            { this.repoSelector() }
            { this.branchSelector() }
          </div>
        </sl-drawer>
      </div>

    </div>
  }

  render() {
    return [
      <section class="content-path" style={{position: 'relative'}}>
        { this.workspace() }
        { this.dirList.length > 0 && <sl-divider></sl-divider> }
        { this.dirList.length > 0 && this.clicakbleChildren() }
      </section>,
      
      <sl-dialog id="add-repo-dialog" label="Add Repository">
        <form id="add-repo-form" class="input-validation-pattern">
          <sl-input autocomplete="off" required id="add-repo-input" placeholder="Enter name" pattern="^[A-z0-9\-_]+$"></sl-input>
          <br />
          <sl-button onClick={this.hideAddRepoDialog.bind(this)}>Cancel</sl-button>
          <sl-button type="submit" variant="primary">Add</sl-button>
        </form>
      </sl-dialog>,
    
      <sl-dialog id="add-file-dialog" label="Add File">
        <form id="add-file-form" class="input-validation-pattern">
          <sl-input autocomplete="off" required id="add-file-input" placeholder="Enter file path" pattern="^\/?([A-z0-9-_+]+\/)*([A-z0-9\-]+(\.(css|md|json|yaml|yml))?)$"></sl-input>
          <br />
          <sl-button onClick={this.hideAddFileDialog.bind(this)}>Cancel</sl-button>
          <sl-button type="reset" variant="default">Reset</sl-button>
          <sl-button type="submit" variant="primary">Add</sl-button>
        </form>
      </sl-dialog>,

      <sl-dialog id="delete-file-dialog" label="Confirm file delete">
        <div>Delete file <span innerHTML={this.fileToDelete}></span>?</div>
        <sl-button slot="footer" onClick={this.hideDeleteFileDialog.bind(this)}>Cancel</sl-button>
        <sl-button slot="footer" variant="primary" onClick={this.deleteFile.bind(this)}>Confirm</sl-button>
      </sl-dialog>,

    ]
  }
  
}
