import { Component, Element, Prop, State, h } from '@stencil/core';

@Component({
  tag: 've-tabs',
  styleUrl: 've-tabs.css',
  shadow: true,
})
export class Tabs {

  @Element() el: HTMLElement;

  @State() tabs: any[] = []
  @State() activeTab: string

  connectedCallback() {
  }

  componentDidLoad() {
    let tabs = Array.from(this.el.querySelectorAll('li')).map(el => {
      let tokens = el.innerHTML.trim().split(' ')
      return {tabId: tokens[0], label: tokens.slice(1).join(' '), active: tokens[0] === this.activeTab}
    })
    console.log(this.el.parentElement.querySelector('.tab.active'))
    this.activeTab = this.el.parentElement.querySelector('.tab.active')?.id
    if (!this.activeTab) {
      this.activeTab = tabs[0].tabId
      document.getElementById(this.activeTab).classList.add('active')
    }
    while (this.el.firstChild) this.el.removeChild(this.el.firstChild)
    this.tabs = tabs
  }

  selected(selectedTabId) {
    document.getElementById(this.activeTab).classList.remove('active')
    this.activeTab = selectedTabId
    document.getElementById(this.activeTab).classList.add('active')
  }

  render() { return this.tabs.map((tab:any, idx:number) => 
    <div>
      <input type="radio" name="tabs" id={`tab${idx}`} checked={this.activeTab ? this.activeTab === tab.tabId : idx === 0} />
      <label htmlFor={`tab${idx}`} onClick={this.selected.bind(this, tab.tabId)} innerHTML={tab.label}></label>
    </div>
  )}

}
