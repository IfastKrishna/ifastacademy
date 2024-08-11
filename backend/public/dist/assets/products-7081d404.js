import{o as ne,j as n,p as te,q as se,s as N,t as W,v as h,w as Ye,r as x,x as xe,y as J,z as ge,E as Ne,F as Qe,G as eo,H as Ie,J as B,K as re,M as oo,N as no,O as to,P as Pe,Q as so,U as ro,V as ao,X as de,Y as io,B as z,l as _,b as lo,Z as u,S as y,$ as co,g as U,T as I,a0 as Ce,m as uo,h as po,a as fe,a1 as ho,a2 as fo,a3 as xo,a4 as go,a5 as mo,f as vo,D as bo,a6 as yo,a7 as Co,C as jo,a8 as je,W as Ro}from"./index-0e7a8f82.js";import{F as oe}from"./FormControlLabel-dfb47939.js";const Fo={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},wo=Fo,So=ne(n.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star"),ko=ne(n.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),"StarBorder");function No(e){return se("MuiRating",e)}const Io=te("MuiRating",["root","sizeSmall","sizeMedium","sizeLarge","readOnly","disabled","focusVisible","visuallyHidden","pristine","label","labelEmptyValueActive","icon","iconEmpty","iconFilled","iconHover","iconFocus","iconActive","decimal"]),K=Io,Po=["value"],Ao=["className","defaultValue","disabled","emptyIcon","emptyLabelText","getLabelText","highlightSelectedOnly","icon","IconContainerComponent","max","name","onChange","onChangeActive","onMouseLeave","onMouseMove","precision","readOnly","size","value"];function Oo(e){const o=e.toString().split(".")[1];return o?o.length:0}function ue(e,o){if(e==null)return e;const t=Math.round(e/o)*o;return Number(t.toFixed(Oo(o)))}const $o=e=>{const{classes:o,size:t,readOnly:s,disabled:r,emptyValueFocused:c,focusVisible:p}=e,d={root:["root",`size${W(t)}`,r&&"disabled",p&&"focusVisible",s&&"readOnly"],label:["label","pristine"],labelEmptyValue:[c&&"labelEmptyValueActive"],icon:["icon"],iconEmpty:["iconEmpty"],iconFilled:["iconFilled"],iconHover:["iconHover"],iconFocus:["iconFocus"],iconActive:["iconActive"],decimal:["decimal"],visuallyHidden:["visuallyHidden"]};return re(d,No,o)},zo=N("span",{name:"MuiRating",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[{[`& .${K.visuallyHidden}`]:o.visuallyHidden},o.root,o[`size${W(t.size)}`],t.readOnly&&o.readOnly]}})(({theme:e,ownerState:o})=>h({display:"inline-flex",position:"relative",fontSize:e.typography.pxToRem(24),color:"#faaf00",cursor:"pointer",textAlign:"left",width:"min-content",WebkitTapHighlightColor:"transparent",[`&.${K.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${K.focusVisible} .${K.iconActive}`]:{outline:"1px solid #999"},[`& .${K.visuallyHidden}`]:wo},o.size==="small"&&{fontSize:e.typography.pxToRem(18)},o.size==="large"&&{fontSize:e.typography.pxToRem(30)},o.readOnly&&{pointerEvents:"none"})),Ae=N("label",{name:"MuiRating",slot:"Label",overridesResolver:({ownerState:e},o)=>[o.label,e.emptyValueFocused&&o.labelEmptyValueActive]})(({ownerState:e})=>h({cursor:"inherit"},e.emptyValueFocused&&{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"})),Mo=N("span",{name:"MuiRating",slot:"Icon",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.icon,t.iconEmpty&&o.iconEmpty,t.iconFilled&&o.iconFilled,t.iconHover&&o.iconHover,t.iconFocus&&o.iconFocus,t.iconActive&&o.iconActive]}})(({theme:e,ownerState:o})=>h({display:"flex",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),pointerEvents:"none"},o.iconActive&&{transform:"scale(1.2)"},o.iconEmpty&&{color:(e.vars||e).palette.action.disabled})),Vo=N("span",{name:"MuiRating",slot:"Decimal",shouldForwardProp:e=>Ye(e)&&e!=="iconActive",overridesResolver:(e,o)=>{const{iconActive:t}=e;return[o.decimal,t&&o.iconActive]}})(({iconActive:e})=>h({position:"relative"},e&&{transform:"scale(1.2)"}));function To(e){const o=J(e,Po);return n.jsx("span",h({},o))}function Re(e){const{classes:o,disabled:t,emptyIcon:s,focus:r,getLabelText:c,highlightSelectedOnly:p,hover:d,icon:i,IconContainerComponent:a,isActive:v,itemValue:l,labelProps:F,name:w,onBlur:O,onChange:S,onClick:j,onFocus:R,readOnly:g,ownerState:b,ratingValue:C,ratingValueRounded:ae}=e,E=p?l===C:l<=C,Y=l<=d,L=l<=r,ie=l===ae,X=ge(),M=n.jsx(Mo,{as:a,value:l,className:B(o.icon,E?o.iconFilled:o.iconEmpty,Y&&o.iconHover,L&&o.iconFocus,v&&o.iconActive),ownerState:h({},b,{iconEmpty:!E,iconFilled:E,iconHover:Y,iconFocus:L,iconActive:v}),children:s&&!E?s:i});return g?n.jsx("span",h({},F,{children:M})):n.jsxs(x.Fragment,{children:[n.jsxs(Ae,h({ownerState:h({},b,{emptyValueFocused:void 0}),htmlFor:X},F,{children:[M,n.jsx("span",{className:o.visuallyHidden,children:c(l)})]})),n.jsx("input",{className:o.visuallyHidden,onFocus:R,onBlur:O,onChange:S,onClick:j,disabled:t,value:l,id:X,type:"radio",name:w,checked:ie})]})}const Bo=n.jsx(So,{fontSize:"inherit"}),Eo=n.jsx(ko,{fontSize:"inherit"});function Lo(e){return`${e} Star${e!==1?"s":""}`}const Ho=x.forwardRef(function(o,t){const s=xe({name:"MuiRating",props:o}),{className:r,defaultValue:c=null,disabled:p=!1,emptyIcon:d=Eo,emptyLabelText:i="Empty",getLabelText:a=Lo,highlightSelectedOnly:v=!1,icon:l=Bo,IconContainerComponent:F=To,max:w=5,name:O,onChange:S,onChangeActive:j,onMouseLeave:R,onMouseMove:g,precision:b=1,readOnly:C=!1,size:ae="medium",value:E}=s,Y=J(s,Ao),L=ge(O),[ie,X]=Ne({controlled:E,default:c,name:"Rating"}),M=ue(ie,b),Le=Qe(),[{hover:P,focus:Q},Z]=x.useState({hover:-1,focus:-1});let H=M;P!==-1&&(H=P),Q!==-1&&(H=Q);const{isFocusVisibleRef:me,onBlur:He,onFocus:Ge,ref:De}=eo(),[_e,le]=x.useState(!1),ve=x.useRef(),Ue=Ie(De,ve,t),We=f=>{g&&g(f);const m=ve.current,{right:k,left:ee,width:G}=m.getBoundingClientRect();let D;Le?D=(k-f.clientX)/G:D=(f.clientX-ee)/G;let A=ue(w*D+b/2,b);A=oo(A,b,w),Z(V=>V.hover===A&&V.focus===A?V:{hover:A,focus:A}),le(!1),j&&P!==A&&j(f,A)},Xe=f=>{R&&R(f);const m=-1;Z({hover:m,focus:m}),j&&P!==m&&j(f,m)},be=f=>{let m=f.target.value===""?null:parseFloat(f.target.value);P!==-1&&(m=P),X(m),S&&S(f,m)},Ze=f=>{f.clientX===0&&f.clientY===0||(Z({hover:-1,focus:-1}),X(null),S&&parseFloat(f.target.value)===M&&S(f,null))},qe=f=>{Ge(f),me.current===!0&&le(!0);const m=parseFloat(f.target.value);Z(k=>({hover:k.hover,focus:m}))},Ke=f=>{if(P!==-1)return;He(f),me.current===!1&&le(!1);const m=-1;Z(k=>({hover:k.hover,focus:m}))},[Je,ye]=x.useState(!1),q=h({},s,{defaultValue:c,disabled:p,emptyIcon:d,emptyLabelText:i,emptyValueFocused:Je,focusVisible:_e,getLabelText:a,icon:l,IconContainerComponent:F,max:w,precision:b,readOnly:C,size:ae}),$=$o(q);return n.jsxs(zo,h({ref:Ue,onMouseMove:We,onMouseLeave:Xe,className:B($.root,r,C&&"MuiRating-readOnly"),ownerState:q,role:C?"img":null,"aria-label":C?a(H):null},Y,{children:[Array.from(new Array(w)).map((f,m)=>{const k=m+1,ee={classes:$,disabled:p,emptyIcon:d,focus:Q,getLabelText:a,highlightSelectedOnly:v,hover:P,icon:l,IconContainerComponent:F,name:L,onBlur:Ke,onChange:be,onClick:Ze,onFocus:qe,ratingValue:H,ratingValueRounded:M,readOnly:C,ownerState:q},G=k===Math.ceil(H)&&(P!==-1||Q!==-1);if(b<1){const D=Array.from(new Array(1/b));return n.jsx(Vo,{className:B($.decimal,G&&$.iconActive),ownerState:q,iconActive:G,children:D.map((A,V)=>{const ce=ue(k-1+(V+1)*b,b);return n.jsx(Re,h({},ee,{isActive:!1,itemValue:ce,labelProps:{style:D.length-1===V?{}:{width:ce===H?`${(V+1)*b*100}%`:"0%",overflow:"hidden",position:"absolute"}}}),ce)})},k)}return n.jsx(Re,h({},ee,{isActive:G,itemValue:k}),k)}),!C&&!p&&n.jsxs(Ae,{className:B($.label,$.labelEmptyValue),ownerState:q,children:[n.jsx("input",{className:$.visuallyHidden,value:"",id:`${L}-empty`,type:"radio",name:L,checked:M==null,onFocus:()=>ye(!0),onBlur:()=>ye(!1),onChange:be}),n.jsx("span",{className:$.visuallyHidden,children:i})]})]}))}),Fe=Ho;function Go(e){return se("MuiFormGroup",e)}te("MuiFormGroup",["root","row","error"]);const Do=["className","row"],_o=e=>{const{classes:o,row:t,error:s}=e;return re({root:["root",t&&"row",s&&"error"]},Go,o)},Uo=N("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.row&&o.row]}})(({ownerState:e})=>h({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})),Wo=x.forwardRef(function(o,t){const s=xe({props:o,name:"MuiFormGroup"}),{className:r,row:c=!1}=s,p=J(s,Do),d=no(),i=to({props:s,muiFormControl:d,states:["error"]}),a=h({},s,{row:c,error:i.error}),v=_o(a);return n.jsx(Uo,h({className:B(v.root,r),ownerState:a,ref:t},p))}),Oe=Wo,Xo=ne(n.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),Zo=ne(n.jsx("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),qo=N("span",{shouldForwardProp:Pe})({position:"relative",display:"flex"}),Ko=N(Xo)({transform:"scale(1)"}),Jo=N(Zo)(({theme:e,ownerState:o})=>h({left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},o.checked&&{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}));function $e(e){const{checked:o=!1,classes:t={},fontSize:s}=e,r=h({},e,{checked:o});return n.jsxs(qo,{className:t.root,ownerState:r,children:[n.jsx(Ko,{fontSize:s,className:t.background,ownerState:r}),n.jsx(Jo,{fontSize:s,className:t.dot,ownerState:r})]})}const Yo=x.createContext(void 0),ze=Yo;function Qo(){return x.useContext(ze)}function en(e){return se("MuiRadio",e)}const on=te("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary","sizeSmall"]),we=on,nn=["checked","checkedIcon","color","icon","name","onChange","size","className"],tn=e=>{const{classes:o,color:t,size:s}=e,r={root:["root",`color${W(t)}`,s!=="medium"&&`size${W(s)}`]};return h({},o,re(r,en,o))},sn=N(so,{shouldForwardProp:e=>Pe(e)||e==="classes",name:"MuiRadio",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.size!=="medium"&&o[`size${W(t.size)}`],o[`color${W(t.color)}`]]}})(({theme:e,ownerState:o})=>h({color:(e.vars||e).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${o.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette[o.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:ro(o.color==="default"?e.palette.action.active:e.palette[o.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${we.checked}`]:{color:(e.vars||e).palette[o.color].main}},{[`&.${we.disabled}`]:{color:(e.vars||e).palette.action.disabled}}));function rn(e,o){return typeof o=="object"&&o!==null?e===o:String(e)===String(o)}const Se=n.jsx($e,{checked:!0}),ke=n.jsx($e,{}),an=x.forwardRef(function(o,t){var s,r;const c=xe({props:o,name:"MuiRadio"}),{checked:p,checkedIcon:d=Se,color:i="primary",icon:a=ke,name:v,onChange:l,size:F="medium",className:w}=c,O=J(c,nn),S=h({},c,{color:i,size:F}),j=tn(S),R=Qo();let g=p;const b=ao(l,R&&R.onChange);let C=v;return R&&(typeof g>"u"&&(g=rn(R.value,c.value)),typeof C>"u"&&(C=R.name)),n.jsx(sn,h({type:"radio",icon:x.cloneElement(a,{fontSize:(s=ke.props.fontSize)!=null?s:F}),checkedIcon:x.cloneElement(d,{fontSize:(r=Se.props.fontSize)!=null?r:F}),ownerState:S,classes:j,name:C,checked:g,onChange:b,ref:t,className:B(j.root,w)},O))}),pe=an;function ln(e){return se("MuiRadioGroup",e)}te("MuiRadioGroup",["root","row","error"]);const cn=["actions","children","className","defaultValue","name","onChange","value"],dn=e=>{const{classes:o,row:t,error:s}=e;return re({root:["root",t&&"row",s&&"error"]},ln,o)},un=x.forwardRef(function(o,t){const{actions:s,children:r,className:c,defaultValue:p,name:d,onChange:i,value:a}=o,v=J(o,cn),l=x.useRef(null),F=dn(o),[w,O]=Ne({controlled:a,default:p,name:"RadioGroup"});x.useImperativeHandle(s,()=>({focus:()=>{let g=l.current.querySelector("input:not(:disabled):checked");g||(g=l.current.querySelector("input:not(:disabled)")),g&&g.focus()}}),[]);const S=Ie(t,l),j=ge(d),R=x.useMemo(()=>({name:j,onChange(g){O(g.target.value),i&&i(g,g.target.value)},value:w}),[j,i,O,w]);return n.jsx(ze.Provider,{value:R,children:n.jsx(Oe,h({role:"radiogroup",ref:S,className:B(F.root,c)},v,{children:r}))})}),he=un,pn=["Nike Air Force 1 NDESTRUKT","Nike Space Hippie 04","Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear","Nike Blazer Low 77 Vintage","Nike ZoomX SuperRep Surge","Zoom Freak 2","Nike Air Max Zephyr","Jordan Delta","Air Jordan XXXV PF","Nike Waffle Racer Crater","Kyrie 7 EP Sisterhood","Nike Air Zoom BB NXT","Nike Air Force 1 07 LX","Nike Air Force 1 Shadow SE","Nike Air Zoom Tempo NEXT%","Nike DBreak-Type","Nike Air Max Up","Nike Air Max 270 React ENG","NikeCourt Royale","Nike Air Zoom Pegasus 37 Premium","Nike Air Zoom SuperRep","NikeCourt Royale","Nike React Art3mis","Nike React Infinity Run Flyknit A.I.R. Chaz Bear"],T=["#00AB55","#000000","#FFFFFF","#FFC0CB","#FF4842","#1890FF","#94D82D","#FFC107"],hn=[...Array(24)].map((e,o)=>{const t=o+1;return{id:de.string.uuid(),cover:`/assets/images/products/product_${t}.jpg`,name:pn[o],price:de.number.int({min:4,max:99,precision:.01}),priceSale:t%3?null:de.number.int({min:19,max:29,precision:.01}),colors:t===1&&T.slice(0,2)||t===2&&T.slice(1,3)||t===3&&T.slice(2,4)||t===4&&T.slice(3,6)||t===23&&T.slice(4,6)||t===24&&T.slice(5,6)||T,status:io.sample(["sale","new","",""])}}),fn=N(z)(({theme:e,ownerState:o})=>{const t=e.palette.mode==="light",s=o.variant==="filled",r=o.variant==="outlined",c=o.variant==="soft",p={...o.color==="default"&&{...s&&{color:t?e.palette.common.white:e.palette.grey[800],backgroundColor:e.palette.text.primary},...r&&{backgroundColor:"transparent",color:e.palette.text.primary,border:`2px solid ${e.palette.text.primary}`},...c&&{color:e.palette.text.secondary,backgroundColor:_(e.palette.grey[500],.16)}}},d={...o.color!=="default"&&{...s&&{color:e.palette[o.color].contrastText,backgroundColor:e.palette[o.color].main},...r&&{backgroundColor:"transparent",color:e.palette[o.color].main,border:`2px solid ${e.palette[o.color].main}`},...c&&{color:e.palette[o.color][t?"dark":"light"],backgroundColor:_(e.palette[o.color].main,.16)}}};return{height:24,minWidth:24,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",textTransform:"capitalize",padding:e.spacing(0,.75),fontSize:e.typography.pxToRem(12),fontWeight:e.typography.fontWeightBold,transition:e.transitions.create("all",{duration:e.transitions.duration.shorter}),...p,...d}}),Me=x.forwardRef(({children:e,color:o="default",variant:t="soft",startIcon:s,endIcon:r,sx:c,...p},d)=>{const i=lo(),a={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return n.jsxs(fn,{ref:d,component:"span",ownerState:{color:o,variant:t},sx:{...s&&{pl:.75},...r&&{pr:.75},...c},theme:i,...p,children:[s&&n.jsxs(z,{sx:{mr:.75,...a},children:[" ",s," "]}),e,r&&n.jsxs(z,{sx:{ml:.75,...a},children:[" ",r," "]})]})});Me.propTypes={children:u.node,endIcon:u.object,startIcon:u.object,sx:u.object,variant:u.oneOf(["filled","outlined","ghost","soft"]),color:u.oneOf(["default","primary","secondary","info","success","warning","error"])};const xn=Me,Ve=x.forwardRef(({colors:e,selected:o,onSelectColor:t,limit:s="auto",sx:r,...c},p)=>{const d=typeof o=="string",i=x.useCallback(a=>{if(d)a!==o&&t(a);else{const v=o.includes(a)?o.filter(l=>l!==a):[...o,a];t(v)}},[t,o,d]);return n.jsx(y,{ref:p,direction:"row",display:"inline-flex",sx:{flexWrap:"wrap",...s!=="auto"&&{width:s*36,justifyContent:"flex-end"},...r},...c,children:e.map(a=>{const v=d?o===a:o.includes(a);return n.jsx(co,{sx:{width:36,height:36,borderRadius:"50%"},onClick:()=>{i(a)},children:n.jsx(y,{alignItems:"center",justifyContent:"center",sx:{width:20,height:20,bgcolor:a,borderRadius:"50%",border:l=>`solid 1px ${_(l.palette.grey[500],.16)}`,...v&&{transform:"scale(1.3)",boxShadow:`4px 4px 8px 0 ${_(a,.48)}`,outline:`solid 2px ${_(a,.08)}`,transition:l=>l.transitions.create("all",{duration:l.transitions.duration.shortest})}},children:n.jsx(U,{width:v?12:0,icon:"eva:checkmark-fill",sx:{color:l=>l.palette.getContrastText(a),transition:l=>l.transitions.create("all",{duration:l.transitions.duration.shortest})}})})},a)})})});Ve.propTypes={colors:u.oneOfType([u.string,u.arrayOf(u.string)]),limit:u.number,onSelectColor:u.func,selected:u.oneOfType([u.string,u.arrayOf(u.string)]),sx:u.object};const gn=Ve;function Te({colors:e,limit:o=3,sx:t}){const s=e.slice(0,o),r=e.length-o;return n.jsxs(y,{component:"span",direction:"row",alignItems:"center",justifyContent:"flex-end",sx:t,children:[s.map((c,p)=>n.jsx(z,{sx:{ml:-.75,width:16,height:16,bgcolor:c,borderRadius:"50%",border:d=>`solid 2px ${d.palette.background.paper}`,boxShadow:d=>`inset -1px 1px 2px ${_(d.palette.common.black,.24)}`}},c+p)),e.length>o&&n.jsx(z,{component:"span",sx:{typography:"subtitle2"},children:`+${r}`})]})}Te.propTypes={colors:u.arrayOf(u.string),limit:u.number,sx:u.object};function Be({product:e}){const o=n.jsx(xn,{variant:"filled",color:e.status==="sale"&&"error"||"info",sx:{zIndex:9,top:16,right:16,position:"absolute",textTransform:"uppercase"},children:e.status}),t=n.jsx(z,{component:"img",alt:e.name,src:e.cover,sx:{top:0,width:1,height:1,objectFit:"cover",position:"absolute"}}),s=n.jsxs(I,{variant:"subtitle1",children:[n.jsx(I,{component:"span",variant:"body1",sx:{color:"text.disabled",textDecoration:"line-through"},children:e.priceSale&&Ce(e.priceSale)})," ",Ce(e.price)]});return n.jsxs(uo,{children:[n.jsxs(z,{sx:{pt:"100%",position:"relative"},children:[e.status&&o,t]}),n.jsxs(y,{spacing:2,sx:{p:3},children:[n.jsx(po,{color:"inherit",underline:"hover",variant:"subtitle2",noWrap:!0,children:e.name}),n.jsxs(y,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[n.jsx(Te,{colors:e.colors}),s]})]})]})}Be.propTypes={product:u.object};const mn=[{value:"featured",label:"Featured"},{value:"newest",label:"Newest"},{value:"priceDesc",label:"Price: High-Low"},{value:"priceAsc",label:"Price: Low-High"}];function vn(){const[e,o]=x.useState(null),t=r=>{o(r.currentTarget)},s=()=>{o(null)};return n.jsxs(n.Fragment,{children:[n.jsxs(fe,{disableRipple:!0,color:"inherit",onClick:t,endIcon:n.jsx(U,{icon:e?"eva:chevron-up-fill":"eva:chevron-down-fill"}),children:["Sort By: ",n.jsx(I,{component:"span",variant:"subtitle2",sx:{color:"text.secondary"},children:"Newest"})]}),n.jsx(ho,{open:!!e,anchorEl:e,onClose:s,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},slotProps:{paper:{sx:{[`& .${fo.root}`]:{p:0}}}},children:mn.map(r=>n.jsx(xo,{selected:r.value==="newest",onClick:s,children:r.label},r.value))})]})}const bn=["Men","Women","Kids"],yn=["All","Shose","Apparel","Accessories"],Cn=["up4Star","up3Star","up2Star","up1Star"],jn=[{value:"below",label:"Below $25"},{value:"between",label:"Between $25 - $75"},{value:"above",label:"Above $75"}],Rn=["#00AB55","#000000","#FFFFFF","#FFC0CB","#FF4842","#1890FF","#94D82D","#FFC107"];function Ee({openFilter:e,onOpenFilter:o,onCloseFilter:t}){const s=n.jsxs(y,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Gender"}),n.jsx(Oe,{children:bn.map(i=>n.jsx(oe,{control:n.jsx(go,{}),label:i},i))})]}),r=n.jsxs(y,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Category"}),n.jsx(he,{children:yn.map(i=>n.jsx(oe,{value:i,control:n.jsx(pe,{}),label:i},i))})]}),c=n.jsxs(y,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Colors"}),n.jsx(gn,{name:"colors",selected:[],colors:Rn,onSelectColor:i=>[].includes(i),sx:{maxWidth:38*4}})]}),p=n.jsxs(y,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Price"}),n.jsx(he,{children:jn.map(i=>n.jsx(oe,{value:i.value,control:n.jsx(pe,{}),label:i.label},i.value))})]}),d=n.jsxs(y,{spacing:1,children:[n.jsx(I,{variant:"subtitle2",children:"Rating"}),n.jsx(he,{children:Cn.map((i,a)=>n.jsx(oe,{value:i,control:n.jsx(pe,{disableRipple:!0,color:"default",icon:n.jsx(Fe,{readOnly:!0,value:4-a}),checkedIcon:n.jsx(Fe,{readOnly:!0,value:4-a}),sx:{"&:hover":{bgcolor:"transparent"}}}),label:"& Up",sx:{my:.5,borderRadius:1,"&:hover":{opacity:.48}}},i))})]});return n.jsxs(n.Fragment,{children:[n.jsx(fe,{disableRipple:!0,color:"inherit",endIcon:n.jsx(U,{icon:"ic:round-filter-list"}),onClick:o,children:"Filters "}),n.jsxs(mo,{anchor:"right",open:e,onClose:t,PaperProps:{sx:{width:280,border:"none",overflow:"hidden"}},children:[n.jsxs(y,{direction:"row",alignItems:"center",justifyContent:"space-between",sx:{px:1,py:2},children:[n.jsx(I,{variant:"h6",sx:{ml:1},children:"Filters"}),n.jsx(vo,{onClick:t,children:n.jsx(U,{icon:"eva:close-fill"})})]}),n.jsx(bo,{}),n.jsx(yo,{children:n.jsxs(y,{spacing:3,sx:{p:3},children:[s,r,c,p,d]})}),n.jsx(z,{sx:{p:3},children:n.jsx(fe,{fullWidth:!0,size:"large",type:"submit",color:"inherit",variant:"outlined",startIcon:n.jsx(U,{icon:"ic:round-clear-all"}),children:"Clear All"})})]})]})}Ee.propTypes={openFilter:u.bool,onOpenFilter:u.func,onCloseFilter:u.func};const Fn=N("div")(({theme:e})=>({zIndex:999,right:0,display:"flex",cursor:"pointer",position:"fixed",alignItems:"center",top:e.spacing(16),height:e.spacing(5),paddingLeft:e.spacing(2),paddingRight:e.spacing(2),paddingTop:e.spacing(1.25),boxShadow:e.customShadows.z20,color:e.palette.text.primary,backgroundColor:e.palette.background.paper,borderTopLeftRadius:Number(e.shape.borderRadius)*2,borderBottomLeftRadius:Number(e.shape.borderRadius)*2,transition:e.transitions.create("opacity"),"&:hover":{opacity:.72}}));function wn(){return n.jsx(Fn,{children:n.jsx(Co,{showZero:!0,badgeContent:0,color:"error",max:99,children:n.jsx(U,{icon:"eva:shopping-cart-fill",width:24,height:24})})})}function Sn(){const[e,o]=x.useState(!1),t=()=>{o(!0)},s=()=>{o(!1)};return n.jsxs(jo,{children:[n.jsx(I,{variant:"h4",sx:{mb:5},children:"Products"}),n.jsx(y,{direction:"row",alignItems:"center",flexWrap:"wrap-reverse",justifyContent:"flex-end",sx:{mb:5},children:n.jsxs(y,{direction:"row",spacing:1,flexShrink:0,sx:{my:1},children:[n.jsx(Ee,{openFilter:e,onOpenFilter:t,onCloseFilter:s}),n.jsx(vn,{})]})}),n.jsx(je,{container:!0,spacing:3,children:hn.map(r=>n.jsx(je,{xs:12,sm:6,md:3,children:n.jsx(Be,{product:r})},r.id))}),n.jsx(wn,{})]})}function In(){return n.jsxs(n.Fragment,{children:[n.jsx(Ro,{children:n.jsx("title",{children:" Products | Minimal UI "})}),n.jsx(Sn,{})]})}export{In as default};
