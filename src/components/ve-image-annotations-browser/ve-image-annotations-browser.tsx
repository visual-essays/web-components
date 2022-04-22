import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import arrowLeftIcon from '../../icons/arrow-left-solid.svg'
import arrowRightIcon from '../../icons/arrow-right-solid.svg'
import timesCircleIcon from '../../icons/times-circle-regular.svg'

@Component({
  tag: 've-image-annotations-browser',
  styleUrl: 've-image-annotations-browser.css',
  shadow: true,
})
export class ImageAnnotationsBrowser {
  @Prop() annotations: string

  @Element() el: HTMLElement;

  @State() _annotations: any[] = []
  @Watch('_annotations')
  _annotationsChanged() {
    // console.log('_annotationsChanged', this._annotations)
  }

  @State() annoCursor: number = 0

  annoText() {
    return this._annotations.length > 0
      ? this._annotations[this.annoCursor].body[0].value
      : ''
  }

  @Event({ bubbles: true, composed: true }) zoomToRegion: EventEmitter<string>
  @Event({ bubbles: true, composed: true }) closeAnnotationsBrowser: EventEmitter

  hasNextAnnotation() { return this.annoCursor < this._annotations.length - 1 }
  hasPreviousAnnotation() { return this.annoCursor > 0 }

  viewNextAnnotation() {
    this.gotoAnnotationSeq(this.hasNextAnnotation() ? this.annoCursor + 1 : 0)
  }

  viewPreviousAnnotation() {
    this.gotoAnnotationSeq(this.hasPreviousAnnotation() ? this.annoCursor - 1 : this._annotations.length - 1)
  }

  gotoAnnotationSeq(idx) {
    idx = idx !== undefined ? idx : this.annoCursor
    if (idx < this._annotations.length) {
      this.annoCursor = idx
      this.gotoAnnotation(this._annotations[idx])
    }
  }

  gotoAnnotation(anno) {
    this.gotoRegion(anno.target.selector.value.split('=')[1])
  }

  gotoRegion(region) {
    this.zoomToRegion.emit(region)
  }

  copyTextToClipboard(e) {
    if (navigator.clipboard) navigator.clipboard.writeText(e.target.textContent)
  }

  copyAnnoIdToClipboard() {
    if (navigator.clipboard) navigator.clipboard.writeText(this._annotations[this.annoCursor].id.split('/').pop())
  }

  close() {
    this.closeAnnotationsBrowser.emit()
  }

  componentWillLoad() {
    this._annotations = JSON.parse(decodeURIComponent(this.annotations))
  }

  render() { 
    return <div class="annotations">
      <div class="anno-controls">
        <div class="anno-nav">
          <span onClick={this.viewPreviousAnnotation.bind(this)} title="Previous">
            <span innerHTML={arrowLeftIcon} title="Previous"></span>
          </span>
          <span class="anno-controls-text">{this.annoCursor+1} of {this._annotations.length} annotations</span>
          <span onClick={this.viewNextAnnotation.bind(this)} title="Next">
            <span innerHTML={arrowRightIcon} title="Next"></span>
          </span>
        </div>
        <div class="anno-close" onClick={this.close.bind(this)} title="Exit Annotations Navigator">
          <span innerHTML={timesCircleIcon} title="Close"></span>
        </div>
      </div>
      <div class="annos" innerHTML={this.annoText()} onClick={this.copyAnnoIdToClipboard.bind(this)}></div>
    </div>
  }
}
