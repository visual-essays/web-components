import { Component, Element, Prop, State, h } from '@stencil/core';
import { makeSticky, top } from '../../utils'

import VimeoPlayer from '@vimeo/player'
import YouTubePlayer from 'youtube-player'

const youtubeDomains = new Set(['youtube.com', 'youtube.co.uk', 'youtu.be'])
const vimeoDomains = new Set(['vimeo.com'])

@Component({
  tag: 've-video',
  styleUrl: 've-video.css',
  shadow: true,
})
export class Video {
  @Prop() src: string
  @Prop() caption: string
  @Prop({ mutable: true, reflect: true }) start: string = '0'
  @Prop({ mutable: true, reflect: true }) end: string = '-1'
  @Prop({ mutable: true, reflect: true }) muted: boolean = false
  @Prop() autoplay: boolean = false
  @Prop() loop: boolean = false
  @Prop() poster: string
  @Prop() sticky: boolean = false

  @Element() el: HTMLElement;

  @State() player: any
  @State() timeoutId: any = null
  
  @State() startSecs: number 
  @State() endSecs: number
  @State() isYouTube: boolean = false
  @State() isVimeo: boolean = false
  @State() isSelfHosted: boolean = false
  @State() videoId: string

  @State() isMuted: boolean = true
  @State() isPlaying: boolean = false
  @State() forceMuteOnPlay: boolean = true

  @State() startTimes: any 

  connectedCallback() {
    this.startSecs = this.hmsToSeconds(this.start)
    this.endSecs = this.hmsToSeconds(this.end);
  }

  componentWillLoad() {
    this.parseSource()
  }

  componentDidLoad() {
    // console.log(`ve-video.componentDidLoad: sticky=${this.sticky}`)
    this.el.classList.add('ve-component')
    if (this.sticky) makeSticky(this.el)
    this.initialize()
  }

  initialize() {
    this.startTimes = this.getStartTimes()
    console.log(this.startTimes)
    if (this.isYouTube) this.initializeYouTubePlayer()
    else if (this.isVimeo) this.initializeVimeoPlayer()
    else this.initializeSelfHostedPlayer()
    this.addMarkListeners()
  }
  
  monitor() {
    let playerEl = document.querySelector('ve-video')
    let playerScrolledToTop = false
    
    setInterval(async () => {
      this.isMuted = await this.getIsMuted()
      this.isPlaying = await this.getIsPlaying()

      // console.log(`ve-video: isMuted=${this.isMuted} isPlaying=${this.isPlaying}`)
      if (this.isPlaying && this.sticky && !playerScrolledToTop) {
        // scroll player to top
        let y = playerEl.getBoundingClientRect().top + window.scrollY - top()
        // console.log(`player.scrollTo`, y)
        window.scrollTo(0, y)
        // playerScrolledToTop = true
      }

      if (this.isPlaying) {
        this.getCurrentTime().then(time => {
          time = Math.round(time)
          if (this.startTimes[time]) {
            // scroll paragraph into active region
            let bcr = this.startTimes[time].getBoundingClientRect()
            console.log(`elem.scrollTo`, bcr)
            window.scrollTo(0, bcr.top + window.scrollY - playerEl.getBoundingClientRect().bottom)
          }
        })
      }
    }, 1000)

  }

  initializeYouTubePlayer() {
    let playerVars = {
      color: 'white',
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      autoplay: this.autoplay ? 1 : 0,
      start: this.start
    }
    this.player = YouTubePlayer(
      this.el.shadowRoot.getElementById('video-placeholder'), {
        videoId: this.videoId,
        playerVars
      })
    this.player.on('ready', () => {})
    this.monitor()
  }

  initializeVimeoPlayer() {
    this.player = new VimeoPlayer(this.el.shadowRoot.getElementById('ve-video-vimeo'), {
      id: this.videoId
    })
    this.player.on('loaded', () => {
      if (this.startSecs > 0) this.seekTo(this.start, this.autoplay ? this.end : this.start)
    })
    this.monitor()
  }

  initializeSelfHostedPlayer() {
    this.player = this.el.shadowRoot.getElementById('ve-video-self-hosted') as HTMLVideoElement
    this.monitor()
  }

  parseSource() {
    if (this.src.indexOf('http') === 0) {
      let srcUrl = new URL(this.src)
      let domain = srcUrl.hostname.replace(/^www\./, '')
      if (youtubeDomains.has(domain)) {
        this.isYouTube = true
        this.videoId = srcUrl.searchParams.get('v')
      } else if (vimeoDomains.has(domain)) {
        this.isVimeo = true
        this.videoId = srcUrl.pathname.slice(1)
      } else {
        this.isSelfHosted = true
      }
    }
  }

  findVeVideo(el: HTMLSpanElement) {
    let sib = el.previousSibling
    while (sib) {
      if (sib.nodeName === 'VE-VIDEO') {
        return sib === this.el ? sib : null
      }
      sib = sib.previousSibling
    }
    while (el.parentElement && el.tagName !== 'MAIN') {
      el = el.parentElement
      let veVideo = el.querySelector(':scope > ve-video')
      if (veVideo) {
        return veVideo === this.el ? veVideo : null
      }
    }
  }

  getStartTimes() {
    return Object.fromEntries(
      Array.from(document.querySelectorAll('p[data-start]'))
        .map((el:HTMLElement) => [parseInt(el.dataset.start), el])
    )
  }

  addMarkListeners() {
    Array.from(document.querySelectorAll('[enter],[exit]')).forEach((el:HTMLElement) => {
      let veVideo = this.findVeVideo(el)
      if (veVideo) this.addMutationObserver(el)
    })
    
    Array.from(document.querySelectorAll('mark')).forEach(mark => {

      let attributesNode = mark.attributes
      let attributes = attributesNode.item(0).value.split(',')
      let veVideo = this.findVeVideo(mark.parentElement)
      if (veVideo) {
        mark.classList.add('play')
        mark.addEventListener('click', () => setTimeout(() => {
          this.forceMuteOnPlay = false
          if (attributes.length > 0) {
            let start = attributes[0]
            let end = attributes.length > 1 ? attributes[1].replace(' ', '') : '-1'
            this.seekTo(start, end)
          }
        }, 200))
      }
    })

  }

  hmsToSeconds(str:string) {
    var p = str.split(':').map(pe => parseInt(pe, 10))
    let secs = 0, m = 1
    while (p.length > 0) {
      secs += m * p.pop()
      m *= 60
    }
    return secs
}

  addMutationObserver(el: HTMLElement) {
    let prevClassState = el.classList.contains('active')
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName == 'class') {
          let currentClassState = (mutation.target as HTMLElement).classList.contains('active')
          if (prevClassState !== currentClassState) {
            prevClassState = currentClassState
            let enter = el.attributes.getNamedItem('enter')?.value
            let exit = el.attributes.getNamedItem('exit')?.value

            if (currentClassState) {
              if (enter) { // attr === 'enter'
                let [start, end] = enter.split(',').map(pe => pe.trim()).filter(pe => pe)
                setTimeout(() => {this.seekTo(start, end)}, 200)
              }
            }
            else if (exit){ // attr === 'exit
            }
          }
        }
      })
    })
    observer.observe(el, {attributes: true})
  }

  play() {
    if (this.isYouTube) this.player.playVideo()
    else if (this.isVimeo) this.player.play()
    else if (this.isSelfHosted) this.player.play()
  }

  async getCurrentTime() {
    if (this.isYouTube) return this.player.getCurrentTime()
    else if (this.isVimeo) return await this.player.getCurrentTime()
    else if (this.isSelfHosted) return this.player.currentTime
  }

  pause() {
    if (this.isYouTube) this.player.pauseVideo()
    else if (this.isVimeo) this.player.pause()
    else if (this.isSelfHosted) this.player.pause()
  }

  async getIsPlaying() {
    if (this.isYouTube) return await this.player.getPlayerState() === 1
    else if (this.isVimeo) {
      return !(await this.player.getEnded() || await this.player.getPaused())
    }
    else if (this.isSelfHosted) {
      return ! (this.player.ended || this.player.paused)
    }
  }

  async getIsMuted() {
    if (this.isYouTube) return await this.player.isMuted()
    else if (this.isVimeo) return await this.player.getMuted()
    else return await this.muted
  }

  setMuted(mute:boolean) {
    if (this.isYouTube) {
      if (mute) this.player.mute()
      else this.player.unMute()
    } 
    else if (this.isVimeo) this.player.setMuted(mute)
    else if (this.isSelfHosted) this.muted = mute
  }

  seekTo(start:string, end:string) {
    let startSecs = this.hmsToSeconds(start)
    let endSecs = this.hmsToSeconds(end)
    // console.log(`seekTo: start=${startSecs} end=${endSecs} isMuted=${this.isMuted} forceMuteOnPlay=${this.forceMuteOnPlay}`)
    
    // clear delayed pause
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }

    let wasMuted = this.isMuted
    if (this.forceMuteOnPlay) this.setMuted(true)

    if (this.isYouTube) {
      this.player.playVideo()
      this.player.seekTo(startSecs).then(_ => {
        if (endSecs >= startSecs) {
          this.timeoutId = setTimeout(() => {
            this.player.pauseVideo().then(_ => {
              this.timeoutId = null
              if (!wasMuted && this.forceMuteOnPlay) this.setMuted(false)
            })
          }, endSecs === startSecs ? 200 : (endSecs-startSecs)*1000)
        }
      })
    }
  
    else if (this.isVimeo) {
      this.player.setCurrentTime(startSecs)
      this.player.play().then(_ => {
        if (endSecs >= startSecs) {
          this.timeoutId = setTimeout(() => {
            this.player.pause().then(_ => {
              this.timeoutId = null
              if (!wasMuted && this.forceMuteOnPlay) this.setMuted(false)
            })
          }, endSecs === startSecs ? 200 : (endSecs-startSecs)*1000)
        }
      })
    }

    else if (this.isSelfHosted) {
      setTimeout(() => {
        this.player.play()
        this.player.currentTime = startSecs
        if (endSecs >= startSecs) {
          this.timeoutId = setTimeout(() => {
            this.timeoutId = null
            this.player.pause()
            if (!wasMuted && this.forceMuteOnPlay) this.setMuted(false)
          }, endSecs === startSecs ? 200 : (endSecs-startSecs)*1000)
        }
      }, 200)
    } 
  }

  renderCaption() {
    return <div id="caption" innerHTML={this.caption}>
    </div>
  }

  renderYouTubePlayer() {
    return [<div id="video-placeholder" style={{height:'300px', width: '100%'}}></div>]
  }

  renderVimeoPlayer() {
    return [
      <div id="ve-video-vimeo" data-vimeo-playsinline="true" style={{maxWwidth:'100%'}}></div>
    ]
  }

  renderSelfHostedPlayer() {
    let fileExtension = this.src.split('#')[0].split('.').pop()
    if (this.autoplay && this.startSecs >= 0 && this.endSecs > this.startSecs) {
      let wasMuted = this.muted
      if (this.forceMuteOnPlay) this.setMuted(true)
      this.timeoutId = setTimeout(() => {
        this.player.pauseVideo().then(_ => {
          this.timeoutId = null
          if (!wasMuted && this.forceMuteOnPlay) this.setMuted(false)
        })
      }, this.endSecs === this.startSecs ? 200 : (this.endSecs-this.startSecs)*1000)
    }
    return [
      <video
        id="ve-video-self-hosted"
        style={{width: '100%'}} 
        controls
        playsinline
        poster={this.poster}
        muted={this.muted}
        autoplay={this.autoplay}
      >
        <source src={`${this.src}${this.startSecs > 0 ? '#'+'t='+this.startSecs : ''}`} type={`video/${fileExtension}`}/>
      </video>
    ]
  }

  /*
  render() {
    return [
      this.isYouTube
        ? this.renderYouTubePlayer()
        : this.isVimeo
          ? this.renderVimeoPlayer()
          : this.renderSelfHostedPlayer()
      ,
      <br/>,
      <button onClick={this.unMute.bind(this)}>Unmute</button>,
      <button onClick={this.play.bind(this)}>Play</button>,
      <button onClick={this.pause.bind(this)}>Pause</button>,
      <button onClick={this.seekTo.bind(this, 3, 7)}>seekTo</button>
    ]
  }
  */

  renderPlayer() {
    return [
      this.isYouTube
      ? this.renderYouTubePlayer()
      : this.isVimeo
        ? this.renderVimeoPlayer()
        : this.renderSelfHostedPlayer()
    ]
  }

  render() {
    return <div id="wrapper">
        { this.renderPlayer() }
        { this.caption && this.renderCaption() }
      </div>
  }

}
