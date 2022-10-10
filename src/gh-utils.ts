export class GithubClient {

    authToken: string
  
    constructor(authToken: string) {
      this.authToken = authToken
      console.log(`GithubClient: authToken=${this.authToken}`)
    }
  
    user() {
      return fetch('https://api.github.com/user' ,{
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${this.authToken}`
        }
      }).then(resp => resp.json())
    }
  
    organizations() {
      return fetch('https://api.github.com/user/orgs' ,{
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${this.authToken}`
        }
      }).then(resp => resp.json())
    }
  
    repos(user:string = '', org:string = '') {
      let pathPrefix = user
        ? `users/${user}`
        : org
          ? `orgs/${org}`
          : 'user'
      return fetch(`https://api.github.com/${pathPrefix}/repos?per_page=100`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${this.authToken}`
        }
      }).then(resp => resp.json())
    }
  
    branches(acct:string, repo:string) {
      return fetch(`https://api.github.com/repos/${acct}/${repo}/branches`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${this.authToken}`
        }
      }).then(resp => resp.json())
    }
  
    async getFile(acct:string, repo:string, path:string, ref:string): Promise<any> {
      console.log(`getFile: acct=${acct} repo=${repo} ref=${ref} path=${path}`)
      let content
      let url = `https://api.github.com/repos/${acct}/${repo}/contents/${path}`
      if (ref) url += `?ref=${ref}`
      console.log(url)
      let resp: any = await fetch(url, {headers: {Authorization:`Token ${this.authToken}`}})
      if (resp.ok) {
        resp = await resp.json()
        content = decodeURIComponent(escape(atob(resp.content)))
      }
      return Promise.resolve({content, sha: resp.sha})
    }
  
    async getSha(acct:string, repo:string, path:string, ref:string): Promise<any> {
      console.log(`sha: acct=${acct} repo=${repo} path=${path} ref=${ref}`)
      let url = `https://api.github.com/repos/${acct}/${repo}/contents/${path}`
      if (ref) url += `?ref=${ref}`
      let resp:any = await fetch(url, { headers: {Authorization: `Token ${this.authToken}`} })
      if (resp.ok) resp = await resp.json()
      let sha = resp.sha
      return sha
    }
  
    async putFile(acct:string, repo:string, path:string, content:any, ref:string, sha:string): Promise<any> {
      let url = `https://api.github.com/repos/${acct}/${repo}/contents/${path}`
      sha = sha || await this.getSha(acct, repo, path, ref)
      console.log(`putFile: acct=${acct} repo=${repo} path=${path} ref=${ref} sha=${sha}`)
      // let payload:any = { message: 'API commit', content: btoa(unescape(encodeURIComponent(content))) }
      let payload:any = { message: 'API commit', content: btoa(content) }
      if (ref) payload.branch = ref
      if (sha) payload.sha = sha
      let resp = await fetch(url, { method: 'PUT', body: JSON.stringify(payload), headers: {Authorization: `Token ${this.authToken}`} })
      return resp.status === 200
    }
  
    async deleteFile(acct:string, repo:string, path:string, sha:string): Promise<any> {
      console.log(`deleteFile: acct=${acct} repo=${repo} path=${path} sha=${sha}`)
      let url = `https://api.github.com/repos/${acct}/${repo}/contents/${path}`
      let payload = { message: 'API commit', sha }
      let resp = await fetch(url, { method: 'DELETE', body: JSON.stringify(payload), headers: {Authorization: `Token ${this.authToken}`} })
      resp = await resp.json()
      console.log(resp)
    }
  
    async defaultBranch(acct:string, repo:string) {
      let defaultBranch = null
      let url = `https://api.github.com/repos/${acct}/${repo}`
      let resp:any = await fetch(url, { headers: {Authorization: `Token ${this.authToken}`} })
      if (resp.ok) {
        resp = await resp.json()
        defaultBranch = resp.default_branch
      }
      console.log(`defaultBranch: acct=${acct} repo=${repo} default=${defaultBranch}`)
      return defaultBranch
    }
  
    async dirlist(acct:string, repo:string, path:string, ref:string): Promise<any[]> {
      console.log(`GithubClient.dirList: acct=${acct} repo=${repo} path=${path} ref=${ref}`)
      path = path || ''
      ref = ref || await this.defaultBranch(acct, repo)
      let files: any[] = []
      let url = `https://api.github.com/repos/${acct}/${repo}/git/trees/${ref}`
      let headers = {
        Authorization: `Token ${this.authToken}`,
        Accept: 'application/vnd.github.v3+json',
        'If-None-Match': '' // Hack to inhibit response caching
      }
      let pathElems = path.split('/').filter(pe => pe)
      for (let i = 0; i < pathElems.length; i++) {
        let resp = await fetch(url, {headers})
        let _dirList: any = resp.ok ? await resp.json() : {}
        let found = _dirList ? _dirList.tree.find((item:any) => item.path === pathElems[i]) : null
        url = found ? found.url : null
        if (!url) break
      }
      if (url) {
        let resp = await fetch(url, {headers})
        let _dirList: any = resp.ok ? await resp.json() : {}
        files = (_dirList.tree || []).map((item: any) => ({name: item.path, sha: item.sha, type: item.type === 'tree' ? 'dir' : 'file'}))
      }
      return files
    }
  
    async fullPath(acct:string, repo:string, path:string, ref:string, foldersOnly = false): Promise<string> {
      console.log(`GithubClient.fullPath: acct=${acct} repo=${repo} path=${path} ref=${ref} foldersOnly=${foldersOnly}`)
      let pathElems = path.split('/').filter(pe => pe)
      let leafElem = pathElems[pathElems.length-1]
      let dirList = await this.dirlist(acct, repo, pathElems.join('/'), ref)
      if (dirList.length === 0) {
        pathElems.pop()
        dirList = await this.dirlist(acct, repo, pathElems.join('/'), ref)
      }
      if (!foldersOnly) {
        let toFind = [leafElem, `${leafElem}.md`, 'README.md']
        for (let i = 0; i < toFind.length; i++) {
          if (dirList.find(item => item.type === 'file' && (item.name === toFind[i]))) {
            pathElems.push(toFind[i])
            break
          }
        }
      }
      let fullPath = pathElems.join('/')
      console.log(`fullPath=${fullPath}`)
      return fullPath
    }
  
  }