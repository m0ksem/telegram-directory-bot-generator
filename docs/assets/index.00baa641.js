var Ee=Object.defineProperty;var ve=Object.getOwnPropertySymbols;var Re=Object.prototype.hasOwnProperty,Me=Object.prototype.propertyIsEnumerable;var me=(n,t,e)=>t in n?Ee(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,ee=(n,t)=>{for(var e in t||(t={}))Re.call(t,e)&&me(n,e,t[e]);if(ve)for(var e of ve(t))Me.call(t,e)&&me(n,e,t[e]);return n};import{r as g,o as Te,c as F,d as Y,a as y,b as R,e as S,F as te,f as le,n as fe,u as h,g as oe,t as re,h as pe,i as _e,j as ne,k as ge,l as he,w as ce,m as x,p as c,q as d,s as Le,v as Ue,x as H,y as j,z as G,A as He,B as Ne,C as ye,D as Oe,E as xe,G as Ae,W as De}from"./vendor.41f06df5.js";const ze=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function e(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerpolicy&&(u.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?u.credentials="include":o.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(o){if(o.ep)return;o.ep=!0;const u=e(o);fetch(o.href,u)}};ze();const Ce=()=>{const n=g(null);return{selected:n,set:s=>{n.value=s},unset:()=>{n.value=null}}},Pe=()=>{let n=g([]);const t=e=>{e&&n.value.push(e)};return Te(()=>{n.value=[]}),{itemRefs:n,setItemRef:t}},We=(n,t,e)=>[F({get(){return n[t]},set(s){e(`update:${t}`,s)}})];const Je={class:"draggable-canvas__item-content"},Fe=Y({props:{items:{type:Array,default:()=>[]}},emits:["update:items","update:hovered","update:selected","update:mouse"],setup(n,{emit:t}){const e=n,[s]=We(e,"items",t),{itemRefs:o,setItemRef:u}=Pe(),{selected:f,set:p,unset:_}=Ce(),{selected:m,set:a,unset:V}=Ce(),i=g(),k=g({x:0,y:0}),C=I=>{const{x:B,y:b,width:L,height:K}=i.value.getBoundingClientRect();if(f.value===null)return;const X=o.value[f.value].getBoundingClientRect(),Q=i.value.offsetWidth/L,Z=i.value.offsetHeight/K,l={x:(I.x-B-L/2+X.width/2)*Q-k.value.x*Q,y:(I.y-b-K/2+X.height/2)*Z-k.value.y*Z},r=s.value[f.value];r.position=l},M=I=>{const B=I.position||{x:0,y:0};return{transform:`translateX(${B.x}px) translateY(${B.y}px) translateX(-50%) translateY(-50%)`}},U=I=>{if(m.value===null)return;const{x:B,y:b}=I.target.getBoundingClientRect();k.value={x:I.x-B,y:I.y-b},p(m.value)},N=()=>{_()};let P=-1;const W=I=>{clearTimeout(P),a(I)},J=()=>{V(),P=window.setTimeout(()=>{_()},2e3)};return(I,B)=>(y(),R("div",{class:"draggable-canvas-wrapper",onMousemove:C,onMousedown:U,onMouseup:N,onMouseleave:B[0]||(B[0]=(...b)=>h(_)&&h(_)(...b))},[S("div",{class:"draggable-canvas",ref:(b,L)=>{L.canvas=b,i.value=b}},[(y(!0),R(te,null,le(h(s),(b,L)=>(y(),R("div",{class:"draggable-canvas__item",key:L,style:fe(M(b)),ref:h(u)},[oe(I.$slots,"item",pe(_e({index:L,item:b,style:{cursor:"move"},listeners:{mouseenter:()=>W(L),mouseleave:()=>J()}})),()=>[S("div",Je,re(b.position),1)])],4))),128))],512)],32))}});const Ye=Y({props:{connections:{type:Array,default:[]}},setup(n){const t=n,e=g(),s=g(),{getColor:o}=he(),u=a=>"$el"in a?a.$el:a,f=a=>{if(a===void 0||!e.value)return{x:0,y:0};const{x:V,y:i,width:k,height:C}=e.value.getBoundingClientRect(),M={x:e.value.offsetWidth/k,y:e.value.offsetHeight/C};if("x"in a&&"y"in a)return{x:(a.x-V)*M.x,y:(a.y-i)*M.y};const U=u(a);if(!U.getBoundingClientRect)return{x:0,y:0};const{x:N,y:P,width:W,height:J}=U.getBoundingClientRect();return{x:(N+W/2-V)*M.x,y:(P+J/2-i)*M.y}},p=()=>{var k,C;const a=s.value,V=((k=e.value)==null?void 0:k.width)||0,i=((C=e.value)==null?void 0:C.height)||0;a.clearRect(0,0,V,i),t.connections.forEach(M=>{const U=f(M.start),N=f(M.end);a.beginPath(),a.moveTo(U.x,U.y),a.lineTo(N.x,N.y),a.stroke()})},_=()=>{requestAnimationFrame(()=>{p(),_()})},m=()=>{var a;!e.value||(e.value.height=e.value.offsetHeight,e.value.width=e.value.offsetWidth,s.value=(a=e.value)==null?void 0:a.getContext("2d"),s.value.lineWidth=12,s.value.strokeStyle=o("gray"))};return ne(()=>{!e.value||(m(),_(),window.addEventListener("resize",m))}),ge(()=>{window.removeEventListener("resize",m)}),(a,V)=>(y(),R("canvas",{ref:(i,k)=>{k.canvas=i,e.value=i}},null,512))}});var be=(n,t)=>{const e=n.__vccOpts||n;for(const[s,o]of t)e[s]=o;return e};const je={},Xe={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"},qe=S("path",{d:"M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"},null,-1),Ge=[qe];function Ke(n,t){return y(),R("svg",Xe,Ge)}var Qe=be(je,[["render",Ke]]);const Ze=()=>{const n={cb:void 0};return{create:s=>{n.cb=s},call:(...s)=>{n.cb&&n.cb(...s)}}},we=n=>{const t=g({x:0,y:0}),e=g({x:0,y:0}),s=g({left:!1,middle:!1,right:!1}),o=h(n)||window,{create:u,call:f}=Ze(),p=i=>{i.button===1&&(s.value.left=!0),i.button===4&&(s.value.middle=!0),i.button===2&&(f(i),s.value.right=!0)},_=i=>{s.value={left:!1,middle:!1,right:!1}},m=i=>{t.value={x:i.x,y:i.y},e.value={x:i.movementX,y:i.movementY}};ne(()=>{o.addEventListener("mousedown",p),o.addEventListener("mouseup",_),o.addEventListener("mousemove",m)});const a=()=>o.getBoundingClientRect?o.getBoundingClientRect():{width:window.innerWidth,height:window.innerHeight},V=()=>{if(!o)return{x:0,y:0};const{width:i,height:k}=a();return{x:t.value.x-i/2,y:t.value.y-k/2}};return ge(()=>{o.removeEventListener("mousedown",p),o.removeEventListener("mouseup",_),o.removeEventListener("mousemove",m)}),o.oncontextmenu=i=>i.preventDefault(),{mouse:t,mousemove:e,buttons:s,onRightClick:u,normalize:V}},et={max:10,min:-10,speed:.1},tt=(n,t)=>{const e=g(0),s=h(n)||window,{max:o,min:u,speed:f}=ee(ee({},et),t),p=_=>{const m=_.deltaY/Math.abs(_.deltaY),a=e.value+f*m;a>o||a<u||(e.value=a)};return ne(()=>{s.addEventListener("wheel",p)}),{scroll:e}};const ot={class:"scroll-wrapper"},nt=Y({setup(n){const t=g({x:0,y:0}),{mousemove:e,buttons:s,mouse:o,normalize:u}=we(),{scroll:f}=tt(void 0,{max:.7,min:0,speed:.1}),p=F(()=>1-f.value),_=F(()=>{const m=t.value.x/(1/p.value),a=t.value.y/(1/p.value);return{transform:`translateX(${m}px) translateY(${a}px) scale(${p.value}) translateX(-50%) translateY(-50%)`}});return ce(e,m=>{s.value.right&&(t.value.x+=m.x*(1/p.value),t.value.y+=m.y*(1/p.value))}),(m,a)=>(y(),R("div",ot,[S("div",{class:"scroll-wrapper__content",style:fe(h(_))},[oe(m.$slots,"default",pe(_e({position:t.value,scale:h(p)})))],4)]))}}),st=()=>({copyToClipboard:async t=>{try{await window.navigator.clipboard.writeText(t)}catch(e){e.message==="NotAllowedError"&&alert("No permissions for copy to clipboard")}}});const at=n=>(Le("data-v-7bf69839"),n=n(),Ue(),n),lt={class:"json-config-popup"},rt=at(()=>S("h2",null,"Bot config",-1)),ct={class:"code-snippet"},ut=H("Copy"),it=Y({props:{createConfig:{type:Function,required:!0}},setup(n){const t=n,e=g(!1),s=g({}),{copyToClipboard:o}=st();return ce(e,u=>{u&&(s.value=t.createConfig())}),(u,f)=>{const p=x("va-button"),_=x("va-modal");return y(),R("div",lt,[c(p,{onClick:f[0]||(f[0]=m=>e.value=!e.value)},{default:d(()=>[oe(u.$slots,"default",{},void 0,!0)]),_:3}),c(_,{modelValue:e.value,"onUpdate:modelValue":f[2]||(f[2]=m=>e.value=m),"cancel-text":""},{header:d(()=>[rt]),default:d(()=>[S("pre",ct,re(JSON.stringify(s.value,void 0,2))+`
      `,1),c(p,{onClick:f[1]||(f[1]=m=>h(o)(JSON.stringify(s.value,void 0,2)))},{default:d(()=>[ut]),_:1})]),_:1},8,["modelValue"])])}}});var dt=be(it,[["__scopeId","data-v-7bf69839"]]);const vt={class:"json-config-popup"},mt=S("h2",null,"Bot config",-1),ft={class:"json-config-popup__modal"},pt={class:"code-snippet"},_t=Y({emits:["update:config"],setup(n,{emit:t}){const e=g(!1),s=g("");return ce(s,()=>{t("update:config",JSON.parse(s.value))}),(o,u)=>{const f=x("va-button"),p=x("va-input"),_=x("va-modal");return y(),R("div",vt,[c(f,{onClick:u[0]||(u[0]=m=>e.value=!e.value)},{default:d(()=>[oe(o.$slots,"default")]),_:3}),c(_,{modelValue:e.value,"onUpdate:modelValue":u[2]||(u[2]=m=>e.value=m),"cancel-text":"","max-width":"90%"},{header:d(()=>[mt]),default:d(()=>[S("div",ft,[S("pre",pt,[c(p,{height:"90vh",type:"textarea",modelValue:s.value,"onUpdate:modelValue":u[1]||(u[1]=m=>s.value=m)},null,8,["modelValue"])])])]),_:1},8,["modelValue"])])}}}),gt=()=>{const{setColors:n}=he(),t=g(!1),e=()=>{t.value=!0,n({primary:"#3e4df7",secondary:"#202020",background:"#121212",success:"#60a315",info:"#827ef3",danger:"#f00a67",warning:"#febf6d",gray:"#aeaeb1",dark:"#ffffff",white:"#020000",cardColor:"#202020"})},s=()=>{t.value=!1,n({primary:"#2C82E0",secondary:"#cbe4f0",background:"#f4f8fa",success:"#40e583",info:"#2c82e0",danger:"#DE1041",warning:"#FFAC0A",gray:"#202020",dark:"#0a1622",white:"#ffffff",cardColor:"#fcfdff"})},o=()=>t.value?s():e();return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?e():s(),{isDark:t,toggle:o,toDark:e,toWhite:s}},ht=()=>{const n=()=>Math.random()+new Date().valueOf();return{generateHash:()=>(n()+1).toString(36).substring(7)}},yt=()=>JSON.parse(localStorage.getItem("items")||"null")||xt,xt=[{id:"0",text:"Welcome!",buttons:[[{text:"Go to second message",id:"0",messageId:"1"},{text:"Link to our repo!",id:"1",url:"https://github.com/m0ksem/telegram-directory-bot-generator"}]],position:{x:-300,y:0}},{text:"I'm second message",id:"1",buttons:[[]],position:{x:250,y:300}},{text:"I'm not connected :(",id:"2",buttons:[[{text:"This button does nothing",id:"0",messageId:""}]],position:{x:300,y:-200}}];const Ct={class:"app"},bt=H(" Bot dictionary generator "),wt=H(" Add "),kt=H(" Save "),It=H(" Import from JSON "),$t=H(" Export to JSON "),St=H(" Action "),Bt={class:"ml-2"},Vt=H("Buttons"),Et={class:"pr-2"},Rt={class:"bot-button__state-buttons"},Mt=H("Add button"),Tt=["onClick"],Lt={class:"connections"},Ut=Y({setup(n){const t=g(!1),{toggle:e,isDark:s}=gt(),o=g(yt()),{generateHash:u}=ht(),f=()=>{o.value.push({text:"",id:u(),buttons:[[]],position:{x:0,y:0}})},p=l=>{const r=o.value[l];o.value=o.value.filter((v,$)=>$!==l),a.value=a.value.filter(v=>v.end.item.id!==r.id)},_=l=>{l.buttons.push([{text:"",messageId:"",id:`${l.id}-${u()}`}])},m=(l,r)=>{l.buttons=l.buttons.map(v=>v.filter($=>$.id!==r.id)).filter(v=>v.length>0),a.value=a.value.filter(v=>v.button.id!==r.id)},a=g([]),V=g(),{mouse:i,onRightClick:k}=we(V),C=g(null);k(()=>W());const M=F(()=>{const l=a.value.map(v=>({start:v.start.el,end:v.end.el})),r=[];return C.value&&r.push({start:C.value.el,end:i.value}),[...l,...r]}),U=(l,r,v)=>{C.value={item:l,button:r,el:v.target}},N=(l,r)=>{!C.value||(a.value.push({start:C.value,end:{item:l,el:r.target},button:C.value.button}),C.value.button.messageId=String(l.id),C.value=null)},P=l=>{a.value=a.value.filter(r=>r.button.id!==l.id),l.messageId=void 0},W=()=>{C.value=null},J=l=>a.value.some(r=>r.button.id===l.id),I=l=>a.value.some(r=>r.end.item.id===l.id),B=F(()=>o.value.reduce((l,r)=>r.id==="0"||a.value.some(v=>v.end.item.id===r.id)?l:l+1,0)),b=F(()=>o.value.reduce((l,r)=>r.buttons?r.buttons.reduce((v,$)=>$?v+$.reduce((A,q)=>"url"in q?0:a.value.some(E=>E.button.id===q.id)?A:A+1,0):0,0)+l:0,0)),L=()=>o.value.map(l=>({text:l.text,id:l.id,buttons:l.buttons.map(r=>r.map(v=>({text:v.text,messageId:"messageId"in v?v.messageId:void 0,url:"url"in v?v.url:void 0}))),position:l.position})),K=l=>r=>{l.el=r},ue=l=>r=>{l.el=r},X=()=>{o.value.forEach(l=>{l.buttons.forEach(r=>{r.forEach(v=>{if(!("messageId"in v))return;const $=o.value.find(A=>String(A.id)===v.messageId);!$||a.value.push({start:{item:l,el:v.el},end:{item:$,el:$.el},button:v})})})})};ne(()=>{X()});const Q=l=>{o.value=l.map(r=>(r.buttons||(r.buttons=[]),r)),t.value=!0,xe(()=>{t.value=!1,xe(()=>{X()})})},Z=()=>{localStorage.items=JSON.stringify(o.value)};return(l,r)=>{const v=x("va-navbar-item"),$=x("va-icon"),A=x("va-badge"),q=x("va-popover"),E=x("va-button"),ke=x("va-navbar"),Ie=x("va-card-title"),se=x("va-input"),ie=x("va-card-content"),$e=x("va-list-label"),Se=x("va-list-item"),de=x("va-card"),Be=x("va-card-actions");return y(),R("div",Ct,[c(ke,null,{left:d(()=>[c(v,{class:"display-5"},{default:d(()=>[bt]),_:1})]),right:d(()=>[c(v,{class:"d-flex align--center"},{default:d(()=>[h(B)!==0?(y(),j(q,{key:0,message:`${h(B)} item(s) unconnected`,color:"background"},{default:d(()=>[c(A,{overlap:"",text:h(B),class:"mr-4",color:"warning"},{default:d(()=>[c($,{name:"comments_disabled",color:"gray"})]),_:1},8,["text"])]),_:1},8,["message"])):G("",!0),h(b)!==0?(y(),j(q,{key:1,message:`${h(b)} button(s) unused`,color:"background"},{default:d(()=>[c(A,{overlap:"",text:h(b),class:"mr-4",color:"warning"},{default:d(()=>[c($,{name:"link_off",color:"gray"})]),_:1},8,["text"])]),_:1},8,["message"])):G("",!0),c(E,{class:"mr-2",onClick:f,icon:"add"},{default:d(()=>[wt]),_:1}),c(E,{class:"mr-2",onClick:Z,icon:"save"},{default:d(()=>[kt]),_:1}),c(_t,{class:"mr-2","onUpdate:config":Q},{default:d(()=>[It]),_:1}),c(dt,{class:"mr-2","create-config":L},{default:d(()=>[$t]),_:1}),c(E,{class:"mr-2",onClick:h(e),round:"",color:h(s)?"#f4f8fa":"#202020","text-color":"white"},{default:d(()=>[c($,{name:"palette",color:h(s)?"#202020":"#f4f8fa"},null,8,["color"])]),_:1},8,["onClick","color"]),c(E,{href:"https://github.com/m0ksem/telegram-directory-bot-generator",round:"",color:"#000"},{default:d(()=>[c(Qe,{style:{color:"white",fill:"white"}})]),_:1})]),_:1})]),_:1}),t.value?G("",!0):(y(),j(nt,{key:0},{default:d(()=>[c(Fe,{items:o.value,"onUpdate:items":r[0]||(r[0]=O=>o.value=O),mouse:h(i),"onUpdate:mouse":r[1]||(r[1]=O=>Oe(i)?i.value=O:null),style:{"z-index":"1"}},{item:d(({index:O,listeners:ae,style:Ve,item:T})=>[c(de,{class:"action-card",style:{opacity:"0.94"}},{default:d(()=>[c(Ie,He(Ne(ae),{style:ee({color:"var(--va-primary)",background:"rgba(0, 0, 0, 0.1)"},Ve)}),{default:d(()=>[St,S("span",Bt,re(T.id+1),1)]),_:2},1040,["style"]),c(ie,{class:"pt-2"},{default:d(()=>[c(se,{label:"Text",type:"textarea",modelValue:T.text,"onUpdate:modelValue":D=>T.text=D,placeholder:"Message text"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),T.buttons.length?(y(),j(ie,{key:0},{default:d(()=>[c($e,{color:"primary"},{default:d(()=>[Vt]),_:1}),(y(!0),R(te,null,le(T.buttons,D=>(y(),R(te,null,[(y(!0),R(te,null,le(D,w=>(y(),j(de,{outlined:"",style:{margin:"0 -8px"},class:"mb-1"},{default:d(()=>[c(Se,{class:"bot-button"},{default:d(()=>[c(E,{class:"mr-2",icon:"delete",color:"danger",onClick:z=>m(T,w)},null,8,["onClick"]),S("div",Et,[c(se,{modelValue:w.text,"onUpdate:modelValue":z=>w.text=z,label:"Button Text",placeholder:"Button text"},null,8,["modelValue","onUpdate:modelValue"]),w.url!==void 0?(y(),j(se,{key:0,class:"mt-2",modelValue:w.url,"onUpdate:modelValue":z=>w.url=z,label:"Button url",placeholder:"Button url"},null,8,["modelValue","onUpdate:modelValue"])):G("",!0)]),S("div",Rt,[c(E,{class:ye(["state-button",{"state-button--selected":w.url===void 0}]),onClick:z=>{U(T,w,z),w.url=void 0},icon:J(w)?"moving":"show_chart",color:J(w)?"success":"warning",ref:K(w)},null,8,["class","onClick","icon","color"]),c(E,{class:ye(["state-button",{"state-button--selected":w.url!==void 0}]),onClick:z=>{W(),P(w),w.url=""},icon:"link"},null,8,["class","onClick"])])]),_:2},1024)]),_:2},1024))),256))],64))),256))]),_:2},1024)):G("",!0),c(Be,{align:"between"},{default:d(()=>[c(E,{disabled:o.value.length===1,color:"danger",onClick:D=>p(O),icon:"delete",fab:""},null,8,["disabled","onClick"]),c(E,{onClick:D=>_(T),icon:"add"},{default:d(()=>[Mt]),_:2},1032,["onClick"])]),_:2},1024),S("div",{class:"connect-to-circle d-flex align--center justify--center",onClick:D=>N(T,D),ref:ue(T)},[c(E,{icon:"fiber_manual_record",color:I(T)?"success":"warning"},null,8,["color"])],8,Tt)]),_:2},1024)]),_:1},8,["items","mouse"]),S("div",Lt,[c(Ye,{ref:(O,ae)=>{ae.connectionsCanvas=O,V.value=O},connections:h(M)},null,8,["connections"])])]),_:1}))])}}});Ae(Ut).use(De,{components:{VaCard:{color:"cardColor"}}}).mount("#app");