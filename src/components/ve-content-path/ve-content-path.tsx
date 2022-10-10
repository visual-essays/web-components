import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import '@shoelace-style/shoelace/dist/components/tag/tag.js'

import { makeSticky } from '../../utils'
import { GithubClient } from '../../gh-utils'

import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js'
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
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
  @Prop() sticky: boolean

  @Element() el: HTMLElement

  @State() authToken: string

  @Watch('authToken')
  authTokenChanged() {
    console.log(`authToken=${this.authToken}`)
    this.githubClient = new GithubClient(this.authToken)
  }

  @State() githubClient: GithubClient
  @Watch('githubClient')
  githubClientChanged() {
    console.log('githubClientChanged')
    this.getAccounts().then(accts => this.accts = accts)
  }

  @State() accts: any[] = []
  @Watch('accts')
  acctsChanged() {
    console.log(this.accts)
    this.acct = this.accts.length > 0 ? this.accts[0] : null
  }

  @State() acct: any
  @Watch('acct')
  acctChanged() {
    console.log(`acct=${this.acct}`)
    this.getRepositories().then(repos => this.repos = repos)
  }

  @State() repos: any[] = []
  @Watch('repos')
  reposChanged() {
    console.log(this.repos)
    this.repo = this.repos.length > 0 ? this.repos[0] : null
  }

  @State() repo: any
  @Watch('repo')
  repoChanged() {
    console.log(`repo=${this.repo}`)
  }

  async connectedCallback() {
    this.getAuthToken()
    window.addEventListener('storage', (evt) => { 
      console.log('storage updated', evt)
    })
  }

  componentDidLoad() {
    if (this.sticky) makeSticky(this.el)
  }

  async getUnscopedToken() {
    let unscopedToken = await fetch(`https://api.juncture-digital.org/gh-token`).then(resp => resp.text())
    window.localStorage.setItem('gh-unscoped-token', unscopedToken)
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
    console.log(`getRepositories: acct=${this.acct.login}`)
    return this.githubClient.repos(this.acct.login)
  }

  accountSelected(acct:any) {
    this.acct = acct
  }

  repoSelected(repo:any) {
    this.repo = repo
  }

  render() {
    return [
      <section>
        <sl-breadcrumb>
          
          <sl-breadcrumb-item>
          {this.acct?.login}
          { this.accts.length > 0 &&
            <sl-dropdown slot="suffix">
              <sl-button slot="trigger" size="small">
                <sl-icon label="More options" name="caret-down"></sl-icon>
              </sl-button>
              <sl-menu>
                {
                  this.accts.map(acct => 
                    <sl-menu-item 
                      checked={acct.login === this.acct.login}
                      onClick={this.accountSelected.bind(this, acct)}
                    >
                      {acct.login}
                    </sl-menu-item>
                  )
                }
              </sl-menu>
            </sl-dropdown>
          }
          </sl-breadcrumb-item>

          <sl-breadcrumb-item>
          {this.repo?.name}
          { this.repos.length > 0 &&
            <sl-dropdown slot="suffix">
              <sl-button slot="trigger" size="small">
                <sl-icon label="More options" name="caret-down"></sl-icon>
              </sl-button>
              <sl-menu>
                {
                  this.repos.map(repo => 
                    <sl-menu-item 
                      checked={repo.name === this.repo.name}
                      onClick={this.repoSelected.bind(this, repo)}
                    >
                      {repo.name}
                    </sl-menu-item>
                  )
                }
              </sl-menu>
            </sl-dropdown>
          }
          </sl-breadcrumb-item>

          <sl-breadcrumb-item>Our Services</sl-breadcrumb-item>
          <sl-breadcrumb-item>Digital Media</sl-breadcrumb-item>
          <sl-breadcrumb-item>
            Web Design
            <sl-dropdown slot="suffix">
              <sl-button slot="trigger" size="small" circle>
                <sl-icon label="More options" name="caret-down"></sl-icon>
              </sl-button>
              <sl-menu>
                <sl-menu-item checked>Web Design</sl-menu-item>
                <sl-menu-item>Web Development</sl-menu-item>
                <sl-menu-item>Marketing</sl-menu-item>
              </sl-menu>
            </sl-dropdown>
          </sl-breadcrumb-item>
        </sl-breadcrumb>
      </section>
    ]
  }
  
}
