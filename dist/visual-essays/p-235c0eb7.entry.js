import{r as t}from"./p-f5d08bd3.js";const e=class{constructor(e){t(this,e)}addMetaTag(t,e){let n=document.createElement("meta");n.setAttribute("name",t),n.setAttribute("content",e),document.head.appendChild(n)}addTitle(t){let e=document.querySelector("title");e?e.title=t:(e=document.createElement("title"),e.title=t,document.head.appendChild(e))}connectedCallback(){this.title&&this.addTitle(this.title),this.description&&this.addMetaTag("description",this.description)}render(){return null}};export{e as ve_meta}