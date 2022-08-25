import { Component, Element, Prop, State, h } from '@stencil/core';
import Player from '@vimeo/player';

const youtubeDomains = new Set(['youtube.com', 'youtube.co.uk', 'youtu.be'])
const vimeoDomains = new Set(['vimeo.com'])

@Component({
  tag: 've-video',
  styleUrl: 've-video.css',
  shadow: true,
})
export class Video {
  @Prop() src: string
  @Prop({ mutable: true, reflect: true }) start: number = -1
  @Prop({ mutable: true, reflect: true }) end: number = -1
  @Prop() autoplay: boolean = false
  @Prop() muted: boolean = false
  @Prop() loop: boolean = false

  @Element() el: HTMLElement;

  @State() player: any
  @State() timeoutId: any
  
  @State() type: string
  @State() isYouTube: boolean = false
  @State() isVimeo: boolean = false
  @State() isSelfHosted: boolean = false
  @State() videoId: string

  connectedCallback() {}

  componentWillLoad() {
    this.parseSource()
  }

  componentDidLoad() {
    this.initialize()
  }

  initialize() {
    if (this.isYouTube) this.initializeYouTubePlayer()
    else if (this.isVimeo) this.initializeVimeoPlayer()
    else this.initializeSelfHostedPlayer()
    this.addMarkListeners()
  }
    
  initializeYouTubePlayer() {
    // this.player = new (window as any).YT.Player('video-placeholder', {
    this.player = new (window as any).YT.Player(this.el.shadowRoot.getElementById('video-placeholder'), {
      width: 600,
      height: 400,
      videoId: this.videoId,
      playerVars: {
        color: 'white',
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: () => {
          if (!this.muted) this.player.unMute()
          if (this.start >= 0) this.seekTo(this.start, this.end)
        }
      }
    })
  }

  initializeVimeoPlayer() {
    this.player = new Player(this.el.shadowRoot.getElementById('ve-video-vimeo'), {
      id: this.videoId
    })
  }

  initializeSelfHostedPlayer() {
    this.player = this.el.shadowRoot.getElementById('ve-video-self-hosted') as HTMLVideoElement
  }

  parseSource() {
    if (this.src.indexOf('http') === 0) {
      let srcUrl = new URL(this.src)
      let domain = srcUrl.hostname.replace(/^www\./, '')
      if (youtubeDomains.has(domain)) {
        this.type = 'youtube'
        this.isYouTube = true
        this.videoId = srcUrl.searchParams.get('v')
      } else if (vimeoDomains.has(domain)) {
        this.type = 'vimeo'
        this.isVimeo = true
        this.videoId = srcUrl.pathname.slice(1)
      } else {
        this.type = 'self-hosted'
        this.isSelfHosted = true
      }
    }
    // console.log(`type=${this.type} videoId=${this.videoId}`)
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

  // Changes video start, end and muted properties when mark clicked
  addMarkListeners() {
    Array.from(document.querySelectorAll('mark')).forEach(mark => {

      let attributesNode = mark.attributes
      let attributes = attributesNode.item(0).value.split(',')
      let veVideo = this.findVeVideo(mark.parentElement)
      if (veVideo) {
        mark.addEventListener('click', () => setTimeout(() => {
          if (attributes.length > 0) {
            let start = parseInt(attributes[0])
            let end = attributes.length > 1 ? parseInt(attributes[1].replace(' ', '')) : -1
            this.seekTo(start, end)
          }
        }, 200))
      }
    })
  }

  play() {
    if (this.isYouTube) this.player.playVideo()
    else if (this.isVimeo) this.player.play()
    else if (this.isSelfHosted) this.player.play()
  }

  unMute() {
    if (this.isYouTube) this.player.unMute()
  }

  pause() {
    if (this.isYouTube) this.player.pauseVideo()
    else if (this.isVimeo) this.player.pause()
    else if (this.isSelfHosted) this.player.pause()
  }

  setDelayedPause(duration:number) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null
      this.pause()
    }, duration*1000)
  }

  seekTo(start:number, end:number=0) {
    console.log(`seekTo: start=${start} end=${end}`)
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }

    this.play()
    if (this.isYouTube) {
      this.player.seekTo(start)
      if (end > start) this.setDelayedPause(end-start)
    } else if (this.isVimeo) {
      this.player.setCurrentTime(start)
      if (end > start) this.setDelayedPause(end-start)
    } else if (this.isSelfHosted) {
      this.player.currentTime = start
      if (end > start) this.setDelayedPause(end-start)
    }
    
  }

  renderYouTubePlayer() {
    return [<div id="video-placeholder"></div>]
  }

  renderVimeoPlayer() {
    return [
      <div id="ve-video-vimeo"></div>
    ]
  }

  renderSelfHostedPlayer() {
    let fileExtension = this.src.split('#')[0].split('.').pop()
    if (this.autoplay && this.start >= 0 && this.end > this.start) this.setDelayedPause(this.end - this.start)
    return [
      <video
        id="ve-video-self-hosted"
        style={{width: '100%', height: '100%'}} 
        controls
        muted={this.muted}
        autoplay={this.autoplay}
        loop={this.loop}
      >
        <source src={`${this.src}${this.start > 0 ? '#'+'t='+this.start : ''}`} type={`video/${fileExtension}`}/>
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

  render() {
    return [
      this.isYouTube
        ? this.renderYouTubePlayer()
        : this.isVimeo
          ? this.renderVimeoPlayer()
          : this.renderSelfHostedPlayer()
    ]
  }

}
