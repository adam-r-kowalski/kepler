(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();const z={};function K0(u){z.context=u}const w0=(u,a)=>u===a,T0=Symbol("solid-proxy"),L0=Symbol("solid-track"),N0=Symbol("solid-dev-component"),uu={equals:w0};let Au=fu;const w=1,au=2,H0={owned:null,cleanups:null,context:null,owner:null};var d=null;let H=null,k=null,h=null,j=null,su=0,R0=0;function Q(u,a){const e=k,i=d,r=u.length===0,n={owned:null,cleanups:null,context:null,owner:a||i},o=r?()=>u(()=>{throw new Error("Dispose method must be an explicit argument to createRoot function")}):()=>u(()=>_(()=>Eu(n)));i&&(n.name=`${i.name}-r${R0++}`),globalThis._$afterCreateRoot&&globalThis._$afterCreateRoot(n),d=n,k=null;try{return O(o,!0)}finally{k=e,d=i}}function N(u,a){a=a?Object.assign({},uu,a):uu;const e={value:u,observers:null,observerSlots:null,comparator:a.equals||void 0};a.internal||(e.name=I0(a.name||_0(u),e));const i=r=>(typeof r=="function"&&(r=r(e.value)),zu(e,r));return[yu.bind(e),i]}function p(u,a,e){const i=ru(u,a,!1,w,e);I(i)}function G0(u,a,e){Au=q0;const i=ru(u,a,!1,w,e);i.user=!0,j?j.push(i):I(i)}function V(u,a,e){e=e?Object.assign({},uu,e):uu;const i=ru(u,a,!0,0,e);return i.observers=null,i.observerSlots=null,i.comparator=e.equals||void 0,I(i),yu.bind(i)}function _(u){let a,e=k;return k=null,a=u(),k=e,a}function V0(u){return d===null?console.warn("cleanups created outside a `createRoot` or `render` will never be run"):d.cleanups===null?d.cleanups=[u]:d.cleanups.push(u),u}function J0(u,a){const e=ru(()=>_(()=>(Object.assign(u,{[N0]:!0}),u(a))),void 0,!0);return e.observers=null,e.observerSlots=null,e.state=0,e.componentName=u.name,I(e),e.tValue!==void 0?e.tValue:e.value}function _0(u){const a=new Set;return`s${Du(typeof u=="string"?u:_(()=>JSON.stringify(u,(e,i)=>{if(typeof i=="object"&&i!=null){if(a.has(i))return;a.add(i);const r=Object.keys(i),n=Object.getOwnPropertyDescriptors(i),o=r.reduce((l,t)=>{const E=n[t];return E.get||(l[t]=E),l},{});i=Object.create({},o)}return typeof i=="bigint"?`${i.toString()}n`:i})||""))}`}function I0(u,a){let e=u;if(d){let i=0;for(d.sourceMap||(d.sourceMap={});d.sourceMap[e];)e=`${u}-${++i}`;d.sourceMap[e]=a}return e}function O0(u){const a=V(u),e=V(()=>lu(a()));return e.toArray=()=>{const i=e();return Array.isArray(i)?i:i!=null?[i]:[]},e}function yu(){const u=H;if(this.sources&&(this.state||u))if(this.state===w||u)I(this);else{const a=h;h=null,O(()=>iu(this),!1),h=a}if(k){const a=this.observers?this.observers.length:0;k.sources?(k.sources.push(this),k.sourceSlots.push(a)):(k.sources=[this],k.sourceSlots=[a]),this.observers?(this.observers.push(k),this.observerSlots.push(k.sources.length-1)):(this.observers=[k],this.observerSlots=[k.sources.length-1])}return this.value}function zu(u,a,e){let i=u.value;return(!u.comparator||!u.comparator(i,a))&&(u.value=a,u.observers&&u.observers.length&&O(()=>{for(let r=0;r<u.observers.length;r+=1){const n=u.observers[r],o=H&&H.running;o&&H.disposed.has(n),(o&&!n.tState||!o&&!n.state)&&(n.pure?h.push(n):j.push(n),n.observers&&Su(n)),o||(n.state=w)}if(h.length>1e6){throw h=[],new Error("Potential Infinite Loop Detected.");throw new Error}},!1)),a}function I(u){if(!u.fn)return;Eu(u);const a=d,e=k,i=su;k=d=u,$0(u,u.value,i),k=e,d=a}function $0(u,a,e){let i;try{i=u.fn(a)}catch(r){u.pure&&(u.state=w),Mu(r)}(!u.updatedAt||u.updatedAt<=e)&&(u.updatedAt!=null&&"observers"in u?zu(u,i):u.value=i,u.updatedAt=e)}function ru(u,a,e,i=w,r){const n={fn:u,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:a,owner:d,context:null,pure:e};return d===null?console.warn("computations created outside a `createRoot` or `render` will never be disposed"):d!==H0&&(d.owned?d.owned.push(n):d.owned=[n],n.name=r&&r.name||`${d.name||"c"}-${(d.owned||d.tOwned).length}`),n}function eu(u){const a=H;if(u.state===0||a)return;if(u.state===au||a)return iu(u);if(u.suspense&&_(u.suspense.inFallback))return u.suspense.effects.push(u);const e=[u];for(;(u=u.owner)&&(!u.updatedAt||u.updatedAt<su);)(u.state||a)&&e.push(u);for(let i=e.length-1;i>=0;i--)if(u=e[i],u.state===w||a)I(u);else if(u.state===au||a){const r=h;h=null,O(()=>iu(u,e[0]),!1),h=r}}function O(u,a){if(h)return u();let e=!1;a||(h=[]),j?e=!0:j=[],su++;try{const i=u();return W0(e),i}catch(i){h||(j=null),Mu(i)}}function W0(u){if(h&&(fu(h),h=null),u)return;const a=j;j=null,a.length?O(()=>Au(a),!1):globalThis._$afterUpdate&&globalThis._$afterUpdate()}function fu(u){for(let a=0;a<u.length;a++)eu(u[a])}function q0(u){let a,e=0;for(a=0;a<u.length;a++){const i=u[a];i.user?u[e++]=i:eu(i)}for(z.context&&K0(),a=0;a<e;a++)eu(u[a])}function iu(u,a){const e=H;u.state=0;for(let i=0;i<u.sources.length;i+=1){const r=u.sources[i];r.sources&&(r.state===w||e?r!==a&&eu(r):(r.state===au||e)&&iu(r,a))}}function Su(u){const a=H;for(let e=0;e<u.observers.length;e+=1){const i=u.observers[e];(!i.state||a)&&(i.state=au,i.pure?h.push(i):j.push(i),i.observers&&Su(i))}}function Eu(u){let a;if(u.sources)for(;u.sources.length;){const e=u.sources.pop(),i=u.sourceSlots.pop(),r=e.observers;if(r&&r.length){const n=r.pop(),o=e.observerSlots.pop();i<r.length&&(n.sourceSlots[o]=i,r[i]=n,e.observerSlots[i]=o)}}if(u.owned){for(a=0;a<u.owned.length;a++)Eu(u.owned[a]);u.owned=null}if(u.cleanups){for(a=0;a<u.cleanups.length;a++)u.cleanups[a]();u.cleanups=null}u.state=0,u.context=null,delete u.sourceMap}function Z0(u){return u instanceof Error||typeof u=="string"?u:new Error("Unknown error")}function Mu(u){throw u=Z0(u),u}function lu(u){if(typeof u=="function"&&!u.length)return lu(u());if(Array.isArray(u)){const a=[];for(let e=0;e<u.length;e++){const i=lu(u[e]);Array.isArray(i)?a.push.apply(a,i):a.push(i)}return a}return u}function Du(u){for(var a=0,e=9;a<u.length;)e=Math.imul(e^u.charCodeAt(a++),9**9);return`${e^e>>>9}`}const U0=Symbol("fallback");function xu(u){for(let a=0;a<u.length;a++)u[a]()}function Y0(u,a,e={}){let i=[],r=[],n=[],o=0,l=a.length>1?[]:null;return V0(()=>xu(n)),()=>{let t=u()||[],E,s;return t[L0],_(()=>{let x=t.length,c,F,g,f,$,A,y,S,R;if(x===0)o!==0&&(xu(n),n=[],i=[],r=[],o=0,l&&(l=[])),e.fallback&&(i=[U0],r[0]=Q(P0=>(n[0]=P0,e.fallback())),o=1);else if(o===0){for(r=new Array(x),s=0;s<x;s++)i[s]=t[s],r[s]=Q(D);o=x}else{for(g=new Array(x),f=new Array(x),l&&($=new Array(x)),A=0,y=Math.min(o,x);A<y&&i[A]===t[A];A++);for(y=o-1,S=x-1;y>=A&&S>=A&&i[y]===t[S];y--,S--)g[S]=r[y],f[S]=n[y],l&&($[S]=l[y]);for(c=new Map,F=new Array(S+1),s=S;s>=A;s--)R=t[s],E=c.get(R),F[s]=E===void 0?-1:E,c.set(R,s);for(E=A;E<=y;E++)R=i[E],s=c.get(R),s!==void 0&&s!==-1?(g[s]=r[E],f[s]=n[E],l&&($[s]=l[E]),s=F[s],c.set(R,s)):n[E]();for(s=A;s<x;s++)s in g?(r[s]=g[s],n[s]=f[s],l&&(l[s]=$[s],l[s](s))):r[s]=Q(D);r=r.slice(0,o=x),i=t.slice(0)}return r});function D(x){if(n[s]=x,l){const[c,F]=N(s);return l[s]=F,a(t[s],c)}return a(t[s])}}}function v(u,a){return J0(u,a||{})}function W(){return!0}const Q0={get(u,a,e){return a===T0?e:u.get(a)},has(u,a){return u.has(a)},set:W,deleteProperty:W,getOwnPropertyDescriptor(u,a){return{configurable:!0,enumerable:!0,get(){return u.get(a)},set:W,deleteProperty:W}},ownKeys(u){return u.keys()}};function nu(u){return(u=typeof u=="function"?u():u)==null?{}:u}function X0(...u){return new Proxy({get(a){for(let e=u.length-1;e>=0;e--){const i=nu(u[e])[a];if(i!==void 0)return i}},has(a){for(let e=u.length-1;e>=0;e--)if(a in nu(u[e]))return!0;return!1},keys(){const a=[];for(let e=0;e<u.length;e++)a.push(...Object.keys(nu(u[e])));return[...new Set(a)]}},Q0)}function ua(u){const a="fallback"in u&&{fallback:()=>u.fallback};return V(Y0(()=>u.each,u.children,a||void 0))}function aa(u){let a=!1,e=!1;const i=O0(()=>u.children),r=V(()=>{let n=i();Array.isArray(n)||(n=[n]);for(let o=0;o<n.length;o++){const l=n[o].when;if(l)return e=!!n[o].keyed,[o,l,n[o]]}return[-1]},void 0,{equals:(n,o)=>n[0]===o[0]&&(a?n[1]===o[1]:!n[1]==!o[1])&&n[2]===o[2]});return V(()=>{const[n,o,l]=r();if(n<0)return u.fallback;const t=l.children,E=typeof t=="function"&&t.length>0;return a=e||E,E?_(()=>t(o)):t})}function cu(u){return u}globalThis&&(globalThis.Solid$$?console.warn("You appear to have multiple instances of Solid. This can lead to unexpected behavior."):globalThis.Solid$$=!0);const ea=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],ia=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...ea]),ra=new Set(["innerHTML","textContent","innerText","children"]),na={className:"class",htmlFor:"for"},du={class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},oa=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),la={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function ta(u,a){return V(u,void 0,a?void 0:{equals:a})}function sa(u,a,e){let i=e.length,r=a.length,n=i,o=0,l=0,t=a[r-1].nextSibling,E=null;for(;o<r||l<n;){if(a[o]===e[l]){o++,l++;continue}for(;a[r-1]===e[n-1];)r--,n--;if(r===o){const s=n<i?l?e[l-1].nextSibling:e[n-l]:t;for(;l<n;)u.insertBefore(e[l++],s)}else if(n===l)for(;o<r;)(!E||!E.has(a[o]))&&a[o].remove(),o++;else if(a[o]===e[n-1]&&e[l]===a[r-1]){const s=a[--r].nextSibling;u.insertBefore(e[l++],a[o++].nextSibling),u.insertBefore(e[--n],s),a[r]=e[n]}else{if(!E){E=new Map;let D=l;for(;D<n;)E.set(e[D],D++)}const s=E.get(a[o]);if(s!=null)if(l<s&&s<n){let D=o,x=1,c;for(;++D<r&&D<n&&!((c=E.get(a[D]))==null||c!==s+x);)x++;if(x>s-l){const F=a[o];for(;l<s;)u.insertBefore(e[l++],F)}else u.replaceChild(e[l++],a[o++])}else o++;else a[o++].remove()}}}const mu="_$DX_DELEGATE";function Ea(u,a,e){let i;return Q(r=>{i=r,a===document?u():b(a,u(),a.firstChild?null:void 0,e)}),()=>{i(),a.textContent=""}}function P(u,a,e){const i=document.createElement("template");if(i.innerHTML=u,a&&i.innerHTML.split("<").length-1!==a)throw`The browser resolved template HTML does not match JSX input:
${i.innerHTML}

`:`
`;return i.join(r)}commitMessage(){return`${this.faker.hacker.verb()} ${this.faker.hacker.adjective()} ${this.faker.hacker.noun()}`}commitSha(){return this.faker.datatype.hexadecimal({length:40,case:"lower",prefix:""})}shortSha(){return this.faker.datatype.hexadecimal({length:7,case:"lower",prefix:""})}},d0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(d0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}abbreviation(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.abbreviation)}adjective(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.adjective)}noun(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.noun)}verb(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.verb)}ingverb(){return this.faker.helpers.arrayElement(this.faker.definitions.hacker.ingverb)}phrase(){let u={abbreviation:this.abbreviation,adjective:this.adjective,ingverb:this.ingverb,noun:this.noun,verb:this.verb},a=this.faker.helpers.arrayElement(this.faker.definitions.hacker.phrase);return this.faker.helpers.mustache(a,u)}};function wT(u){let a=TT(u.replace(/L?$/,"0"));return a===0?0:10-a}function TT(u){u=u.replace(/[\s-]/g,"");let a=0,e=!1;for(let i=u.length-1;i>=0;i--){let r=parseInt(u.substring(i,i+1));e&&(r*=2,r>9&&(r=r%10+1)),a+=r,e=!e}return a%10}var LT={},NT=[];function HT(u,a){return u[a]===void 0?-1:0}function hu(u,a,e,i,r){throw console.error("Error",e),console.log(`Found ${Object.keys(i).length} unique entries before throwing error.
retried: ${r}
total time: ${a-u}ms`),new C(`${e} for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`)}function m0(u,a,e={}){var i;let r=new Date().getTime(),{startTime:n=new Date().getTime(),maxTime:o=50,maxRetries:l=50,compare:t=HT,store:E=LT}=e,{exclude:s=NT}=e;if(e.currentIterations=(i=e.currentIterations)!=null?i:0,Array.isArray(s)||(s=[s]),r-n>=o)return hu(n,r,`Exceeded maxTime: ${o}`,E,e.currentIterations);if(e.currentIterations>=l)return hu(n,r,`Exceeded maxRetries: ${l}`,E,e.currentIterations);let D=u.apply(this,a);return t(E,D)===-1&&s.indexOf(D)===-1?(E[D]=D,e.currentIterations=0,D):(e.currentIterations++,m0(u,a,{...e,startTime:n,maxTime:o,maxRetries:l,compare:t,exclude:s}))}var F0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(F0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}slugify(u=""){return u.replace(/ /g,"-").replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g,"")}replaceSymbolWithNumber(u="",a="#"){let e="";for(let i=0;i<u.length;i++)u.charAt(i)===a?e+=this.faker.datatype.number(9):u.charAt(i)==="!"?e+=this.faker.datatype.number({min:2,max:9}):e+=u.charAt(i);return e}replaceSymbols(u=""){let a=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],e="";for(let i=0;i<u.length;i++)u.charAt(i)==="#"?e+=this.faker.datatype.number(9):u.charAt(i)==="?"?e+=this.arrayElement(a):u.charAt(i)==="*"?e+=this.faker.datatype.boolean()?this.arrayElement(a):this.faker.datatype.number(9):e+=u.charAt(i);return e}replaceCreditCardSymbols(u="6453-####-####-####-###L",a="#"){u=this.regexpStyleStringParse(u),u=this.replaceSymbolWithNumber(u,a);let e=wT(u);return u.replace("L",String(e))}repeatString(u="",a=0){return m({deprecated:"faker.helpers.repeatString()",proposed:"String.prototype.repeat()",since:"7.5",until:"8.0"}),u.repeat(a)}regexpStyleStringParse(u=""){let a=/(.)\{(\d+)\,(\d+)\}/,e=/(.)\{(\d+)\}/,i=/\[(\d+)\-(\d+)\]/,r,n,o,l,t=u.match(a);for(;t!=null;)r=parseInt(t[2]),n=parseInt(t[3]),r>n&&(o=n,n=r,r=o),l=this.faker.datatype.number({min:r,max:n}),u=u.slice(0,t.index)+t[1].repeat(l)+u.slice(t.index+t[0].length),t=u.match(a);for(t=u.match(e);t!=null;)l=parseInt(t[2]),u=u.slice(0,t.index)+t[1].repeat(l)+u.slice(t.index+t[0].length),t=u.match(e);for(t=u.match(i);t!=null;)r=parseInt(t[1]),n=parseInt(t[2]),r>n&&(o=n,n=r,r=o),u=u.slice(0,t.index)+this.faker.datatype.number({min:r,max:n}).toString()+u.slice(t.index+t[0].length),t=u.match(i);return u}shuffle(u){if(u==null||u.length===0)return u||[];for(let a=u.length-1;a>0;--a){let e=this.faker.datatype.number(a),i=u[a];u[a]=u[e],u[e]=i}return u}uniqueArray(u,a){if(Array.isArray(u)){let i=new Set(u),r=Array.from(i);return this.shuffle(r).splice(0,a)}let e=new Set;try{if(typeof u=="function")for(;e.size<a;)e.add(u())}catch{}return Array.from(e)}mustache(u,a){if(u==null)return"";for(let e in a){let i=new RegExp(`{{${e}}}`,"g"),r=a[e];u=u.replace(i,r)}return u}maybe(u,a={}){let{probability:e=.5}=a;if(this.faker.datatype.float({min:0,max:1})<e)return u()}objectKey(u){let a=Object.keys(u);return this.arrayElement(a)}objectValue(u){let a=this.faker.helpers.objectKey(u);return u[a]}arrayElement(u=["a","b","c"]){let a=u.length>1?this.faker.datatype.number({max:u.length-1}):0;return u[a]}arrayElements(u=["a","b","c"],a){typeof a!="number"?a=u.length===0?0:this.faker.datatype.number({min:1,max:u.length}):a>u.length?a=u.length:a<0&&(a=0);let e=u.slice(0),i=u.length,r=i-a,n,o;for(;i-- >r;)o=Math.floor((i+1)*this.faker.datatype.float({min:0,max:.99})),n=e[o],e[o]=e[i],e[i]=n;return e.slice(r)}fake(u){if(typeof u!="string"||u.length===0)throw new C("string parameter is required!");let a=u.search(/{{[a-z]/),e=u.indexOf("}}",a);if(a===-1||e===-1)return u;let i=u.substring(a+2,e+2).replace("}}","").replace("{{",""),r=/\(([^)]+)\)/,n=r.exec(i),o="";n&&(i=i.replace(r,""),o=n[1]);let l=i.split("."),t=this.faker,E=this.faker.definitions;for(let F of l)t=t?.[F],E=E?.[F];let s;if(typeof t=="function")s=t;else if(Array.isArray(E))s=()=>this.faker.helpers.arrayElement(E);else throw new C(`Invalid module method or definition: ${i}
- faker.${i} is not a function
- faker.definitions.${i} is not an array`);s=s.bind(this);let D;try{D=JSON.parse(o)}catch{D=o}let x;typeof D=="string"&&D.length===0?x=String(s()):x=String(s(D));let c=u.substring(0,a)+x+u.substring(e+2);return c===""?"":this.fake(c)}unique(u,a,e={}){let{maxTime:i=50,maxRetries:r=50}=e;return m0(u,a,{...e,startTime:new Date().getTime(),maxTime:i,maxRetries:r,currentIterations:0})}},RT=class{constructor(u){this.faker=u}image(u,a,e,i){return this.imageUrl(u,a,e,i)}imageGrayscale(u,a,e){return this.imageUrl(u,a,e)}imageBlurred(u,a,e){return this.imageUrl(u,a,void 0,e)}imageRandomSeeded(u,a,e,i,r){return this.imageUrl(u,a,e,i,r)}avatar(){return m({deprecated:"faker.image.lorempicsum.avatar()",proposed:"faker.internet.avatar()",since:"7.3",until:"8.0"}),this.faker.internet.avatar()}imageUrl(u,a,e,i,r){u=u||640,a=a||480;let n="https://picsum.photos";return r&&(n+=`/seed/${r}`),n+=`/${u}/${a}`,e&&i?`${n}?grayscale&blur=${i}`:e?`${n}?grayscale`:i?`${n}?blur=${i}`:n}},GT=class{constructor(u){this.faker=u}image(u,a,e){let i=["abstract","animals","business","cats","city","food","nightlife","fashion","people","nature","sports","technics","transport"];return this[this.faker.helpers.arrayElement(i)](u,a,e)}avatar(){return m({deprecated:"faker.image.lorempixel.avatar()",proposed:"faker.internet.avatar()",since:"7.3",until:"8.0"}),this.faker.internet.avatar()}imageUrl(u,a,e,i){u=u||640,a=a||480;let r=`https://lorempixel.com/${u}/${a}`;return e!=null&&(r+=`/${e}`),i&&(r+=`?${this.faker.datatype.number()}`),r}abstract(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"abstract",e)}animals(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"animals",e)}business(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"business",e)}cats(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"cats",e)}city(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"city",e)}food(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"food",e)}nightlife(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"nightlife",e)}fashion(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"fashion",e)}people(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"people",e)}nature(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"nature",e)}sports(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"sports",e)}technics(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"technics",e)}transport(u,a,e){return this.faker.image.lorempixel.imageUrl(u,a,"transport",e)}},k0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(k0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}imageUrl(u,a,e,i,r,n){u=u||640,a=a||u;let o="https://via.placeholder.com";return o+=`/${u}x${a}`,r!=null&&(o+=`/${r.replace("#","").toUpperCase()}`,n!=null&&(o+=`/${n.replace("#","").toUpperCase()}`)),i!=null&&(o+=`.${i}`),e!=null&&(o+=`?${new URLSearchParams({text:e}).toString()}`),o}randomUrl(u,a,e){return this.imageUrl(u,a,this.faker.lorem.word(),e,this.faker.color.rgb({casing:"upper",prefix:""}),this.faker.color.rgb({casing:"upper",prefix:""}))}},VT=class{constructor(u){this.faker=u}get categories(){return m({deprecated:"faker.image.unsplash.categories",since:"7.3",until:"8.0"}),["food","nature","people","technology","objects","buildings"]}image(u,a,e){return this.imageUrl(u,a,void 0,e)}avatar(){return m({deprecated:"faker.image.unsplash.avatar()",proposed:"faker.internet.avatar()",since:"7.3",until:"8.0"}),this.faker.internet.avatar()}imageUrl(u,a,e,i){u=u||640,a=a||480;let r="https://source.unsplash.com";return e!=null&&(r+=`/category/${e}`),r+=`/${u}x${a}`,i!=null&&/^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$/.test(i)&&(r+=`?${i}`),r}food(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"food",e)}people(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"people",e)}nature(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"nature",e)}technology(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"technology",e)}objects(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"objects",e)}buildings(u,a,e){return this.faker.image.unsplash.imageUrl(u,a,"buildings",e)}},C0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(C0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this));this.lorempixel=new GT(this.faker),this.unsplash=new VT(this.faker),this.lorempicsum=new RT(this.faker),this.placeholder=new k0(this.faker)}image(u,a,e){let i=["abstract","animals","business","cats","city","food","nightlife","fashion","people","nature","sports","technics","transport"];return this[this.faker.helpers.arrayElement(i)](u,a,e)}avatar(){return this.faker.internet.avatar()}imageUrl(u,a,e,i){u=u||640,a=a||480;let r=`https://loremflickr.com/${u}/${a}`;return e!=null&&(r+=`/${e}`),i&&(r+=`?lock=${this.faker.datatype.number()}`),r}abstract(u,a,e){return this.imageUrl(u,a,"abstract",e)}animals(u,a,e){return this.imageUrl(u,a,"animals",e)}business(u,a,e){return this.imageUrl(u,a,"business",e)}cats(u,a,e){return this.imageUrl(u,a,"cats",e)}city(u,a,e){return this.imageUrl(u,a,"city",e)}food(u,a,e){return this.imageUrl(u,a,"food",e)}nightlife(u,a,e){return this.imageUrl(u,a,"nightlife",e)}fashion(u,a,e){return this.imageUrl(u,a,"fashion",e)}people(u,a,e){return this.imageUrl(u,a,"people",e)}nature(u,a,e){return this.imageUrl(u,a,"nature",e)}sports(u,a,e){return this.imageUrl(u,a,"sports",e)}technics(u,a,e){return this.imageUrl(u,a,"technics",e)}transport(u,a,e){return this.imageUrl(u,a,"transport",e)}dataUri(u,a,e="grey"){let i=`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${u}" height="${a}"><rect width="100%" height="100%" fill="${e}"/><text x="${u/2}" y="${a/2}" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${u}x${a}</text></svg>`;return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(i)}};function JT(u){let a=s=>{let D=u.datatype.number({min:0,max:100})/100,x=0,c=0,F;for(let g in s)if(Object.prototype.hasOwnProperty.call(s,g)){if(c=s[g]+x,F=g,D>=x&&D<=c)break;x=x+s[g]}return F},e=()=>u.helpers.arrayElement(["AB","AF","AN","AR","AS","AZ","BE","BG","BN","BO","BR","BS","CA","CE","CO","CS","CU","CY","DA","DE","EL","EN","EO","ES","ET","EU","FA","FI","FJ","FO","FR","FY","GA","GD","GL","GV","HE","HI","HR","HT","HU","HY","ID","IS","IT","JA","JV","KA","KG","KO","KU","KW","KY","LA","LB","LI","LN","LT","LV","MG","MK","MN","MO","MS","MT","MY","NB","NE","NL","NN","NO","OC","PL","PT","RM","RO","RU","SC","SE","SK","SL","SO","SQ","SR","SV","SW","TK","TR","TY","UK","UR","UZ","VI","VO","YI","ZH"]),i=()=>{let s=a({chrome:.45132810566,iexplorer:.27477061836,firefox:.19384170608,safari:.06186781118,opera:.01574236955}),D=a({chrome:{win:.89,mac:.09,lin:.02},firefox:{win:.83,mac:.16,lin:.01},opera:{win:.91,mac:.03,lin:.06},safari:{win:.04,mac:.96},iexplorer:{win:1}}[s]);return[s,D]},r=s=>{let D={lin:["i686","x86_64"],mac:{Intel:.48,PPC:.01,"U; Intel":.48,"U; PPC":.01},win:["","WOW64","Win64; x64"]}[s];return Array.isArray(D)?u.helpers.arrayElement(D):a(D)},n=s=>{let D="";for(let x=0;x<s;x++)D+=`.${u.datatype.number({min:0,max:9})}`;return D},o={net(){return[u.datatype.number({min:1,max:4}),u.datatype.number({min:0,max:9}),u.datatype.number({min:1e4,max:99999}),u.datatype.number({min:0,max:9})].join(".")},nt(){return[u.datatype.number({min:5,max:6}),u.datatype.number({min:0,max:3})].join(".")},ie(){return u.datatype.number({min:7,max:11})},trident(){return[u.datatype.number({min:3,max:7}),u.datatype.number({min:0,max:1})].join(".")},osx(s){return[10,u.datatype.number({min:5,max:10}),u.datatype.number({min:0,max:9})].join(s||".")},chrome(){return[u.datatype.number({min:13,max:39}),0,u.datatype.number({min:800,max:899}),0].join(".")},presto(){return`2.9.${u.datatype.number({min:160,max:190})}`},presto2(){return`${u.datatype.number({min:10,max:12})}.00`},safari(){return[u.datatype.number({min:531,max:538}),u.datatype.number({min:0,max:2}),u.datatype.number({min:0,max:2})].join(".")}},l={firefox(s){let D=`${u.datatype.number({min:5,max:15})}${n(2)}`,x=`Gecko/20100101 Firefox/${D}`,c=r(s);return`Mozilla/5.0 ${s==="win"?`(Windows NT ${o.nt()}${c?`; ${c}`:""}`:s==="mac"?`(Macintosh; ${c} Mac OS X ${o.osx()}`:`(X11; Linux ${c}`}; rv:${D.slice(0,-2)}) ${x}`},iexplorer(){let s=o.ie();return s>=11?`Mozilla/5.0 (Windows NT 6.${u.datatype.number({min:1,max:3})}; Trident/7.0; ${u.datatype.boolean()?"Touch; ":""}rv:11.0) like Gecko`:`Mozilla/5.0 (compatible; MSIE ${s}.0; Windows NT ${o.nt()}; Trident/${o.trident()}${u.datatype.boolean()?`; .NET CLR ${o.net()}`:""})`},opera(s){let D=` Presto/${o.presto()} Version/${o.presto2()})`,x=s==="win"?`(Windows NT ${o.nt()}; U; ${e()}${D}`:s==="lin"?`(X11; Linux ${r(s)}; U; ${e()}${D}`:`(Macintosh; Intel Mac OS X ${o.osx()} U; ${e()} Presto/${o.presto()} Version/${o.presto2()})`;return`Opera/${u.datatype.number({min:9,max:14})}.${u.datatype.number({min:0,max:99})} ${x}`},safari(s){let D=o.safari(),x=`${u.datatype.number({min:4,max:7})}.${u.datatype.number({min:0,max:1})}.${u.datatype.number({min:0,max:10})}`;return`Mozilla/5.0 ${s==="mac"?`(Macintosh; ${r("mac")} Mac OS X ${o.osx("_")} rv:${u.datatype.number({min:2,max:6})}.0; ${e()}) `:`(Windows; U; Windows NT ${o.nt()})`}AppleWebKit/${D} (KHTML, like Gecko) Version/${x} Safari/${D}`},chrome(s){let D=o.safari();return`Mozilla/5.0 ${s==="mac"?`(Macintosh; ${r("mac")} Mac OS X ${o.osx("_")}) `:s==="win"?`(Windows; U; Windows NT ${o.nt()})`:`(X11; Linux ${r(s)}`} AppleWebKit/${D} (KHTML, like Gecko) Chrome/${o.chrome()} Safari/${D}`}},[t,E]=i();return l[t](E)}var g0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(g0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}avatar(){return`https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${this.faker.datatype.number(1249)}.jpg`}email(u,a,e,i){e=e||this.faker.helpers.arrayElement(this.faker.definitions.internet.free_email);let r=this.faker.helpers.slugify(this.userName(u,a));if(i!=null&&i.allowSpecialCharacters){let n="._-".split(""),o=".!#$%&'*+-/=?^_`{|}~".split("");r=r.replace(this.faker.helpers.arrayElement(n),this.faker.helpers.arrayElement(o))}return`${r}@${e}`}exampleEmail(u,a,e){let i=this.faker.helpers.arrayElement(this.faker.definitions.internet.example_email);return this.email(u,a,i,e)}userName(u,a){let e;switch(u=u||this.faker.name.firstName(),a=a||this.faker.name.lastName(),this.faker.datatype.number(2)){case 0:e=`${u}${this.faker.datatype.number(99)}`;break;case 1:e=u+this.faker.helpers.arrayElement([".","_"])+a;break;case 2:e=`${u}${this.faker.helpers.arrayElement([".","_"])}${a}${this.faker.datatype.number(99)}`;break}return e=e.toString().replace(/'/g,""),e=e.replace(/ /g,""),e}protocol(){let u=["http","https"];return this.faker.helpers.arrayElement(u)}httpMethod(){let u=["GET","POST","PUT","DELETE","PATCH"];return this.faker.helpers.arrayElement(u)}httpStatusCode(u={}){let{types:a=Object.keys(this.faker.definitions.internet.http_status_code)}=u,e=this.faker.helpers.arrayElement(a);return this.faker.helpers.arrayElement(this.faker.definitions.internet.http_status_code[e])}url(){return`${this.protocol()}://${this.domainName()}`}domainName(){return`${this.domainWord()}.${this.domainSuffix()}`}domainSuffix(){return this.faker.helpers.arrayElement(this.faker.definitions.internet.domain_suffix)}domainWord(){return`${this.faker.word.adjective()}-${this.faker.word.noun()}`.replace(/([\\~#&*{}/:<>?|\"'])/gi,"").replace(/\s/g,"-").replace(/-{2,}/g,"-").toLowerCase()}ip(){return this.ipv4()}ipv4(){let u=()=>this.faker.datatype.number(255).toFixed(0),a=[];for(let e=0;e<4;e++)a[e]=u();return a.join(".")}ipv6(){let u=()=>{let e="";for(let i=0;i<4;i++)e+=this.faker.helpers.arrayElement(["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]);return e},a=[];for(let e=0;e<8;e++)a[e]=u();return a.join(":")}port(){return this.faker.datatype.number({min:0,max:65535})}userAgent(){return JT(this.faker)}color(u=0,a=0,e=0){let i=l=>Math.floor((this.faker.datatype.number(256)+l)/2).toString(16).padStart(2,"0"),r=i(u),n=i(a),o=i(e);return`#${r}${n}${o}`}mac(u){let a,e="",i=":";for(["-",""].indexOf(u)!==-1&&(i=u),a=0;a<12;a++)e+=this.faker.datatype.number(15).toString(16),a%2===1&&a!==11&&(e+=i);return e}password(u=15,a=!1,e=/\w/,i=""){let r=/[aeiouAEIOU]$/,n=/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/,o=(l,t,E,s)=>{if(s.length>=l)return s;t&&(s.match(n)?E=r:E=n);let D=this.faker.datatype.number(94)+33,x=String.fromCharCode(D);return t&&(x=x.toLowerCase()),x.match(E)?o(l,t,E,s+x):o(l,t,E,s)};return o(u,a,e,i)}emoji(u={}){let{types:a=Object.keys(this.faker.definitions.internet.emoji)}=u,e=this.faker.helpers.arrayElement(a);return this.faker.helpers.arrayElement(this.faker.definitions.internet.emoji[e])}},ou={fail:()=>{throw new C("No words found that match the given length.")},closest:(u,a)=>{let e=u.reduce((l,t)=>{var E;return(l[t.length]=(E=l[t.length])!=null?E:[]).push(t),l},{}),i=Object.keys(e).map(Number),r=Math.min(...i),n=Math.max(...i),o=Math.min(a.min-r,n-a.max);return u.filter(l=>l.length===a.min-o||l.length===a.max+o)},shortest:u=>{let a=Math.min(...u.map(e=>e.length));return u.filter(e=>e.length===a)},longest:u=>{let a=Math.max(...u.map(e=>e.length));return u.filter(e=>e.length===a)},"any-length":u=>[...u]};function K(u){let{wordList:a,length:e,strategy:i="any-length"}=u;if(e){let r=typeof e=="number"?o=>o.length===e:o=>o.length>=e.min&&o.length<=e.max,n=a.filter(r);return n.length>0?n:typeof e=="number"?ou[i](a,{min:e,max:e}):ou[i](a,e)}else return i==="shortest"||i==="longest"?ou[i](a):[...a]}var h0=class{constructor(u){this.faker=u;for(let a of Object.getOwnPropertyNames(h0.prototype))a==="constructor"||typeof this[a]!="function"||(this[a]=this[a].bind(this))}word(u={}){let a=typeof u=="number"?{length:u}:u;return this.faker.helpers.arrayElement(K({...a,wordList:this.faker.definitions.lorem.words}))}words(u=3){let a=[];for(let e=0;e<u;e++)a.push(this.word());return a.join(" ")}sentence(u){u==null&&(u=this.faker.datatype.number({min:3,max:10}));let a=this.words(u);return`${a.charAt(0).toUpperCase()+a.slice(1)}.`}slug(u){let a=this.words(u);return this.faker.helpers.slugify(a)}sentences(u,a=" "){u==null&&(u=this.faker.datatype.number({min:2,max:6}));let e=[];for(u;u>0;u--)e.push(this.sentence());return e.join(a)}paragraph(u=3){return this.sentences(u+this.faker.datatype.number(3))}paragraphs(u=3,a=`
`){let e=[];for(u;u>0;u--)e.push(this.paragraph());return e.join(a)}text(){let u=["word","words","sentence","sentences","paragraph","paragraphs","lines"],a=this.faker.helpers.arrayElement(u);return`${this[a]()}`}lines(u){return u==null&&(u=this.faker.datatype.number({min:1,max:5})),this.sentences(u,`