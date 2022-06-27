import{r as t,c as e,h as i,g as s}from"./p-f5d08bd3.js";const n=class{constructor(i){t(this,i),this.depictedChanged=e(this,"depictedChanged",7),this.show=!1,this.depicted=[],this._depicted=[]}showChanged(t){t?this.dialog.show():this.dialog.hide()}async onDepictedChanged(t){this._depicted=[...t]}async connectedCallback(){this.depicted&&(this._depicted=[...this.depicted])}componentDidLoad(){this.dialog=this.el.shadowRoot.getElementById("depicts-dialog"),this.dialog.addEventListener("sl-hide",(()=>this.show=!1)),this.show&&this.dialog.show()}async onEntitySelected(t){this._depicted=[...this._depicted,t.detail]}parseStatements(t,e){return Object.fromEntries(Object.entries(t).map((([t,i])=>[t,i.map((i=>{let s={type:i.type,value:i.value};"wikibase-entityid"===i.type&&(s.value={id:i,"entity-type":"item","numeric-id":parseInt(i.value.slice(1))});let n={mainsnak:{snaktype:"value",property:t,datavalue:s}};return e&&(n.type=e),"statement"===e&&(n.rank=i.rank||"normal"),i.qualifiers&&(n.qualifiers=this.parseStatements(i.qualifiers),n["qualifiers-order"]=Object.keys(n.qualifiers)),n}))])))}toEntityJSON({id:t,labels:e,descriptions:i,statements:s}){return{id:t,labels:e?Object.fromEntries(Object.entries(e).map((([t,e])=>[t,{language:t,value:e}]))):{},descriptions:i?Object.fromEntries(Object.entries(i).map((([t,e])=>[t,{language:t,value:e}]))):{},statements:s?this.parseStatements(s,"statement"):{}}}async onProminentToggled(t){let e=t.detail;this._depicted=this._depicted.map((t=>(t.prominent=t.id===e?!t.prominent:t.prominent,t)))}onDroToggled(t){let e=t.detail;this._depicted=this._depicted.map((t=>(t.dro=t.id===e?!t.dro:t.dro,t)))}onEntityRemoved(t){let e=t.detail;this._depicted=this._depicted.filter((t=>t.id!==e))}close(){this.show=!1,this._depicted=[...this.depicted]}async apply(){let t={P180:this._depicted.map((t=>({type:"wikibase-entityid",value:t.id,rank:t.prominent?"preferred":"normal"})))};this.source&&(t.P854=[{type:"string",value:this.source}]);let e=this._depicted.filter((t=>t.dro));e.length>0&&(t.P6243=e.map((t=>({type:"wikibase-entityid",value:t.id,rank:t.prominent?"preferred":"normal"}))));let i=this.toEntityJSON({id:this.sourceId,statements:t}),s=`https://www.jstor.org/api/labs-search-service/labs/about/_doc/${this.imageHash}/`;if((await fetch(s,{method:"PUT",body:JSON.stringify(i),headers:{"Content-Type":"application/json",Accept:"application/json"}})).ok){let t=Array.from(document.querySelectorAll("ve-depicts"));this.depicted=this._depicted,t.forEach((t=>t.refresh(this.depicted)))}this.show=!1}render(){return[i("sl-dialog",{id:"depicts-dialog",label:"Entities depicted in image",class:"dialog-overview"},i("div",{style:{display:"flex",padding:"12px",border:"1px solid #ccc",marginBottom:"18px"}},this.thumbnail?i("img",{style:{maxWidth:"40%",height:"100%"},src:this.thumbnail,alt:this.label}):"",i("div",{style:{display:"flex",flexDirection:"column",padding:"0px"}},i("div",{innerHTML:this.label,style:{padding:"0 12px",fontSize:"1.2em",fontWeight:"bold"}}),this.summary?i("div",{innerHTML:this.summary}):null)),i("ve-wikidata-search",null),i("div",{class:"wrapper"},i("div",{class:"ve-depicts"},i("ve-depicts",{depicted:this._depicted,format:"table"}))),i("sl-button",{slot:"footer",onClick:this.close.bind(this)},"Cancel"),i("sl-button",{slot:"footer",variant:"primary",onClick:this.apply.bind(this)},"Apply"))]}get el(){return s(this)}static get watchers(){return{show:["showChanged"],depicted:["onDepictedChanged"]}}};n.style=':host{font-family:Roboto, sans-serif}.wrapper{max-height:40vh;min-height:20vh;overflow-y:scroll}h4{margin:0 0 3px 0;font-size:1.2rem;font-weight:600}.card{max-height:200px}.card-body{padding:0.5rem;max-height:200px;overflow-y:scroll}.card-img{max-height:200px;object-fit:contain}.card-text{font-size:0.9rem;overflow-y:scroll}.depicted-entities{padding:0;list-style:none;overflow-y:scroll}.depicted-entities li{display:flex;align-items:center;justify-content:center;gap:18px}.depicted-entities li>*{flex:1;text-align:center;padding:6px 0}.header{border-bottom:2px solid black}div.label{text-align:left;min-width:30%}.controls{display:flex;align-items:center;justify-content:right;gap:18px}.controls button{cursor:pointer}.control label{margin-bottom:0}.depicts{padding:9px}.depicts .entities ul{margin:0;padding-left:6px;list-style-type:none}.depicts .entities ul li{display:grid;grid-auto-flow:column;align-items:center}.depicts .entities .controls{display:flex;justify-content:right}.depicts .entities .controls label{padding-left:6px;font-family:"Helvetica Narrow","Arial Narrow",Tahoma,Arial,Helvetica,sans-serif}.buttons{display:grid;grid-auto-flow:column;justify-content:end;grid-column-gap:12px}';export{n as ve_depicts_dialog}