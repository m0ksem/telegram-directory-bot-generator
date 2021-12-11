var le=Object.defineProperty;var X=Object.getOwnPropertySymbols;var ue=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var Y=(n,t,e)=>t in n?le(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,G=(n,t)=>{for(var e in t||(t={}))ue.call(t,e)&&Y(n,e,t[e]);if(X)for(var e of X(t))ie.call(t,e)&&Y(n,e,t[e]);return n};import{r as C,o as de,c as O,d as q,a as w,b as T,e as V,F as K,f as J,n as ve,u as g,g as me,t as Q,h as _e,i as fe,j as Z,k as ee,l as te,m as y,p as r,w as i,q as pe,s as P,v as W,x as ge,y as he,z as S,A as ye,W as xe}from"./vendor.e27034e6.js";const be=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const k of d.addedNodes)k.tagName==="LINK"&&k.rel==="modulepreload"&&c(k)}).observe(document,{childList:!0,subtree:!0});function e(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerpolicy&&(d.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?d.credentials="include":o.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function c(o){if(o.ep)return;o.ep=!0;const d=e(o);fetch(o.href,d)}};be();const ne=()=>{const n=C(null);return{selected:n,set:c=>{n.value=c},unset:()=>{n.value=null}}},Ce=()=>{let n=C([]);const t=e=>{e&&n.value.push(e)};return de(()=>{n.value=[]}),{itemRefs:n,setItemRef:t}},we=(n,t,e)=>[O({get(){return n[t]},set(c){e(`update:${t}`,c)}})];const ke={class:"draggable-canvas__item-content"},Ie=q({props:{items:{type:Array,default:()=>[]}},emits:["update:items","update:hovered","update:selected","update:mouse"],setup(n,{emit:t}){const e=n,[c]=we(e,"items",t),{itemRefs:o,setItemRef:d}=Ce(),{selected:k,set:h,unset:I}=ne(),{selected:l,set:f,unset:B}=ne(),$=C(),M=C({x:0,y:0}),L=v=>{const{x:p,y:_,width:m,height:H}=$.value.getBoundingClientRect();if(k.value===null)return;const z=o.value[k.value],F={x:v.x-p-m/2-M.value.x+z.offsetWidth/2,y:v.y-_-H/2-M.value.y+z.offsetHeight/2},N=c.value[k.value];N.position=F},E=v=>{const p=v.position||{x:0,y:0};return{transform:`translateX(${p.x}px) translateY(${p.y}px) translateX(-50%) translateY(-50%)`}},A=v=>{if(l.value===null)return;const{x:p,y:_}=v.target.getBoundingClientRect();M.value={x:v.x-p,y:v.y-_},h(l.value)},U=()=>{I()};let s=-1;const a=v=>{clearTimeout(s),f(v)},u=()=>{B(),s=window.setTimeout(()=>{I()},2e3)};return(v,p)=>(w(),T("div",{class:"draggable-canvas-wrapper",onMousemove:L,onMousedown:A,onMouseup:U,onMouseleave:p[0]||(p[0]=(..._)=>g(I)&&g(I)(..._))},[V("div",{class:"draggable-canvas",ref:(_,m)=>{m.canvas=_,$.value=_}},[(w(!0),T(K,null,J(g(c),(_,m)=>(w(),T("div",{class:"draggable-canvas__item",key:m,style:ve(E(_)),ref:g(d)},[me(v.$slots,"item",_e(fe({index:m,item:_,style:{cursor:"move"},listeners:{mouseenter:()=>a(m),mouseleave:()=>u()}})),()=>[V("div",ke,Q(_.position),1)])],4))),128))],512)],32))}});const $e=q({props:{connections:{type:Array,default:[]}},setup(n){const t=n,e=C(),c=C(),{getColor:o}=te(),d=l=>{if("x"in l&&"y"in l)return l;const{x:f,y:B,width:$,height:M}=l.getBoundingClientRect();return{x:f+$/2,y:B+M/2}},k=()=>{var $,M;const l=c.value,f=(($=e.value)==null?void 0:$.width)||0,B=((M=e.value)==null?void 0:M.height)||0;l.clearRect(0,0,f,B),t.connections.forEach(L=>{const E=d(L.start),A=d(L.end);l.beginPath(),l.moveTo(E.x,E.y),l.lineTo(A.x,A.y),l.stroke()})},h=()=>{requestAnimationFrame(()=>{k(),h()})},I=()=>{var l;!e.value||(e.value.height=e.value.offsetHeight,e.value.width=e.value.offsetWidth,c.value=(l=e.value)==null?void 0:l.getContext("2d"),c.value.lineWidth=12,c.value.strokeStyle=o("gray"))};return Z(()=>{!e.value||(I(),h(),window.addEventListener("resize",I))}),ee(()=>{window.removeEventListener("resize",I)}),(l,f)=>(w(),T("canvas",{ref:(B,$)=>{$.canvas=B,e.value=B}},null,512))}});var Be=(n,t)=>{const e=n.__vccOpts||n;for(const[c,o]of t)e[c]=o;return e};const Me={},Ae={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},Ve=V("path",{d:"M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"},null,-1),Le=[Ve];function Re(n,t){return w(),T("svg",Ae,Le)}var Te=Be(Me,[["render",Re]]);const Ee=()=>{const{setColors:n}=te(),t=C(!1),e=()=>{t.value=!0,n({primary:"#3e4df7",secondary:"#202020",background:"#121212",success:"#60a315",info:"#827ef3",danger:"#f00a67",warning:"#febf6d",gray:"#aeaeb1",dark:"#ffffff",white:"#020000",cardColor:"#202020"})},c=()=>{t.value=!1,n({primary:"#2C82E0",secondary:"#cbe4f0",background:"#f4f8fa",success:"#40e583",info:"#2c82e0",danger:"#DE1041",warning:"#FFAC0A",gray:"#202020",dark:"#0a1622",white:"#ffffff",cardColor:"#fcfdff"})},o=()=>t.value?c():e();return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?e():c(),{isDark:t,toggle:o,toDark:e,toWhite:c}},Se=n=>{const t=C({x:0,y:0}),e=g(n)||window,c=o=>{t.value={x:o.x,y:o.y}};return Z(()=>{e.addEventListener("mousemove",c)}),ee(()=>{e.removeEventListener("mousemove",c)}),{mouse:t}},Ue=[{data:{id:0,text:"",buttons:[{text:"",id:0}]},position:{x:0,y:0}},{data:{text:"",id:1,buttons:[]},position:{x:100,y:250}}];const Pe={class:"app"},ze=S(" Bot dictionary generator "),Fe=S(" Add "),Ne=S(" Switch theme "),De=S(" Action "),Oe={class:"ml-2"},We=S("Buttons"),He={class:"pr-2"},je=["onClick"],qe=S("Add button"),Xe=["onClick"],Ye={class:"connections"},Ge=q({setup(n){const{toggle:t}=Ee(),e=C(Ue),c=()=>{e.value.push({data:{text:"",id:e.value.length,buttons:[]},position:{x:0,y:0}})},o=s=>{e.value=e.value.filter((a,u)=>u!==u)},d=s=>{s.data.buttons.push({text:"",id:`${s.data.id}-${s.data.buttons.length}`})},k=(s,a)=>{s.data.buttons=s.data.buttons.filter(u=>u.id!==a.id),h.value=h.value.filter(u=>u.button.id!==a.id)},h=C([]),I=C(),{mouse:l}=Se(I),f=C(null),B=O(()=>{const s=h.value.map(u=>({start:u.start.el,end:u.end.el})),a=[];return f.value&&a.push({start:f.value.el,end:l.value}),[...s,...a]}),$=(s,a,u)=>{f.value={item:s,button:a,el:u.target}},M=(s,a)=>{!f.value||(h.value.push({start:f.value,end:{item:s,el:a.target},button:f.value.button}),f.value=null)},L=s=>h.value.some(a=>a.button.id===s.id),E=s=>h.value.some(a=>a.end.item.data.id===s.data.id),A=O(()=>e.value.reduce((s,a)=>a.data.id===0||h.value.some(u=>u.end.item.data.id===a.data.id)?s:s+1,0)),U=O(()=>e.value.reduce((s,a)=>a.data.buttons.reduce((u,v)=>h.value.some(p=>p.button.id===v.id)?u:u+1,0)+s,0));return(s,a)=>{const u=y("va-navbar-item"),v=y("va-icon"),p=y("va-badge"),_=y("va-popover"),m=y("va-button"),H=y("va-navbar"),z=y("va-card-title"),F=y("va-input"),N=y("va-card-content"),oe=y("va-list-label"),se=y("va-list-item"),ae=y("va-card-actions"),ce=y("va-card");return w(),T("div",Pe,[r(H,null,{left:i(()=>[r(u,{class:"display-5"},{default:i(()=>[ze]),_:1})]),right:i(()=>[r(u,{class:"d-flex align--center"},{default:i(()=>[g(A)!==0?(w(),P(_,{key:0,message:`${g(A)} item(s) unconnected`,color:"background"},{default:i(()=>[r(p,{overlap:"",text:g(A),class:"mr-4",color:"warning"},{default:i(()=>[r(v,{name:"link_off",color:"gray"})]),_:1},8,["text"])]),_:1},8,["message"])):W("",!0),g(U)!==0?(w(),P(_,{key:1,message:`${g(U)} button(s) unused`,color:"background"},{default:i(()=>[r(p,{overlap:"",text:g(U),class:"mr-4",color:"warning"},{default:i(()=>[r(v,{name:"comments_disabled",color:"gray"})]),_:1},8,["text"])]),_:1},8,["message"])):W("",!0),r(m,{class:"mr-2",onClick:c,icon:"add"},{default:i(()=>[Fe]),_:1}),r(m,{class:"mr-2",onClick:g(t),icon:"palette"},{default:i(()=>[Ne]),_:1},8,["onClick"]),r(m,{href:"https://github.com/m0ksem/telegram-directory-bot-generator",round:"",color:"#000"},{default:i(()=>[r(Te,{style:{color:"white",fill:"white"}})]),_:1})]),_:1})]),_:1}),r(Ie,{items:e.value,"onUpdate:items":a[0]||(a[0]=R=>e.value=R),mouse:g(l),"onUpdate:mouse":a[1]||(a[1]=R=>pe(l)?l.value=R:null),style:{"z-index":"1"}},{item:i(({index:R,listeners:j,style:re,item:x})=>[r(ce,{class:"action-card",style:{opacity:"0.94"}},{default:i(()=>[r(z,ge(he(j),{style:G({color:"var(--va-primary)"},re)}),{default:i(()=>[De,V("span",Oe,Q(x.data.id+1),1)]),_:2},1040,["style"]),r(N,null,{default:i(()=>[r(F,{label:"Text",type:"textarea",modelValue:x.data.text,"onUpdate:modelValue":b=>x.data.text=b,placeholder:"Message text"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),x.data.buttons.length?(w(),P(N,{key:0},{default:i(()=>[r(oe,{color:"primary"},{default:i(()=>[We]),_:1}),(w(!0),T(K,null,J(x.data.buttons,b=>(w(),P(se,{class:"button"},{default:i(()=>[V("div",He,[r(F,{modelValue:b.text,"onUpdate:modelValue":D=>b.text=D,label:"Button Text",placeholder:"Button text"},null,8,["modelValue","onUpdate:modelValue"])]),r(m,{class:"mr-2",icon:"delete",color:"danger",onClick:D=>k(x,b)},null,8,["onClick"]),V("div",{onClick:D=>$(x,b,D)},[r(m,{icon:L(b)?"moving":"show_chart",color:L(b)?"success":"warning"},null,8,["icon","color"])],8,je)]),_:2},1024))),256))]),_:2},1024)):W("",!0),r(ae,{align:"between"},{default:i(()=>[r(m,{disabled:x.data.id===0,color:"danger",onClick:b=>o(),icon:"delete",fab:""},null,8,["disabled","onClick"]),r(m,{onClick:b=>d(x),icon:"add"},{default:i(()=>[qe]),_:2},1032,["onClick"])]),_:2},1024),V("div",{class:"connect-from-circle d-flex align--center justify--center",onClick:b=>M(x,b)},[x.data.id!==0?(w(),P(m,{key:0,icon:"fiber_manual_record",color:E(x)?"success":"warning"},null,8,["color"])):W("",!0)],8,Xe)]),_:2},1024)]),_:1},8,["items","mouse"]),V("div",Ye,[r($e,{ref:(R,j)=>{j.connectionsCanvas=R,I.value=R},connections:g(B)},null,8,["connections"])])])}}});ye(Ge).use(xe,{components:{VaCard:{color:"cardColor"}}}).mount("#app");